import { startGame } from "./dino/game.js";

function initDino(root) {
  const canvas = root.querySelector("[data-dino-canvas]");
  const stage = root.querySelector("[data-dino-stage]");
  const hi = root.querySelector("[data-dino-hi]");
  const score = root.querySelector("[data-dino-score]");
  const speedTag = root.querySelector("[data-dino-speed]");
  const finalScore = root.querySelector("[data-dino-final-score]");
  const finalHi = root.querySelector("[data-dino-final-hi]");
  const overlayStart = root.querySelector("[data-dino-overlay-start]");
  const overlayOver = root.querySelector("[data-dino-overlay-over]");
  if (!canvas || !stage || !hi || !score || !speedTag || !finalScore || !finalHi || !overlayStart || !overlayOver) {
    return;
  }

  const rect = stage.getBoundingClientRect();
  canvas.width = Math.max(320, Math.round(rect.width));
  canvas.height = Math.max(320, Math.round(rect.height));

  startGame({
    canvas,
    stage,
    hi,
    score,
    speedTag,
    finalScore,
    finalHi,
    overlayStart,
    overlayOver,
    overlayShowClass: "is-show",
  });
}

document.querySelectorAll("[data-dino]").forEach(initDino);
