# Changelog

## [Unreleased] - feat/ui-improvements

### 3D Cartridge hover smoothing
- Replaced instant position.y teleport with lerp-based float (13% per frame via hoverY ref)
- invalidate() self-feeds demand renderer while animation settles - smooth 60fps hover

### Shadow removal
- Removed all SoftShadow canvas-texture meshes from the Three.js scene
- Removed ::after drop-shadow pseudo-element from .cartridge-card

### Contact page improvements
- Removed Turn over and Side view buttons from handset toolbar
- Phone starts in sleep/off state by default - user taps Power to wake
- On mobile (<=760px) 3D phone shell bypassed - form renders in clean card instead

### Sticky navbar
- site-header changed from position:relative to position:sticky;top:0
- Frosted glass: color-mix(paper 88%) + backdrop-filter:blur(14px)
- z-index raised to 200 to stay above 3D canvas
- Margin moved to padding so frosted background spans full width
