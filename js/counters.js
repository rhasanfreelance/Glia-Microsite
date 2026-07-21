/* ==========================================================================
   counters.js — animates the stat numbers up from 0 once each one
   scrolls into view, using its own ScrollTrigger so it only plays once.
   ========================================================================== */

import { prefersReducedMotion } from './utils.js';

export function initCounters(){
  const counters = document.querySelectorAll('[data-counter]');
  const reduced = prefersReducedMotion();

  counters.forEach((el) => {
    const target = parseFloat(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    const state = { val: 0 };

    if (reduced){
      el.textContent = `${target}${suffix}`;
      return;
    }

    gsap.to(state, {
      val: target,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => {
        el.textContent = `${Math.round(state.val)}${suffix}`;
      },
    });
  });
}
