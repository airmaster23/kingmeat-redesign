/* ============================================================
   KING MEAT — Pattern B: Warm Artisan — JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header shadow on scroll ---------- */
  const header = document.getElementById('header');
  if (header) {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.classList.toggle('is-scrolled', window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile drawer ---------- */
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerClose = document.getElementById('drawer-close');

  function openDrawer() {
    hamburger.classList.add('is-active');
    drawer.classList.add('is-active');
    drawerOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    hamburger.classList.remove('is-active');
    drawer.classList.remove('is-active');
    drawerOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  if (hamburger && drawer && drawerOverlay) {
    hamburger.addEventListener('click', () => {
      drawer.classList.contains('is-active') ? closeDrawer() : openDrawer();
    });
    drawerOverlay.addEventListener('click', closeDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  /* ---------- IntersectionObserver fade-in ---------- */
  const fadeEls = document.querySelectorAll('.anim-fade');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    let delay = 0;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting);
      visible.forEach((entry, i) => {
        const el = entry.target;
        // Stagger siblings within the same parent
        el.style.transitionDelay = `${i * 80}ms`;
        el.classList.add('is-visible');
        el.addEventListener('transitionend', () => {
          el.style.transitionDelay = '';
        }, { once: true });
        observer.unobserve(el);
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });
    fadeEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything
    fadeEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Smooth anchor scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const headerH = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    let topTicking = false;
    const checkScroll = () => {
      if (!topTicking) {
        requestAnimationFrame(() => {
          backToTop.classList.toggle('is-visible', window.scrollY > 600);
          topTicking = false;
        });
        topTicking = true;
      }
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Lazy image reveal ---------- */
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.6s ease';
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      }, { once: true });
    }
  });

});
