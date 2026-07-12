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

  function loadPage(url, push) {
    var minFade = new Promise(function (resolve) { setTimeout(resolve, 120); });
    content.classList.add('is-loading');
    Promise.all([
      fetch(url).then(function (resp) {
        if (!resp.ok) throw new Error('HTTP ' + resp.status);
        return resp.text();
      }),
      minFade
    ]).then(function (results) {
      var doc = new DOMParser().parseFromString(results[0], 'text/html');
      var next = doc.querySelector(CONTENT_SEL);
      if (!next) throw new Error('content container missing in ' + url);
      content.innerHTML = next.innerHTML;
      if (doc.title) document.title = doc.title;
      if (push) history.pushState({ pjax: true }, '', url);
      setActiveTab(new URL(url, location.href).pathname);
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
  function closeLightbox() {
    var box = document.querySelector('.lightbox');
    if (box) box.parentNode.removeChild(box);
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

    var overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Image preview (click or press Escape to close)');
    var img = document.createElement('img');
    img.src = link.href;
    var thumb = link.querySelector('img');
    img.alt = thumb ? thumb.alt : '';
    overlay.appendChild(img);
    document.body.appendChild(overlay);
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
