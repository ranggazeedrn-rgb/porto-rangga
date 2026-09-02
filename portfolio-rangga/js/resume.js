/**
 * Resume Page — Interactive Logic & Animations
 * Rangga Ramadiyanto Nurhakim — XII RPL 1 SMK Muhammadiyah Kota Tasikmalaya
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. Mobile Navigation Drawer Toggle
  // ---------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuDrawer.classList.toggle('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuDrawer.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 2. Active Nav ScrollSpy
  // ---------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav-link');

  function updateScrollSpy() {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    desktopNavLinks.forEach(link => {
      link.classList.remove('text-white', 'bg-white/[0.12]', 'border', 'border-white/20');
      link.classList.add('text-slate-400');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-white', 'bg-white/[0.12]', 'border', 'border-white/20');
        link.classList.remove('text-slate-400');
      }
    });
  }

  window.addEventListener('scroll', updateScrollSpy, { passive: true });

  // ---------------------------------------------------------------------------
  // 3. Print / Download CV Functionality
  // ---------------------------------------------------------------------------
  function handlePrintCV() {
    window.print();
  }

  const printBtns = [
    document.getElementById('print-cv-btn'),
    document.getElementById('hero-print-btn'),
    document.getElementById('mobile-print-btn')
  ];

  printBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', handlePrintCV);
    }
  });

  // ---------------------------------------------------------------------------
  // 4. Scroll-Triggered Reveal Animations (Intersection Observer)
  // ---------------------------------------------------------------------------
  const revealSections = document.querySelectorAll('.reveal-section');
  const staggerItems = document.querySelectorAll('.stagger-item');

  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  revealSections.forEach(section => {
    revealObserver.observe(section);
  });

  // Stagger items with delay
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Find siblings and apply staggered delay
        const parent = entry.target.parentElement;
        if (parent) {
          const siblings = parent.querySelectorAll('.stagger-item');
          siblings.forEach((sibling, i) => {
            setTimeout(() => {
              sibling.classList.add('revealed');
            }, i * 100);
          });
        } else {
          entry.target.classList.add('revealed');
        }
        staggerObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  // Only observe the first stagger-item in each group to trigger the cascade
  const processedParents = new Set();
  staggerItems.forEach(item => {
    const parent = item.parentElement;
    if (parent && !processedParents.has(parent)) {
      processedParents.add(parent);
      staggerObserver.observe(item);
    } else if (!parent) {
      staggerObserver.observe(item);
    }
  });

  // ---------------------------------------------------------------------------
  // 5. Animated Skill Progress Bars (on Scroll Into View)
  // ---------------------------------------------------------------------------
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-width');
        if (targetWidth) {
          // Small delay for visual effect
          setTimeout(() => {
            bar.style.width = targetWidth;
            bar.classList.add('animated');
          }, 200);
        }
        skillBarObserver.unobserve(bar);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -30px 0px',
    threshold: 0.2
  });

  skillBars.forEach(bar => {
    skillBarObserver.observe(bar);
  });

  // ---------------------------------------------------------------------------
  // 6. Toast Notification Utility
  // ---------------------------------------------------------------------------
  const toast = document.getElementById('glass-toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // ---------------------------------------------------------------------------
  // 7. Initialize Lucide Icons
  // ---------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Trigger initial scroll spy check
    updateScrollSpy();
  });

})();
