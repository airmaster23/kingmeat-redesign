/* ========================================================================
   KING MEAT - Pattern A: Japanese Luxury (Black & Gold)
   JavaScript: Interactions & Animations
   ======================================================================== */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initHeader();
    initHamburger();
    initFadeIn();
    initSmoothScroll();
  }

  /* =====================================================================
     HEADER: Sticky with gold border on scroll
     ===================================================================== */
  function initHeader() {
    const header = $('#header');
    if (!header) return;

    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        if (window.scrollY > 60) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* =====================================================================
     HAMBURGER: Full-screen dark overlay menu
     ===================================================================== */
  function initHamburger() {
    const btn = $('#hamburger');
    const menu = $('#mobileMenu');
    if (!btn || !menu) return;

    let isOpen = false;

    function toggle() {
      isOpen = !isOpen;
      btn.classList.toggle('is-active', isOpen);
      menu.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function close() {
      if (!isOpen) return;
      isOpen = false;
      btn.classList.remove('is-active');
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', toggle);

    // Close on link click
    $$('a', menu).forEach(link => {
      link.addEventListener('click', close);
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
    });
  }

  /* =====================================================================
     FADE-IN: IntersectionObserver for .fade-in elements
     Subtle translateY(20px) + opacity animation
     ===================================================================== */
  function initFadeIn() {
    const elements = $$('.fade-in');
    if (!elements.length) return;

    // Immediately reveal hero content (above the fold)
    const heroContent = $('.hero__content');
    if (heroContent) {
      setTimeout(() => {
        heroContent.classList.add('is-visible');
      }, 300);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    elements.forEach(el => {
      // Skip hero content (handled separately above)
      if (el === heroContent) return;
      observer.observe(el);
    });
  }

  /* =====================================================================
     SMOOTH SCROLL: For anchor links
     ===================================================================== */
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;

        const target = $(targetId);
        if (!target) return;

        e.preventDefault();
        const headerH = $('#header') ? $('#header').offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH;

        window.scrollTo({
          top: top,
          behavior: 'smooth',
        });
      });
    });
  }

})();
