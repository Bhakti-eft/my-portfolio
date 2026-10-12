import * as THREE from 'three';

/**
 * Procedural canvas textures for the 3D scenes — no image assets required.
 */

type Token = [text: string, color: string];

const C = {
  kw: '#2dd4bf',
  type: '#22d3ee',
  str: '#a5b4fc',
  txt: '#cbd5e1',
  dim: '#64748b',
};

/** A short, on-brand Dart snippet that "types" itself on the laptop screen. */
const CODE: Token[][] = [
  [['// developer.dart', C.dim]],
  [['class ', C.kw], ['Developer ', C.type], ['{', C.txt]],
  [['  final ', C.kw], ['name ', C.txt], ['= ', C.dim], ["'Bhakti Priya'", C.str], [';', C.txt]],
  [['  final ', C.kw], ['stack ', C.txt], ['= ', C.dim], ["['Flutter', 'Node.js',", C.str]],
  [["      'Django', 'ESP32']", C.str], [';', C.txt]],
  [],
  [['  Future', C.type], ['<', C.dim], ['void', C.kw], ['> ', C.dim], ['ship', C.type], ['() ', C.txt], ['async ', C.kw], ['{', C.txt]],
  [['    await ', C.kw], ['build', C.type], ['();', C.txt]],
  [['    await ', C.kw], ['test', C.type], ['();', C.txt]],
  [['    deploy', C.type], ['(stores: ', C.txt], ['[Play, AppStore]', C.str], [');', C.txt]],
  [['  }', C.txt]],
  [['}', C.txt]],
];

export const CODE_LENGTH = CODE.reduce((n, line) => n + line.reduce((m, [t]) => m + t.length, 0) + 1, 0);

export function drawCode(canvas: HTMLCanvasElement, visibleChars: number, showCaret: boolean) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const { width: w, height: h } = canvas;

  ctx.fillStyle = '#0b1324';
  ctx.fillRect(0, 0, w, h);

  // Window chrome
  ctx.fillStyle = '#111c33';
  ctx.fillRect(0, 0, w, 34);
  ['#f87171', '#fbbf24', '#34d399'].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(22 + i * 22, 17, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  const fontSize = 25;
  const lineH = 34;
  ctx.font = `500 ${fontSize}px "JetBrains Mono", ui-monospace, monospace`;
  ctx.textBaseline = 'top';

  let budget = visibleChars;
  let caretX = 60;
  let caretY = 52;

  CODE.forEach((line, i) => {
    const y = 52 + i * lineH;
    ctx.fillStyle = '#334155';
    ctx.fillText(String(i + 1).padStart(2, ' '), 12, y);

    let x = 60;
    const typingThisLine = budget > 0;
    for (const [text, color] of line) {
      if (budget <= 0) break;
      const part = text.slice(0, budget);
      budget -= part.length;
      ctx.fillStyle = color;
      ctx.fillText(part, x, y);
      x += ctx.measureText(part).width;
    }
    if (typingThisLine) {
      caretX = x;
      caretY = y;
    }
    if (budget > 0) {
      budget -= 1; // newline: caret moves to the start of the next line
      caretX = 60;
      caretY = y + lineH;
    }
  });

  if (showCaret) {
    ctx.fillStyle = C.kw;
    ctx.fillRect(caretX + 2, caretY, 12, fontSize + 2);
  }
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** A simple, abstract mobile app UI for the phone screen. */
export function makePhoneTexture(accent: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0b1324';
  ctx.fillRect(0, 0, 256, 512);

  // Header
  ctx.fillStyle = '#e2e8f0';
  roundRect(ctx, 20, 40, 120, 14, 7);
  ctx.fill();
  ctx.fillStyle = '#475569';
  roundRect(ctx, 20, 64, 80, 10, 5);
  ctx.fill();

  // Hero card with gradient
  const g = ctx.createLinearGradient(20, 92, 236, 222);
  g.addColorStop(0, accent);
  g.addColorStop(1, '#0e7490');
  ctx.fillStyle = g;
  roundRect(ctx, 20, 92, 216, 130, 16);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  roundRect(ctx, 36, 180, 90, 12, 6);
  ctx.fill();

  // List rows
  for (let i = 0; i < 4; i++) {
    const y = 244 + i * 54;
    ctx.fillStyle = '#16213a';
    roundRect(ctx, 20, y, 216, 44, 12);
    ctx.fill();
    ctx.fillStyle = i === 0 ? accent : '#334155';
    roundRect(ctx, 30, y + 8, 28, 28, 8);
    ctx.fill();
    ctx.fillStyle = '#94a3b8';
    roundRect(ctx, 68, y + 12, 110 - i * 12, 8, 4);
    ctx.fill();
    ctx.fillStyle = '#475569';
    roundRect(ctx, 68, y + 26, 70, 7, 3.5);
    ctx.fill();
  }

  // CTA button
  ctx.fillStyle = accent;
  roundRect(ctx, 20, 464, 216, 32, 16);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** White glyph on transparent background, tinted by the material colour. */
export function makeGlyphTexture(glyph: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 42px "JetBrains Mono", ui-monospace, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(glyph, 32, 34);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
