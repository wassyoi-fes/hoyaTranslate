const MODES = {
  HOYA: 'hoya',
  SUPER_HOYA: 'super_hoya',
  ULTRA_HOYA: 'ultra_hoya',
  ULTRA_HOYA_REVERSE: 'ultra_hoya_reverse',
};
const DEFAULT_MODE = MODES.HOYA;

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

const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'NOSCRIPT']);

const originalText = new WeakMap();
const lastSetValue = new WeakMap();
let currentMode = DEFAULT_MODE;
let currentEnabled = true;

function convertText(text, mode) {
  if (mode === MODES.ULTRA_HOYA_REVERSE) return reverseUltraHoyaConvert(text);
  if (mode === MODES.ULTRA_HOYA) return ultraConvertText(superHoyaConvert(text));
  if (mode === MODES.HOYA) return hoyaConvert(text);
  if (mode === MODES.SUPER_HOYA) return superHoyaConvert(text);
  return text;
}

function shouldSkipElement(el) {
  if (!el || el.nodeType !== 1) return false;
  if (SKIP_TAGS.has(el.tagName)) return true;
  if (el.isContentEditable) return true;
  return false;
}

function isInsideSkippedSubtree(textNode) {
  let p = textNode.parentNode;
  while (p && p.nodeType === 1) {
    if (shouldSkipElement(p)) return true;
    p = p.parentNode;
  }
  return false;
}

function applyToTextNode(node) {
  const val = node.nodeValue;
  if (val == null) return;
  if (!originalText.has(node)) {
    originalText.set(node, val);
  }
  const orig = originalText.get(node);
  const converted = currentEnabled ? convertText(orig, currentMode) : orig;
  if (node.nodeValue !== converted) {
    node.nodeValue = converted;
    lastSetValue.set(node, converted);
  }
}

function walkAndApply(root) {
  if (!root) return;
  if (root.nodeType === 3) {
    if (!isInsideSkippedSubtree(root)) applyToTextNode(root);
    return;
  }
  if (root.nodeType !== 1) return;
  if (shouldSkipElement(root)) return;

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
    {
      acceptNode(n) {
        if (n.nodeType === 1) {
          return shouldSkipElement(n) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  let node;
  while ((node = walker.nextNode())) {
    applyToTextNode(node);
  }
}

let observer = null;

function startObserving() {
  if (observer) observer.disconnect();
  observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'characterData') {
        const node = m.target;
        if (node.nodeType !== 3) continue;
        if (lastSetValue.get(node) === node.nodeValue) continue;
        if (isInsideSkippedSubtree(node)) continue;
        originalText.set(node, node.nodeValue);
        applyToTextNode(node);
      } else if (m.type === 'childList') {
        m.addedNodes.forEach(walkAndApply);
      }
    }
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}

function applyToDocument() {
  if (document.body) walkAndApply(document.body);
}

async function init() {
  try {
    const { mode, enabled } = await chrome.storage.local.get({ mode: DEFAULT_MODE, enabled: true });
    currentMode = mode || DEFAULT_MODE;
    currentEnabled = enabled !== false;
  } catch (_) {
    currentMode = DEFAULT_MODE;
    currentEnabled = true;
  }
  applyToDocument();
  startObserving();
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') return;
  let dirty = false;
  if (changes.mode && changes.mode.newValue !== currentMode) {
    currentMode = changes.mode.newValue;
    dirty = true;
  }
  if (changes.enabled && (changes.enabled.newValue !== false) !== currentEnabled) {
    currentEnabled = changes.enabled.newValue !== false;
    dirty = true;
  }
  if (dirty) applyToDocument();
});

init();
