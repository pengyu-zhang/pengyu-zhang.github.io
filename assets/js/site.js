/* Site scripts (vanilla JS — replaces the old jQuery main.min.js bundle).
   Features: greedy navigation (items that no longer fit collapse into the
   hamburger dropdown) and smooth scrolling for same-page anchor links. The
   sticky sidebar and masthead use native CSS position:sticky. */

(function () {
  'use strict';

  /* ==========================================================
     Greedy navigation — vanilla port of jquery.greedy-navigation
     (codepen.io/lukejacksonn/pen/PwmwWV)
     ========================================================== */
  var nav = document.getElementById('site-nav');
  var btn = nav && nav.querySelector('button');
  var vlinks = nav && nav.querySelector('.visible-links');
  var hlinks = nav && nav.querySelector('.hidden-links');

  if (nav && btn && vlinks && hlinks) {
    var breaks = [];

    var availableSpace = function () {
      return btn.classList.contains('hidden')
        ? nav.offsetWidth
        : nav.offsetWidth - btn.offsetWidth - 30;
    };

    var updateNav = function () {
      // Overflowing: move items into the hidden list until everything fits
      while (vlinks.offsetWidth > availableSpace()) {
        breaks.push(vlinks.offsetWidth);
        hlinks.insertBefore(vlinks.lastElementChild, hlinks.firstChild);
        btn.classList.remove('hidden');
      }
      // Room again: restore as many items as fit (loop, not one per event,
      // so a single maximize/restore click brings everything back)
      while (breaks.length && availableSpace() > breaks[breaks.length - 1]) {
        vlinks.appendChild(hlinks.firstElementChild);
        breaks.pop();
      }
      if (breaks.length < 1) {
        btn.classList.add('hidden');
        hlinks.classList.add('hidden');
      }
      btn.setAttribute('count', breaks.length);
    };

    window.addEventListener('resize', updateNav);
    btn.addEventListener('click', function () {
      hlinks.classList.toggle('hidden');
      btn.classList.toggle('close');
    });
    updateNav();
  }

  /* ==========================================================
     Smooth scroll for same-page anchors ("#news" and "/#news").
     Interception also stops <base target="_blank"> from opening
     fragment links in a new tab. The 70px sticky-header offset
     comes from scroll-margin-top in the stylesheet.
     ========================================================== */
  document.addEventListener('click', function (e) {
    var link = e.target.closest ? e.target.closest('a') : null;
    if (!link) return;

    var href = link.getAttribute('href') || '';
    if (href.charAt(0) === '/') href = href.slice(1); // "/#news" -> "#news"
    if (href.charAt(0) !== '#' || href.length < 2) return;

    var target = document.getElementById(href.slice(1));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    if (history.pushState) history.pushState(null, '', href);

    // collapse the overflow dropdown after navigating from it
    if (hlinks && !hlinks.classList.contains('hidden')) {
      hlinks.classList.add('hidden');
      btn.classList.remove('close');
    }
  });
})();
