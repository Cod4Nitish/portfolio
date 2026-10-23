/*
  Explore layer — guided "see the whole story" mode, performance guards, visitor counter.
  Removable: delete explore.js + explore.css and their two tags in index.html.

  Performance rules (must stay smooth on low-end phones):
  - No per-frame work: section tracking uses IntersectionObserver only.
  - Animations use transform/opacity only.
  - Sections that are off screen pause their CSS animations (.is-offscreen).
  - Low-end devices / data saver / reduced motion get html.is-lite (no blur, no ambient loops).
*/
(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const connection = navigator.connection || {};
  const lowEnd = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
  if (reduceMotion || connection.saveData || lowEnd) root.classList.add('is-lite');

  const store = {
    get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
    set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage blocked */ } },
  };

  const LABELS = {
    intro: 'Intro', 'what-i-do': 'What I do', journey: 'Journey',
    about: 'About', education: 'Foundation', work: 'Projects', notes: 'Notes', builds: 'Builds',
    toolkit: 'Tools', events: 'Events', location: 'Location', socials: 'Socials', contact: 'Contact',
  };
  const allSections = [...document.querySelectorAll('.portfolio-content > section[id]')];
  const visibleSections = () => allSections.filter((section) => !section.hidden && section.offsetParent !== null);

  /* ---------- Pause animations in off-screen sections ---------- */
  const playObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle('is-offscreen', !entry.isIntersecting));
  }, { rootMargin: '150px 0px' });
  allSections.forEach((section) => playObserver.observe(section));

  /* ---------- UI ---------- */
  const SEEN_KEY = 'portfolio-explored-v1';
  const DONE_KEY = 'portfolio-explored-done-v1';
  const seen = new Set(store.get(SEEN_KEY, []));

  const wrap = document.createElement('div');
  wrap.className = 'xp';
  wrap.innerHTML = `
    <button class="xp-chip" type="button" aria-expanded="false" aria-controls="xp-panel">
      <svg class="xp-ring" viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15.5"></circle><circle class="xp-ring-fill" cx="18" cy="18" r="15.5"></circle></svg>
      <span class="xp-chip-text"><b data-xp-count>0/0</b><span data-xp-hint>explored</span></span>
    </button>
    <div class="xp-panel" id="xp-panel" role="region" aria-label="Explore the portfolio" hidden>
      <div class="xp-panel-head"><strong>Explore Nitish’s story</strong><span data-xp-summary></span></div>
      <ol class="xp-list" data-xp-list></ol>
      <button class="xp-next" type="button" data-xp-next>Next section ↓</button>
      <p class="xp-visitors" data-xp-visitors hidden><span aria-hidden="true">👀</span> <b data-visitor-count></b> visitors so far</p>
      <p class="xp-tip">Tip: press <kbd>N</kbd> to jump to the next unseen section.</p>
    </div>
    <div class="xp-toast" role="status" aria-live="polite"></div>`;
  document.body.appendChild(wrap);

  const chip = wrap.querySelector('.xp-chip');
  const panel = wrap.querySelector('.xp-panel');
  const ringFill = wrap.querySelector('.xp-ring-fill');
  const countEl = wrap.querySelector('[data-xp-count]');
  const hintEl = wrap.querySelector('[data-xp-hint]');
  const summaryEl = wrap.querySelector('[data-xp-summary]');
  const listEl = wrap.querySelector('[data-xp-list]');
  const nextButton = wrap.querySelector('[data-xp-next]');
  const toast = wrap.querySelector('.xp-toast');
  const RING = 2 * Math.PI * 15.5;
  ringFill.style.strokeDasharray = `${RING}`;

  const scrollBehavior = reduceMotion ? 'auto' : 'smooth';
  const goTo = (section) => section.scrollIntoView({ behavior: scrollBehavior, block: 'start' });

  const nextUnseen = () => {
    const sections = visibleSections();
    const unseen = sections.filter((section) => !seen.has(section.id));
    // Prefer the next unseen section below the reader, so the tour moves forward.
    return unseen.find((section) => section.getBoundingClientRect().top > 40) || unseen[0] || null;
  };

  const render = () => {
    const sections = visibleSections();
    const total = sections.length;
    const done = sections.filter((section) => seen.has(section.id)).length;
    countEl.textContent = `${done}/${total}`;
    summaryEl.textContent = done === total ? 'All seen — thank you!' : `${done} of ${total} seen`;
    ringFill.style.strokeDashoffset = `${RING * (1 - (total ? done / total : 0))}`;
    chip.setAttribute('aria-label', `Explored ${done} of ${total} sections. Open the section list.`);
    listEl.innerHTML = sections.map((section, index) => `
      <li><button type="button" data-xp-go="${section.id}" class="${seen.has(section.id) ? 'is-seen' : ''}">
        <i aria-hidden="true">${seen.has(section.id) ? '✓' : String(index + 1).padStart(2, '0')}</i>${LABELS[section.id] || section.id}
        <span class="xp-sr">${seen.has(section.id) ? '(seen)' : '(not seen yet)'}</span>
      </button></li>`).join('');
    const next = nextUnseen();
    nextButton.hidden = !next;
    if (next) nextButton.textContent = `Next: ${LABELS[next.id] || next.id} ↓`;
    wrap.classList.toggle('is-complete', total > 0 && done === total);
    return { done, total };
  };

  let toastTimer;
  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-on'), 2200);
  };

  const setOpen = (open) => {
    panel.hidden = !open;
    chip.setAttribute('aria-expanded', String(open));
    wrap.classList.toggle('is-open', open);
  };
  chip.addEventListener('click', () => setOpen(panel.hidden));
  listEl.addEventListener('click', (event) => {
    const button = event.target.closest('[data-xp-go]');
    if (!button) return;
    const section = document.getElementById(button.dataset.xpGo);
    if (section) { goTo(section); setOpen(false); }
  });
  nextButton.addEventListener('click', () => { const next = nextUnseen(); if (next) { goTo(next); setOpen(false); } });
  document.addEventListener('click', (event) => { if (!panel.hidden && !wrap.contains(event.target)) setOpen(false); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) { setOpen(false); chip.focus(); return; }
    if (event.key !== 'n' && event.key !== 'N') return;
    if (event.ctrlKey || event.metaKey || event.altKey || event.target.closest?.('input, textarea, select, [contenteditable="true"]')) return;
    const next = nextUnseen();
    if (next) goTo(next);
  });

  /* ---------- Completion card ---------- */
  const dialog = document.createElement('dialog');
  dialog.className = 'xp-done';
  dialog.setAttribute('aria-labelledby', 'xp-done-title');
  dialog.innerHTML = `
    <div class="xp-burst" aria-hidden="true">${'<i></i>'.repeat(12)}</div>
    <p class="xp-done-kicker">100% explored</p>
    <h2 id="xp-done-title">You’ve seen the whole story.</h2>
    <p>Thanks for scrolling all the way. If Nitish looks like a fit for your team or idea, here’s the fastest next step.</p>
    <div class="xp-done-actions">
      <a class="xp-btn xp-btn--main" href="assets/nitish-resume.pdf" download>Download résumé ↓</a>
      <a class="xp-btn" href="assets/nitish-resume-designed.pdf" target="_blank" rel="noreferrer">Designed résumé ↗</a>
      <a class="xp-btn" href="#contact" data-xp-close>Let’s talk →</a>
    </div>
    <button class="xp-done-close" type="button" aria-label="Close" data-xp-close>×</button>`;
  document.body.appendChild(dialog);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target.closest('[data-xp-close]')) dialog.close();
  });

  const celebrate = () => {
    if (store.get(DONE_KEY, false)) return;
    store.set(DONE_KEY, true);
    // Let the last section settle before interrupting.
    setTimeout(() => { if (typeof dialog.showModal === 'function') dialog.showModal(); }, 700);
  };

  /* ---------- "Seen" tracking ---------- */
  // A section counts as seen once it fills ~a third of the screen (or is mostly visible) for 0.9s.
  const timers = new Map();
  const markSeen = (section) => {
    if (seen.has(section.id)) return;
    seen.add(section.id);
    store.set(SEEN_KEY, [...seen]);
    const { done, total } = render();
    wrap.classList.remove('is-pop');
    void wrap.offsetWidth; // restart the pop animation
    wrap.classList.add('is-pop');
    if (done === total) celebrate();
    else if (done > 1) {
      const next = nextUnseen();
      showToast(`✓ ${LABELS[section.id] || section.id} · ${done}/${total}${next ? ` — next: ${LABELS[next.id] || next.id}` : ''}`);
    }
  };
  const seenObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const section = entry.target;
      const viewportShare = entry.intersectionRect.height / window.innerHeight;
      const qualifies = entry.isIntersecting && (viewportShare >= 0.35 || entry.intersectionRatio >= 0.6);
      if (qualifies && !seen.has(section.id) && !timers.has(section)) {
        timers.set(section, setTimeout(() => { timers.delete(section); markSeen(section); }, 900));
      } else if (!qualifies && timers.has(section)) {
        clearTimeout(timers.get(section));
        timers.delete(section);
      }
    });
  }, { threshold: [0, 0.2, 0.35, 0.5, 0.6, 0.8, 1] });
  allSections.forEach((section) => seenObserver.observe(section));

  // Sections like Events appear after data renders; refresh the list when one is unhidden.
  new MutationObserver(render).observe(document.querySelector('.portfolio-content') || document.body, { attributes: true, attributeFilter: ['hidden'], subtree: true });

  /* ---------- Idle nudge: invite the visitor onward ---------- */
  let idleTimer;
  const armNudge = () => {
    wrap.classList.remove('is-nudge');
    hintEl.textContent = 'explored';
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      const next = nextUnseen();
      if (!next || !panel.hidden || window.scrollY < 200) return;
      hintEl.textContent = `next: ${LABELS[next.id] || next.id} ↓`;
      wrap.classList.add('is-nudge');
    }, 9000);
  };
  window.addEventListener('scroll', armNudge, { passive: true });
  chip.addEventListener('click', armNudge);

  // Keep the chip clear of the sticky profile rail (its width changes per breakpoint). Resize only, never on scroll.
  const rail = document.querySelector('.profile-rail');
  const placeChip = () => {
    if (!rail) return;
    const rect = rail.getBoundingClientRect();
    const beside = getComputedStyle(rail).position === 'sticky' && rect.width < window.innerWidth * 0.6;
    if (beside) wrap.style.setProperty('--xp-left', `${Math.round(rect.right + 16)}px`);
    else wrap.style.removeProperty('--xp-left');
    // If the chip would share the bottom edge with the centred quick dock, lift it above the dock.
    wrap.style.removeProperty('--xp-bottom');
    const dock = document.querySelector('.quick-dock');
    if (!dock) return;
    const chipBox = wrap.getBoundingClientRect();
    const dockBox = dock.getBoundingClientRect();
    if (chipBox.right + 8 > dockBox.left && chipBox.left < dockBox.right + 8) {
      wrap.style.setProperty('--xp-bottom', `${Math.round(window.innerHeight - dockBox.top + 10)}px`);
    }
  };
  let placeTimer;
  window.addEventListener('resize', () => { clearTimeout(placeTimer); placeTimer = setTimeout(placeChip, 150); });
  placeChip();

  render();
  armNudge();

  /* ---------- Visitor counter (hidden unless /api/visits works) ---------- */
  const COUNTED_KEY = 'portfolio-visit-counted-at';
  const showCount = (count) => {
    if (!Number.isFinite(count) || count <= 0) return;
    const formatted = new Intl.NumberFormat('en-IN').format(count);
    document.querySelectorAll('[data-visitor-count]').forEach((node) => { node.textContent = formatted; });
    document.querySelectorAll('[data-xp-visitors], [data-visitor-badge]').forEach((node) => { node.hidden = false; });
  };
  const loadCount = () => {
    const lastCounted = Number(store.get(COUNTED_KEY, 0));
    const shouldCount = Date.now() - lastCounted > 24 * 60 * 60 * 1000;
    fetch('/api/visits', { method: shouldCount ? 'POST' : 'GET', keepalive: true })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (shouldCount) store.set(COUNTED_KEY, Date.now());
        showCount(Number(data.count));
      })
      .catch(() => { /* counter not connected: stays hidden */ });
  };
  // Never compete with first paint.
  if ('requestIdleCallback' in window) requestIdleCallback(loadCount, { timeout: 4000 });
  else setTimeout(loadCount, 2500);
})();
