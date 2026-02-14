(function () {
  'use strict';

  var menuBtn = document.getElementById('menuBtn');
  var siteNav = document.getElementById('siteNav');
  var year = document.getElementById('year');
  var navLinks = document.querySelectorAll('#siteNav a');
  var sections = document.querySelectorAll('main section[id]');
  var revealItems = document.querySelectorAll('[data-reveal]');

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  if (menuBtn && siteNav) {
    menuBtn.addEventListener('click', function () {
      var open = siteNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        siteNav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if ('IntersectionObserver' in window && sections.length > 0) {
    var activeNavObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          var active = link.getAttribute('href') === '#' + id;
          link.classList.toggle('active', active);
        });
      });
    }, { rootMargin: '-40% 0px -45% 0px', threshold: 0.1 });

    sections.forEach(function (section) {
      activeNavObserver.observe(section);
    });

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(function (item, index) {
      item.style.transitionDelay = Math.min(index * 0.04, 0.35) + 's';
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add('visible');
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && siteNav) {
      siteNav.classList.remove('open');
      if (menuBtn) {
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });
})();
