# GLIA — microsite

A premium, animation-driven marketing microsite for **GLIA**, a fictional
ambient-AI product. Built with plain HTML/CSS/JS — no framework, no build
step, no CMS.

## Stack

- HTML5 + semantic markup, ARIA where it earns its keep
- CSS3 (custom properties, no preprocessor)
- Vanilla JavaScript, ES modules
- [GSAP](https://gsap.com) + ScrollTrigger for every scroll-driven scene
- [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling, synced to GSAP's ticker
- [lottie-web](https://github.com/airbnb/lottie) for the three animated illustrations

All four libraries load from CDN in `index.html`. There is no npm install
and no bundler — open `index.html` through a local server and it runs.

## Running it locally

Any static file server works, e.g.:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

Opening `index.html` directly via `file://` will break the Lottie `path:`
fetches (blocked by CORS on `file://`) — always serve it over HTTP.

## Folder structure

```
glia/
├── index.html                 Single page, all sections
├── css/
│   ├── base.css                Design tokens (colors/type/spacing), reset, typography
│   ├── components.css          Loader, cursor, nav, buttons, chips, glass cards
│   ├── sections.css            Layout for each page section
│   └── responsive.css          Mobile-first breakpoints + pointer/motion media queries
├── js/
│   ├── main.js                  Boot sequence, wires every module together
│   ├── utils.js                  clamp/lerp/debounce/media-query helpers
│   ├── lenis-init.js             Smooth-scroll setup, synced to GSAP ticker
│   ├── loader.js                 Boot screen + progress simulation
│   ├── cursor.js                 Custom cursor, magnetic buttons, click ripples
│   ├── navigation.js             Mobile menu, scroll-spy, smooth anchors
│   ├── lottie-scenes.js          Ambient loop + scroll-scrubbed neural network
│   ├── scroll-animations.js      All ScrollTrigger scenes: pins, parallax, split-text
│   ├── counters.js               Stat counter animations
│   └── form.js                   Waitlist form (client-side only, see below)
└── assets/
    └── lottie/
        ├── loader-node.json      Boot-screen mark (looping)
        ├── ambient-particles.json Hero background particles (looping)
        └── neural-network.json   Scroll-scrubbed reasoning visualization
```

## Scroll choreography (what's driving what)

- **Hero** — parallax background drift + blur-out on exit, split-word intro
  on load.
- **Manifesto** — words brighten from 16% to 100% opacity as you scroll
  through the section (`scroll-animations.js → initManifesto`).
- **Capabilities** — pinned section, cards scroll horizontally as you scroll
  vertically (`initCapabilitiesHorizontalScroll`).
- **Visualization** — pinned section; the Lottie animation's current frame
  is set directly from `ScrollTrigger`'s `progress` value
  (`lottie-scenes.js → initNeuralVisualization`), so scrubbing forward,
  backward, or stopping mid-scroll always matches the exact frame — this is
  the fully scroll-synchronized animation called for in the brief.
- **Device** — puck/ring intro animation, chip parallax at different speeds
  per `data-parallax` value.
- **Dendrite rail** (desktop only, left edge) — a single SVG path whose
  `stroke-dashoffset` is scrubbed against total page scroll: the page's
  signature element.
- **Progress bar** (top edge) — same total-scroll scrub, drives `scaleX`.

Every scroll animation checks `prefers-reduced-motion` and either skips or
snaps to an end state instead of animating.

## Replacing the placeholder assets

Nothing here is stock photography — there's no product photo to replace.
The two things you'll want to swap for a real launch:

1. **`assets/og-cover.jpg`** — referenced in the `<meta property="og:image">`
   tag in `index.html` but not included in this delivery. Add a 1200×630
   share image at that path, or update the tag to point elsewhere.
2. **The three Lottie JSON files** — hand-authored placeholder animations
   (a pulsing loader mark, floating hero particles, a node-and-edge network
   that draws itself in). They're deliberately simple/on-brand so the site
   works end-to-end today. Drop in real exports from After Effects +
   Bodymovin at the same paths and same container aspect ratios and
   everything else (scroll-scrubbing, loop timing) keeps working — just
   confirm the new file's `op` (frame count) if you hand-tune the scrub math.

## Waitlist form

`js/form.js` validates the email client-side and swaps in a "you're on the
list" state — there's no backend wired up. Replace the body of the
`submit` handler with a real request (fetch to your API, a hosted form
service, etc.) when you're ready to collect real signups.

## Performance notes

- Lottie assets are hand-authored shape animations (SVG renderer) — no
  raster frames, so they stay under ~30KB each.
- Custom cursor / magnetic buttons / parallax are all gated behind
  `(hover: hover) and (pointer: fine)` — touch devices get native scrolling
  and tap behavior with zero extra JS cost.
- Fonts are loaded via `<link>` with `display=swap` to avoid blocking
  first paint; consider self-hosting the three weights used
  (`Space Grotesk 500/600/700`, `Inter 400/500/600`, `IBM Plex Mono 400/500`)
  for one fewer third-party origin in production.
- For a production deploy, pin the CDN library versions you ship with
  (already pinned to explicit version numbers, not `@latest`) and consider
  self-hosting GSAP/Lenis/lottie-web to remove the CDN as a dependency.
