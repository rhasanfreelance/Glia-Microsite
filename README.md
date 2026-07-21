# GLIA — Interactive AI Concept Microsite

> **The mind behind your machines.**

GLIA is a premium concept microsite built to showcase modern frontend engineering, immersive storytelling, and animation-driven user experiences.

Inspired by the visual quality of Apple, Stripe, Linear, and Awwwards-winning digital experiences, the project combines smooth scrolling, scroll-synchronized Lottie animations, and cinematic transitions into a fast, responsive, framework-free website.

> **This is a fictional product concept created for portfolio and educational purposes.**

---

## Features

- Award-style scrolling experience
- GSAP + ScrollTrigger powered animations
- Scroll-synchronized Lottie animations
- Lenis smooth scrolling
- Fully responsive across desktop, tablet, and mobile
- High-performance, framework-free architecture
- Accessible semantic HTML
- SEO-friendly markup
- Custom cursor and micro-interactions
- Animated statistics and scroll progress
- Loading screen with animated intro
- Glassmorphism-inspired interface

---

## Tech Stack

| Technology                      | Purpose                      |
| ------------------------------- | ---------------------------- |
| HTML5                           | Semantic page structure      |
| CSS3                            | Styling, layouts, animations |
| Vanilla JavaScript (ES Modules) | Application logic            |
| GSAP                            | Motion & animation           |
| ScrollTrigger                   | Scroll-based storytelling    |
| Lottie Web                      | JSON vector animations       |
| Lenis                           | Smooth scrolling             |

No frameworks.

No CMS.

No build tools.

No bundlers.

---

## Project Structure

```
glia-microsite/
│
├── index.html
│
├── css/
│   ├── base.css
│   ├── components.css
│   ├── sections.css
│   └── responsive.css
│
├── js/
│   ├── main.js
│   ├── utils.js
│   ├── loader.js
│   ├── cursor.js
│   ├── navigation.js
│   ├── scroll-animations.js
│   ├── lottie-scenes.js
│   ├── counters.js
│   ├── form.js
│   └── lenis-init.js
│
└── assets/
    └── lottie/
```

---

## Running Locally

Because the project loads Lottie JSON files, it should be served over HTTP rather than opened directly using `file://`.

Start a local server:

```bash
python3 -m http.server 8080
```

Then visit:

```
http://localhost:8080
```

---

## Experience Highlights

The site is built around scroll-driven storytelling.

### Hero

- Animated loading sequence
- Split-text introduction
- Background parallax
- Ambient particle animation

### Manifesto

Words gradually reveal as the user scrolls, creating a reading rhythm that mirrors the narrative.

### Capabilities

A horizontally scrolling pinned section introduces GLIA's four core capabilities:

- Observe
- Connect
- Act
- Govern

### Neural Visualization

The centerpiece of the experience.

A Lottie animation is synchronized directly to scroll progress, allowing users to scrub forward and backward through the visualization frame by frame.

### Device

An animated reveal of GLIA's fictional hardware, enhanced with layered parallax and motion effects.

### Global Motion

- Smooth scrolling
- Progress indicator
- Section transitions
- Scroll-triggered reveals
- Responsive motion scaling
- Reduced-motion accessibility support

---

## Performance

The project was designed with performance as a first-class concern.

- Lightweight architecture
- Vanilla JavaScript
- GPU-accelerated animations
- Lazy-loaded animation assets
- Optimized Lottie files
- Responsive image loading
- Mobile-first responsive design
- Reduced-motion support
- Minimal layout shifts

---

## Accessibility

The project includes:

- Semantic HTML5
- Keyboard-friendly navigation
- ARIA where appropriate
- Motion reduction support
- Accessible contrast ratios
- Screen-reader friendly markup

---

## About GLIA

GLIA is an entirely fictional product concept.

Inspired by **glial cells** in the human nervous system, the idea imagines an AI that works quietly in the background—connecting tools, observing context, and automating small tasks without becoming another application users must constantly interact with.

Rather than replacing people, GLIA represents **support intelligence**, operating invisibly to reduce friction across everyday workflows.

---

## Design Inspiration

The visual language draws inspiration from:

- Apple
- Stripe
- Linear
- Nothing
- Vercel
- Framer
- Awwwards-winning digital experiences

---

## Future Improvements

- Backend-powered waitlist
- Real authentication
- Analytics dashboard
- CMS-powered content
- Additional Lottie sequences
- Dark/light theme toggle
- WebGL visualizations
- Internationalization

---

## Disclaimer

GLIA is a fictional concept created solely for portfolio and educational purposes.

No company, hardware product, AI platform, or service represented in this repository actually exists.

---

## License

This project is released under the MIT License.

---
