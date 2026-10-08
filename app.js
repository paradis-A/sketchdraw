(() => {
'use strict';

/* ============================== helpers ============================== */
const $ = (s, r = document) => r.querySelector(s);
const uid = () => Math.random().toString(36).slice(2, 9);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const f = n => +n.toFixed(2);
const clone = o => JSON.parse(JSON.stringify(o));
const dpr = () => window.devicePixelRatio || 1;

const ICONS = {
  select: '<path d="M5 3l14 7-6 2-2 6z"/>',
  hand: '<path d="M8 13V6a1.5 1.5 0 013 0v5M11 11V4.5a1.5 1.5 0 013 0V11M14 11V6a1.5 1.5 0 013 0v7M8 13l-1.5-2a1.5 1.5 0 00-2.4 1.8L8 19a5 5 0 004 2h1a5 5 0 005-5v-3"/>',
  rect: '<path d="M4 6h16v12H4z" stroke-linejoin="miter"/>',
  square: '<path d="M5 5h14v14H5z" stroke-linejoin="miter"/>',
  rounded: '<rect x="4" y="6" width="16" height="12" rx="4"/>',
  oval: '<ellipse cx="12" cy="12" rx="9" ry="5.5"/>',
  circle: '<circle cx="12" cy="12" r="8"/>',
  diamond: '<path d="M12 3l9 9-9 9-9-9z"/>',
  triangle: '<path d="M12 4l9 16H3z"/>',
  hexagon: '<path d="M7 4h10l5 8-5 8H7l-5-8z"/>',
  star: '<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5l-5.4 3 1.2-6L3.3 9.3l6.1-.7z"/>',
  line: '<path d="M5 19L19 5"/>',
  arrow: '<path d="M5 19L19 5M10 5h9v9"/>',
  pen: '<circle cx="5.5" cy="18.5" r="2"/><circle cx="18.5" cy="5.5" r="2"/><path d="M7.5 18.5C14 18.5 10 5.5 16.5 5.5"/>',
  brush: '<path d="M3 16c3-8 5 3 8-3s5-1 9-7"/>',
  text: '<path d="M5 6V4h14v2M12 4v16M9 20h6"/>',
  bucket: '<path d="M4 12l8-8 8 8-7 7a2 2 0 01-2.8 0L4 14.8zM4 12h16"/><path d="M21 15c0 1.5-1.2 2-1.2 3a1.2 1.2 0 002.4 0c0-1-1.2-1.5-1.2-3z"/>',
  picker: '<path d="M14 6l4 4M17 3l4 4-3 3-4-4zM13 7l-9 9v4h4l9-9"/>',
  eraser: '<path d="M8 20h12M5 15l9-9 5 5-6 6H8z"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
  unlock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 017.5-2"/>',
  undo: '<path d="M9 6L4 11l5 5M4 11h10a5 5 0 010 10h-3"/>',
  redo: '<path d="M15 6l5 5-5 5M20 11H10a5 5 0 000 10h3"/>',
  open: '<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
  save: '<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff: '<path d="M3 3l18 18M10 6.2A9 9 0 0112 6c6 0 10 6 10 6a17 17 0 01-3.2 3.8M6.5 7.5A17 17 0 002 12s4 7 10 7a9.7 9.7 0 004-1"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  merge: '<path d="M6 4v6a6 6 0 006 6 6 6 0 006-6V4M12 16v5"/>',
  grid: '<path d="M4 4h16v16H4zM4 12h16M12 4v16"/>',
  fit: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  link: '<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>',
  unlink: '<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1M3 3l18 18"/>',
  forward: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  backward: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  tofront: '<path d="M5 4h14M12 20V9M6 14l6-6 6 6"/>',
  toback: '<path d="M5 20h14M12 4v11M6 10l6 6 6-6"/>',
  bg: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 12h8V4M12 20v-8h8"/>',
  selonly: '<path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3"/><rect x="9" y="9" width="6" height="6"/>',
  alignl: '<path d="M4 6h16M4 12h10M4 18h14"/>',
  alignc: '<path d="M4 6h16M7 12h10M5 18h14"/>',
  alignr: '<path d="M4 6h16M10 12h10M6 18h14"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M21 16l-5-5-8 9"/>',
  floppy: '<path d="M5 3h11l4 4v13a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M8 3v5h7V3M7 21v-7h10v7"/>',
  crop: '<path d="M6 2v14a2 2 0 002 2h14M2 6h14a2 2 0 012 2v14"/>',
  tolayer: '<path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5"/>',
};
const icon = (n, size = 20) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[n]}</svg>`;

const imgCache = new Map();
function getImg(id) {
  let im = imgCache.get(id);
  if (!im) {
    im = new Image();
    im.onload = () => redraw();
    im.src = (S.images && S.images[id]) || '';
    imgCache.set(id, im);
  }
  return im.complete && im.naturalWidth ? im : null;
}
const FONTS = {
  sans: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
  serif: 'Georgia, "Times New Roman", serif',
  mono: 'ui-monospace, Menlo, Consolas, monospace',
  hand: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
};
const PALETTE = ['#1e1e1e', '#868e96', '#ffffff', '#e03131', '#f76707', '#f59f00', '#2f9e44', '#0ca678', '#1971c2', '#4263eb',
  '#7048e8', '#c2255c', '#8d5524', '#ffc9c9', '#ffec99', '#b2f2bb', '#a5d8ff', '#d0bfff'];

/* ============================== state ============================== */
const newLayer = name => ({ id: uid(), name, visible: true, locked: false, opacity: 100, shapes: [] });

const S = {
  doc: { layers: [], active: null },
  images: {},
  sel: new Set(),
  tool: 'select',
  toolLock: false,
  cam: { x: 0, y: 0, z: 1 },
  style: { fill: '#4263eb', stroke: '#4263eb', link: true, target: 'fill', sw: 2, dash: 'solid', op: 100, rr: 16, join: 'miter', fs: 28, font: 'sans', align: 'left' },
  grid: { on: false, size: 16 },
  exp: { bg: true, scale: 2, pad: 16, selOnly: false },
  drag: null,
  draft: null,
  editing: null,
  clip: null,
  space: false,
};
{
  const l = newLayer('Layer 1');
  S.doc.layers.push(l);
  S.doc.active = l.id;
}

const TOOLS = [
  { id: 'select', icon: 'select', key: 'v', name: 'Select / move' },
  { id: 'hand', icon: 'hand', key: 'h', name: 'Pan' },
  { gap: 1 },
  { id: 'rect', icon: 'rect', type: 'rect', key: 'r', name: 'Rectangle (sharp corners)' },
  { id: 'square', label: 'Square', icon: 'square', type: 'rect', eq: 1, key: 's', name: 'Square (sharp corners)' },
  { id: 'rounded', label: 'Rounded rect', icon: 'rounded', type: 'rect', round: 1, key: 'u', name: 'Rounded rectangle' },
  { id: 'oval', icon: 'oval', type: 'ellipse', key: 'o', name: 'Oval / ellipse' },
  { id: 'circle', label: 'Circle', icon: 'circle', type: 'ellipse', eq: 1, key: 'c', name: 'Circle' },
  { id: 'diamond', icon: 'diamond', type: 'diamond', key: 'd', name: 'Diamond' },
  { id: 'triangle', icon: 'triangle', type: 'triangle', key: 'g', name: 'Triangle' },
  { id: 'hexagon', icon: 'hexagon', type: 'hexagon', key: 'x', name: 'Hexagon' },
  { id: 'star', icon: 'star', type: 'star', key: 'y', name: 'Star' },
  { gap: 1 },
  { id: 'line', icon: 'line', type: 'line', key: 'l', name: 'Line' },
  { id: 'arrow', icon: 'arrow', type: 'arrow', key: 'a', name: 'Arrow' },
  { id: 'pen', icon: 'pen', key: 'p', name: 'Path / pen (click = corner, drag = curve)' },
  { id: 'brush', icon: 'brush', key: 'b', name: 'Freehand brush' },
  { id: 'text', icon: 'text', key: 't', name: 'Text' },
  { id: 'image', icon: 'image', key: 'm', name: 'Insert image…', action: 'image' },
  { gap: 1 },
  { id: 'fill', icon: 'bucket', key: 'f', name: 'Fill bucket (click a shape)' },
  { id: 'picker', icon: 'picker', key: 'i', name: 'Color picker (Alt = stroke)' },
  { id: 'eraser', icon: 'eraser', key: 'e', name: 'Eraser' },
];
const HINTS = {
  pen: 'Click for corners, drag for curves · Enter / double-click to finish · click the first point to close',
  brush: 'Drag to draw · closing the loop fills it',
  fill: 'Click a shape to fill it (open paths get closed)',
  picker: 'Click a shape to pick its color · Alt = pick into stroke',
  eraser: 'Click or drag over shapes to delete them',
  text: 'Click to type · Esc to finish',
  square: 'Drag to draw a perfect square',
  circle: 'Drag to draw a perfect circle',
  oval: 'Drag to draw an oval · Alt = from center',
  rect: 'Drag to draw a sharp rectangle · Shift = square · Alt = from center',
};

/* ============================== geometry ============================== */
const BOX = new Set(['rect', 'ellipse', 'diamond', 'triangle', 'hexagon', 'star', 'image']);
const PTS = new Set(['line', 'arrow', 'free']);
const ASC = 0.92;
const mctx = document.createElement('canvas').getContext('2d');

const fontStr = s => `${s.fs}px ${FONTS[s.font] || FONTS.sans}`;
// lays out a text shape (s.text, optional box width s.w) or a shape label (s.t) with wrapping at maxW (0 = none)
function textLayout(s, maxW) {
  mctx.font = fontStr(s);
  const lines = [];
  for (const para of String(s.type === 'text' ? s.text : s.t).split('\n')) {
    if (!maxW) { lines.push(para); continue; }
    let cur = '';
    for (const word of para.split(' ')) {
      const test = cur ? cur + ' ' + word : word;
      if (cur && mctx.measureText(test).width > maxW) { lines.push(cur); cur = word; } else cur = test;
    }
    lines.push(cur);
  }
  const lw = lines.map(l => mctx.measureText(l).width);
  return { lines, lw, w: Math.max(4, ...lw), h: lines.length * s.fs * 1.25 };
}
const textMetrics = s => textLayout(s, s.w || 0);
const LABEL_FIT = { image: 1, rect: 1, ellipse: 0.75, diamond: 0.55, triangle: 0.5, hexagon: 0.8, star: 0.5 };
function labelGeom(s) {
  const b = bounds(s), cx = b.x + b.w / 2, cy = b.y + b.h / 2;
  const fit = BOX.has(s.type) ? Math.max(24, b.w * LABEL_FIT[s.type] - 12) : 0;
  const m = textLayout(s, fit);
  const bw = fit || m.w;
  return { m, bw, x: cx - bw / 2, y: cy - m.h / 2, cx, cy, fit };
}
function labelColor(s) {
  if (s.tc) return s.tc;
  if (fillable(s) && s.fill && /^#[0-9a-f]{6}$/i.test(s.fill)) {
    const n = parseInt(s.fill.slice(1), 16);
    return ((n >> 16) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114) / 255 > 0.6 ? '#1e1e1e' : '#ffffff';
  }
  return s.stroke || '#1e1e1e';
}
let hideLabelId = null;
function paintText(ctx, m, x, y, bw, al, fs, halo) {
  ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
  m.lines.forEach((l, i) => {
    const off = al === 'center' ? (bw - m.lw[i]) / 2 : al === 'right' ? bw - m.lw[i] : 0;
    const ty = y + i * fs * 1.25 + fs * ASC + fs * 0.1;
    if (halo) ctx.strokeText(l, x + off, ty); else ctx.fillText(l, x + off, ty);
  });
}
const fillable = s => (BOX.has(s.type) && s.type !== 'image') || ((s.type === 'free' || s.type === 'path') && s.closed);

function nodesD(nodes, closed) {
  let d = `M${f(nodes[0].x)} ${f(nodes[0].y)}`;
  const seg = (a, b) => (!a.ox && !a.oy && !b.ox && !b.oy)
    ? `L${f(b.x)} ${f(b.y)}`
    : `C${f(a.x + (a.ox || 0))} ${f(a.y + (a.oy || 0))} ${f(b.x - (b.ox || 0))} ${f(b.y - (b.oy || 0))} ${f(b.x)} ${f(b.y)}`;
  for (let i = 1; i < nodes.length; i++) d += seg(nodes[i - 1], nodes[i]);
  if (closed && nodes.length > 2) d += seg(nodes[nodes.length - 1], nodes[0]) + 'Z';
  return d;
}

function pathD(s) {
  const { x, y, w, h } = s;
  switch (s.type) {
    case 'image':
    case 'rect': {
      const r = Math.min(s.r || 0, w / 2, h / 2);
      if (r <= 0.01) return `M${f(x)} ${f(y)}h${f(w)}v${f(h)}h${f(-w)}z`;
      return `M${f(x + r)} ${f(y)}H${f(x + w - r)}A${f(r)} ${f(r)} 0 0 1 ${f(x + w)} ${f(y + r)}V${f(y + h - r)}A${f(r)} ${f(r)} 0 0 1 ${f(x + w - r)} ${f(y + h)}H${f(x + r)}A${f(r)} ${f(r)} 0 0 1 ${f(x)} ${f(y + h - r)}V${f(y + r)}A${f(r)} ${f(r)} 0 0 1 ${f(x + r)} ${f(y)}Z`;
    }
    case 'ellipse': {
      const rx = w / 2, ry = h / 2, cy = y + ry;
      return `M${f(x)} ${f(cy)}A${f(rx)} ${f(ry)} 0 1 0 ${f(x + w)} ${f(cy)}A${f(rx)} ${f(ry)} 0 1 0 ${f(x)} ${f(cy)}Z`;
    }
    case 'diamond':
      return `M${f(x + w / 2)} ${f(y)}L${f(x + w)} ${f(y + h / 2)}L${f(x + w / 2)} ${f(y + h)}L${f(x)} ${f(y + h / 2)}Z`;
    case 'triangle':
      return `M${f(x + w / 2)} ${f(y)}L${f(x + w)} ${f(y + h)}L${f(x)} ${f(y + h)}Z`;
    case 'hexagon': {
      const p = [[.25, 0], [.75, 0], [1, .5], [.75, 1], [.25, 1], [0, .5]];
      return 'M' + p.map(([a, b]) => `${f(x + a * w)} ${f(y + b * h)}`).join('L') + 'Z';
    }
    case 'star': {
      const pts = [];
      for (let i = 0; i < 10; i++) {
        const a = -Math.PI / 2 + i * Math.PI / 5, k = i % 2 ? 0.45 : 1;
        pts.push(`${f(x + w / 2 + Math.cos(a) * k * w / 2)} ${f(y + h / 2 + Math.sin(a) * k * h / 2)}`);
      }
      return 'M' + pts.join('L') + 'Z';
    }
    case 'line': {
      const [a, b] = s.pts;
      return `M${f(a.x)} ${f(a.y)}L${f(b.x)} ${f(b.y)}`;
    }
    case 'arrow': {
      const [a, b] = s.pts;
      const ang = Math.atan2(b.y - a.y, b.x - a.x), L = Math.max(12, s.sw * 4);
      const h1 = [b.x - L * Math.cos(ang - .5), b.y - L * Math.sin(ang - .5)];
      const h2 = [b.x - L * Math.cos(ang + .5), b.y - L * Math.sin(ang + .5)];
      return `M${f(a.x)} ${f(a.y)}L${f(b.x)} ${f(b.y)}M${f(h1[0])} ${f(h1[1])}L${f(b.x)} ${f(b.y)}L${f(h2[0])} ${f(h2[1])}`;
    }
    case 'free': {
      const p = s.pts;
      if (p.length === 1) return `M${f(p[0].x)} ${f(p[0].y)}l0.01 0`;
      if (p.length === 2) return `M${f(p[0].x)} ${f(p[0].y)}L${f(p[1].x)} ${f(p[1].y)}`;
      let d = `M${f(p[0].x)} ${f(p[0].y)}`;
      for (let i = 1; i < p.length - 1; i++) {
        d += `Q${f(p[i].x)} ${f(p[i].y)} ${f((p[i].x + p[i + 1].x) / 2)} ${f((p[i].y + p[i + 1].y) / 2)}`;
      }
      d += `L${f(p[p.length - 1].x)} ${f(p[p.length - 1].y)}`;
      return s.closed ? d + 'Z' : d;
    }
    case 'path':
      return nodesD(s.nodes, s.closed);
  }
  return '';
}

function bounds(s) {
  if (s.type === 'text') { if (s.w) return { x: s.x, y: s.y, w: s.w, h: s.h }; const m = textMetrics(s); return { x: s.x, y: s.y, w: m.w, h: m.h }; }
  if (BOX.has(s.type)) return { x: s.x, y: s.y, w: s.w, h: s.h };
  let pts = s.pts;
  if (s.type === 'path') {
    pts = [];
    const n = s.nodes, cnt = s.closed ? n.length : n.length - 1;
    for (let i = 0; i < cnt; i++) {
      const a = n[i], b = n[(i + 1) % n.length];
      for (let t = 0; t <= 1; t += 1 / 16) {
        const u = 1 - t;
        const c1x = a.x + (a.ox || 0), c1y = a.y + (a.oy || 0), c2x = b.x - (b.ox || 0), c2y = b.y - (b.oy || 0);
        pts.push({
          x: u * u * u * a.x + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * b.x,
          y: u * u * u * a.y + 3 * u * u * t * c1y + 3 * u * t * t * c2y + t * t * t * b.y,
        });
      }
    }
  }
  let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
  for (const p of pts) { x1 = Math.min(x1, p.x); y1 = Math.min(y1, p.y); x2 = Math.max(x2, p.x); y2 = Math.max(y2, p.y); }
  return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
}
function strokeBounds(s) {
  const b = bounds(s);
  if (s.type === 'text') return rotBox(b, s.a || 0);
  const p = (s.stroke && s.sw && s.type !== 'image' ? s.sw * 0.75 : 0) + (s.type === 'arrow' ? Math.max(12, s.sw * 4) * 0.4 : 0);
  return rotBox({ x: b.x - p, y: b.y - p, w: b.w + p * 2, h: b.h + p * 2 }, s.a || 0);
}
const unionB = list => {
  let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
  for (const b of list) { x1 = Math.min(x1, b.x); y1 = Math.min(y1, b.y); x2 = Math.max(x2, b.x + b.w); y2 = Math.max(y2, b.y + b.h); }
  return list.length ? { x: x1, y: y1, w: x2 - x1, h: y2 - y1 } : null;
};

const rotAbout = (x, y, cx, cy, a) => {
  const c = Math.cos(a), si = Math.sin(a), dx = x - cx, dy = y - cy;
  return { x: cx + dx * c - dy * si, y: cy + dx * si + dy * c };
};
const centerOf = b => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });
function rotBox(b, a) { // axis-aligned box around b rotated by a about its center
  if (!a) return b;
  const c = centerOf(b);
  const pts = [[b.x, b.y], [b.x + b.w, b.y], [b.x + b.w, b.y + b.h], [b.x, b.y + b.h]].map(([x, y]) => rotAbout(x, y, c.x, c.y, a));
  return unionB(pts.map(p => ({ x: p.x, y: p.y, w: 0, h: 0 })));
}
const aabb = s => rotBox(bounds(s), s.a || 0);
function toLocal(s, p) { // world point -> the shape's unrotated frame
  if (!s.a) return p;
  const c = centerOf(bounds(s));
  return rotAbout(p.x, p.y, c.x, c.y, -s.a);
}
function bakePath(s) { // fold a path's rotation into its nodes so they can be edited
  if (!s.a) return;
  const c = centerOf(bounds(s)), co = Math.cos(s.a), si = Math.sin(s.a);
  for (const n of s.nodes) {
    const p = rotAbout(n.x, n.y, c.x, c.y, s.a);
    const ox = (n.ox || 0) * co - (n.oy || 0) * si, oy = (n.ox || 0) * si + (n.oy || 0) * co;
    n.x = p.x; n.y = p.y; n.ox = ox; n.oy = oy;
  }
  s.a = 0;
}

function moveShape(s, dx, dy) {
  if (BOX.has(s.type) || s.type === 'text') { s.x += dx; s.y += dy; }
  else if (s.pts) s.pts.forEach(p => { p.x += dx; p.y += dy; });
  else if (s.nodes) s.nodes.forEach(p => { p.x += dx; p.y += dy; });
}
function mapShape(s, ob, nb) {
  const sx = ob.w ? nb.w / ob.w : 1, sy = ob.h ? nb.h / ob.h : 1;
  const mx = v => nb.x + (v - ob.x) * sx, my = v => nb.y + (v - ob.y) * sy;
  if (s.type === 'text') { s.x = mx(s.x); s.y = my(s.y); s.fs = clamp(s.fs * sy, 4, 600); if (s.w) { s.w *= sx; s.h *= sy; } }
  else if (BOX.has(s.type)) { s.x = mx(s.x); s.y = my(s.y); s.w *= sx; s.h *= sy; if (s.r) s.r *= Math.min(sx, sy); }
  else if (s.pts) s.pts.forEach(p => { p.x = mx(p.x); p.y = my(p.y); });
  else if (s.nodes) s.nodes.forEach(p => { p.x = mx(p.x); p.y = my(p.y); p.ox = (p.ox || 0) * sx; p.oy = (p.oy || 0) * sy; });
}

/* ============================== drawing ============================== */
const dashArr = s => s.dash === 'dashed' ? [Math.max(s.sw, 2) * 3, Math.max(s.sw, 2) * 2]
  : s.dash === 'dotted' ? [0.01, Math.max(s.sw, 2) * 2] : [];
const capOf = s => (s.dash === 'dotted' || PTS.has(s.type) || s.type === 'path') ? 'round' : 'butt';
const joinOf = s => (PTS.has(s.type) || s.type === 'path') ? 'round' : (s.join || 'miter');

function drawShape(ctx, s, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha * (s.op ?? 100) / 100;
  if (s.a) { const c = centerOf(bounds(s)); ctx.translate(c.x, c.y); ctx.rotate(s.a); ctx.translate(-c.x, -c.y); }
  if (s.type === 'text') {
    const m = textMetrics(s);
    ctx.font = fontStr(s);
    ctx.fillStyle = s.fill || s.stroke || '#1e1e1e';
    paintText(ctx, m, s.x, s.y, s.w || m.w, s.al || 'left', s.fs);
    ctx.restore();
    return;
  }
  const p = new Path2D(pathD(s));
  if (s.type === 'image') {
    const im = getImg(s.imgId);
    if (im) {
      ctx.imageSmoothingEnabled = !s.px;
      const c = s.c, nw = im.naturalWidth, nh = im.naturalHeight, r = v => (s.px ? Math.round(v) : v);
      if (c) ctx.drawImage(im, r(c.x * nw), r(c.y * nh), Math.max(1, r(c.w * nw)), Math.max(1, r(c.h * nh)), s.x, s.y, s.w, s.h);
      else ctx.drawImage(im, s.x, s.y, s.w, s.h);
    }
    else { ctx.fillStyle = '#eceef2'; ctx.fill(p); }
  }
  if (s.fill && fillable(s)) { ctx.fillStyle = s.fill; ctx.fill(p); }
  if (s.stroke && s.sw > 0 && s.type !== 'image') {
    ctx.strokeStyle = s.stroke;
    ctx.lineWidth = s.sw;
    ctx.lineCap = capOf(s);
    ctx.lineJoin = joinOf(s);
    ctx.miterLimit = 10;
    ctx.setLineDash(dashArr(s));
    ctx.stroke(p);
  }
  if (s.t && s.id !== hideLabelId) {
    const g = labelGeom(s);
    ctx.setLineDash([]); ctx.font = fontStr(s); ctx.fillStyle = labelColor(s);
    if (!fillable(s)) { // keep text readable on top of a line
      ctx.save(); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = s.fs * 0.3; ctx.lineJoin = 'round';
      paintText(ctx, g.m, g.x, g.y, g.bw, s.al || 'center', s.fs, true);
      ctx.restore();
    }
    paintText(ctx, g.m, g.x, g.y, g.bw, s.al || 'center', s.fs);
  }
  ctx.restore();
}
const drawShapes = (ctx, shapes, alpha = 1, skip) => { for (const s of shapes) if (s.id !== skip) drawShape(ctx, s, alpha); };

/* ============================== document helpers ============================== */
const LABELS = { image: 'Image', rect: 'Rectangle', ellipse: 'Oval', diamond: 'Diamond', triangle: 'Triangle', hexagon: 'Hexagon', star: 'Star', line: 'Line', arrow: 'Arrow', free: 'Brush', path: 'Path', text: 'Text' };
function layerLabel(s, tool) {
  let base = (tool && tool.label) || LABELS[s.type] || 'Shape';
  if (s.type === 'text') base = 'Text';
  const n = S.doc.layers.filter(l => l.name.startsWith(base + ' ')).length + 1;
  return `${base} ${n}`;
}
// every element lives on its own layer, inserted above the active one (like Photoshop)
function addShape(s, tool, below) {
  const empty = !below && activeLayer().shapes.length === 0 ? activeLayer() : null;
  if (empty) { empty.name = layerLabel(s, tool); empty.shapes.push(s); return empty; }
  const l = newLayer(layerLabel(s, tool));
  l.shapes.push(s);
  const at = below ? S.doc.layers.indexOf(below) + 1 : S.doc.layers.indexOf(activeLayer()) + 1;
  S.doc.layers.splice(at, 0, l);
  S.doc.active = l.id;
  return l;
}
function removeShape(s) {
  const o = findShape(s.id); if (!o) return;
  o.l.shapes.splice(o.l.shapes.indexOf(s), 1);
  S.sel.delete(s.id);
  if (!o.l.shapes.length) {
    const i = S.doc.layers.indexOf(o.l);
    S.doc.layers.splice(i, 1);
    if (!S.doc.layers.length) S.doc.layers.push(newLayer('Layer 1'));
    if (S.doc.active === o.l.id) S.doc.active = S.doc.layers[Math.max(0, i - 1)].id;
  }
}
const layerById = id => S.doc.layers.find(l => l.id === id);
const activeLayer = () => layerById(S.doc.active) || S.doc.layers[S.doc.layers.length - 1];
function findShape(id) {
  for (const l of S.doc.layers) { const s = l.shapes.find(x => x.id === id); if (s) return { s, l }; }
  return null;
}
const selList = () => [...S.sel].map(findShape).filter(Boolean);
const selShapes = () => selList().map(o => o.s);

const hitCtx = document.createElement('canvas').getContext('2d');
function hitShape(s, x, y, tol) {
  if (s.a) { const q = toLocal(s, { x, y }); x = q.x; y = q.y; }
  if (s.type === 'text') { const b = bounds(s); return x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h; }
  const p = new Path2D(pathD(s));
  if ((s.type === 'image' || (s.fill && fillable(s))) && hitCtx.isPointInPath(p, x, y)) return true;
  hitCtx.lineWidth = Math.max(s.sw || 0, tol * 2);
  return hitCtx.isPointInStroke(p, x, y);
}
function pickAt(x, y, includeLocked = false) {
  const tol = 6 / S.cam.z;
  for (let i = S.doc.layers.length - 1; i >= 0; i--) {
    const l = S.doc.layers[i];
    if (!l.visible || (l.locked && !includeLocked)) continue;
    for (let j = l.shapes.length - 1; j >= 0; j--) if (hitShape(l.shapes[j], x, y, tol)) return { s: l.shapes[j], l };
  }
  return null;
}

/* history / persistence */
const hist = { stack: [], i: -1 };
const snapshot = () => JSON.stringify(S.doc);
let saveTimer = 0;
function persist() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    const base = { doc: S.doc, style: S.style, exp: S.exp, grid: S.grid, cam: S.cam };
    try {
      localStorage.setItem('sketchdraw:v1', JSON.stringify({ ...base, images: usedImages() }));
    } catch (e) {
      try { localStorage.setItem('sketchdraw:v1', JSON.stringify(base)); } catch (e2) { /* storage unavailable */ }
    }
  }, 400);
}
function commit() {
  const j = snapshot();
  if (hist.stack[hist.i] !== j) {
    hist.stack.length = hist.i + 1;
    hist.stack.push(j);
    if (hist.stack.length > 150) hist.stack.shift();
    hist.i = hist.stack.length - 1;
  }
  changed();
}
function restore(j) {
  S.crop = null;
  S.doc = JSON.parse(j);
  if (!layerById(S.doc.active)) S.doc.active = S.doc.layers[S.doc.layers.length - 1].id;
  for (const id of [...S.sel]) if (!findShape(id)) S.sel.delete(id);
  changed();
}
const undo = () => { if (hist.i > 0) { hist.i--; restore(hist.stack[hist.i]); } };
const redo = () => { if (hist.i < hist.stack.length - 1) { hist.i++; restore(hist.stack[hist.i]); } };

let dirty = { main: true, pv: true };
const redraw = (pv = true) => { dirty.main = true; if (pv) dirty.pv = true; };
function changed() {
  redraw();
  refreshLayers();
  refreshProps();
  updateTopbar();
  persist();
}

/* ============================== canvas setup ============================== */
const board = $('#board'), ctx = board.getContext('2d');
const stage = $('#stage');
const view = { w: 0, h: 0 };
function resize() {
  const r = stage.getBoundingClientRect();
  view.w = r.width; view.h = r.height;
  board.width = Math.round(r.width * dpr()); board.height = Math.round(r.height * dpr());
  redraw();
}
new ResizeObserver(resize).observe(stage);

const toWorld = (px, py) => ({ x: (px - S.cam.x) / S.cam.z, y: (py - S.cam.y) / S.cam.z });
const toScreen = (x, y) => ({ x: x * S.cam.z + S.cam.x, y: y * S.cam.z + S.cam.y });
function evPos(e) { const r = board.getBoundingClientRect(); return { sx: e.clientX - r.left, sy: e.clientY - r.top }; }
const snap = v => S.grid.on ? Math.round(v / S.grid.size) * S.grid.size : v;

function setZoom(z, cx = view.w / 2, cy = view.h / 2) {
  z = clamp(z, 0.05, 32);
  const w = toWorld(cx, cy);
  S.cam.z = z; S.cam.x = cx - w.x * z; S.cam.y = cy - w.y * z;
  redraw(false); updateZoom(); persist();
}
function fitContent() {
  const b = unionB(S.doc.layers.filter(l => l.visible).flatMap(l => l.shapes.map(strokeBounds)));
  if (!b) { S.cam = { x: view.w / 2, y: view.h / 2, z: 1 }; }
  else {
    const m = 110;
    const z = clamp(Math.min((view.w - m * 2 - 220) / Math.max(b.w, 1), (view.h - m * 2) / Math.max(b.h, 1), 2), 0.05, 32);
    S.cam.z = z;
    S.cam.x = (view.w + 220) / 2 - (b.x + b.w / 2) * z;
    S.cam.y = view.h / 2 - (b.y + b.h / 2) * z;
  }
  redraw(false); updateZoom(); persist();
}

/* ============================== main render ============================== */
function handlesFor(bb) {
  const p = 6 / S.cam.z;
  const x1 = bb.x - p, y1 = bb.y - p, x2 = bb.x + bb.w + p, y2 = bb.y + bb.h + p, mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  return [['nw', x1, y1], ['n', mx, y1], ['ne', x2, y1], ['e', x2, my], ['se', x2, y2], ['s', mx, y2], ['sw', x1, y2], ['w', x1, my]]
    .map(([n, x, y]) => ({ n, x, y }));
}
const HANDLE_CURSOR = { nw: 'nwse-resize', se: 'nwse-resize', ne: 'nesw-resize', sw: 'nesw-resize', n: 'ns-resize', s: 'ns-resize', e: 'ew-resize', w: 'ew-resize' };

// frame of the current selection: one shape keeps its own rotation, several share an axis-aligned box
function selFrame() {
  const sel = selShapes(); if (!sel.length) return null;
  if (sel.length === 1) { const b = bounds(sel[0]), c = centerOf(b); return { ob: b, a: sel[0].a || 0, cx: c.x, cy: c.y, single: sel[0] }; }
  const ob = unionB(sel.map(aabb)), c = centerOf(ob);
  return { ob, a: 0, cx: c.x, cy: c.y, single: null };
}
const rotHandlePos = fr => rotAbout(fr.cx, fr.ob.y - 6 / S.cam.z - 26 / S.cam.z, fr.cx, fr.cy, fr.a);

/* ---- non-destructive image crop: the crop window moves/resizes over the full source image ---- */
const CROP_MIN = 4;
function cropLocal(wp) { const c = S.crop; return c.a ? rotAbout(wp.x, wp.y, c.c0.x, c.c0.y, -c.a) : wp; }
function cropHandles(w) {
  const mx = w.x + w.w / 2, my = w.y + w.h / 2, x2 = w.x + w.w, y2 = w.y + w.h;
  return [['nw', w.x, w.y], ['n', mx, w.y], ['ne', x2, w.y], ['e', x2, my], ['se', x2, y2], ['s', mx, y2], ['sw', w.x, y2], ['w', w.x, my]].map(([n, x, y]) => ({ n, x, y }));
}
function enterCrop(s) {
  if (S.editing) commitText();
  const c = s.c || { x: 0, y: 0, w: 1, h: 1 }, fw = s.w / c.w, fh = s.h / c.h;
  S.crop = { s, a: s.a || 0, c0: centerOf(bounds(s)), win: { x: s.x, y: s.y, w: s.w, h: s.h }, full: { x: s.x - c.x * fw, y: s.y - c.y * fh, w: fw, h: fh } };
  S.sel = new Set([s.id]); S.drag = null;
  board.style.cursor = 'default';
  const h = $('#hint'); h.textContent = 'Drag the handles to crop · drag inside to move the window · Enter to apply · Esc to cancel';
  h.classList.add('show'); clearTimeout(h._t); h._t = setTimeout(() => h.classList.remove('show'), 5000);
  redraw(false);
}
function setImageRect(s, r, c0, a) { // place the displayed rect r (local frame) and keep rotation about the old center consistent
  s.x = r.x; s.y = r.y; s.w = r.w; s.h = r.h;
  if (a) { const c1 = centerOf(r), p = rotAbout(c1.x, c1.y, c0.x, c0.y, a); moveShape(s, p.x - c1.x, p.y - c1.y); }
}
function commitCrop() {
  const k = S.crop; if (!k) return;
  S.crop = null;
  const { win, full, s } = k;
  s.c = { x: (win.x - full.x) / full.w, y: (win.y - full.y) / full.h, w: win.w / full.w, h: win.h / full.h };
  if (s.c.x < 1e-4 && s.c.y < 1e-4 && s.c.w > 0.9999 && s.c.h > 0.9999) delete s.c;
  setImageRect(s, win, k.c0, k.a);
  commit();
}
function cancelCrop() { S.crop = null; redraw(false); refreshProps(); }
function resetCrop(s) {
  if (!s.c) return;
  const c = s.c, fw = s.w / c.w, fh = s.h / c.h, c0 = centerOf(bounds(s));
  const a = s.a || 0;
  delete s.c;
  setImageRect(s, { x: s.x - c.x * fw, y: s.y - c.y * fh, w: fw, h: fh }, c0, a);
  commit();
}
function drawCropOverlay(lw) {
  const k = S.crop, z = S.cam.z, im = getImg(k.s.imgId), { win, full } = k;
  ctx.save();
  if (k.a) { ctx.translate(k.c0.x, k.c0.y); ctx.rotate(k.a); ctx.translate(-k.c0.x, -k.c0.y); }
  if (im) {
    ctx.imageSmoothingEnabled = !k.s.px;
    ctx.globalAlpha = 0.3; ctx.drawImage(im, full.x, full.y, full.w, full.h); ctx.globalAlpha = 1;
    ctx.save(); ctx.beginPath(); ctx.rect(win.x, win.y, win.w, win.h); ctx.clip();
    ctx.drawImage(im, full.x, full.y, full.w, full.h); ctx.restore();
  }
  ctx.strokeStyle = '#4c6ef5'; ctx.lineWidth = lw;
  ctx.setLineDash([4 / z, 3 / z]); ctx.strokeRect(full.x, full.y, full.w, full.h); ctx.setLineDash([]);
  ctx.strokeRect(win.x, win.y, win.w, win.h);
  ctx.globalAlpha = 0.5; ctx.lineWidth = lw * 0.6;
  for (let i = 1; i < 3; i++) {
    ctx.beginPath(); ctx.moveTo(win.x + win.w * i / 3, win.y); ctx.lineTo(win.x + win.w * i / 3, win.y + win.h);
    ctx.moveTo(win.x, win.y + win.h * i / 3); ctx.lineTo(win.x + win.w, win.y + win.h * i / 3); ctx.stroke();
  }
  ctx.globalAlpha = 1; ctx.lineWidth = lw;
  for (const h of cropHandles(win)) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.rect(h.x - 4 / z, h.y - 4 / z, 8 / z, 8 / z); ctx.fill(); ctx.stroke(); }
  ctx.restore();
}

function render() {
  const D = dpr(), z = S.cam.z;
  ctx.setTransform(D, 0, 0, D, 0, 0);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, view.w, view.h);
  if (S.grid.on) {
    let step = S.grid.size * z;
    while (step < 9) step *= 2;
    const ox = ((S.cam.x % step) + step) % step, oy = ((S.cam.y % step) + step) % step;
    ctx.fillStyle = '#c5cbd6';
    for (let x = ox; x < view.w; x += step) for (let y = oy; y < view.h; y += step) ctx.fillRect(x - .75, y - .75, 1.5, 1.5);
  }
  ctx.setTransform(D * z, 0, 0, D * z, D * S.cam.x, D * S.cam.y);
  const skipId = S.crop ? S.crop.s.id : (S.editing && S.editing.mode === 'text' ? S.editing.shape.id : null);
  for (const l of S.doc.layers) if (l.visible) drawShapes(ctx, l.shapes, l.opacity / 100, skipId);

  const lw = 1.5 / z;
  // selection
  const sel = selShapes();
  if (S.crop) drawCropOverlay(lw);
  if (sel.length && !S.draft && !S.crop) {
    ctx.save();
    ctx.strokeStyle = '#4c6ef5'; ctx.lineWidth = lw;
    const pad = 3 / z;
    for (const s of sel) {
      const b = bounds(s), c = centerOf(b);
      ctx.save();
      if (s.a) { ctx.translate(c.x, c.y); ctx.rotate(s.a); ctx.translate(-c.x, -c.y); }
      ctx.setLineDash([4 / z, 3 / z]);
      ctx.strokeRect(b.x - pad, b.y - pad, b.w + pad * 2, b.h + pad * 2);
      ctx.setLineDash([]);
      if (sel.length === 1 && s.type === 'path') {
        for (const n of s.nodes) {
          if (n.ox || n.oy) {
            ctx.beginPath(); ctx.moveTo(n.x - n.ox, n.y - n.oy); ctx.lineTo(n.x + n.ox, n.y + n.oy); ctx.stroke();
            for (const k of [-1, 1]) { ctx.beginPath(); ctx.arc(n.x + k * n.ox, n.y + k * n.oy, 4 / z, 0, 7); ctx.fillStyle = '#4c6ef5'; ctx.fill(); }
          }
          ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(n.x, n.y, 5 / z, 0, 7); ctx.fill(); ctx.stroke();
        }
      }
      ctx.restore();
    }
    const fr = selFrame();
    for (const h of handlesFor(fr.ob)) {
      const p = rotAbout(h.x, h.y, fr.cx, fr.cy, fr.a);
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.rect(p.x - 4 / z, p.y - 4 / z, 8 / z, 8 / z); ctx.fill(); ctx.stroke();
    }
    const top = rotAbout(fr.cx, fr.ob.y - 6 / z, fr.cx, fr.cy, fr.a), rh = rotHandlePos(fr);
    ctx.beginPath(); ctx.moveTo(top.x, top.y); ctx.lineTo(rh.x, rh.y); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(rh.x, rh.y, 5 / z, 0, 7); ctx.fill(); ctx.stroke();
    ctx.restore();
  }
  // pen draft
  if (S.draft) {
    const d = S.draft, tmp = d.nodes.slice();
    if (d.cursor && !(S.drag && S.drag.k === 'pennode')) tmp.push({ x: d.cursor.x, y: d.cursor.y, ox: 0, oy: 0 });
    if (tmp.length > 1) drawShape(ctx, { type: 'path', nodes: tmp, closed: false, stroke: S.style.stroke || S.style.fill || '#4c6ef5', fill: null, sw: S.style.sw, dash: S.style.dash, op: 70 });
    ctx.save();
    ctx.strokeStyle = '#4c6ef5'; ctx.lineWidth = lw;
    d.nodes.forEach((n, i) => {
      ctx.fillStyle = i === 0 ? '#4c6ef5' : '#fff';
      ctx.beginPath(); ctx.arc(n.x, n.y, 5 / z, 0, 7); ctx.fill(); ctx.stroke();
    });
    ctx.restore();
  }
  // marquee
  if (S.drag && (S.drag.k === 'marquee' || S.drag.k === 'textbox')) {
    const m = S.drag;
    ctx.save();
    ctx.fillStyle = 'rgba(76,110,245,.08)'; ctx.strokeStyle = '#4c6ef5'; ctx.lineWidth = lw;
    ctx.fillRect(Math.min(m.a.x, m.b.x), Math.min(m.a.y, m.b.y), Math.abs(m.a.x - m.b.x), Math.abs(m.a.y - m.b.y));
    ctx.strokeRect(Math.min(m.a.x, m.b.x), Math.min(m.a.y, m.b.y), Math.abs(m.a.x - m.b.x), Math.abs(m.a.y - m.b.y));
    ctx.restore();
  }
}

/* ============================== export ============================== */
function exportGroups() {
  const only = S.exp.selOnly && S.sel.size ? S.sel : null;
  return S.doc.layers.filter(l => l.visible)
    .map(l => ({ a: l.opacity / 100, shapes: l.shapes.filter(s => !only || only.has(s.id)) }))
    .filter(g => g.shapes.length);
}
function exportRegion(groups = exportGroups()) {
  const b = unionB(groups.flatMap(g => g.shapes.map(strokeBounds)));
  if (!b) return null;
  const p = S.exp.pad;
  const x = Math.floor(b.x - p), y = Math.floor(b.y - p);
  return { x, y, w: Math.max(1, Math.ceil(b.x + b.w + p) - x), h: Math.max(1, Math.ceil(b.y + b.h + p) - y) };
}
function exportScale(r) {
  let sc = S.exp.scale;
  while (sc > 1 && Math.max(r.w, r.h) * sc > 8192) sc--;
  return sc;
}
function renderExportCanvas() {
  const groups = exportGroups(), r = exportRegion(groups);
  if (!r) return null;
  const sc = exportScale(r);
  const c = document.createElement('canvas');
  c.width = Math.round(r.w * sc); c.height = Math.round(r.h * sc);
  const x = c.getContext('2d');
  if (S.exp.bg) { x.fillStyle = '#ffffff'; x.fillRect(0, 0, c.width, c.height); }
  x.setTransform(sc, 0, 0, sc, -r.x * sc, -r.y * sc);
  for (const g of groups) drawShapes(x, g.shapes, g.a);
  return c;
}
function download(blob, name) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
async function copyPNG() {
  const c = renderExportCanvas();
  if (!c) return toast('Nothing to export');
  try {
    const item = new ClipboardItem({ 'image/png': new Promise((res, rej) => c.toBlob(b => b ? res(b) : rej(new Error('blob')), 'image/png')) });
    await navigator.clipboard.write([item]);
    flash($('#b-copy')); toast(`Copied PNG · ${c.width}×${c.height}`);
  } catch (e) {
    toast('Clipboard blocked by the browser — downloaded instead');
    c.toBlob(b => download(b, 'sketch.png'));
  }
}
function savePNG() {
  const c = renderExportCanvas();
  if (!c) return toast('Nothing to export');
  c.toBlob(b => download(b, 'sketch.png'));
  toast(`Saved PNG · ${c.width}×${c.height}`);
}
function flash(btn) {
  if (!btn) return;
  const old = btn.innerHTML;
  btn.classList.add('ok'); btn.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';
  setTimeout(() => { btn.classList.remove('ok'); btn.innerHTML = old; }, 1100);
}
let toastT = 0;
function toast(m) {
  const t = $('#toast'); t.textContent = m; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1800);
}

/* ============================== preview panel ============================== */
const pvc = $('#pv'), pctx = pvc.getContext('2d');
const pv = { z: 1, cx: 0, cy: 0, w: 0, h: 0, drag: null, key: '' };
new ResizeObserver(() => {
  const r = pvc.getBoundingClientRect();
  pv.w = r.width; pv.h = r.height;
  pvc.width = Math.round(r.width * dpr()); pvc.height = Math.round(r.height * dpr());
  dirty.pv = true;
}).observe(pvc);

let checker;
function checkerPattern() {
  if (checker) return checker;
  const c = document.createElement('canvas'); c.width = c.height = 16;
  const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, 16, 16); x.fillStyle = '#dfe3e8'; x.fillRect(0, 0, 8, 8); x.fillRect(8, 8, 8, 8);
  return (checker = pctx.createPattern(c, 'repeat'));
}
function pvClampCenter(r, s) {
  const hw = pv.w / (2 * s), hh = pv.h / (2 * s);
  pv.cx = r.w <= 2 * hw ? r.w / 2 : clamp(pv.cx, hw, r.w - hw);
  pv.cy = r.h <= 2 * hh ? r.h / 2 : clamp(pv.cy, hh, r.h - hh);
}
function drawPreview() {
  const D = dpr();
  pctx.setTransform(D, 0, 0, D, 0, 0);
  pctx.fillStyle = '#eceef2'; pctx.fillRect(0, 0, pv.w, pv.h);
  const groups = exportGroups(), r = exportRegion(groups);
  const info = $('#pv-info');
  if (!r) {
    pctx.fillStyle = '#9aa1ad'; pctx.font = '12px system-ui, sans-serif'; pctx.textAlign = 'center';
    pctx.fillText('Nothing to export yet', pv.w / 2, pv.h / 2);
    info.textContent = ''; $('#pv-zoom').textContent = '';
    return;
  }
  const key = `${r.w}x${r.h}`;
  if (pv.key !== key) { pv.key = key; pv.z = 1; pv.cx = r.w / 2; pv.cy = r.h / 2; }
  const fit = Math.min(pv.w / r.w, pv.h / r.h);
  pv.z = clamp(pv.z, 1, 64);
  const s = fit * pv.z;
  pvClampCenter(r, s);
  pctx.save();
  pctx.translate(pv.w / 2 - pv.cx * s, pv.h / 2 - pv.cy * s);
  pctx.shadowColor = 'rgba(0,0,0,.18)'; pctx.shadowBlur = 8;
  pctx.fillStyle = '#fff'; pctx.fillRect(0, 0, r.w * s, r.h * s);
  pctx.shadowColor = 'transparent';
  pctx.beginPath(); pctx.rect(0, 0, r.w * s, r.h * s); pctx.clip();
  if (!S.exp.bg) { pctx.fillStyle = checkerPattern(); pctx.fillRect(0, 0, r.w * s, r.h * s); }
  pctx.scale(s, s); pctx.translate(-r.x, -r.y);
  for (const g of groups) drawShapes(pctx, g.shapes, g.a);
  pctx.restore();
  const sc = exportScale(r);
  info.textContent = `${Math.round(r.w * sc)} × ${Math.round(r.h * sc)} px`;
  $('#pv-zoom').textContent = Math.round(pv.z * 100) + '%';
}
function pvZoom(factor, mx = pv.w / 2, my = pv.h / 2) {
  const r = exportRegion(); if (!r) return;
  const fit = Math.min(pv.w / r.w, pv.h / r.h), s0 = fit * pv.z;
  const lx = pv.cx + (mx - pv.w / 2) / s0, ly = pv.cy + (my - pv.h / 2) / s0;
  pv.z = clamp(pv.z * factor, 1, 64);
  const s1 = fit * pv.z;
  pv.cx = lx - (mx - pv.w / 2) / s1; pv.cy = ly - (my - pv.h / 2) / s1;
  dirty.pv = true;
}
pvc.addEventListener('wheel', e => {
  e.preventDefault();
  const r = pvc.getBoundingClientRect();
  pvZoom(Math.exp(-e.deltaY * (e.ctrlKey ? 0.02 : 0.0025)), e.clientX - r.left, e.clientY - r.top);
}, { passive: false });
pvc.addEventListener('pointerdown', e => {
  pvc.setPointerCapture(e.pointerId); pvc.classList.add('drag');
  pv.drag = { x: e.clientX, y: e.clientY };
});
pvc.addEventListener('pointermove', e => {
  if (!pv.drag) return;
  const r = exportRegion(); if (!r) return;
  const s = Math.min(pv.w / r.w, pv.h / r.h) * pv.z;
  pv.cx -= (e.clientX - pv.drag.x) / s; pv.cy -= (e.clientY - pv.drag.y) / s;
  pv.drag = { x: e.clientX, y: e.clientY }; dirty.pv = true;
});
const endPv = () => { pv.drag = null; pvc.classList.remove('drag'); };
pvc.addEventListener('pointerup', endPv); pvc.addEventListener('pointercancel', endPv);
pvc.addEventListener('dblclick', () => { pv.z = 1; pv.key = ''; dirty.pv = true; });

/* ============================== UI: toolbar & bars ============================== */
const toolbar = $('#toolbar');
for (const t of TOOLS) {
  if (t.gap) { toolbar.insertAdjacentHTML('beforeend', '<div class="gap"></div>'); continue; }
  const b = document.createElement('button');
  b.className = 'ib'; b.dataset.tool = t.id; b.title = `${t.name} (${t.key.toUpperCase()})`; b.innerHTML = icon(t.icon);
  b.onclick = () => (t.action ? runAction(t.action) : setTool(t.id));
  toolbar.appendChild(b);
}
toolbar.insertAdjacentHTML('beforeend', '<div class="gap"></div>');
const lockBtn = document.createElement('button');
lockBtn.className = 'ib'; lockBtn.id = 'b-toollock'; lockBtn.title = 'Keep tool selected after drawing (Q)'; lockBtn.innerHTML = icon('unlock');
lockBtn.onclick = () => { S.toolLock = !S.toolLock; lockBtn.classList.toggle('on', S.toolLock); lockBtn.innerHTML = icon(S.toolLock ? 'lock' : 'unlock'); };
toolbar.appendChild(lockBtn);

function setTool(id) {
  if (S.editing) commitText();
  if (S.crop) commitCrop();
  if (S.draft) finishPen(false);
  S.tool = id;
  document.querySelectorAll('#toolbar [data-tool]').forEach(b => b.classList.toggle('on', b.dataset.tool === id));
  board.style.cursor = id === 'hand' ? 'grab' : id === 'select' ? 'default' : id === 'text' ? 'text' : 'crosshair';
  const h = $('#hint');
  if (HINTS[id]) { h.textContent = HINTS[id]; h.classList.add('show'); clearTimeout(h._t); h._t = setTimeout(() => h.classList.remove('show'), 4500); }
  else h.classList.remove('show');
  if (id !== 'select' && id !== 'hand') { /* keep selection so style edits still apply */ }
  redraw(false); refreshProps();
}
function afterCreate() { if (!S.toolLock) setTool('select'); }

const mkBtn = (cls, ic, title, fn, id) => {
  const b = document.createElement('button');
  b.className = cls; b.title = title; b.innerHTML = typeof ic === 'string' && ICONS[ic] ? icon(ic) : ic;
  if (id) b.id = id;
  b.onclick = fn;
  return b;
};
const sepEl = () => { const d = document.createElement('div'); d.className = 'sep'; return d; };

// top bar
const topbar = $('#topbar');
topbar.append(
  mkBtn('ib', 'undo', 'Undo (Ctrl+Z)', undo, 'b-undo'),
  mkBtn('ib', 'redo', 'Redo (Ctrl+Shift+Z)', redo, 'b-redo'),
  sepEl(),
  mkBtn('ib', 'open', 'Open project…', () => $('#openfile').click()),
  mkBtn('ib', 'floppy', 'Save project file (.json)', saveProject),
  mkBtn('ib', 'trash', 'Clear everything', () => { if (confirm('Clear all layers and start over?')) newDoc(); }),
);
function updateTopbar() {
  $('#b-undo').disabled = hist.i <= 0;
  $('#b-redo').disabled = hist.i >= hist.stack.length - 1;
}
function newDoc() {
  const l = newLayer('Layer 1');
  S.doc = { layers: [l], active: l.id }; S.images = {}; imgCache.clear(); S.sel.clear(); commit();
}
function saveProject() {
  download(new Blob([JSON.stringify({ app: 'sketchdraw', v: 1, doc: S.doc, images: usedImages() })], { type: 'application/json' }), 'sketch.sketchdraw.json');
  toast('Project saved');
}
$('#openfile').addEventListener('change', async e => {
  const file = e.target.files[0]; e.target.value = '';
  if (!file) return;
  try {
    const j = JSON.parse(await file.text());
    const doc = j.doc || j;
    if (!Array.isArray(doc.layers) || !doc.layers.length) throw new Error('bad');
    S.images = j.images || {}; imgCache.clear();
    S.doc = doc; if (!layerById(doc.active)) doc.active = doc.layers[doc.layers.length - 1].id;
    S.sel.clear(); commit(); fitContent(); toast('Project opened');
  } catch (err) { toast('Could not open that file'); }
});

// export bar
const exportbar = $('#exportbar');
exportbar.append(
  mkBtn('ib', 'copy', 'Copy image to clipboard (Ctrl+Shift+C)', copyPNG, 'b-copy'),
  mkBtn('ib', 'save', 'Download PNG', savePNG),
  sepEl(),
  mkBtn('ib', 'bg', 'Background: white (on) / transparent (off)', () => { S.exp.bg = !S.exp.bg; syncExport(); redraw(); persist(); }, 'b-bg'),
  mkBtn('ib', 'selonly', 'Export only the selection', () => { S.exp.selOnly = !S.exp.selOnly; syncExport(); redraw(); persist(); }, 'b-selonly'),
  mkBtn('chip', '', 'Export scale', () => { const o = [1, 2, 3, 4]; S.exp.scale = o[(o.indexOf(S.exp.scale) + 1) % o.length]; syncExport(); redraw(); persist(); }, 'b-scale'),
  mkBtn('chip', '', 'Padding around the image', () => { const o = [0, 8, 16, 32, 64]; S.exp.pad = o[(o.indexOf(S.exp.pad) + 1) % o.length]; syncExport(); redraw(); persist(); }, 'b-pad'),
);
function syncExport() {
  $('#b-bg').classList.toggle('on', S.exp.bg);
  $('#b-selonly').classList.toggle('on', S.exp.selOnly);
  $('#b-scale').textContent = S.exp.scale + '×';
  $('#b-pad').textContent = 'pad ' + S.exp.pad;
}

// zoom bar
const zoombar = $('#zoombar');
zoombar.append(
  mkBtn('ib', 'minus', 'Zoom out', () => setZoom(S.cam.z / 1.25)),
  mkBtn('zv', '100%', 'Reset zoom to 100%', () => setZoom(1), 'b-zoom'),
  mkBtn('ib', 'plus', 'Zoom in', () => setZoom(S.cam.z * 1.25)),
  mkBtn('ib', 'fit', 'Zoom to fit content (Shift+1)', fitContent),
  sepEl(),
  mkBtn('ib', 'grid', 'Grid + snap (N)', () => { S.grid.on = !S.grid.on; syncGrid(); redraw(false); persist(); }, 'b-grid'),
  mkBtn('chip', '', 'Grid size', () => { const o = [4, 8, 16, 32, 64]; S.grid.size = o[(o.indexOf(S.grid.size) + 1) % o.length]; syncGrid(); redraw(false); persist(); }, 'b-gsize'),
);
function syncGrid() { $('#b-grid').classList.toggle('on', S.grid.on); $('#b-gsize').textContent = S.grid.size + 'px'; }
function updateZoom() { $('#b-zoom').textContent = Math.round(S.cam.z * 100) + '%'; }

/* ============================== UI: properties ============================== */
const props = $('#props');
props.innerHTML = `
  <div class="p-head"><span>Style</span><button id="p-toggle" title="Collapse">–</button></div>
  <div class="p-sec" style="margin-top:6px">
    <div class="colors">
      <button class="cbox" data-target="fill" title="Fill color"><i></i></button>
      <button class="ib linkbtn" id="linkbtn" title="Linked: stroke always follows fill"></button>
      <button class="cbox" data-target="stroke" title="Stroke color"><i></i></button>
    </div>
    <div class="cap"><span>Fill</span><span id="link-cap"></span><span>Stroke</span></div>
    <div class="palette" id="palette"></div>
  </div>
  <div class="p-sec"><label>Stroke width <b id="v-sw"></b></label><input type="range" id="r-sw" min="0" max="40" step="1"></div>
  <div class="p-sec"><label>Stroke style</label>
    <div class="seg" id="seg-dash"><button data-v="solid">Solid</button><button data-v="dashed">Dashed</button><button data-v="dotted">Dotted</button></div></div>
  <div class="p-sec" id="sec-rad"><label>Corner radius <b id="v-rad"></b></label><input type="range" id="r-rad" min="0" max="200" step="1"></div>
  <div class="p-sec" id="sec-join"><label>Outline corners</label>
    <div class="seg" id="seg-join"><button data-v="miter">Sharp</button><button data-v="round">Round</button></div></div>
  <div class="p-sec" id="sec-angle"><label>Rotation <b id="v-an"></b></label><input type="range" id="r-an" min="-180" max="180" step="1"></div>
  <div class="p-sec" id="sec-img"><label>Image scaling</label>
    <div class="seg" id="seg-px"><button data-v="smooth">Smooth</button><button data-v="crisp">Crisp pixels</button></div>
    <div class="seg" style="margin-top:6px"><button id="btn-crop" title="Crop (double-click the image or press Enter)">Crop…</button><button id="btn-crop-reset">Reset crop</button></div></div>
  <div class="p-sec"><label>Opacity <b id="v-op"></b></label><input type="range" id="r-op" min="5" max="100" step="5"></div>
  <div id="sec-text">
    <div class="p-sec"><label>Font family</label><div class="seg" id="seg-font">
      <button data-v="hand" style="font-family:'Segoe Print','Bradley Hand','Comic Sans MS',cursive">Hand</button>
      <button data-v="sans">Sans</button><button data-v="serif" style="font-family:Georgia,serif">Serif</button>
      <button data-v="mono" style="font-family:ui-monospace,Menlo,Consolas,monospace">Mono</button></div></div>
    <div class="p-sec"><label>Font size <b id="v-fs"></b></label>
      <div class="seg" id="seg-fs"><button data-v="16">S</button><button data-v="24">M</button><button data-v="36">L</button><button data-v="56">XL</button></div>
      <input type="range" id="r-fs" min="8" max="200" step="1" style="margin-top:6px"></div>
    <div class="p-sec"><label>Text align</label><div class="seg" id="seg-al">
      <button data-v="left" id="al-l"></button><button data-v="center" id="al-c"></button><button data-v="right" id="al-r"></button></div></div>
  </div>
  <div class="p-sec" id="sec-arr"><label>Arrange</label><div class="arrange" id="arrange"></div></div>
`;
const palette = $('#palette');
palette.innerHTML = `<button class="pal none" data-c="none" title="No color"></button>` +
  PALETTE.map(c => `<button class="pal" data-c="${c}" style="background:${c}" title="${c}"></button>`).join('') +
  `<label class="pal custom" title="Custom color">+<input type="color" id="custom-color" value="#4263eb"></label>`;

$('#p-toggle').onclick = () => { props.classList.toggle('collapsed'); $('#p-toggle').textContent = props.classList.contains('collapsed') ? '+' : '–'; };
props.querySelectorAll('.cbox').forEach(b => b.onclick = () => { S.style.target = b.dataset.target; refreshProps(); });
$('#linkbtn').onclick = () => {
  S.style.link = !S.style.link;
  if (S.style.link) setColor('stroke', S.style.fill); // re-link to fill
  refreshProps();
};
palette.addEventListener('click', e => {
  const b = e.target.closest('.pal'); if (!b || b.classList.contains('custom')) return;
  setColor(S.style.target, b.dataset.c === 'none' ? null : b.dataset.c);
});
$('#custom-color').addEventListener('input', e => setColor(S.style.target, e.target.value, false));
$('#custom-color').addEventListener('change', () => commit());

function applyToSel(fn) { selShapes().forEach(fn); }
function setColor(target, c, doCommit = true, applySel = true) {
  const other = target === 'fill' ? 'stroke' : 'fill';
  S.style[target] = c;
  if (S.style.link) S.style[other] = c;
  if (applySel) applyToSel(s => {
    if (s.type === 'text') { if (c) s.fill = c; return; }
    if (s.type === 'line' || s.type === 'arrow' || s.type === 'free' && !s.closed) {
      if (c) { s.stroke = c; if (S.style.link) s.fill = c; } else s[target] = null;
      return;
    }
    s[target] = c; if (S.style.link) s[other] = c;
  });
  if (doCommit) commit(); else { redraw(); refreshProps(); }
}
function bindRange(id, vid, fmt, apply) {
  const el = $(id);
  el.addEventListener('input', () => { const v = +el.value; $(vid).textContent = fmt(v); apply(v); redraw(); });
  el.addEventListener('change', () => commit());
}
bindRange('#r-sw', '#v-sw', v => v + 'px', v => { S.style.sw = v; applyToSel(s => { s.sw = v; }); });
bindRange('#r-rad', '#v-rad', v => v + 'px', v => { S.style.rr = v; applyToSel(s => { if (s.type === 'rect') s.r = v; }); });
bindRange('#r-op', '#v-op', v => v + '%', v => { S.style.op = v; applyToSel(s => { s.op = v; }); });
bindRange('#r-an', '#v-an', v => v + '°', v => { applyToSel(s => { if (v) s.a = v * Math.PI / 180; else delete s.a; }); });
$('#seg-px').onclick = e => { const b = e.target.closest('button'); if (!b) return; applyToSel(s => { if (s.type === 'image') s.px = b.dataset.v === 'crisp'; }); commit(); };
$('#btn-crop').onclick = () => { const i = selShapes().find(x => x.type === 'image'); if (i) enterCrop(i); };
$('#btn-crop-reset').onclick = () => { selShapes().filter(x => x.type === 'image').forEach(resetCrop); };
const isTxt = s => s.type === 'text' || !!s.t;
bindRange('#r-fs', '#v-fs', v => v + 'px', v => { S.style.fs = v; applyToSel(s => { if (isTxt(s)) s.fs = v; }); });
$('#seg-fs').onclick = e => { const b = e.target.closest('button'); if (!b) return; S.style.fs = +b.dataset.v; applyToSel(s => { if (isTxt(s)) s.fs = +b.dataset.v; }); commit(); };
$('#seg-font').onclick = e => { const b = e.target.closest('button'); if (!b) return; S.style.font = b.dataset.v; applyToSel(s => { if (isTxt(s)) s.font = b.dataset.v; }); commit(); };
$('#seg-al').onclick = e => { const b = e.target.closest('button'); if (!b) return; S.style.align = b.dataset.v; applyToSel(s => { if (isTxt(s)) s.al = b.dataset.v; }); commit(); };
$('#al-l').innerHTML = icon('alignl', 16); $('#al-c').innerHTML = icon('alignc', 16); $('#al-r').innerHTML = icon('alignr', 16);
$('#seg-dash').onclick = e => { const b = e.target.closest('button'); if (!b) return; S.style.dash = b.dataset.v; applyToSel(s => { s.dash = b.dataset.v; }); commit(); };
$('#seg-join').onclick = e => { const b = e.target.closest('button'); if (!b) return; S.style.join = b.dataset.v; applyToSel(s => { s.join = b.dataset.v; }); commit(); };

const arrange = $('#arrange');
arrange.append(
  mkBtn('ib', 'tofront', 'Bring to front (Ctrl+Shift+])', () => reorder('front')),
  mkBtn('ib', 'forward', 'Bring forward (Ctrl+])', () => reorder('fwd')),
  mkBtn('ib', 'backward', 'Send backward (Ctrl+[)', () => reorder('back')),
  mkBtn('ib', 'toback', 'Send to back (Ctrl+Shift+[)', () => reorder('bottom')),
  mkBtn('ib', 'copy', 'Duplicate (Ctrl+D)', duplicateSel),
  mkBtn('ib', 'trash', 'Delete (Del)', deleteSel),
);

function refreshProps() {
  const first = selShapes()[0];
  const st = S.style;
  const val = k => first && first[k] !== undefined ? first[k] : st[k];
  const fillC = first ? (first.type === 'text' ? first.fill : first.fill) : st.fill;
  const strokeC = first ? (first.type === 'text' ? first.fill : first.stroke) : st.stroke;
  props.querySelectorAll('.cbox').forEach(b => {
    const c = b.dataset.target === 'fill' ? fillC : strokeC;
    b.classList.toggle('active', st.target === b.dataset.target);
    const i = b.firstElementChild;
    i.style.background = c || 'repeating-linear-gradient(-45deg,#fff 0 5px,#ffe3e3 5px 6px)';
  });
  const lk = $('#linkbtn');
  lk.innerHTML = icon(st.link ? 'link' : 'unlink');
  lk.classList.toggle('on', st.link);
  $('#link-cap').textContent = st.link ? 'linked' : 'separate';
  const cur = st.target === 'fill' ? fillC : strokeC;
  palette.querySelectorAll('.pal[data-c]').forEach(b => b.classList.toggle('sel', (b.dataset.c === 'none' ? null : b.dataset.c) === (cur || null)));
  const set = (id, vid, v, fmt) => { $(id).value = v; $(vid).textContent = fmt(v); };
  set('#r-sw', '#v-sw', val('sw'), v => v + 'px');
  set('#r-op', '#v-op', val('op'), v => v + '%');
  const rect = selShapes().find(s => s.type === 'rect');
  set('#r-rad', '#v-rad', rect ? rect.r || 0 : st.rr, v => v + 'px');
  const sh = selShapes();
  $('#sec-angle').style.display = sh.length ? '' : 'none';
  set('#r-an', '#v-an', sh.length ? Math.round((sh[0].a || 0) * 180 / Math.PI) : 0, v => v + '°');
  const img = sh.find(x => x.type === 'image');
  $('#sec-img').style.display = img ? '' : 'none';
  $('#seg-px').querySelectorAll('button').forEach(b => b.classList.toggle('on', (b.dataset.v === 'crisp') === !!(img && img.px)));
  const tx = selShapes().find(isTxt) || st;
  set('#r-fs', '#v-fs', tx.fs, v => v + 'px');
  $('#seg-fs').querySelectorAll('button').forEach(b => b.classList.toggle('on', +b.dataset.v === tx.fs));
  $('#seg-font').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === tx.font));
  $('#seg-al').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === (tx.al || (tx === st ? st.align : 'center'))));
  $('#seg-dash').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === val('dash')));
  $('#seg-join').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === (val('join') || 'miter')));
  const tl = TOOLS.find(t => t.id === S.tool);
  const types = first ? selShapes().map(s => s.type) : [tl && tl.type, S.tool === 'text' && 'text', S.tool === 'brush' && 'free', S.tool === 'pen' && 'path'];
  const showRad = types.includes('rect');
  $('#sec-rad').style.display = showRad ? '' : 'none';
  $('#sec-join').style.display = types.some(t => BOX.has(t)) ? '' : 'none';
  $('#sec-text').style.display = (types.includes('text') || selShapes().some(isTxt)) ? '' : 'none';
  $('#sec-arr').style.display = first ? '' : 'none';
  markLayers();
}

/* ============================== UI: layers ============================== */
const layerList = $('#layer-list');
function thumb(layer) {
  const c = document.createElement('canvas'); c.width = 80; c.height = 64;
  const x = c.getContext('2d');
  const b = unionB(layer.shapes.map(strokeBounds));
  if (b) {
    const s = Math.min(72 / Math.max(b.w, 1), 56 / Math.max(b.h, 1), 4);
    x.setTransform(s, 0, 0, s, 40 - (b.x + b.w / 2) * s, 32 - (b.y + b.h / 2) * s);
    drawShapes(x, layer.shapes, 1);
  }
  return c;
}
const layerOn = l => l.shapes.some(x => S.sel.has(x.id)) || (!S.sel.size && l.id === S.doc.active);
function markLayers() {
  for (const row of layerList.children) { const l = layerById(row.dataset.id); if (l) row.classList.toggle('active', layerOn(l)); }
  const a = activeLayer();
  $('#layer-op').value = a.opacity; $('#layer-op-v').textContent = a.opacity + '%';
}
function refreshLayers() {
  layerList.innerHTML = '';
  const layers = S.doc.layers;
  for (let i = layers.length - 1; i >= 0; i--) {
    const l = layers[i];
    const row = document.createElement('div');
    row.className = 'layer' + (layerOn(l) ? ' active' : '') + (l.visible ? '' : ' hidden');
    row.draggable = true; row.dataset.id = l.id;
    const eye = mkBtn('ib' + (l.visible ? '' : ' off'), l.visible ? 'eye' : 'eyeoff', 'Show / hide', ev => { ev.stopPropagation(); l.visible = !l.visible; commit(); });
    const lock = mkBtn('ib' + (l.locked ? '' : ' off'), l.locked ? 'lock' : 'unlock', 'Lock / unlock', ev => { ev.stopPropagation(); l.locked = !l.locked; if (l.locked) for (const s of l.shapes) S.sel.delete(s.id); commit(); });
    const nm = document.createElement('span'); nm.className = 'nm'; nm.textContent = l.name;
    row.append(eye, thumb(l), nm, lock);
    row.onclick = ev => {
      S.doc.active = l.id;
      const ids = l.visible && !l.locked ? l.shapes.map(x => x.id) : [];
      if (ev.shiftKey || ev.ctrlKey || ev.metaKey) ids.forEach(id => (S.sel.has(id) ? S.sel.delete(id) : S.sel.add(id)));
      else S.sel = new Set(ids);
      refreshProps(); redraw(false);
    };
    nm.ondblclick = ev => {
      ev.stopPropagation();
      const inp = document.createElement('input'); inp.className = 'rename'; inp.value = l.name;
      nm.replaceWith(inp); inp.focus(); inp.select();
      const done = ok => { if (ok && inp.value.trim()) { l.name = inp.value.trim(); commit(); } else refreshLayers(); };
      inp.onkeydown = k => { k.stopPropagation(); if (k.key === 'Enter') done(true); if (k.key === 'Escape') done(false); };
      inp.onblur = () => done(true);
      inp.onclick = k => k.stopPropagation();
    };
    row.ondragstart = ev => { ev.dataTransfer.setData('text/plain', l.id); ev.dataTransfer.effectAllowed = 'move'; };
    row.ondragover = ev => { ev.preventDefault(); row.classList.add('dragover'); };
    row.ondragleave = () => row.classList.remove('dragover');
    row.ondrop = ev => {
      ev.preventDefault();
      const from = layers.findIndex(x => x.id === ev.dataTransfer.getData('text/plain'));
      if (from < 0) return;
      const [m] = layers.splice(from, 1);
      layers.splice(layers.findIndex(x => x.id === l.id) + (from < i ? 1 : 0), 0, m);
      commit();
    };
    layerList.appendChild(row);
  }
  const a = activeLayer();
  $('#layer-op').value = a.opacity; $('#layer-op-v').textContent = a.opacity + '%';
}
$('#layer-op').addEventListener('input', e => { const a = activeLayer(); a.opacity = +e.target.value; $('#layer-op-v').textContent = a.opacity + '%'; redraw(); });
$('#layer-op').addEventListener('change', () => commit());

$('#layer-actions').append(
  mkBtn('ib', 'plus', 'New layer', () => {
    const l = newLayer('Layer ' + (S.doc.layers.length + 1));
    const at = S.doc.layers.indexOf(activeLayer()) + 1;
    S.doc.layers.splice(at, 0, l); S.doc.active = l.id; commit();
  }),
  mkBtn('ib', 'copy', 'Duplicate layer', () => {
    const a = activeLayer(), d = clone(a);
    d.id = uid(); d.name = a.name + ' copy'; d.shapes.forEach(s => { s.id = uid(); });
    S.doc.layers.splice(S.doc.layers.indexOf(a) + 1, 0, d); S.doc.active = d.id; commit();
  }),
  mkBtn('ib', 'merge', 'Merge down', () => {
    const i = S.doc.layers.indexOf(activeLayer());
    if (i <= 0) return toast('No layer below to merge into');
    const [a] = S.doc.layers.splice(i, 1);
    S.doc.layers[i - 1].shapes.push(...a.shapes); S.doc.active = S.doc.layers[i - 1].id; commit();
  }),
  mkBtn('ib', 'trash', 'Delete layer', () => {
    if (S.doc.layers.length < 2) return toast('You need at least one layer');
    const a = activeLayer(), i = S.doc.layers.indexOf(a);
    a.shapes.forEach(s => S.sel.delete(s.id));
    S.doc.layers.splice(i, 1); S.doc.active = S.doc.layers[Math.max(0, i - 1)].id; commit();
  }),
);
$('#pv-actions').append(
  mkBtn('ib', 'minus', 'Zoom out (min = whole export)', () => pvZoom(1 / 1.5)),
  Object.assign(document.createElement('span'), { className: 'zv', id: 'pv-zoom' }),
  mkBtn('ib', 'plus', 'Zoom in', () => pvZoom(1.5)),
  mkBtn('ib', 'fit', 'Fit (double-click preview)', () => { pv.z = 1; pv.key = ''; dirty.pv = true; }),
);

/* ============================== editing actions ============================== */
function reorder(mode) {
  const arr = S.doc.layers, isSel = l => l.shapes.some(x => S.sel.has(x.id));
  if (!arr.some(isSel)) return;
  if (mode === 'front') S.doc.layers = [...arr.filter(l => !isSel(l)), ...arr.filter(isSel)];
  else if (mode === 'bottom') S.doc.layers = [...arr.filter(isSel), ...arr.filter(l => !isSel(l))];
  else if (mode === 'fwd') for (let i = arr.length - 2; i >= 0; i--) { if (isSel(arr[i]) && !isSel(arr[i + 1])) [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]; }
  else for (let i = 1; i < arr.length; i++) { if (isSel(arr[i]) && !isSel(arr[i - 1])) [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]]; }
  commit();
}
function deleteSel() {
  selShapes().forEach(removeShape);
  S.sel.clear(); commit();
}
function duplicateSel() {
  const out = [];
  for (const { s, l } of selList()) { const d = clone(s); d.id = uid(); moveShape(d, 16, 16); const nl = addShape(d, null, l); nl.name = l.name + ' copy'; out.push(d.id); }
  S.sel = new Set(out); commit();
}
function copySel() { S.clip = selList().map(({ s, l }) => ({ layer: l.id, shape: clone(s) })); S.pasteN = 0; if (S.clip.length) toast('Copied'); }
function pasteSel() {
  if (!S.clip || !S.clip.length) return;
  S.pasteN = (S.pasteN || 0) + 1;
  const out = [];
  for (const c of S.clip) {
    const d = clone(c.shape); d.id = uid(); moveShape(d, 16 * S.pasteN, 16 * S.pasteN);
    addShape(d); out.push(d.id);
  }
  S.sel = new Set(out); commit();
}
function nudge(dx, dy) { if (!S.sel.size) return; selShapes().forEach(s => moveShape(s, dx, dy)); redraw(); clearTimeout(nudge.t); nudge.t = setTimeout(commit, 250); }

/* ============================== text editing ============================== */
const ta = $('#texted');
function openText(shape, wp, box) {
  const st = S.style;
  let ed;
  if (shape && shape.type === 'text') {
    ed = { mode: 'text', shape, x: shape.x, y: shape.y, fs: shape.fs, font: shape.font, al: shape.al || 'left', color: shape.fill || shape.stroke || '#1e1e1e',
      fixedW: shape.w || 0, fixedH: shape.h || 0, value: shape.text };
  } else if (shape) {
    const g = labelGeom(shape.t ? shape : { ...shape, t: ' ', fs: shape.fs || st.fs, font: shape.font || st.font });
    ed = { mode: 'label', shape, fs: shape.fs || st.fs, font: shape.font || st.font, al: shape.al || 'center', color: labelColor(shape),
      fixedW: g.fit, center: { x: g.cx, y: g.cy }, value: shape.t || '' };
    hideLabelId = shape.id;
  } else {
    ed = { mode: 'new', shape: null, x: box ? box.x : wp.x, y: box ? box.y : wp.y, fs: st.fs, font: st.font, al: st.align || 'left',
      color: st.fill || st.stroke || '#1e1e1e', fixedW: box ? box.w : 0, fixedH: box ? box.h : 0, box, value: '' };
  }
  S.editing = ed;
  const z = S.cam.z, p = toScreen(ed.x || 0, ed.y || 0);
  ta.hidden = false;
  ta.value = ed.value;
  Object.assign(ta.style, { left: p.x + 'px', top: p.y + 'px', fontSize: ed.fs * z + 'px', fontFamily: FONTS[ed.font] || FONTS.sans, color: ed.color,
    lineHeight: '1.25', textAlign: ed.al, transform: ed.shape && ed.shape.a ? `rotate(${ed.shape.a}rad)` : '', whiteSpace: ed.fixedW ? 'pre-wrap' : 'pre', overflowWrap: 'break-word' });
  sizeText();
  redraw(false);
  ta.focus(); ta.select();
  setTimeout(() => { if (S.editing && document.activeElement !== ta) { ta.focus(); ta.select(); } }, 0);
}
function sizeText() {
  const ed = S.editing; if (!ed) return;
  const z = S.cam.z;
  if (ed.fixedW) ta.style.width = ed.fixedW * z + 'px';
  else { ta.style.width = '10px'; ta.style.width = Math.max(30, ta.scrollWidth + 6) + 'px'; }
  ta.style.height = '10px';
  ta.style.height = Math.max(ta.scrollHeight, 20, (ed.fixedH || 0) * z) + 'px';
  if (ed.center) {
    const c = toScreen(ed.center.x, ed.center.y);
    ta.style.left = c.x - ta.offsetWidth / 2 + 'px'; ta.style.top = c.y - ta.offsetHeight / 2 + 'px';
  }
}
ta.addEventListener('input', sizeText);
ta.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Escape' || (e.key === 'Enter' && (e.ctrlKey || e.metaKey))) ta.blur(); });
ta.addEventListener('blur', () => commitText());
function commitText() {
  const ed = S.editing; if (!ed) return;
  S.editing = null; ta.hidden = true; hideLabelId = null;
  const t = ta.value.replace(/\s+$/, '');
  if (ed.mode === 'label') {
    const s = ed.shape;
    if (t) { s.t = t; s.fs = ed.fs; s.font = ed.font; s.al = ed.al; } else { delete s.t; delete s.al; }
  } else if (ed.mode === 'text') {
    if (t) ed.shape.text = t; else removeShape(ed.shape);
  } else if (t) {
    const s = { id: uid(), type: 'text', x: ed.x, y: ed.y, text: t, fs: ed.fs, font: ed.font, al: ed.al, fill: ed.color, stroke: ed.color, sw: 0, op: S.style.op, dash: 'solid' };
    if (ed.box) { s.w = ed.box.w; s.h = ed.box.h; }
    const l = addShape(s); l.name = 'Text: ' + t.split('\n')[0].slice(0, 18);
    S.sel = new Set([s.id]);
  }
  commit();
  if (ed.mode === 'new' && t) afterCreate();
}

/* ============================== pen tool ============================== */
function finishPen(closed) {
  const d = S.draft; S.draft = null;
  if (!d || d.nodes.length < 2) { redraw(false); return; }
  const st = S.style;
  const s = { id: uid(), type: 'path', nodes: d.nodes.map(n => ({ x: n.x, y: n.y, ox: n.ox || 0, oy: n.oy || 0 })), closed: !!closed,
    stroke: st.stroke || st.fill || '#1e1e1e', fill: st.fill, sw: Math.max(1, st.sw), dash: st.dash, op: st.op, join: 'round' };
  addShape(s);
  S.sel = new Set([s.id]); commit(); afterCreate();
}

/* ============================== images ============================== */
const readFile = f => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(f); });
const loadImage = src => new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = src; });
async function addImageFiles(files, at) {
  const list = [...files].filter(f => f.type.startsWith('image/'));
  if (!list.length) return false;
  const out = [];
  let n = 0;
  for (const f of list) {
    try {
      let src = await readFile(f);
      const im = await loadImage(src);
      let w = im.naturalWidth, h = im.naturalHeight;
      const big = Math.max(w, h);
      if (big > 2048) { // keep projects small
        const k = 2048 / big, c = document.createElement('canvas');
        c.width = Math.round(w * k); c.height = Math.round(h * k);
        c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
        src = c.toDataURL('image/png'); w = c.width; h = c.height;
      }
      const id = uid();
      S.images[id] = src;
      const k = Math.min(1, (view.w / S.cam.z) * 0.6 / w, (view.h / S.cam.z) * 0.6 / h);
      const dw = Math.max(1, Math.round(w * k)), dh = Math.max(1, Math.round(h * k));
      const c0 = at || toWorld(view.w / 2, view.h / 2);
      const s = { id: uid(), type: 'image', imgId: id, x: Math.round(snap(c0.x - dw / 2) + n * 24), y: Math.round(snap(c0.y - dh / 2) + n * 24), w: dw, h: dh,
        fill: null, stroke: null, sw: 0, op: 100, dash: 'solid', px: false };
      const l = addShape(s); l.name = 'Image: ' + f.name.replace(/\.[^.]+$/, '').slice(0, 18);
      out.push(s.id); n++;
    } catch (err) { toast('Could not read ' + f.name); }
  }
  if (!out.length) return false;
  S.sel = new Set(out); commit(); setTool('select');
  return true;
}
function runAction(a) {
  if (a === 'image') $('#imgfile').click();
}
$('#imgfile').addEventListener('change', e => { addImageFiles(e.target.files); e.target.value = ''; });
stage.addEventListener('dragover', e => { if ([...(e.dataTransfer.items || [])].some(i => i.kind === 'file')) e.preventDefault(); });
stage.addEventListener('drop', e => {
  if (!e.dataTransfer.files.length) return;
  e.preventDefault();
  const r = board.getBoundingClientRect();
  addImageFiles(e.dataTransfer.files, toWorld(e.clientX - r.left, e.clientY - r.top));
});
const usedImages = () => {
  const out = {};
  for (const l of S.doc.layers) for (const s of l.shapes) if (s.imgId && S.images[s.imgId]) out[s.imgId] = S.images[s.imgId];
  return out;
};

/* ============================== pointer interaction ============================== */
function mkShape(tool, x, y) {
  const st = S.style;
  const base = { id: uid(), sw: st.sw, dash: st.dash, op: st.op, join: st.join };
  if (BOX.has(tool.type)) return { ...base, type: tool.type, x, y, w: 0, h: 0, r: tool.round ? st.rr : 0, fill: st.fill, stroke: st.stroke };
  const stroke = st.stroke || st.fill || '#1e1e1e';
  if (tool.type === 'line' || tool.type === 'arrow') return { ...base, type: tool.type, pts: [{ x, y }, { x, y }], stroke, fill: null, sw: Math.max(1, st.sw) };
  return null;
}
function hitHandle(wp) {
  const fr = selFrame(); if (!fr) return null;
  const tol = 9 / S.cam.z;
  const rh = rotHandlePos(fr);
  if (Math.hypot(rh.x - wp.x, rh.y - wp.y) <= tol) return 'rot';
  for (const h of handlesFor(fr.ob)) {
    const p = rotAbout(h.x, h.y, fr.cx, fr.cy, fr.a);
    if (Math.abs(p.x - wp.x) <= tol && Math.abs(p.y - wp.y) <= tol) return h.n;
  }
  return null;
}
function hitNode(wp) {
  const sel = selShapes();
  if (sel.length !== 1 || sel[0].type !== 'path') return null;
  const tol = 8 / S.cam.z, ns = sel[0].nodes, q = toLocal(sel[0], wp);
  for (let i = 0; i < ns.length; i++) {
    const n = ns[i];
    if (n.ox || n.oy) {
      if (Math.hypot(n.x + n.ox - q.x, n.y + n.oy - q.y) <= tol) return { s: sel[0], i, part: 'out' };
      if (Math.hypot(n.x - n.ox - q.x, n.y - n.oy - q.y) <= tol) return { s: sel[0], i, part: 'in' };
    }
    if (Math.hypot(n.x - q.x, n.y - q.y) <= tol) return { s: sel[0], i, part: 'a' };
  }
  return null;
}

board.addEventListener('contextmenu', e => e.preventDefault());
board.addEventListener('pointerdown', e => {
  if (S.editing) commitText();
  board.setPointerCapture(e.pointerId);
  const { sx, sy } = evPos(e), wp = toWorld(sx, sy);
  const tool = TOOLS.find(t => t.id === S.tool);

  if (e.button === 1 || e.button === 2 || S.tool === 'hand' || S.space) {
    S.drag = { k: 'pan', sx, sy, cx: S.cam.x, cy: S.cam.y }; board.style.cursor = 'grabbing'; return;
  }
  if (e.button !== 0) return;

  if (S.crop) {
    const k = S.crop, lp = cropLocal(wp), tol = 9 / S.cam.z;
    const h = cropHandles(k.win).find(h => Math.abs(h.x - lp.x) <= tol && Math.abs(h.y - lp.y) <= tol);
    const inside = lp.x >= k.win.x && lp.x <= k.win.x + k.win.w && lp.y >= k.win.y && lp.y <= k.win.y + k.win.h;
    if (h) S.drag = { k: 'cropresize', h: h.n, w0: { ...k.win } };
    else if (inside) S.drag = { k: 'cropmove', start: lp, w0: { ...k.win } };
    else commitCrop();
    return;
  }

  if (S.tool === 'select') {
    const nh = hitNode(wp);
    if (nh) { bakePath(nh.s); S.drag = { k: 'node', ...nh }; return; }
    const hn = hitHandle(wp);
    if (hn) {
      const sel = selShapes(), fr = selFrame(), orig = new Map(sel.map(s => [s.id, clone(s)]));
      if (hn === 'rot') S.drag = { k: 'rotate', pivot: { x: fr.cx, y: fr.cy }, a0: Math.atan2(wp.y - fr.cy, wp.x - fr.cx), base: fr.a, orig };
      else S.drag = { k: 'resize', h: hn, fr, ob: fr.ob, orig };
      return;
    }
    const hit = pickAt(wp.x, wp.y);
    if (hit) {
      if (e.shiftKey) { if (S.sel.has(hit.s.id)) S.sel.delete(hit.s.id); else S.sel.add(hit.s.id); }
      else if (!S.sel.has(hit.s.id)) S.sel = new Set([hit.s.id]);
      S.doc.active = hit.l.id;
      const sel = selShapes();
      S.drag = { k: 'move', start: wp, ob: unionB(sel.map(aabb)), orig: new Map(sel.map(s => [s.id, clone(s)])), moved: false };
      refreshLayers(); refreshProps(); redraw(false);
    } else {
      if (!e.shiftKey) S.sel.clear();
      S.drag = { k: 'marquee', a: wp, b: wp, base: new Set(S.sel) };
      refreshProps(); redraw(false);
    }
    return;
  }

  if (S.tool === 'eraser') { S.drag = { k: 'erase', n: 0 }; eraseAt(wp); return; }
  if (S.tool === 'fill' || S.tool === 'picker') {
    const hit = pickAt(wp.x, wp.y, true);
    if (!hit) return;
    const s = hit.s;
    if (s.type === 'image') return toast('Images have no fill color');
    if (S.tool === 'picker') {
      const isLine = s.type === 'line' || s.type === 'arrow';
      const c = e.altKey ? s.stroke : (isLine ? s.stroke : (s.fill || s.stroke));
      if (c) setColor(e.altKey ? 'stroke' : 'fill', c, false, false);
      refreshProps(); return;
    }
    if (hit.l.locked) return toast('That layer is locked');
    const c = S.style.fill;
    if (!c) return toast('Pick a fill color first');
    if (s.type === 'text') s.fill = c;
    else if (s.type === 'line' || s.type === 'arrow') s.stroke = c;
    else {
      s.fill = c; if (S.style.link) s.stroke = c;
      if ((s.type === 'free' || s.type === 'path') && !s.closed) s.closed = true;
    }
    commit(); return;
  }
  if (S.tool === 'text') {
    const hit = pickAt(wp.x, wp.y);
    e.preventDefault();
    if (hit) { S.sel = new Set([hit.s.id]); S.doc.active = hit.l.id; refreshProps(); openText(hit.s); }
    else S.drag = { k: 'textbox', a: wp, b: wp, sa: { sx, sy } };
    return;
  }
  if (S.tool === 'pen') {
    if (!S.draft) S.draft = { nodes: [], cursor: null };
    const d = S.draft;
    if (e.detail >= 2) { finishPen(false); return; }
    if (d.nodes.length >= 3) {
      const f0 = toScreen(d.nodes[0].x, d.nodes[0].y);
      if (Math.hypot(f0.x - sx, f0.y - sy) < 10) { finishPen(true); return; }
    }
    const n = { x: snap(wp.x), y: snap(wp.y), ox: 0, oy: 0 };
    d.nodes.push(n); S.drag = { k: 'pennode', n };
    S.sel.clear(); redraw(false); return;
  }
  if (S.tool === 'brush') {
    const st = S.style;
    const s = { id: uid(), type: 'free', pts: [{ x: wp.x, y: wp.y }], closed: false, stroke: st.stroke || st.fill || '#1e1e1e', fill: st.fill, sw: Math.max(1, st.sw), dash: st.dash, op: st.op, join: 'round' };
    addShape(s, TOOLS.find(t => t.id === 'brush')); S.drag = { k: 'brush', s }; S.sel.clear(); redraw(false); return;
  }
  if (tool && tool.type) {
    const p = { x: snap(wp.x), y: snap(wp.y) };
    const s = mkShape(tool, p.x, p.y);
    addShape(s, tool);
    S.sel = new Set([s.id]);
    S.drag = { k: 'create', s, tool, start: p };
    redraw(false);
  }
});

function eraseAt(wp) {
  const hit = pickAt(wp.x, wp.y);
  if (hit) { removeShape(hit.s); S.drag.n++; redraw(); }
}

board.addEventListener('pointermove', e => {
  const { sx, sy } = evPos(e), wp = toWorld(sx, sy);
  const d = S.drag;
  if (S.draft) { S.draft.cursor = { x: snap(wp.x), y: snap(wp.y) }; redraw(false); }
  if (S.crop && !d) {
    const k = S.crop, lp = cropLocal(wp), tol = 9 / S.cam.z;
    const h = cropHandles(k.win).find(h => Math.abs(h.x - lp.x) <= tol && Math.abs(h.y - lp.y) <= tol);
    board.style.cursor = h ? HANDLE_CURSOR[h.n] : (lp.x >= k.win.x && lp.x <= k.win.x + k.win.w && lp.y >= k.win.y && lp.y <= k.win.y + k.win.h) ? 'move' : 'default';
    return;
  }
  if (!d) {
    if (S.tool === 'select') {
      const hn = hitHandle(wp);
      board.style.cursor = hn ? (HANDLE_CURSOR[hn] || 'grab') : hitNode(wp) ? 'pointer' : pickAt(wp.x, wp.y) ? 'move' : 'default';
    }
    return;
  }
  switch (d.k) {
    case 'pan': S.cam.x = d.cx + sx - d.sx; S.cam.y = d.cy + sy - d.sy; redraw(false); break;
    case 'pennode': {
      const dx = wp.x - d.n.x, dy = wp.y - d.n.y;
      if (Math.hypot(dx, dy) * S.cam.z > 4) { d.n.ox = dx; d.n.oy = dy; } else { d.n.ox = 0; d.n.oy = 0; }
      redraw(false); break;
    }
    case 'brush': {
      const p = d.s.pts[d.s.pts.length - 1];
      if (Math.hypot(wp.x - p.x, wp.y - p.y) * S.cam.z > 2) { d.s.pts.push({ x: wp.x, y: wp.y }); redraw(false); }
      break;
    }
    case 'erase': eraseAt(wp); break;
    case 'create': {
      const s = d.s, st = d.start;
      let px = snap(wp.x), py = snap(wp.y);
      if (s.pts) {
        if (e.shiftKey) { // 45° steps
          const dx = px - st.x, dy = py - st.y, a = Math.round(Math.atan2(dy, dx) / (Math.PI / 4)) * (Math.PI / 4), L = Math.hypot(dx, dy);
          px = st.x + L * Math.cos(a); py = st.y + L * Math.sin(a);
        }
        s.pts[1] = { x: px, y: py };
      } else {
        let dx = px - st.x, dy = py - st.y;
        if (d.tool.eq || e.shiftKey) { const m = Math.max(Math.abs(dx), Math.abs(dy)); dx = (dx < 0 ? -1 : 1) * m; dy = (dy < 0 ? -1 : 1) * m; }
        if (e.altKey) { s.x = st.x - Math.abs(dx); s.y = st.y - Math.abs(dy); s.w = Math.abs(dx) * 2; s.h = Math.abs(dy) * 2; }
        else { s.x = Math.min(st.x, st.x + dx); s.y = Math.min(st.y, st.y + dy); s.w = Math.abs(dx); s.h = Math.abs(dy); }
      }
      redraw(false); break;
    }
    case 'move': {
      let dx = wp.x - d.start.x, dy = wp.y - d.start.y;
      if (!d.moved && Math.hypot(dx, dy) * S.cam.z < 3) break;
      d.moved = true;
      if (S.grid.on) { dx = snap(d.ob.x + dx) - d.ob.x; dy = snap(d.ob.y + dy) - d.ob.y; }
      for (const id of S.sel) { const o = findShape(id); if (o && d.orig.has(id)) { Object.assign(o.s, clone(d.orig.get(id))); moveShape(o.s, dx, dy); } }
      redraw(); break;
    }
    case 'resize': {
      const ob = d.ob, h = d.h;
      let x1 = ob.x, y1 = ob.y, x2 = ob.x + ob.w, y2 = ob.y + ob.h;
      const lp = d.fr.a ? rotAbout(wp.x, wp.y, d.fr.cx, d.fr.cy, -d.fr.a) : wp;
      const px = snap(lp.x), py = snap(lp.y);
      if (h.includes('w')) x1 = px; if (h.includes('e')) x2 = px;
      if (h.includes('n')) y1 = py; if (h.includes('s')) y2 = py;
      let nb = { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(1, Math.abs(x2 - x1)), h: Math.max(1, Math.abs(y2 - y1)) };
      const origs = [...d.orig.values()], texty = origs.some(o => o.type === 'text');
      if (origs.every(o => o.type === 'text') && ob.w && ob.h) { // text scales uniformly with its box
        const k = h.length === 2 ? Math.max(nb.w / ob.w, nb.h / ob.h) : (h === 'e' || h === 'w') ? nb.w / ob.w : nb.h / ob.h;
        nb = { w: ob.w * k, h: ob.h * k, x: h.includes('w') ? ob.x + ob.w - ob.w * k : ob.x, y: h.includes('n') ? ob.y + ob.h - ob.h * k : ob.y };
      } else if ((e.shiftKey || texty || origs.every(o => o.type === 'image')) && h.length === 2 && ob.w && ob.h) { // corner: keep aspect
        const k = Math.max(nb.w / ob.w, nb.h / ob.h);
        nb.w = ob.w * k; nb.h = ob.h * k;
        nb.x = h.includes('w') ? ob.x + ob.w - nb.w : ob.x; nb.y = h.includes('n') ? ob.y + ob.h - nb.h : ob.y;
      }
      for (const id of S.sel) {
        const o = findShape(id);
        if (o && d.orig.has(id)) {
          Object.assign(o.s, clone(d.orig.get(id))); mapShape(o.s, ob, nb);
          if (d.fr.a) { // keep the opposite edge fixed on screen
            const c0 = { x: d.fr.cx, y: d.fr.cy }, c1 = centerOf(nb), r = rotAbout(c1.x, c1.y, c0.x, c0.y, d.fr.a);
            moveShape(o.s, r.x - c1.x, r.y - c1.y);
          }
        }
      }
      redraw(); break;
    }
    case 'rotate': {
      let da = Math.atan2(wp.y - d.pivot.y, wp.x - d.pivot.x) - d.a0;
      if (e.shiftKey) { const st = Math.PI / 12; da = Math.round((d.base + da) / st) * st - d.base; }
      for (const id of S.sel) {
        const o = findShape(id), orig = d.orig.get(id);
        if (!o || !orig) continue;
        Object.assign(o.s, clone(orig));
        const c = centerOf(bounds(orig)), c2 = rotAbout(c.x, c.y, d.pivot.x, d.pivot.y, da);
        moveShape(o.s, c2.x - c.x, c2.y - c.y);
        o.s.a = (orig.a || 0) + da;
      }
      redraw(); break;
    }
    case 'node': {
      const n = d.s.nodes[d.i];
      const px = d.part === 'a' ? snap(wp.x) : wp.x, py = d.part === 'a' ? snap(wp.y) : wp.y;
      if (d.part === 'a') { n.x = px; n.y = py; }
      else if (d.part === 'out') { n.ox = px - n.x; n.oy = py - n.y; }
      else { n.ox = n.x - px; n.oy = n.y - py; }
      redraw(); break;
    }
    case 'cropresize': {
      const k = S.crop, f = k.full, lp = cropLocal(wp), h = d.h, w0 = d.w0;
      let x1 = w0.x, y1 = w0.y, x2 = w0.x + w0.w, y2 = w0.y + w0.h;
      const px = clamp(lp.x, f.x, f.x + f.w), py = clamp(lp.y, f.y, f.y + f.h);
      if (h.includes('w')) x1 = Math.min(px, x2 - CROP_MIN); if (h.includes('e')) x2 = Math.max(px, x1 + CROP_MIN);
      if (h.includes('n')) y1 = Math.min(py, y2 - CROP_MIN); if (h.includes('s')) y2 = Math.max(py, y1 + CROP_MIN);
      k.win = { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
      redraw(false); break;
    }
    case 'cropmove': {
      const k = S.crop, f = k.full, lp = cropLocal(wp), w0 = d.w0;
      k.win = { ...w0, x: clamp(w0.x + lp.x - d.start.x, f.x, f.x + f.w - w0.w), y: clamp(w0.y + lp.y - d.start.y, f.y, f.y + f.h - w0.h) };
      redraw(false); break;
    }
    case 'textbox': d.b = wp; redraw(false); break;
    case 'marquee': {
      d.b = wp;
      const r = { x: Math.min(d.a.x, d.b.x), y: Math.min(d.a.y, d.b.y), w: Math.abs(d.a.x - d.b.x), h: Math.abs(d.a.y - d.b.y) };
      const ids = new Set(d.base);
      for (const l of S.doc.layers) if (l.visible && !l.locked) for (const s of l.shapes) {
        const b = aabb(s);
        if (b.x < r.x + r.w && b.x + b.w > r.x && b.y < r.y + r.h && b.y + b.h > r.y) ids.add(s.id);
      }
      S.sel = ids; redraw(false); break;
    }
  }
});

function endDrag() {
  const d = S.drag; S.drag = null;
  if (!d) return;
  if (d.k === 'pan') board.style.cursor = (S.tool === 'hand' || S.space) ? 'grab' : S.tool === 'select' ? 'default' : 'crosshair';
  switch (d.k) {
    case 'pan': persist(); break;
    case 'pennode': redraw(false); break;
    case 'brush': {
      const s = d.s, p = s.pts, a = p[0], b = p[p.length - 1];
      if (p.length > 6 && Math.hypot(a.x - b.x, a.y - b.y) * S.cam.z < 14) s.closed = true; else s.fill = null;
      S.sel = new Set([s.id]); commit(); afterCreate(); break;
    }
    case 'erase': if (d.n) commit(); break;
    case 'create': {
      const s = d.s;
      const tiny = s.pts ? Math.hypot(s.pts[1].x - s.pts[0].x, s.pts[1].y - s.pts[0].y) < 3 : (s.w < 2 && s.h < 2);
      if (tiny) { // plain click: drop a default-sized shape
        if (s.pts) { removeShape(s); S.sel.clear(); redraw(); break; }
        const size = S.grid.on ? S.grid.size * 4 : 80;
        s.w = size; s.h = d.tool.id === 'oval' || d.tool.id === 'rect' || d.tool.id === 'rounded' ? Math.round(size * 0.65) : size;
        if (S.grid.on) s.h = Math.max(s.h, S.grid.size);
        s.x = d.start.x - (S.grid.on ? 0 : s.w / 2); s.y = d.start.y - (S.grid.on ? 0 : s.h / 2);
      }
      commit(); afterCreate(); break;
    }
    case 'move': if (d.moved) commit(); else { refreshProps(); } break;
    case 'resize': case 'node': commit(); break;
    case 'rotate': for (const x of selShapes()) { x.a = Math.atan2(Math.sin(x.a || 0), Math.cos(x.a || 0)); if (!x.a) delete x.a; } commit(); break;
    case 'marquee': refreshProps(); redraw(false); break;
    case 'textbox': {
      const a = { x: snap(d.a.x), y: snap(d.a.y) }, b = { x: snap(d.b.x), y: snap(d.b.y) };
      if (Math.hypot(d.b.x - d.a.x, d.b.y - d.a.y) * S.cam.z > 8)
        openText(null, null, { x: Math.min(a.x, b.x), y: Math.min(a.y, b.y), w: Math.max(30, Math.abs(a.x - b.x)), h: Math.max(20, Math.abs(a.y - b.y)) });
      else openText(null, a);
      redraw(false); break;
    }
  }
}
board.addEventListener('pointerup', endDrag);
board.addEventListener('pointercancel', endDrag);

board.addEventListener('dblclick', e => {
  if (S.tool !== 'select') return;
  const { sx, sy } = evPos(e), wp = toWorld(sx, sy);
  const nh = hitNode(wp);
  if (nh && nh.part === 'a') { // toggle corner <-> smooth
    bakePath(nh.s);
    const ns = nh.s.nodes, n = ns[nh.i];
    if (n.ox || n.oy) { n.ox = 0; n.oy = 0; }
    else {
      const a = ns[(nh.i - 1 + ns.length) % ns.length], b = ns[(nh.i + 1) % ns.length];
      n.ox = (b.x - a.x) / 6; n.oy = (b.y - a.y) / 6;
    }
    commit(); return;
  }
  const hit = pickAt(wp.x, wp.y);
  if (hit && hit.s.type === 'image') { S.sel = new Set([hit.s.id]); S.doc.active = hit.l.id; refreshProps(); enterCrop(hit.s); return; }
  if (hit) { S.sel = new Set([hit.s.id]); S.doc.active = hit.l.id; refreshProps(); openText(hit.s); }
  else openText(null, { x: snap(wp.x), y: snap(wp.y) });
});

board.addEventListener('wheel', e => {
  e.preventDefault();
  if (S.editing) commitText();
  const { sx, sy } = evPos(e);
  if (e.ctrlKey || e.metaKey) setZoom(S.cam.z * Math.exp(-e.deltaY * 0.01), sx, sy);
  else { S.cam.x -= e.deltaX; S.cam.y -= e.deltaY; redraw(false); persist(); }
}, { passive: false });

/* ============================== keyboard ============================== */
window.addEventListener('keydown', e => {
  const tag = (e.target.tagName || '').toLowerCase();
  if (tag === 'input' && e.target.type !== 'range' && e.target.type !== 'color') return;
  if (tag === 'textarea' || tag === 'select') return;
  const mod = e.ctrlKey || e.metaKey, k = e.key.toLowerCase();
  if (e.key === ' ' ) { if (!S.space) { S.space = true; board.style.cursor = 'grab'; } e.preventDefault(); return; }
  if (mod) {
    if (k === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); }
    else if (k === 'y') { e.preventDefault(); redo(); }
    else if (k === 'd') { e.preventDefault(); duplicateSel(); }
    else if (k === 'c' && e.shiftKey) { e.preventDefault(); copyPNG(); }
    else if (k === 'c') { copySel(); }
    else if (k === 'v') { pasteSel(); }
    else if (k === 'x') { copySel(); deleteSel(); }
    else if (k === 'a') { e.preventDefault(); S.sel = new Set(S.doc.layers.filter(l => l.visible && !l.locked).flatMap(l => l.shapes.map(s => s.id))); refreshProps(); redraw(false); }
    else if (k === 's') { e.preventDefault(); saveProject(); }
    else if (e.key === ']') { e.preventDefault(); reorder(e.shiftKey ? 'front' : 'fwd'); }
    else if (e.key === '[') { e.preventDefault(); reorder(e.shiftKey ? 'bottom' : 'back'); }
    return;
  }
  if (S.crop) {
    if (e.key === 'Enter') commitCrop(); else if (e.key === 'Escape') cancelCrop();
    return;
  }
  if (e.key === 'Enter' && S.sel.size === 1 && selShapes()[0].type === 'image') { e.preventDefault(); enterCrop(selShapes()[0]); return; }
  if (e.key === 'Escape') {
    if (S.draft) finishPen(false);
    else { S.sel.clear(); refreshProps(); redraw(false); setTool('select'); }
    return;
  }
  if (e.key === 'Enter' && S.draft) { finishPen(false); return; }
  if (e.key === 'Delete' || e.key === 'Backspace') { if (S.sel.size) { e.preventDefault(); deleteSel(); } return; }
  const step = e.shiftKey ? 10 : 1;
  if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-step, 0); return; }
  if (e.key === 'ArrowRight') { e.preventDefault(); nudge(step, 0); return; }
  if (e.key === 'ArrowUp') { e.preventDefault(); nudge(0, -step); return; }
  if (e.key === 'ArrowDown') { e.preventDefault(); nudge(0, step); return; }
  if (e.key === '!' ) { fitContent(); return; }
  if (e.key === '+' || e.key === '=') { setZoom(S.cam.z * 1.25); return; }
  if (e.key === '-') { setZoom(S.cam.z / 1.25); return; }
  if (k === 'q') { lockBtn.click(); return; }
  const t = TOOLS.find(t => t.key === k);
  if (t) (t.action ? runAction(t.action) : setTool(t.id));
  else if (k === 'n') { S.grid.on = !S.grid.on; syncGrid(); redraw(false); persist(); }
});
window.addEventListener('keyup', e => {
  if (e.key === ' ' && S.space) { S.space = false; board.style.cursor = S.tool === 'hand' ? 'grab' : S.tool === 'select' ? 'default' : S.tool === 'text' ? 'text' : 'crosshair'; }
});
window.addEventListener('paste', e => {
  if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
  const files = [...(e.clipboardData ? e.clipboardData.items : [])].filter(i => i.type.startsWith('image/')).map(i => i.getAsFile()).filter(Boolean);
  if (files.length) { e.preventDefault(); addImageFiles(files.map((f, i) => f.name ? f : new File([f], 'pasted-' + (i + 1) + '.png', { type: f.type }))); }
});

/* ============================== boot ============================== */
try {
  const saved = JSON.parse(localStorage.getItem('sketchdraw:v1'));
  if (saved && saved.doc && Array.isArray(saved.doc.layers) && saved.doc.layers.length) {
    S.doc = saved.doc; S.images = saved.images || {};
    if (!layerById(S.doc.active)) S.doc.active = S.doc.layers[S.doc.layers.length - 1].id;
    Object.assign(S.style, saved.style || {}); Object.assign(S.exp, saved.exp || {}); Object.assign(S.grid, saved.grid || {});
    if (saved.cam) Object.assign(S.cam, saved.cam);
  }
} catch (e) { /* ignore corrupt storage */ }

hist.stack = [snapshot()]; hist.i = 0;
if (!(S.cam.x || S.cam.y)) { const r = stage.getBoundingClientRect(); S.cam.x = r.width / 2 - 100; S.cam.y = r.height / 2; }
syncExport(); syncGrid(); updateZoom();
setTool('select');
refreshLayers(); refreshProps(); updateTopbar();
resize();

(function loop() {
  if (dirty.main) { dirty.main = false; render(); }
  if (dirty.pv) { dirty.pv = false; drawPreview(); }
  requestAnimationFrame(loop);
})();

// small debug/test hook
window.__sketch = { S, commit, fitContent };
})();
