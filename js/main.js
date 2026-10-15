// SORAA'27: mobile navigation and current-section highlighting.
(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  var desktop = window.matchMedia('(min-width: 64rem)');

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Close the menu after choosing a section on small screens.
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      if (!desktop.matches) setOpen(false);
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  // Reset state when resizing across the breakpoint.
  var onBreakpoint = function () { setOpen(false); };
  if (desktop.addEventListener) {
    desktop.addEventListener('change', onBreakpoint);
  } else if (desktop.addListener) {
    desktop.addListener(onBreakpoint);
  }

  // Mark the nav link for the section currently in view.
  if (!('IntersectionObserver' in window)) return;

  var byId = {};
  var sections = [];
  links.forEach(function (link) {
    var id = link.getAttribute('href').slice(1);
    var section = document.getElementById(id);
    if (section) {
      byId[id] = link;
      sections.push(section);
    }
  });

  var visible = {};

  function update() {
    var current = null;
    for (var i = 0; i < sections.length; i++) {
      if (visible[sections[i].id]) {
        current = sections[i].id;
        break;
      }
    }
    if (!current) return;
    links.forEach(function (link) {
      if (byId[current] === link) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      visible[entry.target.id] = entry.isIntersecting;
    });
    update();
  }, { rootMargin: '-35% 0px -60% 0px' });

  sections.forEach(function (section) { observer.observe(section); });
})();
