/* ============================================
   Main — App Initialization
   ============================================ */

(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.querySelector('.nav__links');
  var scrollProgress = document.getElementById('scrollProgress');
  var sections = [];

  // --- Init ---
  document.addEventListener('DOMContentLoaded', function () {
    loadData();
    setupNav();
    setupScrollProgress();
    setupRevealObserver();
  });

  // --- Load JSON Data ---
  function loadData() {
    Promise.all([
      fetch('data/timeline.json').then(function (r) { return r.json(); }),
      fetch('data/seasons.json').then(function (r) { return r.json(); }),
      fetch('data/players.json').then(function (r) { return r.json(); })
    ]).then(function (data) {
      var timelineData = data[0];
      var seasonsData = data[1];
      var playersData = data[2];

      renderTimeline(timelineData, document.getElementById('timelineContainer'));
      renderSeasons(seasonsData, document.getElementById('seasonsContainer'));
      renderPlayers(playersData, document.getElementById('playersContainer'));

      // Re-run observer after dynamic content is added
      setupRevealObserver();
      setupCounterObserver();
    }).catch(function (err) {
      console.error('Failed to load data:', err);
    });
  }

  // --- Navigation ---
  function setupNav() {
    // Scroll detection for solid nav background
    var heroSection = document.getElementById('hero');
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          nav.classList.remove('nav--solid');
        } else {
          nav.classList.add('nav--solid');
        }
      });
    }, { threshold: 0.1 });
    navObserver.observe(heroSection);

    // Active section tracking
    var navLinkElements = document.querySelectorAll('.nav__link');
    sections = Array.from(navLinkElements).map(function (link) {
      return {
        link: link,
        target: document.getElementById(link.dataset.section)
      };
    });

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinkElements.forEach(function (l) { l.classList.remove('nav__link--active'); });
          var activeLink = document.querySelector('.nav__link[data-section="' + entry.target.id + '"]');
          if (activeLink) activeLink.classList.add('nav__link--active');
        }
      });
    }, { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' });

    sections.forEach(function (s) {
      if (s.target) sectionObserver.observe(s.target);
    });

    // Smooth scroll on nav click
    navLinkElements.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.getElementById(this.dataset.section);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          // Close mobile nav
          navLinks.classList.remove('nav__links--open');
          navToggle.classList.remove('nav__toggle--active');
        }
      });
    });

    // Mobile nav toggle
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('nav__links--open');
      navToggle.classList.toggle('nav__toggle--active');
    });
  }

  // --- Scroll Progress Bar ---
  function setupScrollProgress() {
    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = scrollPercent + '%';
    }, { passive: true });
  }

  // --- Scroll Reveal Observer ---
  function setupRevealObserver() {
    var reveals = document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(function (el) {
      if (!el.classList.contains('reveal--visible')) {
        observer.observe(el);
      }
    });
  }

  // --- Counter Animation Observer ---
  function setupCounterObserver() {
    var seasonCards = document.querySelectorAll('.season-card');

    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounters(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    seasonCards.forEach(function (card) {
      counterObserver.observe(card);
    });

    // Also observe the about stats
    var aboutStats = document.querySelectorAll('.about__stat-number');
    var aboutObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateAboutCounter(entry.target);
          aboutObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    aboutStats.forEach(function (stat) {
      aboutObserver.observe(stat);
    });
  }

  // --- About Section Counter ---
  function animateAboutCounter(element) {
    var target = parseInt(element.dataset.count, 10);
    var duration = 1500;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }
})();
