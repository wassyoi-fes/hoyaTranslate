import { buildSprites } from "./sprites.js";

const HI_KEY = "wassyoi_dino_hi";
const HERO_HEIGHT = 90;
const HERO_DUCK_HEIGHT = 56;
const GRAVITY = 0.937125;
const JUMP_V = -17.01;
const FAST_FALL = 1.6;
const SPEED_BASE = 6.0;
const SPEED_MAX = 13.0;

function pad(n, len) {
  const s = String(Math.floor(n));
  return "0".repeat(Math.max(0, len - s.length)) + s;
}

function roundRect(c, x, y, w, h, r) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.lineTo(x + w - r, y);
  c.quadraticCurveTo(x + w, y, x + w, y + r);
  c.lineTo(x + w, y + h - r);
  c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  c.lineTo(x + r, y + h);
  c.quadraticCurveTo(x, y + h, x, y + h - r);
  c.lineTo(x, y + r);
  c.quadraticCurveTo(x, y, x + r, y);
  c.closePath();
}

export function startGame(refs) {
  const ctx = refs.canvas.getContext("2d");
  const W = refs.canvas.width;
  const H = refs.canvas.height;
  const GROUND_Y = H - 40;

  let sprites = null;
  let state = "ready";
  let score = 0;
  let hi = 0;
  if (typeof localStorage !== "undefined") {
    hi = parseInt(localStorage.getItem(HI_KEY) || "0", 10);
  }
  let speed = SPEED_BASE;

  const hero = {
    x: W < 600 ? 24 : 70,
    y: GROUND_Y,
    vy: 0,
    onGround: true,
    ducking: false,
    width: 0,
    height: HERO_HEIGHT,
    frame: 0,
    frameTimer: 0,
    deadFlash: 0,
  };

  let obstacles = [];
  let lastSpawnAt = 0;
  let frameCount = 0;
  let lanterns = [];
  let nextLanternAt = 0;
  const groundDecor = [];

  let jumpQueued = false;
  let duckHeld = false;
  let rafId = 0;
  let cancelled = false;

  refs.hi.textContent = pad(hi, 5);

  function spawnInitialDecor() {
    for (let i = 0; i < 14; i++) {
      groundDecor.push({
        x: Math.random() * W,
        y: GROUND_Y + 6 + Math.random() * 14,
        len: 4 + Math.random() * 10,
        kind: Math.random() > 0.6 ? "dash" : "dot",
      });
    }
    lanterns = [];
    nextLanternAt = frameCount + 30;
  }

  function makeObstacle() {
    const r = Math.random();
    let type;
    if (speed > 9 && r > 0.7) type = "chochin-high";
    else if (r < 0.35) type = "torii";
    else if (r < 0.7) type = "taiko";
    else type = "lantern-low";

    const o = { type, x: W + 20, y: 0, w: 0, h: 0 };
    if (type === "torii") {
      o.w = 38; o.h = 56; o.y = GROUND_Y - o.h;
    } else if (type === "taiko") {
      o.w = 52; o.h = 38; o.y = GROUND_Y - o.h;
    } else if (type === "lantern-low") {
      o.w = 28; o.h = 40; o.y = GROUND_Y - o.h;
    } else {
      o.w = 36; o.h = 28; o.y = GROUND_Y - 80;
    }
    return o;
  }

  function drawObstacle(o) {
    ctx.save();
    ctx.lineWidth = 3;
    ctx.lineJoin = "miter";
    ctx.lineCap = "butt";
    const x = o.x, y = o.y, w = o.w, h = o.h;
    if (o.type === "torii") {
      ctx.fillStyle = "#B81E0E";
      ctx.strokeStyle = "#0E0E0C";
      ctx.fillRect(x - 4, y, w + 8, 7);
      ctx.strokeRect(x - 4, y, w + 8, 7);
      ctx.fillRect(x, y + 12, w, 5);
      ctx.strokeRect(x, y + 12, w, 5);
      ctx.fillRect(x + 4, y + 7, 6, h - 7);
      ctx.strokeRect(x + 4, y + 7, 6, h - 7);
      ctx.fillRect(x + w - 10, y + 7, 6, h - 7);
      ctx.strokeRect(x + w - 10, y + 7, 6, h - 7);
    } else if (o.type === "taiko") {
      ctx.fillStyle = "#F2EAD3";
      ctx.strokeStyle = "#0E0E0C";
      ctx.fillRect(x, y + 6, w, h - 12);
      ctx.strokeRect(x, y + 6, w, h - 12);
      ctx.fillStyle = "#B81E0E";
      ctx.fillRect(x - 3, y + 4, 5, h - 8);
      ctx.strokeRect(x - 3, y + 4, 5, h - 8);
      ctx.fillRect(x + w - 2, y + 4, 5, h - 8);
      ctx.strokeRect(x + w - 2, y + 4, 5, h - 8);
      ctx.fillStyle = "#0E0E0C";
      ctx.beginPath();
      ctx.arc(x + w / 2, y + h / 2, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(x + 6, y + h - 4, w - 12, 4);
    } else if (o.type === "lantern-low") {
      ctx.fillStyle = "#F5C518";
      ctx.strokeStyle = "#0E0E0C";
      roundRect(ctx, x, y + 4, w, h - 8, 8);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#0E0E0C";
      ctx.fillRect(x + 4, y, w - 8, 6);
      ctx.fillRect(x + 4, y + h - 6, w - 8, 6);
      ctx.strokeStyle = "#0E0E0C";
      ctx.beginPath();
      ctx.moveTo(x + 2, y + h / 2 - 4);
      ctx.lineTo(x + w - 2, y + h / 2 - 4);
      ctx.moveTo(x + 2, y + h / 2 + 4);
      ctx.lineTo(x + w - 2, y + h / 2 + 4);
      ctx.stroke();
      ctx.fillStyle = "#B81E0E";
      ctx.beginPath();
      ctx.arc(x + w / 2, y + h / 2, 3, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.strokeStyle = "#0E0E0C";
      ctx.beginPath();
      ctx.moveTo(x + w / 2, 0);
      ctx.lineTo(x + w / 2, y);
      ctx.stroke();
      ctx.fillStyle = "#B81E0E";
      roundRect(ctx, x, y, w, h, 7);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#0E0E0C";
      ctx.fillRect(x + 6, y - 3, w - 12, 4);
      ctx.fillRect(x + 6, y + h - 1, w - 12, 4);
      ctx.fillStyle = "#F5C518";
      ctx.fillRect(x + w / 2 - 2, y + h + 3, 4, 6);
    }
    ctx.restore();
  }

  function heroBox() {
    if (!sprites) return { x: 0, y: 0, w: 0, h: 0 };
    if (hero.ducking && hero.onGround) {
      const s = sprites.duck;
      const footY = s.styleH * s.footRatio;
      const top = hero.y - footY + 4;
      return { x: hero.x + 6, y: top, w: s.styleW - 18, h: s.styleH - 8 };
    }
    const s = sprites.stand;
    const footY = s.styleH * s.footRatio;
    const top = hero.y - footY + 6;
    return { x: hero.x + 8, y: top, w: s.styleW - 22, h: footY - 14 };
  }

  function obstacleBox(o) {
    return { x: o.x + 2, y: o.y + 2, w: o.w - 4, h: o.h - 4 };
  }

  function intersect(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function drawGround() {
    ctx.strokeStyle = "#0E0E0C";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(W, GROUND_Y);
    ctx.stroke();
    ctx.fillStyle = "#0E0E0C";
    for (const d of groundDecor) {
      if (d.kind === "dash") ctx.fillRect(d.x, d.y, d.len, 2);
      else ctx.fillRect(d.x, d.y, 2, 2);
    }
  }

  function drawLanterns() {
    for (const l of lanterns) {
      ctx.save();
      ctx.globalAlpha = 0.32;
      ctx.fillStyle = "#B81E0E";
      ctx.strokeStyle = "#0E0E0C";
      ctx.lineWidth = 1.5;
      const w = l.size, h = l.size * 1.3;
      const drawY = l.y + Math.sin(l.bigPhase) * l.bigAmp + Math.sin(l.fastPhase) * l.fastAmp;
      const drawX = l.x;
      roundRect(ctx, drawX, drawY, w, h, 6);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#0E0E0C";
      ctx.fillRect(drawX + 3, drawY - 2, w - 6, 3);
      ctx.fillRect(drawX + 3, drawY + h - 1, w - 6, 3);
      ctx.globalAlpha = 0.18;
      ctx.strokeStyle = "#0E0E0C";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(drawX + w / 2, 0);
      ctx.lineTo(drawX + w / 2, drawY);
      ctx.stroke();
      ctx.restore();
    }
  }

  function drawHero() {
    if (!sprites) return;
    let img;
    if (hero.ducking && hero.onGround) img = sprites.duck;
    else if (!hero.onGround) img = sprites.roar;
    else if (state === "over") img = sprites.damage;
    else img = (hero.frame % 2 === 0 ? sprites.walk : sprites.stand);

    const drawW = img.styleW;
    const drawH = img.styleH;
    const footY = drawH * img.footRatio;
    ctx.drawImage(img, hero.x, hero.y - footY, drawW, drawH);

    if (state === "over" && hero.deadFlash > 0) {
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "#B81E0E";
      ctx.fillRect(hero.x, hero.y - drawH, drawW, drawH);
      ctx.restore();
    }
  }

  function startRun() {
    state = "run";
    score = 0;
    speed = SPEED_BASE;
    obstacles = [];
    lastSpawnAt = frameCount;
    refs.overlayStart.classList.remove(refs.overlayShowClass);
    refs.overlayOver.classList.remove(refs.overlayShowClass);
  }

  function gameOver() {
    state = "over";
    hero.deadFlash = 30;
    if (score > hi) {
      hi = Math.floor(score);
      if (typeof localStorage !== "undefined") {
        try { localStorage.setItem(HI_KEY, String(hi)); } catch {}
      }
    }
    refs.finalScore.textContent = pad(score, 5);
    refs.finalHi.textContent = pad(hi, 5);
    refs.hi.textContent = pad(hi, 5);
    refs.overlayOver.classList.add(refs.overlayShowClass);
  }

  function update() {
    frameCount++;

    if (state === "run") {
      if (jumpQueued && hero.onGround) {
        hero.vy = JUMP_V;
        hero.onGround = false;
        hero.ducking = false;
      }
      jumpQueued = false;

      if (duckHeld && !hero.onGround && hero.vy > 0) hero.vy += FAST_FALL;
      hero.ducking = duckHeld && hero.onGround;
      hero.vy += GRAVITY;
      hero.y += hero.vy;
      if (hero.y >= GROUND_Y) {
        hero.y = GROUND_Y;
        hero.vy = 0;
        hero.onGround = true;
      }

      hero.frameTimer += 1 + speed * 0.15;
      if (hero.frameTimer > 8) {
        hero.frameTimer = 0;
        hero.frame++;
      }

      for (const o of obstacles) o.x -= speed;
      obstacles = obstacles.filter((o) => o.x + o.w > -10);

      const sinceLast = frameCount - lastSpawnAt;
      const minGap = Math.max(28, 50 - speed * 1.5);
      const rampFrames = 90;
      let p = 0;
      if (sinceLast >= minGap) {
        const t = Math.min(1, (sinceLast - minGap) / rampFrames);
        const pMax = 0.04 + speed * 0.005;
        p = t * t * pMax;
      }
      if (Math.random() < p) {
        obstacles.push(makeObstacle());
        lastSpawnAt = frameCount;
      }

      if (sprites) {
        const hb = heroBox();
        for (const o of obstacles) {
          if (intersect(hb, obstacleBox(o))) {
            gameOver();
            break;
          }
        }
      }

      score += 0.15 + speed * 0.02;
      speed = Math.min(SPEED_MAX, SPEED_BASE + score * 0.006);
      refs.score.textContent = pad(score, 5);
      refs.speedTag.textContent = "SPD ×" + (speed / SPEED_BASE).toFixed(1);
    }

    if (state === "over" && hero.deadFlash > 0) hero.deadFlash--;

    const scroll = state === "run" ? speed : state === "ready" ? 1.2 : 0;
    for (const d of groundDecor) {
      d.x -= scroll;
      if (d.x < -20) {
        d.x = W + Math.random() * 40;
        d.y = GROUND_Y + 6 + Math.random() * 14;
        d.len = 4 + Math.random() * 10;
        d.kind = Math.random() > 0.6 ? "dash" : "dot";
      }
    }

    if (frameCount >= nextLanternAt) {
      lanterns.push({
        x: W + Math.random() * 40,
        y: 30 + Math.random() * 90,
        size: 14 + Math.random() * 12,
        driftSpeed: 0.6 + Math.random() * 0.8,
        bigPhase: Math.random() * Math.PI * 2,
        bigSpeed: 0.012 + Math.random() * 0.018,
        bigAmp: 18 + Math.random() * 20,
        fastPhase: Math.random() * Math.PI * 2,
        fastSpeed: 0.22 + Math.random() * 0.18,
        fastAmp: 2 + Math.random() * 3,
      });
      nextLanternAt = frameCount + 60 + Math.random() * 120;
    }
    for (const l of lanterns) {
      const baseScroll = state === "run" ? speed * 0.18 : 0.4;
      l.x -= l.driftSpeed + baseScroll;
      l.bigPhase += l.bigSpeed;
      l.fastPhase += l.fastSpeed;
    }
    lanterns = lanterns.filter((l) => l.x + l.size > -10);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    drawLanterns();
    drawGround();
    for (const o of obstacles) drawObstacle(o);
    drawHero();
  }

  function loop() {
    if (cancelled) return;
    update();
    draw();
    rafId = requestAnimationFrame(loop);
  }

  function onJumpStart() {
    if (state === "ready") startRun();
    else if (state === "over") {
      if (hero.deadFlash <= 0) {
        hero.y = GROUND_Y; hero.vy = 0; hero.onGround = true; hero.ducking = false;
        startRun();
      }
    } else {
      jumpQueued = true;
    }
  }

  const onKeyDown = (e) => {
    if (e.code === "Space" || e.code === "ArrowUp") {
      e.preventDefault();
      onJumpStart();
    } else if (e.code === "ArrowDown") {
      e.preventDefault();
      duckHeld = true;
    }
  };
  const onKeyUp = (e) => {
    if (e.code === "ArrowDown") duckHeld = false;
  };
  const onPointerDown = (e) => {
    const rect = refs.stage.getBoundingClientRect();
    const yFrac = (e.clientY - rect.top) / rect.height;
    if (yFrac > 0.7 && state === "run") duckHeld = true;
    else onJumpStart();
  };
  const onPointerUp = () => { duckHeld = false; };

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
  refs.stage.addEventListener("pointerdown", onPointerDown);
  refs.stage.addEventListener("pointerup", onPointerUp);
  refs.stage.addEventListener("pointercancel", onPointerUp);
  refs.stage.addEventListener("pointerleave", onPointerUp);

  buildSprites(HERO_HEIGHT, HERO_DUCK_HEIGHT)
    .then((s) => {
      if (cancelled) return;
      sprites = s;
      hero.width = s.stand.styleW;
      spawnInitialDecor();
      rafId = requestAnimationFrame(loop);
    })
    .catch((err) => {
      console.error("sprite load failed", err);
    });

  return () => {
    cancelled = true;
    if (rafId) cancelAnimationFrame(rafId);
    document.removeEventListener("keydown", onKeyDown);
    document.removeEventListener("keyup", onKeyUp);
    refs.stage.removeEventListener("pointerdown", onPointerDown);
    refs.stage.removeEventListener("pointerup", onPointerUp);
    refs.stage.removeEventListener("pointercancel", onPointerUp);
    refs.stage.removeEventListener("pointerleave", onPointerUp);
  };
}
