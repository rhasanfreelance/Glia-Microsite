/* ==========================================================================
   cursor.js — custom cursor dot + trailing ring, magnetic button pull,
   and click ripple feedback. All gated behind a fine-pointer check so
   touch devices keep their native cursor/tap behaviour untouched.
   ========================================================================== */

import { hasFinePointer, prefersReducedMotion } from './utils.js';

export function initCursor(){
  if (!hasFinePointer()) return;

  document.documentElement.classList.add('has-custom-cursor');

  const dot = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  const reduced = prefersReducedMotion();

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const ringPos = { x: pos.x, y: pos.y };

  window.addEventListener('pointermove', (e) => {
    pos.x = e.clientX; pos.y = e.clientY;
    gsap.set(dot, { x: pos.x, y: pos.y });
  });

  // Ring trails the dot with easing for a soft, weighted feel.
  gsap.ticker.add(() => {
    if (reduced) return;
    ringPos.x += (pos.x - ringPos.x) * 0.18;
    ringPos.y += (pos.y - ringPos.y) * 0.18;
    gsap.set(ring, { x: ringPos.x, y: ringPos.y });
  });

  // Grow the ring over interactive elements.
  const interactiveSelector = 'a, button, [data-magnetic], input[type="submit"]';
  document.addEventListener('pointerover', (e) => {
    if (e.target.closest(interactiveSelector)){
      ring.classList.add('is-active');
    }
  });
  document.addEventListener('pointerout', (e) => {
    if (e.target.closest(interactiveSelector)){
      ring.classList.remove('is-active');
    }
  });

  document.addEventListener('pointerdown', () => gsap.to(dot, { scale: 0.6, duration: 0.15 }));
  document.addEventListener('pointerup', () => gsap.to(dot, { scale: 1, duration: 0.25 }));

  document.addEventListener('pointerleave', () => {
    gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
  });
  document.addEventListener('pointerenter', () => {
    gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
  });
}

/** Magnetic pull: interactive elements nudge toward the cursor within their bounds. */
export function initMagneticButtons(){
  if (!hasFinePointer() || prefersReducedMotion()) return;

  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const strength = 0.35;

    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      gsap.to(el, {
        x: relX * strength,
        y: relY * strength,
        duration: 0.4,
        ease: 'power3.out',
      });
    });

    el.addEventListener('pointerleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

/** Ripple feedback on click for any element containing a .btn__ripple span. */
export function initRipples(){
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('pointerdown', (e) => {
      const ripple = btn.querySelector('.btn__ripple');
      if (!ripple) return;
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.8;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      gsap.set(ripple, { width: size, height: size, x, y, scale: 0, opacity: 1 });
      gsap.to(ripple, {
        scale: 1,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    });
  });
}
