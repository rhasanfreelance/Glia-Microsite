/* ==========================================================================
   scroll-animations.js — all GSAP / ScrollTrigger driven scenes:
   hero intro, split-text word reveals, pinned horizontal scroll,
   parallax, dendrite signature rail, marquee loop, generic reveals,
   and the top scroll-progress bar.
   ========================================================================== */

import { prefersReducedMotion, isMobileViewport } from './utils.js';

/** Split a container's text into individually-tweenable <span class="word"> elements. */
function splitWords(el){
  const text = el.textContent.trim();
  el.textContent = '';
  const words = text.split(/\s+/);
  words.forEach((w, i) => {
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = w + (i < words.length - 1 ? '\u00A0' : '');
    el.appendChild(span);
  });
  return el.querySelectorAll('.word');
}

/** Wrap the pre-grouped hero line spans in a mask, split into per-word spans for a staggered rise-in. */
function splitHeroLines(){
  const lines = document.querySelectorAll('#heroTitle .line > span');
  const allWords = [];
  lines.forEach((lineSpan) => {
    const text = lineSpan.textContent;
    const hasGradient = lineSpan.classList.contains('text-gradient');
    lineSpan.textContent = '';
    text.split(' ').forEach((w, i, arr) => {
      const word = document.createElement('span');
      word.style.display = 'inline-block';
      word.style.willChange = 'transform';
      word.textContent = w + (i < arr.length - 1 ? '\u00A0' : '');
      if (hasGradient) word.classList.add('text-gradient');
      lineSpan.appendChild(word);
      allWords.push(word);
    });
  });
  return allWords;
}

/** The page-load hero reveal — runs once, right after the loader clears. */
export function playHeroIntro(){
  const words = splitHeroLines();
  const reduced = prefersReducedMotion();

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  if (reduced){
    gsap.set(words, { opacity: 1, y: 0 });
    gsap.set(['.hero__eyebrow', '.hero__sub', '.hero__actions', '.hero__foot'], { opacity: 1, y: 0 });
    return;
  }

  gsap.set(words, { yPercent: 120, opacity: 0 });
  gsap.set(['.hero__eyebrow', '.hero__sub', '.hero__actions', '.hero__foot'], { opacity: 0, y: 16 });

  tl.to('.hero__eyebrow', { opacity: 1, y: 0, duration: 0.6 })
    .to(words, { yPercent: 0, opacity: 1, duration: 1, stagger: 0.045 }, '-=0.35')
    .to('.hero__sub', { opacity: 1, y: 0, duration: 0.7 }, '-=0.55')
    .to('.hero__actions', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
    .to('.hero__foot', { opacity: 1, y: 0, duration: 0.7 }, '-=0.45');
}

export function initScrollAnimations(){
  const reduced = prefersReducedMotion();
  const mobile = isMobileViewport();

  initProgressBar();
  initDendriteRail();
  initHeroParallax(reduced);
  initManifesto(reduced);
  initCapabilitiesHorizontalScroll(mobile);
  initDeviceParallax(reduced);
  initMarquee(reduced);
  initGenericReveals();
}

/* ---------------------------------------------------------------------- */
/* Top progress bar — reflects total page scroll                          */
/* ---------------------------------------------------------------------- */
function initProgressBar(){
  const fill = document.getElementById('progressFill');
  gsap.to(fill, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      scrub: 0.3,
    },
  });
  gsap.set(fill, { scaleX: 0, transformOrigin: 'left center' });
}

/* ---------------------------------------------------------------------- */
/* Dendrite signature rail — the signal grows down the page as you scroll */
/* ---------------------------------------------------------------------- */
function initDendriteRail(){
  const path = document.getElementById('railSignal');
  if (!path) return;
  gsap.set(path, { strokeDashoffset: 1000, strokeDasharray: 1000 });
  gsap.to(path, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      scrub: 0.3,
    },
  });
}

/* ---------------------------------------------------------------------- */
/* Hero — background parallax drift + grid fade on scroll-out             */
/* ---------------------------------------------------------------------- */
function initHeroParallax(reduced){
  if (reduced) return;
  gsap.to('.hero__grid', {
    yPercent: 20,
    opacity: 0.15,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('.hero__ambient', {
    yPercent: 12,
    scale: 1.08,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('.hero__content', {
    yPercent: -10,
    opacity: 0.4,
    filter: 'blur(6px)',
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
}

/* ---------------------------------------------------------------------- */
/* Manifesto — pinned, words brighten progressively as you scroll         */
/* ---------------------------------------------------------------------- */
function initManifesto(reduced){
  const el = document.getElementById('manifestoText');
  if (!el) return;
  const words = splitWords(el);

  if (reduced){
    gsap.set(words, { opacity: 1 });
    return;
  }

  gsap.to(words, {
    opacity: 1,
    color: 'var(--bone)',
    stagger: 0.12,
    ease: 'none',
    scrollTrigger: {
      trigger: '.manifesto',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      pin: false,
    },
  });
}

/* ---------------------------------------------------------------------- */
/* Capabilities — pinned section, cards scroll horizontally               */
/* ---------------------------------------------------------------------- */
function initCapabilitiesHorizontalScroll(mobile){
  const track = document.getElementById('capTrack');
  const pin = document.getElementById('capPin');
  if (!track || !pin) return;

  // Recompute the horizontal travel distance so this stays correct
  // across resizes and different card widths at each breakpoint.
  const getScrollDistance = () => Math.max(0, track.scrollWidth - pin.clientWidth);

  gsap.to(track, {
    x: () => -getScrollDistance(),
    ease: 'none',
    scrollTrigger: {
      trigger: pin.closest('section'),
      start: 'top top',
      end: () => `+=${getScrollDistance() + window.innerHeight * 0.5}`,
      pin: pin,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });
}

/* ---------------------------------------------------------------------- */
/* Device — puck float-in + chip parallax + subtle continuous rotation    */
/* ---------------------------------------------------------------------- */
function initDeviceParallax(reduced){
  const stage = document.getElementById('deviceStage');
  if (!stage) return;

  gsap.from('#devicePuck', {
    scale: 0.7,
    opacity: 0,
    rotate: reduced ? 0 : -25,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: { trigger: stage, start: 'top 75%' },
  });

  gsap.from('.device__ring', {
    scale: 0.6,
    opacity: 0,
    duration: 1.1,
    ease: 'power3.out',
    scrollTrigger: { trigger: stage, start: 'top 75%' },
  });

  if (!reduced){
    gsap.to('.device__ring', {
      rotate: 360,
      duration: 40,
      repeat: -1,
      ease: 'none',
    });

    document.querySelectorAll('[data-parallax]').forEach((chip, i) => {
      const speed = parseFloat(chip.dataset.parallax) || 1;
      gsap.from(chip, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: stage, start: 'top 70%' },
      });
      gsap.to(chip, {
        yPercent: 14 * speed,
        ease: 'none',
        scrollTrigger: { trigger: stage, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  }
}

/* ---------------------------------------------------------------------- */
/* Marquee — infinite linear loop, paused politely under reduced motion   */
/* ---------------------------------------------------------------------- */
function initMarquee(reduced){
  const track = document.getElementById('marqueeTrack');
  if (!track || reduced) return;
  // Track content is duplicated in the HTML, so animating exactly -50%
  // creates a seamless loop with no visible reset.
  gsap.to(track, {
    xPercent: -50,
    ease: 'none',
    duration: 22,
    repeat: -1,
  });
}

/* ---------------------------------------------------------------------- */
/* Generic reveal-on-scroll for cards, stats, footer columns, etc.        */
/* ---------------------------------------------------------------------- */
function initGenericReveals(){
  const groups = [
    { sel: '.stat', y: 24 },
    { sel: '.footer__col', y: 16 },
    { sel: '.device__head > *', y: 20 },
  ];

  groups.forEach(({ sel, y }) => {
    const els = gsap.utils.toArray(sel);
    if (!els.length) return;
    gsap.set(els, { opacity: 0, y });
    ScrollTrigger.batch(els, {
      start: 'top 88%',
      onEnter: (batch) => gsap.to(batch, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
      }),
      once: true,
    });
  });

  // CTA section — simple fade/scale entrance for the whole card.
  gsap.from('.cta__inner', {
    opacity: 0,
    scale: 0.96,
    y: 20,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.cta', start: 'top 70%' },
  });
}
