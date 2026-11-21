# Zombie Road: Last Escape — GamerKie Edition

A dependency-free HTML5 Canvas side-scrolling zombie-driving prototype. Runs locally and on GitHub Pages.

## Run
Open `index.html` in a modern browser, or serve this folder with any static file server. No build step or backend is required.

## Controls
- D / Right Arrow: accelerate
- A / Left Arrow: brake / reverse
- Space: boost input (booster upgrade required for an actual upgrade path)
- Escape: pause
- Touch: on-screen brake, boost and accelerate buttons

## GitHub Pages
1. Create a repository and upload the complete contents of this folder.
2. In repository Settings → Pages, choose Deploy from a branch, select `main` and `/ (root)`.
3. Open the published site URL after deployment completes.

All asset paths are relative, so a repository subpath is supported.

## Blogger iframe
Replace `YOUR-USERNAME` and `YOUR-REPOSITORY` with the actual published GitHub Pages URL:

```html
<div style="width:100%;max-width:1200px;margin:auto;aspect-ratio:16/9;min-height:520px">
  <iframe src="https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/"
    title="Zombie Road: Last Escape — GamerKie Edition"
    loading="lazy" allow="fullscreen; autoplay"
    allowfullscreen style="width:100%;height:100%;border:0"></iframe>
</div>
```

## Current implementation status
This ZIP is a **playable first milestone / vertical slice**, not the complete 36-section AAA scope. Implemented: Canvas side-scrolling run, responsive touch and keyboard controls, vehicle movement, terrain/parallax silhouettes, zombie collision and one-time run rewards, fuel pickups, collectible kits counter, fuel and hull end conditions, pause/retry, local save, garage upgrades (engine/fuel/tires/armor/suspension/boost), and a ten-vehicle roster with distinct configuration data.

Not yet implemented: full vehicle-specific art and animation, all 10 campaign environments as individually authored playable levels, functional 50-mission tracking UI, all 60 deliberately authored survival-kit placements, weapons, detailed component damage, championship/free-ride/event modes, audio suite, full achievements/statistics UI, IndexedDB migrations, and exhaustive device/browser QA. These are explicitly not represented as completed features.

## Tests
Run `npm test` with Node.js 18+.
