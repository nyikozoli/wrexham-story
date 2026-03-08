/* ============================================
   3D Effects — Tilt Cards & Parallax Hero
   ============================================ */

(function () {
  'use strict';

  // Respect reduced motion preference
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // --- 3D Tilt Effect for Season Cards ---
  function initTiltCards() {
    var cards = document.querySelectorAll('.season-card');
    if (!cards.length) return;

    cards.forEach(function (card) {
      card.addEventListener('mouseenter', handleTiltEnter);
      card.addEventListener('mousemove', handleTiltMove);
      card.addEventListener('mouseleave', handleTiltLeave);
    });
  }

  function handleTiltEnter() {
    this.style.transition = 'none';
  }

  function handleTiltMove(e) {
    var rect = this.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var centerX = rect.width / 2;
    var centerY = rect.height / 2;

    // Max rotation in degrees
    var maxRotate = 8;
    var rotateX = ((y - centerY) / centerY) * -maxRotate;
    var rotateY = ((x - centerX) / centerX) * maxRotate;

    this.style.transform =
      'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)';

    // Move the inner glow/shine based on mouse position
    var shine = this.querySelector('.season-card__shine');
    if (shine) {
      shine.style.background =
        'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.08) 0%, transparent 60%)';
    }
  }

  function handleTiltLeave() {
    this.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
    this.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
  }

  // --- Parallax Hero ---
  function initParallaxHero() {
    var hero = document.getElementById('hero');
    var heroBg = document.querySelector('.hero__bg');
    var heroContent = document.querySelector('.hero__content');
    if (!hero || !heroBg || !heroContent) return;

    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrollY = window.scrollY;
          var heroHeight = hero.offsetHeight;

          // Only apply parallax while hero is in view
          if (scrollY < heroHeight * 1.5) {
            // Background moves slower (parallax depth)
            heroBg.style.transform = 'translateY(' + (scrollY * 0.4) + 'px) scale(1.1)';

            // Content moves faster, creating depth separation
            heroContent.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';

            // Fade out content as you scroll
            var opacity = 1 - (scrollY / (heroHeight * 0.7));
            heroContent.style.opacity = Math.max(0, opacity);
          }

          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // --- Init on DOM Ready ---
  document.addEventListener('DOMContentLoaded', function () {
    initParallaxHero();

    // Tilt cards need to wait for dynamic content to render
    // Use a MutationObserver to detect when seasons are added
    var seasonsContainer = document.getElementById('seasonsContainer');
    if (seasonsContainer) {
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function () {
          initTiltCards();
          observer.disconnect();
        });
      });
      observer.observe(seasonsContainer, { childList: true });
    }
  });
})();
