/* Site scripts (vanilla JS). Four real pages behind a tab bar; PJAX swaps
   only the content column between them, so the profile column and the tab
   bar never repaint, while direct links, SEO and no-JS visitors get the
   plain pages. Also here: the theme toggle, link targets, the figure
   lightbox, the News "New" badge and back-to-top. */

(() => {
  'use strict';

  const root = document.documentElement;

  /* JS-driven smooth scrolling ignores the OS reduce-motion setting (unlike
     CSS scroll-behavior in some browsers), so gate it explicitly. */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scrollBehavior = () => (reducedMotion.matches ? 'auto' : 'smooth');

  const closest = (e, selector) =>
    (e.target instanceof Element ? e.target.closest(selector) : null);

  /* a plain left click, as opposed to "open in a new tab/window" gestures */
  const isPlainClick = (e) =>
    !e.defaultPrevented && e.button === 0 &&
    !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;

  /* ==========================================================
     Theme. The pre-paint theme init (and syncThemeColor) stays
     inline in head.html so the first frame is right. A manual
     choice is saved; until one is made, the page follows the OS,
     also when the OS switches while the page is open.
     ========================================================== */
  {
    let fadeTimer;
    const applyTheme = (theme) => {
      // ease the page-wide brightness jump: .theme-switching turns the token
      // flip into a ~200ms cross-fade (rule in _theme.scss), then leaves
      clearTimeout(fadeTimer);
      root.classList.add('theme-switching');
      fadeTimer = setTimeout(() => root.classList.remove('theme-switching'), 260);
      root.dataset.theme = theme;
    };
    const savedTheme = () => {
      try { return localStorage.getItem('theme'); } catch (e) { return null; }
    };

    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      window.syncThemeColor?.(next); // browser chrome follows
    });

    // No saved choice: the theme-color metas are still split by media query,
    // so only the page itself has to follow.
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!savedTheme()) applyTheme(e.matches ? 'dark' : 'light');
    });
  }

  /* ==========================================================
     Link targets. The site's own pages are the tab bar's four
     URLs; links to them stay in this tab (and go through PJAX
     below). Everything else — other sites, PDFs, full-size
     images, the project demo pages — opens in a new tab. Set as
     attributes so middle-click, the status bar and assistive
     tech all see the same thing; re-run after every PJAX swap.
     ========================================================== */
  const tabs = [...document.querySelectorAll('.tabbar__tab')];
  const tabPaths = tabs.map((tab) => tab.pathname);

  const isSitePage = (a) =>
    a.origin === location.origin && tabPaths.includes(a.pathname);

  function markExternalLinks(scope) {
    for (const a of scope.querySelectorAll('a[href]')) {
      if (a.target || a.protocol === 'mailto:') continue;
      if (isSitePage(a) || (a.origin === location.origin && a.hash)) continue;
      a.target = '_blank';
      a.rel = a.rel ? `${a.rel} noopener` : 'noopener';
    }
  }
  markExternalLinks(document);

  /* ==========================================================
     Sliding active-pill indicator. One shared element (styled in
     _theme.scss) glides from the old tab to the new one, so the
     selection reads as a physical object moving — FLIP: measure
     the active tab, then let the CSS transition play the move.
     Created here so no-JS visitors keep the static .is-active
     pill instead (.no-js rule in _theme.scss).
     ========================================================== */
  const tabsList = document.querySelector('.tabbar__tabs');
  let tabIndicator = null;

  function positionTabIndicator(animate) {
    if (!tabsList) return;
    if (!tabIndicator) {
      tabIndicator = document.createElement('li'); // li: valid child of the ul; abs-positioned, so out of flex flow
      tabIndicator.className = 'tabbar__indicator';
      tabIndicator.setAttribute('aria-hidden', 'true');
      tabsList.prepend(tabIndicator);
    }
    const active = tabsList.querySelector('.tabbar__tab.is-active');
    if (!active) { tabIndicator.style.opacity = '0'; return; }
    tabIndicator.style.opacity = '';
    /* measure both against the list: wrapped rows on narrow screens make
       this a 2D move (x and y), which translate() handles in one go */
    const listRect = tabsList.getBoundingClientRect();
    const rect = active.getBoundingClientRect();
    if (!animate) tabIndicator.style.transition = 'none';
    tabIndicator.style.transform =
      `translate(${rect.left - listRect.left}px, ${rect.top - listRect.top}px)`;
    tabIndicator.style.width = `${rect.width}px`;
    tabIndicator.style.height = `${rect.height}px`;
    if (!animate) {
      tabIndicator.getBoundingClientRect(); // flush, so the jump can't animate
      tabIndicator.style.transition = '';
    }
  }

  positionTabIndicator(false); // initial placement: appear in place, no glide
  window.addEventListener('resize', () => positionTabIndicator(false));
  // the web font swapping in changes tab widths — re-measure once fonts settle
  document.fonts.ready.then(() => positionTabIndicator(false));

  function setActiveTab(pathname) {
    for (const tab of tabs) {
      const active = tab.pathname === pathname;
      tab.classList.toggle('is-active', active);
      if (active) tab.setAttribute('aria-current', 'page');
      else tab.removeAttribute('aria-current');
    }
    positionTabIndicator(true);
  }

  /* ==========================================================
     PJAX navigation — intercept links to the site's own pages,
     fetch the target page, and swap only the center content.
     Falls back to a normal navigation on any error.
     ========================================================== */
  const CONTENT_SEL = '.layout__center .page__content';
  const content = document.querySelector(CONTENT_SEL);

  /* Announce a PJAX route change to assistive tech (the center column is
     repainted in place, which is otherwise silent to screen readers). */
  function announce(msg) {
    const live = document.getElementById('pjax-live');
    if (live && msg) live.textContent = msg;
  }

  /* Resolve once the center column has finished fading out, so the DOM swap
     provably happens at opacity 0 (no old content flashing through); falls
     back to a timer if the transition is disabled or transitionend never
     fires. */
  function fadeOut(el) {
    el.classList.add('is-loading');
    return new Promise((resolve) => {
      const onEnd = (e) => { if (e.propertyName === 'opacity') finish(); };
      function finish() {
        el.removeEventListener('transitionend', onEnd);
        resolve();
      }
      el.addEventListener('transitionend', onEnd);
      setTimeout(finish, 250); // safety net if transitionend never fires
    });
  }

  /* Session cache of fetched pages, also fed by hover/focus prefetch: by the
     time the click lands, the HTML is usually already here (the fetch starts
     on intent, not on commit). Static site, so a cached copy never goes stale
     within a visit. Failures are evicted so a flaky request doesn't poison
     the cache. */
  const pageCache = new Map();
  function fetchPage(pathname) {
    if (!pageCache.has(pathname)) {
      const page = fetch(pathname).then((resp) => {
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp.text();
      });
      page.catch(() => pageCache.delete(pathname));
      pageCache.set(pathname, page);
    }
    return pageCache.get(pathname);
  }

  /* Monotonic token so a slow response can never clobber a newer navigation:
     rapid tab clicks race their fetches, and only the latest click owns the
     swap (the interface follows the user's most recent intent). */
  let navToken = 0;
  let currentPath = location.pathname;

  function loadPage(pathname, push, scrollY) {
    const token = ++navToken;
    closeLightbox(); // Back/Forward with a figure open: the figure belongs to the page being left
    Promise.all([fetchPage(pathname), fadeOut(content)]).then(([html]) => {
      if (token !== navToken) return; // superseded by a newer navigation
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const next = doc.querySelector(CONTENT_SEL);
      if (!next) throw new Error(`content container missing in ${pathname}`);
      content.innerHTML = next.innerHTML;
      if (doc.title) document.title = doc.title;
      if (push) history.pushState({ pjax: true }, '', pathname);
      currentPath = pathname;
      root.dataset.page = pathname.replace(/\//g, '') || 'home'; // same value the layout writes
      setActiveTab(pathname);
      announce(doc.title);
      window.scrollTo(0, scrollY || 0);
      content.classList.remove('is-loading');
      markExternalLinks(content);
      document.dispatchEvent(new CustomEvent('pjax:content'));
    }).catch(() => {
      if (token !== navToken) return; // a newer navigation owns the UI now
      window.location.href = pathname; // graceful fallback: full page load
    });
  }

  if (content) {
    const sitePageLink = (e) => {
      const link = closest(e, 'a[href]');
      return link && isSitePage(link) && !link.hash ? link : null;
    };

    /* Warm the cache the moment a tab shows intent (hover or keyboard focus).
       pointerover bubbles (pointerenter does not), so delegate on document. */
    const maybePrefetch = (e) => {
      const link = sitePageLink(e);
      if (link && link.pathname !== location.pathname) fetchPage(link.pathname);
    };
    document.addEventListener('pointerover', maybePrefetch);
    document.addEventListener('focusin', maybePrefetch);

    document.addEventListener('click', (e) => {
      if (!isPlainClick(e)) return;
      const link = sitePageLink(e);
      if (!link) return;
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

    window.addEventListener('popstate', (e) => {
      /* Hash-only traversals (Back from the skip link's "#content") stay on
         this page: the browser restores the scroll position itself —
         swapping content here would refetch the same page and jump the
         viewport. */
      if (location.pathname === currentPath) return;
      loadPage(location.pathname, false, e.state?.scroll || 0);
    });
  }

  /* ==========================================================
     Lightbox for figure thumbnails (a.img-zoom). Click opens the
     link's full-size image in a dimmed overlay; click anywhere
     or Escape closes it. Delegated on document, so it keeps
     working after PJAX swaps. Without JS the wrapping <a> simply
     opens the image file. Open/close are plain CSS transitions
     on .is-open, so a close mid-open reverses from the CURRENT
     opacity (interruptible, symmetric enter/exit).
     ========================================================== */
  const HD_WIDTH = 2800; // the lightbox copies in images/hd/ are this wide
  let lightboxReturnFocus = null; // element focus returns to when the box closes

  /* aria-modal alone doesn't stop Tab from reaching the page behind the
     dialog — inert does. The skip link and the back-to-top button sit
     outside #main, so they need their own flag. */
  function setBackgroundInert(on) {
    for (const el of document.querySelectorAll('.skip-link, #main, #back-to-top')) {
      el.toggleAttribute('inert', on);
    }
  }

  function closeLightbox() {
    const box = document.querySelector('.lightbox.is-open');
    if (!box) return; // absent or already closing
    const remove = () => {
      if (!box.isConnected) return;
      box.remove();
      setBackgroundInert(false);
      lightboxReturnFocus?.focus();
      lightboxReturnFocus = null;
    };
    /* Reduced motion keeps short opacity fades (see _theme.scss), so
       transitionend still fires there; the timer is the safety net. */
    box.classList.remove('is-open');
    box.addEventListener('transitionend', (e) => {
      if (e.propertyName === 'opacity') remove();
    });
    setTimeout(remove, 300);
  }

  /* One srcset candidate with a `w` descriptor plus `sizes` gives the image
     a natural width of exactly `cssWidth`, whatever the file's pixel size.
     That lets the thumbnail stand in for the full image in the same box. */
  function showAs(img, url, pixelWidth, cssWidth) {
    img.sizes = `${cssWidth}px`;
    img.srcset = `${url} ${pixelWidth}w`;
  }

  /* The full-size files are large (up to ~2 MB), so the overlay starts with
     the thumbnail the page has already loaded, laid out at the size the full
     image will take, and swaps to the full image once it has arrived. */
  function lightboxImage(link) {
    const thumb = link.querySelector('img');
    const img = document.createElement('img');
    img.alt = thumb?.alt || '';
    const loaded = thumb?.complete && thumb.naturalWidth ? thumb.currentSrc : '';
    if (!loaded || loaded === link.href) {
      img.src = link.href;
      return img;
    }
    /* The link either opens the file the thumbnail's own src names (the
       width attribute is then its real width) or a separate HD copy. */
    const expected = thumb.src === link.href
      ? Number(thumb.getAttribute('width')) || HD_WIDTH
      : HD_WIDTH;
    showAs(img, loaded, thumb.naturalWidth, expected);
    const full = new Image();
    full.src = link.href;
    full.decode().then(() => {
      if (img.isConnected) showAs(img, link.href, full.naturalWidth, full.naturalWidth);
    }, () => {}); // on failure the thumbnail simply stays
    return img;
  }

  document.addEventListener('click', (e) => {
    if (!isPlainClick(e)) return;

    if (closest(e, '.lightbox')) {
      closeLightbox();
      return;
    }

    const link = closest(e, 'a.img-zoom');
    if (!link) return;
    e.preventDefault();

    lightboxReturnFocus = document.activeElement; // so Escape/close returns here

    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image preview (click or press Escape to close)');
    overlay.tabIndex = -1;
    overlay.append(lightboxImage(link));
    document.body.append(overlay);
    setBackgroundInert(true);
    overlay.getBoundingClientRect(); // flush styles so the open transition runs
    overlay.classList.add('is-open');
    overlay.focus();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ==========================================================
     News (on Home): the newest item carries a "New" badge only
     while it is recent, i.e. through the month after the one in
     its date ("2026.10" stays new until the end of November).
     Runs again after a PJAX swap, since Home may arrive that way.
     ========================================================== */
  function markNewestNews() {
    const newest = document.querySelector('.news-card > ul > li');
    const date = newest?.querySelector('em')?.textContent.match(/^(\d{4})\.(\d{2})$/);
    if (date && new Date() < new Date(Number(date[1]), Number(date[2]) + 1, 1)) {
      newest.classList.add('is-new');
    }
  }
  markNewestNews();
  document.addEventListener('pjax:content', markNewestNews);

  /* ==========================================================
     Back to top: appears after a screen of scrolling.
     ========================================================== */
  {
    const btn = document.getElementById('back-to-top');
    if (btn) {
      const toggle = () => btn.classList.toggle('is-visible', window.scrollY > 400);
      window.addEventListener('scroll', toggle, { passive: true });
      toggle();
      btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: scrollBehavior() });
      });
    }
  }

})();
