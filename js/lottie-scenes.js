/* ==========================================================================
   lottie-scenes.js — Lottie integrations.
     1. Ambient hero background loop (autoplay, decorative).
     2. Neural network visualization: fully scroll-scrubbed. Frame position
        is driven directly by ScrollTrigger progress rather than autoplay,
        so the animation always matches the user's exact scroll position —
        forward, backward, or paused mid-scroll.
   ========================================================================== */

import { prefersReducedMotion, isMobileViewport } from './utils.js';

const STAGES = [
  { at: 0.0, label: '01 · Idle', text: "A single node, waiting — GLIA stays dormant until context gives it a reason to think." },
  { at: 0.28, label: '02 · Listening', text: 'Signals start arriving from your calendar, threads and files as they change.' },
  { at: 0.58, label: '03 · Reasoning', text: 'The network wires itself together, weighing what actually matters right now.' },
  { at: 0.85, label: '04 · Acting', text: 'A resolved path lights up end to end — and GLIA quietly carries it out.' },
];

export function initLottieScenes(){
  initAmbientLoop();
  initNeuralVisualization();
}

function initAmbientLoop(){
  const mount = document.getElementById('ambientLottie');
  if (!mount || !window.lottie) return;
  // Skip the decorative loop entirely under reduced motion.
  if (prefersReducedMotion()) return;

  window.lottie.loadAnimation({
    container: mount,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'assets/lottie/ambient-particles.json',
  });
}

function initNeuralVisualization(){
  const mount = document.getElementById('neuralLottie');
  const pin = document.getElementById('vizPin');
  if (!mount || !pin || !window.lottie) return;

  const anim = window.lottie.loadAnimation({
    container: mount,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'assets/lottie/neural-network.json',
  });

  const labelEl = document.getElementById('vizStageLabel');
  const textEl = document.getElementById('vizStageText');
  const ticks = document.querySelectorAll('[data-tick]');
  const reduced = prefersReducedMotion();

  let lastStageIndex = -1;
  const updateStage = (progress) => {
    let idx = 0;
    STAGES.forEach((s, i) => { if (progress >= s.at) idx = i; });
    if (idx === lastStageIndex) return;
    lastStageIndex = idx;
    labelEl.textContent = STAGES[idx].label;
    textEl.textContent = STAGES[idx].text;
    gsap.fromTo([labelEl, textEl], { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    ticks.forEach((t, i) => t.classList.toggle('is-active', i <= idx));
  };

  anim.addEventListener('DOMLoaded', () => {
    const totalFrames = anim.totalFrames;

    ScrollTrigger.create({
      trigger: pin.closest('section'),
      start: 'top top',
      end: '+=200%',
      pin: pin,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        // Scrub the Lottie frame directly against scroll progress — this is
        // the "fully synchronized" scene: frame 0 at scroll start, last
        // frame at scroll end, smoothly interpolated in between.
        if (!reduced){
          anim.goToAndStop(progress * totalFrames, true);
        } else {
          // Reduced motion: snap straight to the end state, no scrubbing.
          anim.goToAndStop(totalFrames - 1, true);
        }
        updateStage(progress);
      },
    });
  });
}
