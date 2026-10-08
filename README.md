# SketchDraw

An Excalidraw-style sketchpad for game art: Photoshop-like layers, a path (pen) tool, fill bucket, sharp *and* rounded shapes, and one-click export. Pure static HTML/CSS/JS — no build step.

- **Shapes:** sharp rectangle, square, rounded rectangle, oval, circle, diamond, triangle, hexagon, star, line, arrow, pen path (Bézier), freehand brush, text
- **Fill = stroke by default** (the link button between the two swatches turns this off)
- **Layers panel** (right): add/duplicate/merge/delete, hide, lock, rename (double-click), drag to reorder, per-layer opacity
- **Export preview** (right, below layers): shows the trimmed export area; scroll to zoom in, drag to pan, minimum zoom = the whole trimmed image
- **Floating export bar:** copy PNG to clipboard (big button), download PNG / SVG, copy SVG code, background on/off, scale, padding, export selection only
- Grid + snap, undo/redo, project save/open (.json), autosave in the browser

Shortcuts: V select · H pan · R rect · S square · U rounded · O oval · C circle · D diamond · G triangle · X hexagon · Y star · L line · A arrow · P pen · B brush · T text · F fill · I picker · E eraser · N grid · Ctrl+Shift+C copy PNG.

## Deploy

Pushing to `main` deploys via `.github/workflows/pages.yml`. In the repo, set **Settings → Pages → Source: GitHub Actions** once.
