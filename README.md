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

Mobile uses a scrolling cartridge shelf, larger control targets, and a centered console. Desktop fits the entire scene inside its own column, independently of the introduction and filters. Cartridge labels are textures on the meshes. Rendering pauses while idle; shadows use small baked textures rather than repeated blur passes. Project selection runs a 1.6-second ejection, lift, arcing flight, alignment, and insertion sequence. The new project appears only after insertion. Rapid selections queue the latest destination without interrupting a flight. Mobile carries the visible shelf sleeve across the canvas boundary before handing over to the 3D cartridge. List view and reduced motion are available.

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
