# NOMAD / PLAY

Lemayan Leleina’s interactive portfolio. Open this folder in Antigravity and use its terminal.

## Run

Requires Node.js 24 or later. Dependencies are already installed in this workspace.

```sh
npm install
npm run dev
```

Open the address printed in the terminal. For a production preview:

```sh
npm run build
npm start -- --port 3001
```

## Console controls

All physical controls are also native HTML buttons with keyboard focus and labels. The screen and controls render in the initial HTML, so the collection remains usable during WebGL startup or when WebGL is unavailable.

- Up / down: select a menu item; scroll details when an item is open.
- Left / right: browse projects in the current filter.
- A / Enter: open the selected menu item, or load a cartridge when empty.
- B / Escape: return from details; eject when already in the menu.
- Menu / M: return to the project menu.
- Start / S: open the full project page.

Mobile uses an immediately interactive dimensional CSS console with native controls and a cartridge shelf below it. It does not load the Three.js scene. One Web Animations timeline owns the complete 1.1-second cartridge flight, from shelf to slot; geometry is measured once and only transforms and opacity animate. There is no forced page scroll, frame-by-frame layout measurement, or handover to another renderer. Desktop retains the procedural WebGL console and 1.6-second cartridge flight, loading the scene only near the viewport. Reduced motion and list view remain available. Rapid selections finish the current flight, then load the latest selection.

The transparent head logo is integrated directly into the navbar wordmark as the letter **O** in **NOMAD / PLAY** (`N[head]MAD / PLAY`), without jumping animations, featuring an optical baseline balance and subtle hover response. The image is a 9,872-byte WebP. See `docs/brand-asset.md` for the original edit prompt and source.

Header blur and automatic navigation prefetching are disabled to avoid extra paint work and downloading unvisited routes. Fonts use local Latin subsets. Desktop cartridge label textures use 75% fewer pixels than the original 512 x 580 textures. The desktop contact handset loads near the viewport; the existing direct mobile contact form is preserved.

## Contact email

Copy `.env.example` to `.env.local`, then set a Resend key, a sender on a verified domain, and the destination inbox. Restart the server after changes. Secrets remain on the server.

Until configured, submission returns an explicit error and offers an email link containing the draft. Drafts remain in the current browser tab. Success is shown only after the email provider accepts the request. Email, call, and WhatsApp shortcuts work independently.

Contact uses one Samsung Galaxy S26 Ultra-inspired procedural 3D handset on every platform. Message, Turn over, and Side controls rotate the physical model; the metal frame, raised camera island, four layered lenses, antenna breaks, earpiece, side keys, USB-C port, speaker grille, and pen silo are geometry. Power sleeps or wakes the screen without losing the draft. The native contact form overlays the front display for crisp text, keyboard access, and touch scrolling. It stays usable while the model loads and when WebGL is unavailable. The model is a custom visual interpretation, not manufacturer CAD. Design reference: https://design.samsung.com/global/contents/view/galaxy-s26

The current limiter is per running server instance. Before public deployment, connect a shared rate limiter and confirm sender-domain delivery.

## Content and checks

Projects and public contact links live in `lib/projects.ts`. Blog articles were migrated from the existing portfolio’s public source; their original text is in `lib/original-blog-posts.json`. The 3D console uses procedural geometry rather than a large model download. Fonts are installed locally.

```sh
npm run typecheck
npm test
npm run build
```

Next.js build workers use threads so the project can build in the restricted Windows workspace. Normal `npm run dev` can run from Antigravity; this agent’s sandbox may block the development command’s child process. The production preview does not require that child process.
