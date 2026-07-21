/* ==========================================================================
   lenis-init.js — smooth scrolling, wired into GSAP's ticker so every
   ScrollTrigger stays perfectly in sync with the smoothed scroll position.
   ========================================================================== */

import { prefersReducedMotion } from './utils.js';

export function initLenis(){
  // Respect reduced-motion: fall back to native scroll, no smoothing class applied.
  if (prefersReducedMotion()){
    return null;
  }

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.1,
    // Native touch scroll on mobile feels better than simulated smoothing.
    syncTouch: false,
  });

  // Let GSAP's ticker drive Lenis so both stay on the same animation frame.
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Keep ScrollTrigger's internal scroll measurement in sync with Lenis.
  lenis.on('scroll', ScrollTrigger.update);

  return lenis;
}

/** Smooth-scroll to an in-page anchor, accounting for the fixed nav height. */
export function scrollToHash(lenis, hash){
  const target = document.querySelector(hash);
  if (!target) return;
  if (lenis){
    lenis.scrollTo(target, { offset: -12, duration: 1.2 });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}
