/*
  Live layer — GitHub stats + recent activity, and the official LinkedIn profile badge.
  Removable: delete live.js + live.css and their tags in index.html.

  - GitHub: public, unauthenticated REST API (no token in the browser). Cached in localStorage
    for 30 minutes so a visitor never spends more than 2 requests of GitHub's 60/hour limit.
    Reuses the repo list script.js already cached when it is fresh.
  - LinkedIn has no public API for personal profile data, so its card is a static profile link.
  Nothing here runs until the Socials section is within ~600px of the viewport.
*/
(() => {
  const USER = (window.PORTFOLIO_DATA?.githubSync?.username || 'Cod4Nitish').trim();
  const EXCLUDE = new Set((window.PORTFOLIO_DATA?.githubSync?.excludeRepos || []).map((n) => String(n).toLowerCase()));
  const LINKEDIN_VANITY = 'nitish-ai-engineer';
  const profile = window.PORTFOLIO_DATA?.profile || {};
  const TTL = 30 * 60 * 1000;
  const section = document.getElementById('socials');
  const mount = document.querySelector('[data-live]');
  if (!section || !mount) return;

  const read = (key) => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
  const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage blocked */ } };
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const cachedFetch = async (key, url, fallback) => {
    const saved = read(key);
    if (saved && Date.now() - saved.savedAt < TTL) return saved.data;
    try {
      const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
      if (!response.ok) throw new Error(String(response.status));
      const data = await response.json();
      write(key, { savedAt: Date.now(), data });
      return data;
    } catch {
      return saved?.data ?? fallback; // stale data beats an empty card
    }
  };

  const timeAgo = (iso) => {
    const seconds = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
    const units = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]];
    for (const [unit, size] of units) {
      const value = Math.floor(seconds / size);
      if (value >= 1) return `${value} ${unit}${value > 1 ? 's' : ''} ago`;
    }
    return 'just now';
  };

  const renderGitHub = async () => {
    const panel = mount.querySelector('[data-live-github]');
    const sharedRepos = read(`nitish-github-repos:${USER.toLowerCase()}`);
    const [user, repos] = await Promise.all([
      cachedFetch(`nitish-github-user:${USER.toLowerCase()}`, `https://api.github.com/users/${encodeURIComponent(USER)}`, null),
      sharedRepos && Date.now() - sharedRepos.savedAt < TTL
        ? Promise.resolve(sharedRepos.repos)
        : cachedFetch(`nitish-github-recent:${USER.toLowerCase()}`, `https://api.github.com/users/${encodeURIComponent(USER)}/repos?per_page=100&sort=pushed`, []),
    ]);
    if (!user && !repos.length) {
      // Unauthenticated API is limited to 60 requests/hour per IP; keep the card useful when it trips.
      panel.innerHTML = `
        <div class="live-head"><span class="live-dot live-dot--off" aria-hidden="true"></span><small>GitHub</small></div>
        <p class="live-status">Live stats are paused right now. The code is all on GitHub.</p>
        <a class="live-more" href="https://github.com/${encodeURIComponent(USER)}" target="_blank" rel="noreferrer">Open GitHub profile ↗</a>`;
      return;
    }

    const visible = (Array.isArray(repos) ? repos : [])
      .filter((r) => r && !r.fork && !r.archived && !EXCLUDE.has(String(r.name).toLowerCase()))
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
    const stars = visible.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
    const latest = visible.slice(0, 3);

    panel.innerHTML = `
      <div class="live-head"><span class="live-dot" aria-hidden="true"></span><small>Live from GitHub</small></div>
      <dl class="live-stats">
        <div><dt>Public repos</dt><dd>${user?.public_repos ?? visible.length}</dd></div>
        <div><dt>Followers</dt><dd>${user?.followers ?? '—'}</dd></div>
        <div><dt>Stars earned</dt><dd>${stars}</dd></div>
      </dl>
      <p class="live-label">Recently pushed</p>
      <ul class="live-repos">${latest.map((r) => `
        <li><a href="${escapeHtml(r.html_url)}" target="_blank" rel="noreferrer">
          <strong>${escapeHtml(r.name)}</strong>
          <span>${escapeHtml(r.language || 'Code')} · ${escapeHtml(timeAgo(r.pushed_at))}</span>
        </a></li>`).join('')}</ul>
      <a class="live-more" href="https://github.com/${encodeURIComponent(USER)}" target="_blank" rel="noreferrer">See all on GitHub ↗</a>`;
  };

  // LinkedIn's badge script often swaps this card for a blank or "refused to connect" iframe,
  // so the card stays a plain link to the profile and never claims to be live.
  const renderLinkedIn = () => {
    const panel = mount.querySelector('[data-live-linkedin]');
    panel.innerHTML = `
      <div class="live-head"><span class="live-dot live-dot--li" aria-hidden="true"></span><small>LinkedIn</small></div>
      <div class="LI-profile-badge">
        <a class="li-fallback" href="https://www.linkedin.com/in/${LINKEDIN_VANITY}" target="_blank" rel="noreferrer">
          <img src="${escapeHtml(profile.profilePhoto || 'assets/nitish-portrait.jpeg')}" alt="" width="72" height="72" loading="lazy" decoding="async">
          <strong>Nitish Kumar</strong>
          <span>${escapeHtml(profile.role || 'AI Engineer')}</span>
          ${profile.connections ? `<small>${escapeHtml(profile.connections)}</small>` : ''}
          <b>View profile on LinkedIn ↗</b>
        </a>
      </div>`;
  };

  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    renderGitHub();
    renderLinkedIn();
  };
  if (!('IntersectionObserver' in window)) { start(); return; }
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) { observer.disconnect(); start(); }
  }, { rootMargin: '600px 0px' });
  observer.observe(section);
})();
