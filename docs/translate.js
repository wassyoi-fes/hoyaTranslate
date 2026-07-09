/*
 * content.js の翻訳コア(ルール配列・変換関数)の複製。
 * ルール・ロジックを変更する場合は、content.js とこのファイルの両方を更新すること。
 */

const MODES = {
  HOYA: 'hoya',
  SUPER_HOYA: 'super_hoya',
  ULTRA_HOYA: 'ultra_hoya',
  ULTRA_HOYA_REVERSE: 'ultra_hoya_reverse',
};

const GREETING_RULES = [
  ['おはようございます', 'ほやっほー！'],
  ['おはよう', 'ほやっほー！'],
  ['おはよー', 'ほやっほー！'],
  ['こんにちは', 'ほやっほー！'],
  ['こんばんは', 'ほやっほー！'],
  ['はじめまして', 'ほやっほー！'],
  ['よろしくお願いいたします', 'ほやっほー！'],
  ['よろしくお願いします', 'ほやっほー！'],
  ['よろしくね', 'ほやっほー！'],
  ['よろしく', 'ほやっほー！'],
  ['ほやっほー', 'ほやっほー'],
  ['やっほー', 'ほやっほー！'],
  ['やっほう', 'ほやっほー！'],
  ['やあ', 'ほやっほー！'],
  ['ハロー', 'ほやっほー！'],
  ['ハーイ', 'ほやっほー！'],
  ['どうも', 'ほやっほー！'],
  ['さようなら', 'ほやっほー！'],
  ['さよなら', 'ほやっほー！'],
  ['バイバイ', 'ほやっほー！'],
  ['ばいばい', 'ほやっほー！'],
  ['またね', 'ほやっほー！'],
  ['じゃあね', 'ほやっほー！'],
  ['じゃね', 'ほやっほー！'],
  ['ありがとうございます', 'ありがとうほやいます'],
  ['ございません', 'ほやいません'],
  ['ございます', 'ほやいます'],
  ['おやすみなさい', 'ほやすみなさい'],
  ['おやすみ', 'ほやすみ'],
  ['ハッピー', 'ホヤッピー'],
  ['Happy', 'Hoyappy'],
  ['happy', 'hoyappy'],
  ['HAPPY', 'HOYAPPY'],
  ['ハロウィン', 'ほやウィン'],
  ['クリスマス', 'ほやスマス'],
  ['ホワイト', 'ほやイト'],
  ['なるほど', 'なるほや'],
  ['なるほどね', 'なるほやね'],
  ['幸せ', 'ほやわせ'],
  ['うまい', 'ほやい'],
];

const KANJI_RULES = [
  // ── は行 + や行 (h*y*) ──
  ['早い', 'ほやい'], ['早く', 'ほやく'], ['早める', 'ほやめる'], ['早まる', 'ほやまる'],
  ['早めに', 'ほやめに'], ['早起き', 'ほやおき'], ['早口', 'ほやぐち'], ['早足', 'ほやあし'],
  ['速い', 'ほやい'], ['速く', 'ほやく'], ['速める', 'ほやめる'], ['速まる', 'ほやまる'],
  ['冷やす', 'ほやす'], ['冷やかす', 'ほやかす'],
  ['冷や水', 'ほや水'], ['冷や汗', 'ほや汗'], ['冷や飯', 'ほや飯'],
  ['比喩', 'ほや'],
  ['雛形', 'ほや形'], ['雛祭り', 'ほや祭り'], ['雛人形', 'ほや人形'], ['雛菊', 'ほや菊'], ['雛鳥', 'ほや鳥'], ['雛', 'ほや'],
  ['増やす', 'ほやす'], ['殖やす', 'ほやす'],
  ['不要', 'ほやう'],
  ['冬休み', 'ほや休み'], ['冬山', 'ほや山'], ['冬空', 'ほや空'], ['冬服', 'ほや服'], ['冬物', 'ほや物'], ['冬', 'ほや'],
  ['部屋着', 'ほや着'], ['部屋', 'ほや'],
  ['保有', 'ほやう'], ['保養', 'ほやう'],

  // ── は行 + あ段 (h**a) ──
  ['計らい', 'ほやらい'], ['計らう', 'ほやらう'],
  ['計る', 'ほやる'], ['測る', 'ほやる'], ['図る', 'ほやる'], ['量る', 'ほやる'], ['諮る', 'ほやる'], ['謀る', 'ほやる'],
  ['挟まる', 'ほやまる'], ['挟める', 'ほやめる'], ['挟む', 'ほやむ'], ['挟み', 'ほやみ'],
  ['朗らか', 'ほやらか'],
  ['法螺話', 'ほや話'], ['法螺', 'ほや'],
  ['誉れ', 'ほやれ'],
  ['補佐', 'ほや'],
  ['光る', 'ほやる'], ['比較', 'ほやく'], ['日傘', 'ほやさ'],
  ['久しい', 'ほやしい'],
  ['浸す', 'ほやす'], ['浸る', 'ほやる'], ['額', 'ほやい'],
  ['暇', 'ほや'],
  ['膝', 'ほや'], ['襞', 'ほや'], ['飛騨', 'ほや'],
  ['話す', 'ほやす'], ['離す', 'ほやす'], ['放す', 'ほやす'],
  ['浜', 'ほや'],
  ['払う', 'ほやう'], ['払い', 'ほやい'], ['腹立つ', 'ほやだつ'],
  ['剥がす', 'ほやす'],
  ['肌', 'ほや'], ['裸', 'ほやか'],
  ['幅', 'ほや'], ['阻む', 'ほやむ'],
  ['不満', 'ほやん'], ['不和', 'ほや'], ['札', 'ほや'], ['不断', 'ほやん'],
  ['鮒', 'ほや'],
  ['踏まれる', 'ほやれる'], ['振られる', 'ほやれる'],
  ['深い', 'ほやい'], ['房', 'ほや'], ['塞ぐ', 'ほやぐ'],
  ['蓋', 'ほや'], ['二人', 'ほやり'], ['二つ', 'ほやつ'], ['双子', 'ほやご'],
  ['下手', 'ほや'],

  // ── お段 + や行 (*oy*) ──
  ['親子', 'ほやこ'], ['親父', 'ほやじ'], ['親方', 'ほやかた'],
  ['小屋', 'ほや'],
  ['暦', 'ほやみ'],
  ['泳ぐ', 'ほやぐ'], ['泳ぎ', 'ほやぎ'], ['及ぶ', 'ほやぶ'], ['及び', 'ほやび'],
  ['豊田', 'ほや田'], ['豊川', 'ほや川'],
  ['模様', 'ほやう'],
  ['燃やす', 'ほやす'], ['燃やせる', 'ほやせる'], ['靄', 'ほや'],

  // ── お段 + あ段 (*o*a) ──
  ['穏やか', 'ほややか'],
  ['お母さん', 'ほやあさん'], ['お墓', 'ほやか'], ['お腹', 'ほやか'], ['お話', 'ほやなし'], ['御花', 'ほやな'],
  ['怖い', 'ほやい'], ['怖がる', 'ほやがる'], ['怖さ', 'ほやさ'],
  ['答える', 'ほやえる'], ['答え', 'ほやえ'],
  ['困った', 'ほやった'], ['困る', 'ほやる'], ['困り', 'ほやり'],
  ['駒', 'ほや'], ['粉', 'ほや'], ['細かい', 'ほやかい'],
  ['焦がす', 'ほやす'], ['凝らす', 'ほやす'],
  ['反らす', 'ほやす'], ['戦ぐ', 'ほやぐ'],
  ['育つ', 'ほやつ'], ['育てる', 'ほやてる'], ['育ち', 'ほやち'],
  ['蕎麦', 'ほや'], ['側', 'ほや'],
  ['隣', 'ほやり'], ['唱える', 'ほやえる'], ['苫', 'ほや'],
  ['止まる', 'ほやる'], ['泊まる', 'ほやる'], ['留まる', 'ほやる'],
  ['飛ばす', 'ほやす'],
  ['伸ばす', 'ほやす'], ['延ばす', 'ほやす'], ['逃す', 'ほやす'],
  ['怒鳴る', 'ほやる'], ['怒鳴り', 'ほやり'],
  ['土間', 'ほや'], ['土台', 'ほやい'], ['どら焼き', 'ほややき'], ['銅鑼', 'ほや'],
  ['ご飯', 'ほやん'], ['御覧', 'ほやん'], ['胡麻', 'ほや'], ['五月', 'ほやつ'],
  ['余暇', 'ほや'], ['余波', 'ほや'], ['良さ', 'ほや'],
  ['弱い', 'ほやい'], ['弱める', 'ほやめる'], ['弱まる', 'ほやまる'], ['弱る', 'ほやる'], ['弱り', 'ほやり'], ['弱さ', 'ほやさ'],
  ['夜明け', 'ほやけ'], ['涎', 'ほやれ'],
  ['牡丹', 'ほやん'], ['菩提', 'ほやい'],
  ['漏らす', 'ほやす'],
  ['同じ', 'ほやじ'],
  ['ぼやく', 'ほやく'], ['暈す', 'ほやす'],
  ['濾過', 'ほや'], ['驢馬', 'ほや'],
];

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildConverter(ruleSets) {
  const combined = ruleSets.flat();
  if (combined.length === 0) return (text) => text;
  combined.sort((a, b) => b[0].length - a[0].length);
  const map = new Map(combined);
  const pattern = combined.map(([k]) => escapeRegex(k)).join('|');
  const re = new RegExp(pattern, 'g');
  return (text) => text.replace(re, (m) => {
    const v = map.get(m);
    return Array.isArray(v) ? v[Math.floor(Math.random() * v.length)] : v;
  });
}

const hoyaConvert = buildConverter([GREETING_RULES]);
const superHoyaBase = buildConverter([GREETING_RULES, KANJI_RULES]);

const KANA_FEATURES = (() => {
  const features = {};
  const vowels = ['a', 'i', 'u', 'e', 'o'];
  const rows = [
    ['', 'あいうえお', 'アイウエオ'],
    ['k', 'かきくけこ', 'カキクケコ'],
    ['g', 'がぎぐげご', 'ガギグゲゴ'],
    ['s', 'さしすせそ', 'サシスセソ'],
    ['z', 'ざじずぜぞ', 'ザジズゼゾ'],
    ['t', 'たちつてと', 'タチツテト'],
    ['d', 'だぢづでど', 'ダヂヅデド'],
    ['n', 'なにぬねの', 'ナニヌネノ'],
    ['h', 'はひふへほ', 'ハヒフヘホ'],
    ['b', 'ばびぶべぼ', 'バビブベボ'],
    ['p', 'ぱぴぷぺぽ', 'パピプペポ'],
    ['m', 'まみむめも', 'マミムメモ'],
    ['r', 'らりるれろ', 'ラリルレロ'],
  ];
  for (const [c, hira, kata] of rows) {
    for (let i = 0; i < 5; i++) {
      features[hira[i]] = [c, vowels[i]];
      features[kata[i]] = [c, vowels[i]];
    }
  }
  const irregular = [
    ['y', 'a', 'や', 'ヤ'], ['y', 'u', 'ゆ', 'ユ'], ['y', 'o', 'よ', 'ヨ'],
    ['w', 'a', 'わ', 'ワ'], ['w', 'o', 'を', 'ヲ'],
    ['n', '', 'ん', 'ン'],
  ];
  for (const [c, v, h, k] of irregular) {
    features[h] = [c, v];
    features[k] = [c, v];
  }
  return features;
})();

function applyExtraSuperHoyaRules(text) {
  let result = '';
  let i = 0;
  while (i + 2 <= text.length) {
    const a = text[i];
    const b = text[i + 1];
    const af = KANA_FEATURES[a];
    const bf = KANA_FEATURES[b];
    if (af && bf) {
      const aHit = af[0] === 'h' || af[1] === 'o';
      const bHit = bf[0] === 'y' || bf[1] === 'a';
      if (aHit && bHit) {
        const useKata = KATAKANA_RE.test(a) && KATAKANA_RE.test(b);
        result += useKata ? 'ホヤ' : 'ほや';
        i += 2;
        continue;
      }
    }
    result += a;
    i += 1;
  }
  result += text.slice(i);
  text = result;
  text = text.replace(/[a-zA-Z]{4,}/g, (run) => {
    let out = '';
    let j = 0;
    while (j + 4 <= run.length) {
      const w = run.slice(j, j + 4).toLowerCase();
      const aHit = w[0] === 'h' || w[1] === 'o';
      const bHit = w[2] === 'y' || w[3] === 'a';
      if (aHit && bHit) {
        out += 'hoya';
        j += 4;
      } else {
        out += run[j];
        j += 1;
      }
    }
    out += run.slice(j);
    return out;
  });
  return text;
}

const superHoyaConvert = (text) => applyExtraSuperHoyaRules(superHoyaBase(text));
const EXTRA_FIXED_PHRASES = ['ほや', 'ホヤ', 'hoya'];

const FIXED_PHRASES = (() => {
  const set = new Set(EXTRA_FIXED_PHRASES);
  for (const [, v] of GREETING_RULES) {
    if (Array.isArray(v)) v.forEach((s) => set.add(s));
    else set.add(v);
  }
  for (const [, v] of KANJI_RULES) {
    if (/^[぀-ヿ]+$/.test(v)) set.add(v);
  }
  return [...set].sort((a, b) => b.length - a.length);
})();
const ULTRA_TOKEN_RE = new RegExp(
  '(' + FIXED_PHRASES.map(escapeRegex).join('|') + ')|([ぁ-ゖァ-ヺ一-鿿A-Za-z])',
  'g'
);
const KATAKANA_RE = /[ァ-ヺ]/;
const HIRAGANA_CYCLE = ['ほ', 'や'];
const KATAKANA_CYCLE = ['ホ', 'ヤ'];
const HOYA_LOWER = ['h', 'o', 'y', 'a'];
const HOYA_UPPER = ['H', 'O', 'Y', 'A'];
const KANA_BIAS = 0.75;
const ALPHA_BIAS = 0.4;
const CUTIN_HOYA_PROB = 0.03;
const CUTIN_HOYAP_PROB = 0.02;

function hashString(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickBiased(arr, prev, biasNext, rng) {
  const n = arr.length;
  const idx = prev == null ? -1 : arr.indexOf(prev);
  if (idx < 0) return arr[Math.floor(rng() * n)];
  const nextIdx = (idx + 1) % n;
  if (rng() < biasNext) return arr[nextIdx];
  const otherIdx = Math.floor(rng() * (n - 1));
  return arr[otherIdx >= nextIdx ? otherIdx + 1 : otherIdx];
}

function ultraConvertText(text) {
  const rng = mulberry32(hashString(text));
  let prevHira = null;
  let prevKata = null;
  let prevLower = null;
  let prevUpper = null;
  return text.replace(ULTRA_TOKEN_RE, (_, phrase, ch) => {
    if (phrase) return phrase;
    let out;
    if (ch === 'ほ' || ch === 'や') { prevHira = ch; out = ch; }
    else if (ch === 'ホ' || ch === 'ヤ') { prevKata = ch; out = ch; }
    else if (ch === 'っ' || ch === 'ッ') { out = ch; }
    else if (ch >= 'a' && ch <= 'z') {
      out = pickBiased(HOYA_LOWER, prevLower, ALPHA_BIAS, rng);
      prevLower = out;
    } else if (ch >= 'A' && ch <= 'Z') {
      out = pickBiased(HOYA_UPPER, prevUpper, ALPHA_BIAS, rng);
      prevUpper = out;
    } else if (KATAKANA_RE.test(ch)) {
      out = pickBiased(KATAKANA_CYCLE, prevKata, KANA_BIAS, rng);
      prevKata = out;
    } else {
      out = pickBiased(HIRAGANA_CYCLE, prevHira, KANA_BIAS, rng);
      prevHira = out;
    }
    const r = rng();
    if (r < CUTIN_HOYA_PROB) return 'ﾎﾔ' + out;
    if (r < CUTIN_HOYA_PROB + CUTIN_HOYAP_PROB) return 'ﾎﾔｯ' + out;
    return out;
  });
}

const REVERSE_JP_PHRASES = [
  'いか', '海藻', '海水', 'うに', '水', 'アシカ', 'ウミウシ',
  '海の蛇口', '海しぶき', '海のスケッチ', '海をそそぐ',
  'こげる', '海が湧き出る', 'ホース噴出', '海に水をはねかける',
  '海のジューという音',
];
const REVERSE_EN_PHRASES = [
  'squid', 'seaweed', 'seawater', 'sea urchin', 'water', 'sea lion',
  'sea slug', 'ocean faucet', 'sea spray', 'sea sketch', 'pour sea',
  'scorch', 'sea welling up', 'hose spurt', 'splash water onto sea',
  'sea sizzle',
];
const REVERSE_JP_RUN_RE = /[ぁ-ゖァ-ヺ一-鿿々ー]+/g;
const REVERSE_EN_RUN_RE = /[A-Za-z]+/g;

function reverseJpChunkReplace(run, rng) {
  let out = '';
  let i = 0;
  while (i + 2 <= run.length) {
    out += REVERSE_JP_PHRASES[Math.floor(rng() * REVERSE_JP_PHRASES.length)];
    i += 2;
  }
  if (i < run.length) out += 'っほー';
  return out;
}

function reverseEnChunkReplace(run, rng) {
  let out = '';
  let i = 0;
  while (i + 4 <= run.length) {
    out += REVERSE_EN_PHRASES[Math.floor(rng() * REVERSE_EN_PHRASES.length)];
    i += 4;
  }
  if (i < run.length) out += 'hho';
  return out;
}

function reverseUltraHoyaConvert(text) {
  const rng = mulberry32(hashString(text));
  const ultra = ultraConvertText(superHoyaConvert(text));
  let result = ultra.replace(REVERSE_JP_RUN_RE, (run) => reverseJpChunkReplace(run, rng));
  result = result.replace(REVERSE_EN_RUN_RE, (run) => reverseEnChunkReplace(run, rng));
  return result;
}

function convertText(text, mode) {
  if (mode === MODES.ULTRA_HOYA_REVERSE) return reverseUltraHoyaConvert(text);
  if (mode === MODES.ULTRA_HOYA) return ultraConvertText(superHoyaConvert(text));
  if (mode === MODES.HOYA) return hoyaConvert(text);
  if (mode === MODES.SUPER_HOYA) return superHoyaConvert(text);
  return text;
}

/* ==================== ここから下はブラウザお試しデモUI ==================== */

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

const DEFAULT_MODE = MODES.HOYA;

// popup.js の tryAdvance() と同じ隠しモード解禁ロジック(タップ数・時間窓は同一の値)。
const TAP_WINDOW_MS = 200;
const UNLOCK_TAPS = {
  [MODES.HOYA]: 1,
  [MODES.SUPER_HOYA]: 3,
  [MODES.ULTRA_HOYA]: 10,
};

const STORAGE_MODE_KEY = 'hoyaDemo.mode';
const STORAGE_UNLOCKED_KEY = 'hoyaDemo.unlockedIndex';

let lastNextTapAt = 0;
let nextTapStreak = 0;
let unlockedIndex = 0;

const tryPrevBtn = document.getElementById('tryPrev');
const tryNextBtn = document.getElementById('tryNext');
const tryModeName = document.getElementById('tryModeName');
const tryModeNameInner = document.getElementById('tryModeNameInner');
const tryInput = document.getElementById('tryInput');
const tryOutput = document.getElementById('tryOutput');
const tryCopyBtn = document.getElementById('tryCopy');
const tryChips = document.querySelectorAll('.hoya-try__chip');
const tryPanes = document.querySelector('.hoya-try__panes');
const tryFlowRev = document.getElementById('tryFlowRev');
const tryRevPane = document.getElementById('tryRevPane');
const tryRevOutput = document.getElementById('tryRevOutput');
const tryCopyRevBtn = document.getElementById('tryCopyRev');

function readStoredIndex(key, fallback) {
  const v = parseInt(localStorage.getItem(key), 10);
  return Number.isFinite(v) ? v : fallback;
}

function playTrySlide(direction) {
  const cls = direction === 'next' ? 'hoya-try-slide-right' : 'hoya-try-slide-left';
  tryModeNameInner.classList.remove('hoya-try-slide-right', 'hoya-try-slide-left');
  void tryModeNameInner.offsetWidth;
  tryModeNameInner.classList.add(cls);
}

// 未解禁モードへ進めなかったときの「何かある」示唆演出(解禁カウントには影響しない)
function playLockedShake() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  tryModeName.classList.remove('hoya-try-shake');
  void tryModeName.offsetWidth;
  tryModeName.classList.add('hoya-try-shake');
  navigator.vibrate?.(50);
}

// 隠しモード解禁時の紙吹雪 (canvas-confetti、CDN 読み込み失敗時は何もしない)
function playUnlockConfetti() {
  if (typeof confetti !== 'function') return;
  const colors = ['#FF7A3D', '#C04510', '#E8B84A', '#B31D00', '#FBF5E9'];
  const r = tryModeName.getBoundingClientRect();
  const origin = {
    x: (r.left + r.width / 2) / window.innerWidth,
    y: (r.top + r.height / 2) / window.innerHeight,
  };
  confetti({ particleCount: 80, spread: 70, startVelocity: 32, scalar: 1.2, origin, colors, disableForReducedMotion: true });
  confetti({ particleCount: 40, angle: 60, spread: 55, startVelocity: 42, scalar: 1.2, origin, colors, disableForReducedMotion: true });
  confetti({ particleCount: 40, angle: 120, spread: 55, startVelocity: 42, scalar: 1.2, origin, colors, disableForReducedMotion: true });
}

// 逆ほんやくモードでは 3枚目のペイン (にほんご→ほや語→逆ほんやく) を生やす
function updateRevPane(mode) {
  if (!tryPanes || !tryFlowRev || !tryRevPane) return;
  const show = mode === 'ultra_hoya_reverse';
  const wasHidden = tryRevPane.hidden;
  tryPanes.classList.toggle('is-chain', show);
  tryFlowRev.hidden = !show;
  tryRevPane.hidden = !show;
  if (show && wasHidden) {
    for (const el of [tryFlowRev, tryRevPane]) {
      el.classList.remove('hoya-try-grow');
      void el.offsetWidth;
      el.classList.add('hoya-try-grow');
    }
  }
}

function setTryUIForMode(mode, direction) {
  tryModeNameInner.innerHTML = '';
  const label = MODE_LABELS[mode] ?? mode;
  for (const part of String(label).split('\n')) {
    if (tryModeNameInner.childNodes.length) tryModeNameInner.appendChild(document.createElement('br'));
    tryModeNameInner.appendChild(document.createTextNode(part));
  }
  tryModeName.dataset.mode = mode;
  const i = MODE_ORDER.indexOf(mode);
  const atStart = i <= 0;
  const atEnd = i >= MODE_ORDER.length - 1;
  tryPrevBtn.classList.toggle('edge', atStart);
  tryNextBtn.classList.toggle('edge', atEnd);
  tryPrevBtn.disabled = atStart;
  tryNextBtn.disabled = atEnd;
  updateRevPane(mode);
  if (direction) playTrySlide(direction);
  renderOutput();
}

function applyTryMode(mode, direction) {
  localStorage.setItem(STORAGE_MODE_KEY, mode);
  setTryUIForMode(mode, direction);
}

function tryGoPrev() {
  lastNextTapAt = 0;
  nextTapStreak = 0;
  const cur = tryModeName.dataset.mode || DEFAULT_MODE;
  const i = MODE_ORDER.indexOf(cur);
  if (i <= 0) return;
  applyTryMode(MODE_ORDER[i - 1], 'prev');
}

function tryAdvance() {
  const cur = tryModeName.dataset.mode || DEFAULT_MODE;
  const i = MODE_ORDER.indexOf(cur);
  if (i < 0 || i >= MODE_ORDER.length - 1) return;
  const target = i + 1;
  if (target <= unlockedIndex) {
    applyTryMode(MODE_ORDER[target], 'next');
    return;
  }
  const required = UNLOCK_TAPS[cur] ?? 1;
  const now = performance.now();
  nextTapStreak = now - lastNextTapAt <= TAP_WINDOW_MS ? nextTapStreak + 1 : 1;
  lastNextTapAt = now;
  if (nextTapStreak < required) {
    playLockedShake();
    return;
  }
  lastNextTapAt = 0;
  nextTapStreak = 0;
  unlockedIndex = Math.max(unlockedIndex, target);
  localStorage.setItem(STORAGE_UNLOCKED_KEY, String(unlockedIndex));
  applyTryMode(MODE_ORDER[target], 'next');
  // 連打が必要な隠しモードを解禁したときだけ祝う (hoya→super の通常送りでは出さない)
  if (required > 1) playUnlockConfetti();
}

function setOutputText(el, text) {
  el.classList.remove('is-updated');
  void el.offsetWidth;
  el.textContent = text;
  el.classList.add('is-updated');
}

function renderOutput() {
  const mode = tryModeName.dataset.mode || DEFAULT_MODE;
  const text = tryInput.value;
  const isChain = mode === 'ultra_hoya_reverse' && tryRevOutput;
  setOutputText(tryOutput, text ? convertText(text, isChain ? 'ultra_hoya' : mode) : '');
  if (isChain) {
    setOutputText(tryRevOutput, text ? convertText(text, 'ultra_hoya_reverse') : '');
  }
}

let renderTimer = null;
function scheduleRender() {
  if (renderTimer) clearTimeout(renderTimer);
  renderTimer = setTimeout(renderOutput, 80);
}

if (tryPrevBtn && tryNextBtn && tryModeName && tryInput && tryOutput) {
  tryPrevBtn.addEventListener('click', tryGoPrev);
  tryNextBtn.addEventListener('click', tryAdvance);
  tryInput.addEventListener('input', scheduleRender);

  tryModeName.addEventListener('animationend', (e) => {
    if (e.animationName === 'hoyaTryShake') tryModeName.classList.remove('hoya-try-shake');
  });

  // grow の fill が transform (モバイルの矢印回転) を上書きし続けないよう終了時に外す
  for (const el of [tryFlowRev, tryRevPane]) {
    el?.addEventListener('animationend', (e) => {
      if (e.animationName === 'hoyaTryGrow') el.classList.remove('hoya-try-grow');
    });
  }

  tryChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      tryInput.value = chip.dataset.sample || '';
      renderOutput();
      tryInput.focus();
    });
  });

  const bindCopy = (btn, sourceEl) => {
    if (!btn || !sourceEl) return;
    btn.addEventListener('click', async () => {
      const text = sourceEl.textContent || '';
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        btn.classList.add('is-copied');
        btn.textContent = 'コピーしました';
        setTimeout(() => {
          btn.classList.remove('is-copied');
          btn.textContent = 'コピー';
        }, 1400);
      } catch (_) {
        /* クリップボード権限がない環境では何もしない */
      }
    });
  };
  bindCopy(tryCopyBtn, tryOutput);
  bindCopy(tryCopyRevBtn, tryRevOutput);

  const storedMode = localStorage.getItem(STORAGE_MODE_KEY);
  const safeMode = MODE_ORDER.includes(storedMode) ? storedMode : DEFAULT_MODE;
  unlockedIndex = Math.max(readStoredIndex(STORAGE_UNLOCKED_KEY, 0), MODE_ORDER.indexOf(safeMode));
  setTryUIForMode(safeMode);
}
