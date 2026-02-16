(function () {
  'use strict';

  var menuBtn = document.getElementById('menuBtn');
  var siteNav = document.getElementById('siteNav');
  var themeToggle = document.getElementById('themeToggle');
  var year = document.getElementById('year');
  var navLinks = document.querySelectorAll('#siteNav a');
  var sections = document.querySelectorAll('main section[id]');
  var revealItems = document.querySelectorAll('[data-reveal]');
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeMeta) {
      themeMeta.setAttribute('content', theme === 'dark' ? '#171114' : '#7f253a');
    }
    if (!themeToggle) return;

    var isDark = theme === 'dark';
    var label = themeToggle.querySelector('span');
    var icon = themeToggle.querySelector('i');
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    if (label) {
      label.textContent = isDark ? 'Light' : 'Dark';
    }
    if (icon) {
      icon.classList.toggle('fa-moon', !isDark);
      icon.classList.toggle('fa-sun', isDark);
    }
  }

  var savedTheme = null;
  try {
    savedTheme = localStorage.getItem('theme');
  } catch (err) {
    savedTheme = null;
  }

  var preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme || (preferredDark ? 'dark' : 'light'));

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var activeTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
      try {
        localStorage.setItem('theme', nextTheme);
      } catch (err) {
        /* ignore storage failures */
      }
    });
  }

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
