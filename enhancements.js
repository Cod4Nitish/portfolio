/*
  Enhancements layer — see enhancements.css for the rollback note.
  Self-contained: it only adds elements and classes, and never edits script.js state.
*/
(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const scrollBehavior = reduceMotion ? 'auto' : 'smooth';

  /* ---------- Theme toggle ---------- */
  const THEME_KEY = 'portfolio-theme';
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const header = document.querySelector('.site-header');

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#040407' : '#fbfbf8');
    if (toggle) {
      const night = theme === 'dark';
      toggle.setAttribute('aria-pressed', String(night));
      toggle.setAttribute('aria-label', night ? 'Switch to light theme' : 'Switch to dark theme');
      toggle.title = night ? 'Light theme' : 'Dark theme';
      toggle.firstElementChild.textContent = night ? '☀' : '☾';
    }
  };

  let toggle = null;
  if (header) {
    toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'theme-toggle';
    toggle.innerHTML = '<span aria-hidden="true">☾</span>';
    // Lives on <body>: the header's backdrop-filter would otherwise trap position:fixed inside it.
    document.body.appendChild(toggle);
    toggle.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch { /* storage blocked: theme still switches */ }
    });
  }
  applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');

  /* ---------- Scroll progress bar ---------- */
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  /* ---------- Hero: letter-by-letter name + rotating role ---------- */
  const nameEl = document.querySelector('[data-split-name]');
  if (nameEl && !reduceMotion) {
    const text = nameEl.textContent.trim();
    nameEl.setAttribute('aria-label', text);
    nameEl.textContent = '';
    let index = 0;
    text.split(' ').forEach((word, wordIndex) => {
      // Each word is its own nowrap box so the line can only break between words.
      const wrap = document.createElement('span');
      wrap.className = 'nx-word-wrap';
      wrap.setAttribute('aria-hidden', 'true');
      [...word].forEach((char) => {
        const span = document.createElement('span');
        span.className = 'nx-ch';
        span.style.setProperty('--i', index++);
        span.textContent = char;
        wrap.appendChild(span);
      });
      if (wordIndex > 0) nameEl.appendChild(document.createTextNode(' '));
      nameEl.appendChild(wrap);
      index++;
    });
  }

  const rotator = document.querySelector('[data-rotator]');
  if (rotator) {
    const words = (rotator.dataset.words || '').split('|').map((word) => word.trim()).filter(Boolean);
    if (words.length > 1) {
      rotator.textContent = '';
      const nodes = words.map((word, index) => {
        const span = document.createElement('span');
        span.className = `nx-word${index === 0 ? ' is-active' : ''}`;
        span.textContent = word;
        if (index > 0) span.setAttribute('aria-hidden', 'true');
        rotator.appendChild(span);
        return span;
      });
      if (!reduceMotion) {
        let current = 0;
        window.setInterval(() => {
          if (document.hidden) return;
          const next = (current + 1) % nodes.length;
          nodes[current].classList.remove('is-active');
          nodes[current].classList.add('is-past');
          nodes[next].classList.remove('is-past');
          // Words that already left must re-enter from below, so reset them without a transition.
          nodes.forEach((node, index) => {
            if (index !== current && index !== next) node.classList.remove('is-past');
          });
          nodes[next].classList.add('is-active');
          current = next;
        }, 2600);
      }
    }
  }

  /* ---------- Journey rail (checkpoints + walker) ---------- */
  const LABELS = {
    intro: 'Intro', 'what-i-do': 'What I do', journey: 'Journey',
    about: 'About', education: 'Foundation', work: 'Projects', notes: 'Notes', builds: 'Builds',
    toolkit: 'Tools', events: 'Events', location: 'Location', socials: 'Socials', contact: 'Contact',
  };
  const sections = [...document.querySelectorAll('.portfolio-content > section[id]')];
  const journey = document.createElement('aside');
  journey.className = 'journey';
  journey.setAttribute('aria-label', 'Page progress');
  journey.innerHTML = `
    <div class="journey-hud" aria-hidden="true"></div>
    <div class="journey-track"><span class="journey-fill"></span></div>
    <div class="journey-walker" aria-hidden="true">
      <svg viewBox="0 0 26 42">
        <circle class="head" cx="13" cy="6" r="4.6"></circle>
        <path d="M13 11v13"></path>
        <path class="arm-l" d="M13 14v9"></path>
        <path class="arm-r" d="M13 14v9"></path>
        <path class="leg-l" d="M13 24v14"></path>
        <path class="leg-r" d="M13 24v14"></path>
      </svg>
    </div>
    <span class="journey-flag" aria-hidden="true">⚑</span>`;
  document.body.appendChild(journey);

  const track = journey.querySelector('.journey-track');
  const fill = journey.querySelector('.journey-fill');
  const walker = journey.querySelector('.journey-walker');
  const hud = journey.querySelector('.journey-hud');
  let stops = [];

  const pad = (n) => String(n).padStart(2, '0');
  const maxScroll = () => Math.max(1, root.scrollHeight - window.innerHeight);

  const measure = () => {
    const max = maxScroll();
    maxScrollCached = max;
    const visible = sections.filter((section) => !section.hidden && section.offsetParent !== null);
    stops = visible.map((section) => {
      const rect = section.getBoundingClientRect();
      const target = rect.top + window.scrollY + rect.height / 2 - window.innerHeight / 2;
      return { section, p: Math.min(1, Math.max(0, target / max)) };
    });
    track.querySelectorAll('.journey-stop').forEach((node) => node.remove());
    stops.forEach(({ section, p }, index) => {
      const label = LABELS[section.id] || section.id;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'journey-stop';
      button.style.top = `${p * 100}%`;
      button.setAttribute('aria-label', `Go to ${label}`);
      button.innerHTML = `<i></i><span>${pad(index + 1)} · ${label}</span>`;
      button.addEventListener('click', () => section.scrollIntoView({ behavior: scrollBehavior, block: 'start' }));
      track.appendChild(button);
    });
    stopNodes = [...track.querySelectorAll('.journey-stop')];
    trackHeight = track.clientHeight;
    lastCurrent = null;
    paint();
  };

  let walkTimer;
  // Cached by measure() so scrolling never queries the DOM or forces layout.
  let stopNodes = [];
  let trackHeight = 0;
  let maxScrollCached = 1;
  let lastCurrent = null;
  const paint = (moving = false) => {
    const p = Math.min(1, Math.max(0, window.scrollY / maxScrollCached));

    bar.style.transform = `scaleX(${p})`;
    fill.style.transform = `scaleY(${p})`;
    walker.style.transform = `translate3d(0, ${p * trackHeight}px, 0)`;
    journey.classList.toggle('is-done', p > 0.985);

    let current = -1;
    stops.forEach(({ p: stopP }, index) => { if (p >= stopP - 0.012) current = index; });
    if (current !== lastCurrent) {
      lastCurrent = current;
      stopNodes.forEach((node, index) => {
        node.classList.toggle('is-on', index <= current);
        node.classList.toggle('is-current', index === current);
      });
      hud.innerHTML = stops.length
        ? `<b>${pad(Math.max(current, 0) + 1)}</b> / ${pad(stops.length)}`
        : '';
    }

    if (moving && !reduceMotion) {
      journey.classList.add('is-walking');
      clearTimeout(walkTimer);
      walkTimer = setTimeout(() => journey.classList.remove('is-walking'), 160);
    }
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { paint(true); ticking = false; });
  }, { passive: true });

  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(measure, 150); });
  window.addEventListener('load', measure);
  // Sections grow after GitHub repos / events render, so re-measure when the page height changes.
  if ('ResizeObserver' in window) {
    let lastHeight = root.scrollHeight;
    new ResizeObserver(() => {
      if (Math.abs(root.scrollHeight - lastHeight) > 40) { lastHeight = root.scrollHeight; measure(); }
    }).observe(document.body);
  }
  measure();

  /* ---------- Pointer polish (desktop, motion allowed) ---------- */
  if (!finePointer || reduceMotion) return;

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(glow);

  let glowFrame = 0;
  window.addEventListener('pointermove', (event) => {
    glow.classList.add('is-on');
    if (glowFrame) return;
    glowFrame = requestAnimationFrame(() => {
      glow.style.setProperty('--mx', `${event.clientX}px`);
      glow.style.setProperty('--my', `${event.clientY}px`);
      glowFrame = 0;
    });
  }, { passive: true });
  document.addEventListener('pointerleave', () => glow.classList.remove('is-on'));

  const TILT = 5; // degrees at the card corner
  const CARD = '.featured-project, .build-card';
  const MAGNETIC = '.header-cta, .profile-download, .contact-submit, .location-link, .rail-section-button';

  document.addEventListener('pointermove', (event) => {
    const card = event.target.closest?.(CARD);
    if (card) {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.classList.add('is-tilting');
      card.style.transform = `perspective(1100px) rotateX(${((0.5 - y) * TILT).toFixed(2)}deg) rotateY(${((x - 0.5) * TILT).toFixed(2)}deg) translateY(-4px)`;
    }

    const button = event.target.closest?.(MAGNETIC);
    if (button) {
      const rect = button.getBoundingClientRect();
      button.classList.add('is-magnetic');
      button.style.transform = `translate(${((event.clientX - rect.left - rect.width / 2) * 0.16).toFixed(1)}px, ${((event.clientY - rect.top - rect.height / 2) * 0.28).toFixed(1)}px)`;
    }
  }, { passive: true });

  document.addEventListener('pointerout', (event) => {
    const card = event.target.closest?.(CARD);
    if (card && !card.contains(event.relatedTarget)) { card.style.transform = ''; card.classList.remove('is-tilting'); }
    const button = event.target.closest?.(MAGNETIC);
    if (button && !button.contains(event.relatedTarget)) button.style.transform = '';
  });
})();
