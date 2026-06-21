const SLOW_DURATION_MS = 22000;
const BURST_DURATION_MS = 700;
const FULL_CIRCLE = 360;
const BURST_TURNS = 2;

const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function getRotation(el) {
  const t = getComputedStyle(el).transform;
  if (!t || t === 'none') return 0;
  try {
    const m = new DOMMatrix(t);
    let a = (Math.atan2(m.b, m.a) * 180) / Math.PI;
    if (a < 0) a += 360;
    return a;
  } catch (_) {
    return 0;
  }
}

function startSlowSpin(el, startAngle) {
  return el.animate(
    [
      { transform: `rotate(${startAngle}deg)` },
      { transform: `rotate(${startAngle + FULL_CIRCLE}deg)` },
    ],
    {
      duration: SLOW_DURATION_MS,
      iterations: Infinity,
      easing: 'linear',
    }
  );
}

function startBurst(el, startAngle) {
  return el.animate(
    [
      { transform: `rotate(${startAngle}deg)` },
      { transform: `rotate(${startAngle + FULL_CIRCLE * BURST_TURNS}deg)` },
    ],
    {
      duration: BURST_DURATION_MS,
      easing: 'cubic-bezier(0.18, 0.65, 0.3, 1)',
      fill: 'forwards',
    }
  );
}

const hamburger = document.getElementById('wp-hamburger');
const nav = document.getElementById('primary-nav');
if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', open ? 'false' : 'true');
    nav.classList.toggle('is-open', !open);
  });
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('is-open')) return;
    if (hamburger.contains(e.target) || nav.contains(e.target)) return;
    hamburger.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  });
}

const installCta = document.querySelector('[data-install-cta]');
const flipMascots = Array.from(document.querySelectorAll('.mascot-row--flip .mascot-flip'));
if (installCta && flipMascots.length) {
  let active = null;
  const flipOne = () => {
    if (active) active.classList.remove('is-flipped');
    active = flipMascots[Math.floor(Math.random() * flipMascots.length)];
    active.classList.add('is-flipped');
  };
  const unflip = () => {
    if (!active) return;
    active.classList.remove('is-flipped');
    active = null;
  };
  installCta.addEventListener('pointerenter', flipOne);
  installCta.addEventListener('focus', flipOne);
  installCta.addEventListener('pointerleave', unflip);
  installCta.addEventListener('blur', unflip);
}

if (!reducedMotion) {
  document.querySelectorAll('.mascot-row:not(.mascot-row--still)').forEach((row) => {
    const items = Array.from(row.querySelectorAll('.mascot'));
    items.forEach((m, i) => {
      const initialAngle = (i * 137) % FULL_CIRCLE;
      let slow = startSlowSpin(m, initialAngle);
      let burst = null;

      m.addEventListener('click', () => {
        const startAngle = getRotation(m);
        if (slow) slow.cancel();
        if (burst) burst.cancel();
        burst = startBurst(m, startAngle);
        const myBurst = burst;
        myBurst.addEventListener('finish', () => {
          if (burst !== myBurst) return;
          const endAngle = (startAngle + FULL_CIRCLE * BURST_TURNS) % FULL_CIRCLE;
          slow = startSlowSpin(m, endAngle);
          burst = null;
        });
      });
    });
  });
}
