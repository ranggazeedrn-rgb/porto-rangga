/**
 * Liquid Glass Physics & Parallax Ambient Engine
 * Rangga Ramadiyanto Nurhakim Portfolio - XII RPL 1 SMK Muhammadiyah Tasikmalaya
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. Interactive Mouse Spotlight Glow with Lerp
  // ---------------------------------------------------------------------------
  const cursorSpotlight = document.getElementById('cursor-spotlight');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let isMoving = false;

  // Normalized mouse coordinates (-1 to 1) for spatial parallax
  let normMouseX = 0;
  let normMouseY = 0;
  let currentNormX = 0;
  let currentNormY = 0;

  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    normMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    normMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    isMoving = true;
  });

  function renderSpotlight() {
    if (cursorSpotlight) {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      cursorSpotlight.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      cursorSpotlight.style.opacity = isMoving ? '1' : '0.5';
    }
  }

  // ---------------------------------------------------------------------------
  // 2. Ambient Liquid Mesh Canvas Animation
  // ---------------------------------------------------------------------------
  const canvas = document.getElementById('ambient-canvas');
  let ctx, width, height;
  let particles = [];

  if (canvas) {
    ctx = canvas.getContext('2d');

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    }

    class LiquidOrb {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 220 + 140;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.hue = 215 + Math.random() * 25; // Slate to cool ice-blue hue
        this.alpha = Math.random() * 0.04 + 0.02;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Subtle canvas parallax drift with scroll
        const scrollDrift = (currentScrollY * 0.03) % height;

        if (this.x < -this.radius) this.x = width + this.radius;
        if (this.x > width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = height + this.radius;
        if (this.y > height + this.radius) this.y = -this.radius;
      }

      draw() {
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        );
        gradient.addColorStop(0, `hsla(${this.hue}, 20%, 80%, ${this.alpha * 1.5})`);
        gradient.addColorStop(0.5, `hsla(${this.hue}, 25%, 50%, ${this.alpha * 0.8})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 95000), 12);
      for (let i = 0; i < count; i++) {
        particles.push(new LiquidOrb());
      }
    }

    function animateLiquidMesh() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
  }

  // ---------------------------------------------------------------------------
  // 3. Multi-Layer Scroll & Mouse Parallax Engine
  // ---------------------------------------------------------------------------
  let scrollY = window.pageYOffset || document.documentElement.scrollTop;
  let currentScrollY = scrollY;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  window.addEventListener('scroll', () => {
    scrollY = window.pageYOffset || document.documentElement.scrollTop;
  }, { passive: true });

  const parallaxScrollElements = document.querySelectorAll('[data-parallax="scroll"]');
  const parallaxMouseElements = document.querySelectorAll('[data-parallax="mouse"]');
  const orbElements = document.querySelectorAll('.bg-ambient-orb');

  function renderParallax() {
    // Smooth lerp for scroll and mouse
    currentScrollY += (scrollY - currentScrollY) * 0.08;
    currentNormX += (normMouseX - currentNormX) * 0.06;
    currentNormY += (normMouseY - currentNormY) * 0.06;

    // A. Ambient Background Orbs Parallax
    if (orbElements.length > 0) {
      if (orbElements[0]) {
        const orb1Y = currentScrollY * -0.22;
        const orb1X = currentNormX * -20;
        orbElements[0].style.transform = `translate3d(${orb1X.toFixed(1)}px, ${orb1Y.toFixed(1)}px, 0)`;
      }
      if (orbElements[1]) {
        const orb2Y = currentScrollY * 0.18;
        const orb2X = currentNormX * 25;
        orbElements[1].style.transform = `translate3d(${orb2X.toFixed(1)}px, ${orb2Y.toFixed(1)}px, 0)`;
      }
      if (orbElements[2]) {
        const orb3Y = currentScrollY * -0.12;
        const orb3X = currentNormX * -15;
        orbElements[2].style.transform = `translate3d(${orb3X.toFixed(1)}px, ${orb3Y.toFixed(1)}px, 0)`;
      }
    }

    // B. Scroll Parallax Items
    parallaxScrollElements.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-parallax-speed') || '0.1');
      const direction = el.getAttribute('data-parallax-direction') || 'y';
      const rect = el.getBoundingClientRect();
      const elementMiddle = rect.top + rect.height / 2;
      const screenMiddle = window.innerHeight / 2;
      const offset = (elementMiddle - screenMiddle) * speed;

      if (direction === 'y') {
        el.style.transform = `translate3d(0, ${(-offset).toFixed(1)}px, 0)`;
      } else if (direction === 'x') {
        el.style.transform = `translate3d(${(-offset).toFixed(1)}px, 0, 0)`;
      }
    });

    // C. Spatial Mouse Parallax Items (Desktop only)
    if (!isTouch && parallaxMouseElements.length > 0) {
      parallaxMouseElements.forEach((el) => {
        const depth = parseFloat(el.getAttribute('data-parallax-depth') || '20');
        const moveX = (currentNormX * depth).toFixed(1);
        const moveY = (currentNormY * depth).toFixed(1);
        const extraScroll = parseFloat(el.getAttribute('data-parallax-scroll-speed') || '0');
        const scrollOffset = (currentScrollY * extraScroll).toFixed(1);

        el.style.transform = `translate3d(${moveX}px, ${(parseFloat(moveY) + parseFloat(scrollOffset)).toFixed(1)}px, 0)`;
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 4. Dynamic 3D Card Tilt & Specular Light Reflection
  // ---------------------------------------------------------------------------
  if (!isTouch) {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const maxRotate = 7;
        const rotateX = ((y - centerY) / centerY) * -maxRotate;
        const rotateY = ((x - centerX) / centerX) * maxRotate;

        el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px)`;
        
        // Dynamically shift inner specular light
        const shinePercentX = (x / rect.width) * 100;
        const shinePercentY = (y / rect.height) * 100;
        el.style.setProperty('--sheen-x', `${shinePercentX}%`);
        el.style.setProperty('--sheen-y', `${shinePercentY}%`);
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      });

      el.addEventListener('mouseenter', () => {
        el.style.transition = 'transform 0.1s ease-out';
      });
    });
  }

  // ---------------------------------------------------------------------------
  // Main Animation Loop
  // ---------------------------------------------------------------------------
  function masterLoop() {
    renderSpotlight();
    if (canvas && particles.length > 0) {
      animateLiquidMesh();
    }
    renderParallax();
    requestAnimationFrame(masterLoop);
  }

  requestAnimationFrame(masterLoop);

})();
