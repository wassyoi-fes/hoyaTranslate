const MODES = {
  HOYA: 'hoya',
  SUPER_HOYA: 'super_hoya',
  ULTRA_HOYA: 'ultra_hoya',
  ULTRA_HOYA_REVERSE: 'ultra_hoya_reverse',
};

const MODE_ORDER = [
  MODES.HOYA,
  MODES.SUPER_HOYA,
  MODES.ULTRA_HOYA,
  MODES.ULTRA_HOYA_REVERSE,
];

const MODE_LABELS = {
  [MODES.HOYA]: 'ほや\nモード',
  [MODES.SUPER_HOYA]: 'スーパーほや\nモード',
  [MODES.ULTRA_HOYA]: 'ウルトラほや\nモード',
  [MODES.ULTRA_HOYA_REVERSE]: 'ウルトラほや\n逆ほんやくモード',
};

const MODE_TO_IMG_KEY = {
  [MODES.HOYA]: 'mode1',
  [MODES.SUPER_HOYA]: 'mode2',
  [MODES.ULTRA_HOYA]: 'mode3',
  [MODES.ULTRA_HOYA_REVERSE]: 'mode4',
};

const DEFAULT_MODE = MODES.HOYA;

const TAP_WINDOW_MS = 200;
const UNLOCK_TAPS = {
  [MODES.HOYA]: 1,
  [MODES.SUPER_HOYA]: 3,
  [MODES.ULTRA_HOYA]: 10,
};

let lastNextTapAt = 0;
let nextTapStreak = 0;
let unlockedIndex = 0;

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const modeName = document.getElementById('modeName');
const modeNameInner = document.getElementById('modeNameInner');
const toggleBtn = document.getElementById('toggle');
const toggleImg = document.getElementById('toggleImg');

function playSlide(direction) {
  const cls = direction === 'next' ? 'slide-from-right' : 'slide-from-left';
  for (const el of [modeNameInner, toggleImg]) {
    el.classList.remove('slide-from-right', 'slide-from-left');
    void el.offsetWidth;
    el.classList.add(cls);
  }
}

function currentEnabled() {
  return toggleBtn.dataset.enabled !== 'false';
}

function currentMode() {
  return modeName.dataset.mode || DEFAULT_MODE;
}

function syncToggleImg() {
  const key = MODE_TO_IMG_KEY[currentMode()] ?? 'mode1';
  toggleImg.src = `icons/${key}.png`;
  toggleImg.classList.toggle('off', !currentEnabled());
}

function setUIForMode(mode, direction) {
  modeNameInner.innerHTML = '';
  const label = MODE_LABELS[mode] ?? mode;
  for (const part of String(label).split('\n')) {
    if (modeNameInner.childNodes.length) modeNameInner.appendChild(document.createElement('br'));
    modeNameInner.appendChild(document.createTextNode(part));
  }
  modeName.dataset.mode = mode;
  const i = MODE_ORDER.indexOf(mode);
  const atStart = i <= 0;
  const atEnd = i >= MODE_ORDER.length - 1;
  prevBtn.classList.toggle('edge', atStart);
  nextBtn.classList.toggle('edge', atEnd);
  prevBtn.disabled = atStart;
  nextBtn.disabled = atEnd;
  syncToggleImg();
  if (direction) playSlide(direction);
}

function setUIForEnabled(enabled) {
  toggleBtn.dataset.enabled = enabled ? 'true' : 'false';
  toggleBtn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
  syncToggleImg();
}

async function applyMode(mode, direction) {
  await chrome.storage.local.set({ mode });
  setUIForMode(mode, direction);
}

async function applyEnabled(enabled) {
  await chrome.storage.local.set({ enabled });
  setUIForEnabled(enabled);
}

function goPrev() {
  lastNextTapAt = 0;
  nextTapStreak = 0;
  const cur = modeName.dataset.mode || DEFAULT_MODE;
  const i = MODE_ORDER.indexOf(cur);
  if (i <= 0) return;
  applyMode(MODE_ORDER[i - 1], 'prev');
}

function tryAdvance() {
  const cur = modeName.dataset.mode || DEFAULT_MODE;
  const i = MODE_ORDER.indexOf(cur);
  if (i < 0 || i >= MODE_ORDER.length - 1) return;
  const target = i + 1;
  if (target <= unlockedIndex) {
    applyMode(MODE_ORDER[target], 'next');
    return;
  }
  const required = UNLOCK_TAPS[cur] ?? 1;
  const now = performance.now();
  nextTapStreak = now - lastNextTapAt <= TAP_WINDOW_MS ? nextTapStreak + 1 : 1;
  lastNextTapAt = now;
  if (nextTapStreak < required) return;
  lastNextTapAt = 0;
  nextTapStreak = 0;
  unlockedIndex = Math.max(unlockedIndex, target);
  chrome.storage.local.set({ unlockedIndex });
  applyMode(MODE_ORDER[target], 'next');
}

prevBtn.addEventListener('click', goPrev);
nextBtn.addEventListener('click', tryAdvance);
toggleBtn.addEventListener('click', () => {
  const cur = toggleBtn.dataset.enabled !== 'false';
  applyEnabled(!cur);
});

(async () => {
  const { mode, enabled, unlockedIndex: stored } = await chrome.storage.local.get({
    mode: DEFAULT_MODE,
    enabled: true,
    unlockedIndex: 0,
  });
  const safeMode = MODE_ORDER.includes(mode) ? mode : DEFAULT_MODE;
  unlockedIndex = Math.max(stored | 0, MODE_ORDER.indexOf(safeMode));
  setUIForMode(safeMode);
  setUIForEnabled(enabled !== false);
})();
