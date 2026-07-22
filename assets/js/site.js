/* Site scripts (vanilla JS, no jQuery).
   The v6 layout uses a 4-tab pill navigation (real pages, active state set
   server-side by Liquid). PJAX below makes tab clicks swap only the center
   column (no full reload — the side columns never repaint); every tab is
   still a real page, so direct links, SEO, and no-JS visitors work as
   before. The sticky columns use native CSS position:sticky. */

(function () {
  'use strict';

  /* ==========================================================
     PJAX navigation — intercept internal links (marked with
     target="_self" because head.html sets <base target="_blank">),
     fetch the target page, and swap only the center content.
     Falls back to a normal navigation on any error.
     ========================================================== */
  var CONTENT_SEL = '.layout__center .page__content';
  var content = document.querySelector(CONTENT_SEL);

  function prefersReducedMotion() {
    return !!(window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  /* Announce a PJAX route change to assistive tech (the center column is
     repainted in place, which is otherwise silent to screen readers). */
  function announce(msg) {
    var live = document.getElementById('pjax-live');
    if (live && msg) live.textContent = msg;
  }

  function setActiveTab(pathname) {
    var tabs = document.querySelectorAll('.tabbar__tab');
    Array.prototype.forEach.call(tabs, function (tab) {
      var active = tab.pathname === pathname;
      tab.classList.toggle('is-active', active);
      if (active) {
        tab.setAttribute('aria-current', 'page');
      } else {
        tab.removeAttribute('aria-current');
      }
    });
  }

  /* Resolve once the center column has finished fading out, so the DOM swap
     provably happens at opacity 0 (no old content flashing through). This
     replaces a fixed 120ms timer with the real end of the .page__content
     fade; falls back to a timer if the transition is disabled (reduced
     motion) or transitionend never fires. */
  function fadeOut(el) {
    el.classList.add('is-loading');
    return new Promise(function (resolve) {
      var done = false;
      function finish() {
        if (done) return;
        done = true;
        el.removeEventListener('transitionend', onEnd);
        resolve();
      }
      function onEnd(e) { if (e.propertyName === 'opacity') finish(); }
      el.addEventListener('transitionend', onEnd);
      setTimeout(finish, 250); // safety net if transitionend never fires
    });
  }

  function loadPage(url, push) {
    Promise.all([
      fetch(url).then(function (resp) {
        if (!resp.ok) throw new Error('HTTP ' + resp.status);
        return resp.text();
      }),
      fadeOut(content)
    ]).then(function (results) {
      var doc = new DOMParser().parseFromString(results[0], 'text/html');
      var next = doc.querySelector(CONTENT_SEL);
      if (!next) throw new Error('content container missing in ' + url);
      content.innerHTML = next.innerHTML;
      if (doc.title) document.title = doc.title;
      if (push) history.pushState({ pjax: true }, '', url);
      setActiveTab(new URL(url, location.href).pathname);
      announce(doc.title);
      window.scrollTo(0, 0);
      content.classList.remove('is-loading');
      document.dispatchEvent(new CustomEvent('pjax:content'));
    }).catch(function () {
      window.location.href = url; // graceful fallback: full page load
    });
  }

  if (content && window.fetch && window.history && history.pushState) {
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 ||
          e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var link = e.target.closest ? e.target.closest('a[target="_self"]') : null;
      if (!link || link.origin !== location.origin || link.hash) return;
      e.preventDefault();
      if (link.pathname === location.pathname) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      setActiveTab(link.pathname); // optimistic: highlight on the press, not on load
      loadPage(link.pathname, true);
    });

    window.addEventListener('popstate', function () {
      loadPage(location.pathname, false);
    });
  }

  /* ==========================================================
     Lightbox for figure thumbnails (a.img-zoom). Click opens the
     full image in a dimmed overlay; click anywhere or Escape
     closes it. Delegated on document, so it keeps working after
     PJAX swaps. Without JS the wrapping <a> simply opens the
     image in a new tab (via <base target="_blank">).
     ========================================================== */
  var lightboxReturnFocus = null; // element focus returns to when the box closes

  function closeLightbox() {
    var box = document.querySelector('.lightbox');
    if (!box || box.classList.contains('is-closing')) return;
    var removed = false;
    function remove() {
      if (removed) return;
      removed = true;
      if (box.parentNode) box.parentNode.removeChild(box);
      if (lightboxReturnFocus && lightboxReturnFocus.focus) lightboxReturnFocus.focus();
      lightboxReturnFocus = null;
    }
    if (prefersReducedMotion()) { remove(); return; } // instant, no exit animation
    box.classList.add('is-closing');
    box.addEventListener('animationend', remove);
    setTimeout(remove, 250); // safety net if animationend doesn't fire
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 ||
        e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    if (e.target.closest && e.target.closest('.lightbox')) {
      closeLightbox();
      return;
    }

    var link = e.target.closest ? e.target.closest('a.img-zoom') : null;
    if (!link) return;
    e.preventDefault();

    lightboxReturnFocus = document.activeElement; // so Escape/close returns here

    var overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image preview (click or press Escape to close)');
    overlay.tabIndex = -1;
    var img = document.createElement('img');
    img.src = link.href;
    var thumb = link.querySelector('img');
    img.alt = thumb ? thumb.alt : '';
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    overlay.focus(); // move focus into the dialog
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ==========================================================
     Smooth scroll for same-page anchors ("#news" and "/#news").
     Interception also stops <base target="_blank"> from opening
     fragment links in a new tab.
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
  });
})();
