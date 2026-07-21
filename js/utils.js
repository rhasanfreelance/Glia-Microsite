/* ==========================================================================
   utils.js — small shared helpers used across modules
   ========================================================================== */

/** Clamp a number between min and max. */
export const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

/** Linear interpolation. */
export const lerp = (a, b, t) => a + (b - a) * t;

/** Map a value from one range to another, clamped. */
export const mapRange = (v, inMin, inMax, outMin, outMax) => {
  const t = clamp((v - inMin) / (inMax - inMin), 0, 1);
  return outMin + t * (outMax - outMin);
};

/** Debounce — collapse rapid repeated calls (used on resize). */
export function debounce(fn, wait = 150){
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

/** True if the user's OS/browser asks for reduced motion. */
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True if the primary input is a mouse/trackpad (fine pointer + hover). */
export const hasFinePointer = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** True on small/coarse viewports — used to simplify animation timelines. */
export const isMobileViewport = () => window.innerWidth < 820;

/** requestAnimationFrame-throttled event listener helper. */
export function onRaf(fn){
  let ticking = false;
  return (...args) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      fn(...args);
      ticking = false;
    });
  };
}
