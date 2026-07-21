/* ==========================================================================
   navigation.js — mobile menu toggle, smooth anchor scrolling, nav
   background state on scroll, and scroll-spy active-link highlighting.
   ========================================================================== */

import { scrollToHash } from './lenis-init.js';

export function initNavigation(lenis){
  const nav = document.getElementById('siteNav');
  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');
  const navLinks = document.querySelectorAll('[data-nav-link]');

  // ---- Mobile menu open/close ----
  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    mobile.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  const openMenu = () => {
    toggle.setAttribute('aria-expanded', 'true');
    mobile.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  mobile.querySelectorAll('[data-nav-close]').forEach((a) => {
    a.addEventListener('click', closeMenu);
  });

  // ---- Smooth anchor navigation ----
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      if (!hash || !hash.startsWith('#')) return;
      e.preventDefault();
      closeMenu();
      scrollToHash(lenis, hash);
      history.pushState(null, '', hash);
    });
  });

  // ---- Nav background state once the page has scrolled ----
  ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    onUpdate: (self) => {
      nav.classList.toggle('is-scrolled', self.scroll() > 80);
    },
  });

  // ---- Scroll-spy: highlight the link for the section in view ----
  const sections = ['product', 'how-it-works', 'device', 'access']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onToggle: (self) => {
        if (!self.isActive) return;
        navLinks.forEach((l) => {
          l.classList.toggle('is-active', l.getAttribute('href') === `#${section.id}`);
        });
      },
    });
  });
}
