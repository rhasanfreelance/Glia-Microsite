/* ==========================================================================
   loader.js — boot sequence: plays the loader Lottie, counts a synthetic
   progress value up to 100, then reveals the page with a coordinated
   GSAP intro (hero title split-reveal + nav fade).
   ========================================================================== */

import { prefersReducedMotion } from './utils.js';

export function runLoader({ onComplete } = {}){
  const loaderEl = document.getElementById('loader');
  const pctEl = document.getElementById('loaderPct');
  const mount = document.getElementById('loaderLottie');

  let anim = null;
  if (window.lottie && !prefersReducedMotion()){
    anim = window.lottie.loadAnimation({
      container: mount,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/lottie/loader-node.json',
    });
  }

  // Drive a synthetic progress counter. Real asset loading (fonts/images)
  // is cheap here, so we simulate a short, deliberate boot feel rather than
  // tying the bar to network events that would resolve instantly.
  const state = { pct: 0 };
  const finish = () => {
    if (anim) anim.destroy();
    loaderEl.setAttribute('hidden', '');
    document.body.classList.remove('is-loading');
    if (typeof onComplete === 'function') onComplete();
  };

  if (prefersReducedMotion()){
    pctEl.textContent = '100%';
    setTimeout(finish, 200);
    return;
  }

  gsap.to(state, {
    pct: 100,
    duration: 1.6,
    ease: 'power2.inOut',
    onUpdate: () => { pctEl.textContent = `${Math.round(state.pct)}%`; },
    onComplete: () => {
      gsap.to(loaderEl, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power3.inOut',
        delay: 0.15,
        onComplete: finish,
      });
    },
  });
}
