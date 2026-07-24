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

  /* JS-driven smooth scrolling ignores the OS reduce-motion setting (unlike
     CSS scroll-behavior in some browsers), so gate it explicitly. */
  function scrollBehavior() {
    return prefersReducedMotion() ? 'auto' : 'smooth';
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
    positionTabIndicator(true);
  }

  /* ==========================================================
     Sliding active-pill indicator. One shared element (styled in
     _theme.scss) glides from the old tab to the new one, so the
     selection reads as a physical object moving — FLIP: measure
     the active tab, then let the CSS transition play the move.
     Created here so no-JS visitors keep the static .is-active
     pill instead (.no-js rule in _theme.scss).
     ========================================================== */
  var tabsList = document.querySelector('.tabbar__tabs');
  var tabIndicator = null;

  function positionTabIndicator(animate) {
    if (!tabsList) return;
    if (!tabIndicator) {
      tabIndicator = document.createElement('li'); // li: valid child of the ul; abs-positioned, so out of flex flow
      tabIndicator.className = 'tabbar__indicator';
      tabIndicator.setAttribute('aria-hidden', 'true');
      tabsList.insertBefore(tabIndicator, tabsList.firstChild);
    }
    var active = tabsList.querySelector('.tabbar__tab.is-active');
    if (!active) { tabIndicator.style.opacity = '0'; return; }
    tabIndicator.style.opacity = '';
    /* measure both against the list: wrapped rows on narrow screens make
       this a 2D move (x and y), which translate() handles in one go */
    var listRect = tabsList.getBoundingClientRect();
    var rect = active.getBoundingClientRect();
    if (!animate) tabIndicator.style.transition = 'none';
    tabIndicator.style.transform = 'translate(' + (rect.left - listRect.left) + 'px, ' + (rect.top - listRect.top) + 'px)';
    tabIndicator.style.width = rect.width + 'px';
    tabIndicator.style.height = rect.height + 'px';
    if (!animate) {
      tabIndicator.getBoundingClientRect(); // flush, so the jump can't animate
      tabIndicator.style.transition = '';
    }
  }

  positionTabIndicator(false); // initial placement: appear in place, no glide
  window.addEventListener('resize', function () { positionTabIndicator(false); });
  if (document.fonts && document.fonts.ready) {
    // Inter swapping in changes tab widths — re-measure once fonts settle
    document.fonts.ready.then(function () { positionTabIndicator(false); });
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

  /* Session cache of fetched pages, also fed by hover/focus prefetch: by the
     time the click lands, the HTML is usually already here (kill latency —
     the fetch starts on intent, not on commit). Static site, so a cached
     copy never goes stale within a visit. Failures are evicted so a flaky
     request doesn't poison the cache. */
  var pageCache = {};
  function fetchPage(pathname) {
    if (!pageCache[pathname]) {
      var p = fetch(pathname).then(function (resp) {
        if (!resp.ok) throw new Error('HTTP ' + resp.status);
        return resp.text();
      });
      p.catch(function () { delete pageCache[pathname]; });
      pageCache[pathname] = p;
    }
    return pageCache[pathname];
  }

  /* Monotonic token so a slow response can never clobber a newer navigation:
     rapid tab clicks race their fetches, and only the latest click owns the
     swap (the interface follows the user's most recent intent). */
  var navToken = 0;
  var currentPath = location.pathname;

  function loadPage(pathname, push, scrollY) {
    var token = ++navToken;
    Promise.all([fetchPage(pathname), fadeOut(content)]).then(function (results) {
      if (token !== navToken) return; // superseded by a newer navigation
      var doc = new DOMParser().parseFromString(results[0], 'text/html');
      var next = doc.querySelector(CONTENT_SEL);
      if (!next) throw new Error('content container missing in ' + pathname);
      content.innerHTML = next.innerHTML;
      if (doc.title) document.title = doc.title;
      if (push) history.pushState({ pjax: true }, '', pathname);
      currentPath = pathname;
      setActiveTab(pathname);
      announce(doc.title);
      window.scrollTo(0, scrollY || 0);
      content.classList.remove('is-loading');
      document.dispatchEvent(new CustomEvent('pjax:content'));
    }).catch(function () {
      if (token !== navToken) return; // a newer navigation owns the UI now
      window.location.href = pathname; // graceful fallback: full page load
    });
  }

  if (content && window.fetch && window.history && history.pushState) {
    /* Warm the cache the moment a tab shows intent (hover or keyboard focus).
       pointerover bubbles (pointerenter does not), so delegate on document. */
    var maybePrefetch = function (e) {
      var link = e.target.closest ? e.target.closest('a[target="_self"]') : null;
      if (!link || link.origin !== location.origin || link.hash) return;
      if (link.pathname === location.pathname) return;
      fetchPage(link.pathname);
    };
    document.addEventListener('pointerover', maybePrefetch);
    document.addEventListener('focusin', maybePrefetch);

    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 ||
          e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var link = e.target.closest ? e.target.closest('a[target="_self"]') : null;
      if (!link || link.origin !== location.origin || link.hash) return;
      e.preventDefault();
      if (link.pathname === location.pathname) {
        window.scrollTo({ top: 0, behavior: scrollBehavior() });
        return;
      }
      /* Remember where we left this page (on its own history entry), so the
         Back button returns the reader to the same spot, not the top. */
      history.replaceState({ pjax: true, scroll: window.scrollY }, '');
      setActiveTab(link.pathname); // optimistic: highlight on the press, not on load
      loadPage(link.pathname, true, 0);
    });

    window.addEventListener('popstate', function (e) {
      /* Hash-only traversals (e.g. Back from "#news") stay on this page: the
         browser restores the scroll position itself — swapping content here
         would refetch the same page and jump the viewport. */
      if (location.pathname === currentPath) return;
      loadPage(location.pathname, false, (e.state && e.state.scroll) || 0);
    });
  }

  /* ==========================================================
     Lightbox for figure thumbnails (a.img-zoom). Click opens the
     full image in a dimmed overlay; click anywhere or Escape
     closes it. Delegated on document, so it keeps working after
     PJAX swaps. Without JS the wrapping <a> simply opens the
     image in a new tab (via <base target="_blank">).
     Open/close are plain CSS transitions on .is-open, so a close
     mid-open reverses from the CURRENT opacity (interruptible,
     symmetric enter/exit) instead of jumping to a keyframe.
     ========================================================== */
  var lightboxReturnFocus = null; // element focus returns to when the box closes

  /* aria-modal alone doesn't stop Tab from reaching the page behind the
     dialog — inert does (unsupported browsers ignore the attribute and get
     the old behavior). The back-to-top button sits outside #main, so it
     needs its own flag. */
  function setBackgroundInert(on) {
    Array.prototype.forEach.call(
      document.querySelectorAll('#main, #back-to-top'),
      function (el) {
        if (on) el.setAttribute('inert', '');
        else el.removeAttribute('inert');
      }
    );
  }

  function closeLightbox() {
    var box = document.querySelector('.lightbox');
    if (!box || !box.classList.contains('is-open')) return; // absent or already closing
    var removed = false;
    function remove() {
      if (removed) return;
      removed = true;
      if (box.parentNode) box.parentNode.removeChild(box);
      setBackgroundInert(false);
      if (lightboxReturnFocus && lightboxReturnFocus.focus) lightboxReturnFocus.focus();
      lightboxReturnFocus = null;
    }
    /* Reduced motion keeps short opacity fades (see _theme.scss), so
       transitionend still fires there; the timer is the safety net. */
    box.classList.remove('is-open');
    box.addEventListener('transitionend', function (e) {
      if (e.propertyName === 'opacity') remove();
    });
    setTimeout(remove, 300);
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
    setBackgroundInert(true);
    overlay.getBoundingClientRect(); // flush styles so the open transition runs
    overlay.classList.add('is-open');
    overlay.focus();
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
    target.scrollIntoView({ behavior: scrollBehavior() });
    if (history.pushState) history.pushState(null, '', href);
  });
})();
