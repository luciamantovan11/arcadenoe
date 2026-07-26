/* ============================================
   ARCA DE NOÉ - Landing Page Scripts
   Lightweight vanilla JS (~80 lines)
   ============================================ */

(function() {
  'use strict';

  /* --- Navbar scroll effect --- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
      const currentScroll = window.scrollY;
      navbar.classList.toggle('scrolled', currentScroll > 50);
      lastScroll = currentScroll;
    }, { passive: true });
  }

  /* --- Navbar hamburger toggle --- */
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function() {
      const isOpen = navbarMenu.classList.toggle('open');
      this.setAttribute('aria-expanded', String(isOpen));
      this.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Close menu on link click */
    navbarMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navbarMenu.classList.remove('open');
        navbarToggle.setAttribute('aria-expanded', 'false');
        navbarToggle.setAttribute('aria-label', 'Abrir menu');
        document.body.style.overflow = '';
      });
    });

    /* Close menu on resize to desktop */
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) {
        navbarMenu.classList.remove('open');
        navbarToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* --- Scroll reveal (IntersectionObserver) --- */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function(el) { observer.observe(el); });
  } else {
    revealElements.forEach(function(el) { el.classList.add('visible'); });
  }

  /* --- Animated counter --- */
  function animateCounter(el, target, suffix) {
    var current = 0;
    var increment = Math.ceil(target / 60);
    var timer = setInterval(function() {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current.toLocaleString('pt-BR') + (suffix || '');
    }, 20);
  }

  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-count'), 10);
          var suffix = el.getAttribute('data-suffix') || '';
          animateCounter(el, target, suffix);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(el) { counterObserver.observe(el); });
  }

  /* --- FAQ accordion --- */
  var faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = this.closest('.faq-item');
      var isActive = item.classList.contains('active');

      /* Close all */
      document.querySelectorAll('.faq-item.active').forEach(function(openItem) {
        openItem.classList.remove('active');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      /* Open clicked (if it was closed) */
      if (!isActive) {
        item.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --- External link security --- */
  function secureExternalLinks() {
    document.querySelectorAll('a[href]').forEach(function(a) {
      try {
        var url = new URL(a.href, document.baseURI);
        if ((url.protocol === 'http:' || url.protocol === 'https:') && url.host !== location.host) {
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
        }
      } catch(e) {}
    });
  }
  secureExternalLinks();

})();
