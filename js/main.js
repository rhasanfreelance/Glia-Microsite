/* ==========================================================================
   main.js — application entry point. Boots libraries, runs the loader,
   then wires up every scene once the DOM and vendor scripts are ready.
   Loaded as a module from index.html, so this only runs after HTML parse.
   ========================================================================== */

import { debounce } from './utils.js';
import { initLenis } from './lenis-init.js';
import { runLoader } from './loader.js';
import { initCursor, initMagneticButtons, initRipples } from './cursor.js';
import { initNavigation } from './navigation.js';
import { initLottieScenes } from './lottie-scenes.js';
import { initScrollAnimations, playHeroIntro } from './scroll-animations.js';
import { initCounters } from './counters.js';
import { initAccessForm } from './form.js';

document.body.classList.add('is-loading');

function boot(){
  // Register the ScrollTrigger plugin once, before any scene creates a trigger.
  gsap.registerPlugin(ScrollTrigger);

  const lenis = initLenis();

  initCursor();
  initNavigation(lenis);
  initLottieScenes();
  initScrollAnimations();
  initCounters();
  initAccessForm();

  // Ripples/magnetic pull are bound after the DOM is stable and interactive.
  initRipples();
  initMagneticButtons();

  // Keep pinned/measured sections accurate if the viewport or fonts resize.
  window.addEventListener('resize', debounce(() => ScrollTrigger.refresh(), 200));

  runLoader({
    onComplete: () => {
      playHeroIntro();
      ScrollTrigger.refresh();
    },
  });
}

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
