const POSES = {
  stand: {
    viewBox: "0 0 240 200",
    footRatio: 0.89,
    paths: [
      { fill: "#0E0E0C", d: "M 30 130 Q 25 100 40 88 Q 55 76 80 78 Q 85 60 100 55 Q 115 50 130 58 L 145 38 Q 155 28 165 32 Q 172 36 170 46 L 162 70 Q 175 78 182 92 Q 188 105 184 118 L 195 122 L 200 110 L 205 128 L 196 138 L 188 138 Q 184 150 172 158 L 178 178 L 168 178 L 162 162 L 130 162 L 124 178 L 114 178 L 118 158 Q 100 158 90 148 L 78 148 L 72 178 L 62 178 L 64 150 L 50 142 Q 35 138 30 130 Z M 152 50 Q 156 50 156 54 Q 156 58 152 58 Q 148 58 148 54 Q 148 50 152 50 Z" },
      { circle: { cx: 158, cy: 48, r: 3, fill: "#F5C518" } },
      { fill: "#F2EAD3", d: "M 138 60 L 142 66 L 146 60 L 150 66 L 154 60 L 158 66 L 162 60 L 158 58 L 154 56 L 150 58 L 146 56 L 142 58 Z" },
    ],
  },
  walk: {
    viewBox: "0 0 260 200",
    footRatio: 0.92,
    paths: [
      { fill: "#0E0E0C", d: "M 36 130 Q 31 100 46 88 Q 61 76 86 78 Q 91 60 106 55 Q 121 50 136 58 L 151 38 Q 161 28 171 32 Q 178 36 176 46 L 168 70 Q 181 78 188 92 Q 194 105 190 118 L 201 122 L 206 110 L 211 128 L 202 138 L 194 138 Q 190 150 178 158 L 196 178 L 184 180 L 168 162 L 138 162 L 130 184 L 116 178 L 124 158 Q 106 158 96 148 L 80 148 L 60 184 L 50 182 L 64 150 L 50 142 Q 41 138 36 130 Z" },
      { circle: { cx: 164, cy: 48, r: 3, fill: "#F5C518" } },
      { fill: "#F2EAD3", d: "M 144 60 L 148 66 L 152 60 L 156 66 L 160 60 L 164 66 L 168 60 L 164 58 L 160 56 L 156 58 L 152 56 L 148 58 Z" },
    ],
  },
  walk2: {
    viewBox: "0 0 260 200",
    footRatio: 0.92,
    mirror: "walk",
  },
  roar: {
    viewBox: "0 0 240 200",
    footRatio: 0.89,
    paths: [
      { fill: "#0E0E0C", d: "M 30 130 Q 25 100 40 88 Q 55 76 80 78 Q 85 60 100 55 Q 115 50 130 58 L 152 28 L 168 24 L 172 36 L 162 60 L 188 50 L 192 62 L 168 76 Q 178 86 182 100 Q 186 116 180 124 L 192 124 L 198 112 L 202 130 L 192 138 L 184 138 Q 180 150 168 158 L 174 178 L 164 178 L 158 162 L 130 162 L 124 178 L 114 178 L 118 158 Q 100 158 90 148 L 78 148 L 72 178 L 62 178 L 64 150 L 50 142 Q 35 138 30 130 Z" },
      { circle: { cx: 160, cy: 48, r: 3, fill: "#F5C518" } },
      { fill: "#F2EAD3", d: "M 132 64 L 136 76 L 140 64 L 144 78 L 150 64 L 156 78 L 160 64 L 165 76 L 168 64 L 158 60 L 150 62 L 142 60 Z" },
    ],
  },
  damage: {
    viewBox: "0 0 260 220",
    footRatio: 0.82,
    raw: '<g transform="rotate(-8 130 110)"><path fill="#0E0E0C" d="M 30 130 Q 25 100 40 88 Q 55 76 80 78 Q 85 60 100 55 Q 115 50 130 58 L 145 38 Q 155 28 165 32 Q 172 36 170 46 L 162 70 Q 175 78 182 92 Q 188 105 184 118 L 195 122 L 200 110 L 205 128 L 196 138 L 188 138 Q 184 150 172 158 L 178 178 L 168 178 L 162 162 L 130 162 L 124 178 L 114 178 L 118 158 Q 100 158 90 148 L 78 148 L 72 178 L 62 178 L 64 150 L 50 142 Q 35 138 30 130 Z"/><path stroke="#F5C518" stroke-width="2.5" stroke-linecap="round" d="M 148 44 L 158 54 M 158 44 L 148 54"/><path fill="#F2EAD3" d="M 138 60 L 142 66 L 146 60 L 150 66 L 154 60 L 158 66 L 162 60 L 158 58 L 154 56 L 150 58 L 146 56 L 142 58 Z"/></g><path fill="#B81E0E" d="M 200 30 L 206 42 L 218 36 L 212 48 L 224 54 L 210 56 L 212 70 L 202 60 L 192 68 L 196 56 L 184 50 L 196 48 Z"/><path fill="#F5C518" d="M 50 28 L 54 38 L 64 36 L 58 44 L 66 52 L 56 50 L 54 60 L 48 52 L 38 56 L 42 46 L 34 40 L 44 40 Z"/><path stroke="#0E0E0C" stroke-width="3" stroke-linecap="round" fill="none" d="M 230 90 L 244 86 M 228 110 L 242 112 M 22 70 L 10 64 M 18 90 L 6 92"/>',
  },
  duck: {
    viewBox: "0 0 280 140",
    footRatio: 1.0,
    paths: [
      { fill: "#0E0E0C", d: "M 20 90 Q 18 70 30 60 Q 50 50 80 54 Q 100 40 130 42 Q 160 44 190 50 L 230 38 Q 248 36 252 46 Q 254 54 246 60 L 220 70 Q 240 76 248 88 Q 252 100 246 108 L 256 110 L 260 102 L 264 116 L 254 122 L 244 122 Q 240 130 230 134 L 234 140 L 222 140 L 218 130 L 180 130 L 174 140 L 162 140 L 168 130 Q 140 130 120 122 L 100 122 L 92 140 L 80 140 L 84 122 L 60 116 Q 32 110 20 90 Z" },
      { circle: { cx: 238, cy: 50, r: 3, fill: "#F5C518" } },
      { fill: "#F2EAD3", d: "M 200 56 L 204 62 L 208 56 L 212 62 L 216 56 L 220 62 L 224 56 L 220 54 L 216 52 L 212 54 L 208 52 L 204 54 Z" },
    ],
  },
};

function renderPose(poseKey, heightPx) {
  const pose = POSES[poseKey];
  const sourceKey = pose.mirror ?? poseKey;
  const source = POSES[sourceKey];

  const [, , vbW, vbH] = source.viewBox.split(/\s+/).map(Number);
  const widthPx = Math.round(heightPx * (vbW / vbH));

  let inner = "";
  if (source.raw) {
    inner = source.raw;
  } else if (source.paths) {
    for (const item of source.paths) {
      if ("d" in item) {
        inner += `<path fill="${item.fill}" d="${item.d}"/>`;
      } else {
        const c = item.circle;
        inner += `<circle cx="${c.cx}" cy="${c.cy}" r="${c.r}" fill="${c.fill}"/>`;
      }
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${source.viewBox}" width="${widthPx}" height="${heightPx}">${inner}</svg>`;

  const canvas = document.createElement("canvas");
  const dpr = 2;
  canvas.width = widthPx * dpr;
  canvas.height = heightPx * dpr;
  canvas.styleW = widthPx;
  canvas.styleH = heightPx;
  canvas.footRatio = source.footRatio;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  return new Promise((resolve, reject) => {
    const img = new Image();
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      if (pose.mirror) {
        ctx.translate(widthPx, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(img, 0, 0, widthPx, heightPx);
      URL.revokeObjectURL(url);
      resolve(canvas);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

export async function buildSprites(heroHeight, duckHeight) {
  const [stand, walk, walk2, roar, damage, duck] = await Promise.all([
    renderPose("stand", heroHeight),
    renderPose("walk", heroHeight),
    renderPose("walk2", heroHeight),
    renderPose("roar", heroHeight),
    renderPose("damage", heroHeight * 1.1),
    renderPose("duck", duckHeight),
  ]);
  return { stand, walk, walk2, roar, damage, duck };
}
