window.portfolioAction = (control) => {
  control?.dispatchEvent(new Event('portfolio-action'));
};

const menuButton = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-menu]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.documentElement.classList.add('js');

const setMenuState = (isOpen) => {
  const isMobile = window.matchMedia('(max-width: 620px)').matches;
  menuButton?.setAttribute('aria-expanded', String(isOpen));
  menu?.classList.toggle('is-open', isOpen);
  if (menu) {
    menu.inert = isMobile && !isOpen;
    menu.setAttribute('aria-hidden', String(isMobile && !isOpen));
  }
};

setMenuState(false);

menuButton?.addEventListener('portfolio-action', () => {
  setMenuState(menuButton.getAttribute('aria-expanded') !== 'true');
});

const navigationLinks = [...(menu?.querySelectorAll('a') || [])];

const setCurrentNavigation = (id) => {
  navigationLinks.forEach((link) => {
    const isCurrent = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('is-current', isCurrent);
    if (isCurrent) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
};

navigationLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const id = link.getAttribute('href')?.slice(1);
    if (id) setCurrentNavigation(id);
    setMenuState(false);
  });
});

const initialSectionId = window.location.hash.slice(1) || 'about';
setCurrentNavigation(initialSectionId);

if ('IntersectionObserver' in window && !reduceMotion) {
  const navigationSections = navigationLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const navigationObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
      if (visible?.target?.id) setCurrentNavigation(visible.target.id);
    },
    { rootMargin: '-18% 0px -68% 0px', threshold: [0.05, 0.2, 0.45] },
  );

  navigationSections.forEach((section) => navigationObserver.observe(section));
}

window.addEventListener('resize', () => setMenuState(false));
document.querySelector('[data-year]').textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('[data-reveal]');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

document.querySelectorAll('[data-reaction]').forEach((button) => {
  button.addEventListener('portfolio-action', () => {
    const wasSaved = button.getAttribute('aria-pressed') === 'true';
    const icon = button.querySelector('span');

    button.setAttribute('aria-pressed', String(!wasSaved));
    if (icon) icon.textContent = wasSaved ? '♡' : '♥';
    button.lastChild.textContent = wasSaved ? ' Save this build' : ' Saved for later';
  });
});

const supportsPointerEffects =
  window.matchMedia('(pointer: fine)').matches && !reduceMotion;

const dragNotes = document.querySelectorAll('[data-drag-note]');
const notesResets = document.querySelectorAll('[data-notes-reset]');

const placeNoteInsideWorkbench = (note, proposedX, proposedY) => {
  const workbench = note.closest('[data-note-workbench]');
  if (!workbench) return;

  const currentX = Number.parseFloat(note.style.getPropertyValue('--drag-x')) || 0;
  const currentY = Number.parseFloat(note.style.getPropertyValue('--drag-y')) || 0;
  const noteBounds = note.getBoundingClientRect();
  const workbenchBounds = workbench.getBoundingClientRect();
  const inset = 12;
  const minX = currentX + workbenchBounds.left + inset - noteBounds.left;
  const maxX = currentX + workbenchBounds.right - inset - noteBounds.right;
  const minY = currentY + workbenchBounds.top + inset - noteBounds.top;
  const maxY = currentY + workbenchBounds.bottom - inset - noteBounds.bottom;
  const nextX = Math.max(minX, Math.min(maxX, proposedX));
  const nextY = Math.max(minY, Math.min(maxY, proposedY));

  note.style.setProperty('--drag-x', `${nextX}px`);
  note.style.setProperty('--drag-y', `${nextY}px`);
};

dragNotes.forEach((note) => {
  const moveNoteWithKeys = (event) => {
    const keySteps = {
      ArrowLeft: [-24, 0],
      ArrowRight: [24, 0],
      ArrowUp: [0, -24],
      ArrowDown: [0, 24],
    };
    const step = keySteps[event.key];
    if (!step) return;

    event.preventDefault();
    const currentX = Number.parseFloat(note.style.getPropertyValue('--drag-x')) || 0;
    const currentY = Number.parseFloat(note.style.getPropertyValue('--drag-y')) || 0;
    placeNoteInsideWorkbench(note, currentX + step[0], currentY + step[1]);
  };

  note.addEventListener('keydown', moveNoteWithKeys);

  let startX = 0;
  let startY = 0;
  let offsetX = 0;
  let offsetY = 0;
  let dragging = false;

  note.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    dragging = true;
    startX = event.clientX;
    startY = event.clientY;
    offsetX = Number.parseFloat(note.style.getPropertyValue('--drag-x')) || 0;
    offsetY = Number.parseFloat(note.style.getPropertyValue('--drag-y')) || 0;
    try {
      note.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture is an enhancement; dragging still works where it is unavailable.
    }
    note.classList.add('is-dragging');
  });

  note.addEventListener('pointermove', (event) => {
    if (!dragging) return;

    placeNoteInsideWorkbench(
      note,
      offsetX + event.clientX - startX,
      offsetY + event.clientY - startY,
    );
  });

  const stopDragging = (event) => {
    dragging = false;
    note.classList.remove('is-dragging');
    try {
      if (event?.pointerId !== undefined && note.hasPointerCapture(event.pointerId)) {
        note.releasePointerCapture(event.pointerId);
      }
    } catch {
      // Releasing capture is optional and should never stop a note from working.
    }
  };

  note.addEventListener('pointerup', stopDragging);
  note.addEventListener('pointercancel', stopDragging);
});

notesResets.forEach((reset) => {
  reset.addEventListener('click', () => {
    reset.closest('[data-note-workbench]')?.querySelectorAll('[data-drag-note]').forEach((note) => {
      note.style.removeProperty('--drag-x');
      note.style.removeProperty('--drag-y');
    });
  });
});

if (supportsPointerEffects) {
  document.querySelectorAll('.project-card[data-reveal]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.setProperty('--tilt-x', `${y * -3.25}deg`);
      card.style.setProperty('--tilt-y', `${x * 3.25}deg`);
      card.style.setProperty('--lift', '-5px');
    });

    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
      card.style.removeProperty('--lift');
    });
  });

  const portrait = document.querySelector('[data-portrait]');

  portrait?.addEventListener('pointermove', (event) => {
    const bounds = portrait.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    portrait.style.setProperty('--portrait-x', `${x * 9}px`);
    portrait.style.setProperty('--portrait-y', `${y * 9}px`);
  });

  portrait?.addEventListener('pointerleave', () => {
    portrait.style.removeProperty('--portrait-x');
    portrait.style.removeProperty('--portrait-y');
  });
}

const joyButton = document.querySelector('[data-joy-mode]');

joyButton?.addEventListener('portfolio-action', () => {
  const isPlayful = document.body.classList.toggle('joy-mode');
  joyButton.setAttribute('aria-pressed', String(isPlayful));
});

const portfolioData = window.PORTFOLIO_DATA || {};
const curatedProjects = Array.isArray(portfolioData.projects) ? portfolioData.projects : [];
let projects = [...curatedProjects];
const aboutPhotos = Array.isArray(portfolioData.aboutPhotos)
  ? portfolioData.aboutPhotos
  : [];
const events = Array.isArray(portfolioData.events) ? portfolioData.events : [];
const tools = Array.isArray(portfolioData.tools) ? portfolioData.tools : [];
const resume = portfolioData.resume || {};
const savedProjectTitles = new Set();

try {
  const savedProjects = JSON.parse(window.localStorage.getItem('nitish-saved-projects') || '[]');
  if (Array.isArray(savedProjects)) savedProjects.forEach((title) => savedProjectTitles.add(title));
} catch {
  // Saving is an enhancement; the portfolio stays fully usable when storage is unavailable.
}

const escapeHtml = (value = '') =>
  String(value).replace(/[&<>'"]/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    };
    return entities[character];
  });

if (portfolioData.profile?.heroPhoto) {
  document.querySelectorAll('[data-hero-image]').forEach((image) => {
    image.src = portfolioData.profile.heroPhoto;
  });
}

const profile = portfolioData.profile || {};

const resumeEducation = document.querySelector('[data-resume-education]');
const resumeSkills = document.querySelector('[data-resume-skills]');
const resumeCertifications = document.querySelector('[data-resume-certifications]');

if (resumeEducation) {
  resumeEducation.innerHTML = (resume.education || [])
    .map(
      (entry) => `<article class="education-item" data-interaction-card data-card-family="education" role="button" tabindex="0" aria-pressed="false" aria-label="Select education: ${escapeHtml(entry.institution)}"><strong>${escapeHtml(entry.institution)}</strong><span>${escapeHtml(entry.qualification)}</span><small>${escapeHtml(entry.dates)}</small></article>`,
    )
    .join('');
}

if (resumeSkills) {
  resumeSkills.innerHTML = (resume.skills || [])
    .map(
      (group) => `<button class="skill-group" type="button" data-interaction-card data-card-family="skills" aria-pressed="false" aria-label="Highlight ${escapeHtml(group.label)} skills"><b>${escapeHtml(group.label)}</b><span>${escapeHtml((group.items || []).join(' · '))}</span></button>`,
    )
    .join('');
}

if (resumeCertifications) {
  resumeCertifications.innerHTML = (resume.certifications || [])
    .map((certification) => {
      const item = typeof certification === 'string'
        ? { title: certification, issuer: '', date: '' }
        : certification || {};
      const certificationMeta = [item.date, item.skills, item.credentialId ? `ID: ${item.credentialId}` : ''].filter(Boolean).join(' · ');
      return `<article class="certification-card" data-interaction-card data-card-family="certificate" role="button" tabindex="0" aria-pressed="false" aria-label="Select certification: ${escapeHtml(item.title || 'Certification')}"><strong>${escapeHtml(item.title || '')}</strong>${item.issuer ? `<span>${escapeHtml(item.issuer)}</span>` : ''}${certificationMeta ? `<small>${escapeHtml(certificationMeta)}</small>` : ''}</article>`;
    })
    .join('');
}

const interactionCards = document.querySelectorAll('[data-interaction-card]');

const toggleCardSelection = (card) => {
  const willSelect = card.getAttribute('aria-pressed') !== 'true';
  card.setAttribute('aria-pressed', String(willSelect));
  card.classList.toggle('is-selected', willSelect);
  card.classList.remove('is-activating');

  if (!willSelect || reduceMotion) return;
  void card.offsetWidth;
  card.classList.add('is-activating');
  window.setTimeout(() => card.classList.remove('is-activating'), 560);
};

interactionCards.forEach((card) => {
  card.addEventListener('click', () => toggleCardSelection(card));
  card.addEventListener('keydown', (event) => {
    if (card.tagName === 'BUTTON') return;
    if (!['Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    toggleCardSelection(card);
  });
});

const profileTextFields = [
  ['[data-profile-linkedin-name]', profile.linkedinName],
  ['[data-profile-connections]', profile.connections],
  ['[data-profile-focus]', profile.focus],
  ['[data-profile-role]', profile.role],
  ['[data-profile-location]', profile.location],
  ['[data-profile-country]', profile.country],
  ['[data-profile-internship]', profile.internship],
  ['[data-profile-experience]', profile.experience],
];

profileTextFields.forEach(([selector, value]) => {
  if (!value) return;
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
});

const internshipHighlights = document.querySelector('[data-profile-internship-highlights]');

if (internshipHighlights && Array.isArray(profile.internshipHighlights)) {
  internshipHighlights.innerHTML = profile.internshipHighlights
    .map((highlight) => `<li>${escapeHtml(highlight)}</li>`)
    .join('');
}

if (profile.linkedinUrl) {
  document.querySelectorAll('[data-profile-linkedin]').forEach((link) => {
    link.href = profile.linkedinUrl;
  });
}

if (profile.profilePhoto) {
  document.querySelectorAll('[data-profile-photo]').forEach((image) => {
    image.src = profile.profilePhoto;
  });
}

if (profile.wallPortfolioUrl) {
  document.querySelectorAll('[data-wall-portfolio]').forEach((link) => {
    link.href = profile.wallPortfolioUrl;
  });
}

const tactileLinks = document.querySelectorAll('[data-tactile-link]');

tactileLinks.forEach((link) => {
  link.addEventListener('click', () => {
    tactileLinks.forEach((item) => item.classList.remove('is-selected'));
    link.classList.add('is-selected');
  });
});

const profileTime = document.querySelector('[data-profile-time]');
const currentTime = document.querySelector('[data-current-time]');
const currentDate = document.querySelector('[data-current-date]');
const currentDay = document.querySelector('[data-current-day]');
const currentMonth = document.querySelector('[data-current-month]');
const heroUpdateLabel = document.querySelector('[data-hero-update-label]');
const heroUpdateTitle = document.querySelector('[data-hero-update-title]');
const heroUpdateCopy = document.querySelector('[data-hero-update-copy]');

const updateHeroBuildUpdate = () => {
  const update = profile.workbenchUpdate || {};
  if (heroUpdateLabel && update.label) heroUpdateLabel.textContent = update.label;
  if (heroUpdateTitle && update.title) heroUpdateTitle.textContent = update.title;
  if (heroUpdateCopy && update.detail) heroUpdateCopy.textContent = update.detail;
};

const getCurrentAge = (birthDate, now) => {
  const parts = String(birthDate || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!parts) return null;
  const [, birthYear, birthMonth, birthDay] = parts.map(Number);
  const todayParts = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const getPart = (type) => Number(todayParts.find((part) => part.type === type)?.value || 0);
  const currentYear = getPart('year');
  const currentMonthNumber = getPart('month');
  const currentDayNumber = getPart('day');
  const hasHadBirthday = currentMonthNumber > birthMonth || (currentMonthNumber === birthMonth && currentDayNumber >= birthDay);
  const age = currentYear - birthYear - (hasHadBirthday ? 0 : 1);
  return age >= 0 ? age : null;
};

const getInternshipMonths = (startDate, now) => {
  const parts = String(startDate || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!parts) return null;

  const [, startYear, startMonth, startDay] = parts.map(Number);
  const todayParts = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const getPart = (type) => Number(todayParts.find((part) => part.type === type)?.value || 0);
  const year = getPart('year');
  const month = getPart('month');
  const day = getPart('day');
  const elapsed = (year - startYear) * 12 + (month - startMonth) - (day < startDay ? 1 : 0);
  return Math.max(0, elapsed);
};

const formatInternshipDuration = (months) => {
  const safeMonths = Math.max(0, months);
  return `${safeMonths} ${safeMonths === 1 ? 'month' : 'months'} +`;
};

const updateInternshipDuration = (now) => {
  const elapsedMonths = getInternshipMonths(profile.internshipStartDate, now);
  if (elapsedMonths === null) return;

  const configuredLimit = Number(profile.internshipDurationMonths);
  const months = Number.isFinite(configuredLimit) && configuredLimit > 0
    ? Math.min(elapsedMonths, configuredLimit)
    : elapsedMonths;
  const duration = formatInternshipDuration(months);
  const title = profile.internshipTitle || 'AI product internship';
  const railSummary = title;
  const detail = profile.experience || `${duration} of agentic AI product work.`;

  document.querySelectorAll('[data-profile-internship]').forEach((element) => {
    element.textContent = railSummary;
  });
  document.querySelectorAll('[data-profile-internship-duration]').forEach((element) => {
    element.textContent = duration;
  });
  document.querySelectorAll('[data-profile-internship-detail]').forEach((element) => {
    element.textContent = detail;
  });
  document.querySelectorAll('[data-profile-internship-start]').forEach((element) => {
    element.textContent = profile.internshipStartLabel || '';
    element.hidden = !profile.internshipStartLabel;
  });
};

const updateProfileClock = () => {
  const now = new Date();
  updateInternshipDuration(now);
  const age = getCurrentAge(profile.birthDate, now);

  if (age !== null) {
    if (currentTime) currentTime.textContent = `AGE ${age}`;
    if (currentDate) currentDate.textContent = 'Updates automatically every birthday';
    if (currentDay) currentDay.textContent = String(age);
    if (currentMonth) currentMonth.textContent = 'AGE';
    profileTime?.setAttribute('aria-label', `Nitish is ${age} years old. This age updates automatically every birthday.`);
    return;
  }

  const time = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(now);
  const date = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(now);
  const calendarParts = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
  }).formatToParts(now);
  const day = calendarParts.find((part) => part.type === 'day')?.value || '--';
  const month = calendarParts.find((part) => part.type === 'month')?.value || '---';

  if (currentTime) currentTime.textContent = time;
  if (currentDate) currentDate.textContent = date;
  if (currentDay) currentDay.textContent = day;
  if (currentMonth) currentMonth.textContent = month.toUpperCase();
  profileTime?.setAttribute('aria-label', `Current time in Noida, India: ${time}, ${date}`);
};

updateHeroBuildUpdate();
updateProfileClock();
window.setInterval(updateProfileClock, 30_000);

const aboutLiveClock = document.querySelector('[data-about-live-clock]');

if (aboutLiveClock) {
  aboutLiveClock.addEventListener('portfolio-action', () => {
    aboutLiveClock.classList.remove('is-clock-activated');
    void aboutLiveClock.offsetWidth;
    aboutLiveClock.classList.add('is-clock-activated');
  });

  if (supportsPointerEffects) {
    aboutLiveClock.addEventListener('pointermove', (event) => {
      const bounds = aboutLiveClock.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
      const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
      aboutLiveClock.style.setProperty('--clock-light-x', `${Math.round(x * 100)}%`);
      aboutLiveClock.style.setProperty('--clock-light-y', `${Math.round(y * 100)}%`);
    });

    aboutLiveClock.addEventListener('pointerleave', () => {
      aboutLiveClock.style.removeProperty('--clock-light-x');
      aboutLiveClock.style.removeProperty('--clock-light-y');
    });
  }

  aboutLiveClock.addEventListener('animationend', (event) => {
    if (event.animationName === 'clock-click-pulse') {
      aboutLiveClock.classList.remove('is-clock-activated');
    }
  });
}

const projectList = document.querySelector('[data-project-list]');
const featuredProjectList = document.querySelector('[data-featured-project-list]');
const projectCount = document.querySelector('[data-project-count]');
const projectEmpty = document.querySelector('[data-project-empty]');
const projectFilters = document.querySelectorAll('[data-project-filter]');
const githubSyncStatus = document.querySelector('[data-github-sync-status]');
let featuredProjects = [];
let smallBuilds = [];
let activeProjectFilter = 'all';

const refreshProjectCollections = () => {
  featuredProjects = projects
    .filter((project) => project.featured)
    .slice()
    .sort((a, b) => (a.featuredOrder ?? Number.MAX_SAFE_INTEGER) - (b.featuredOrder ?? Number.MAX_SAFE_INTEGER));
  smallBuilds = projects
    .filter((project) => !project.featured)
    .slice()
    .sort((first, second) => {
      if (first.githubSynced && second.githubSynced) {
        return String(second.updatedAt || '').localeCompare(String(first.updatedAt || ''));
      }
      return Number(Boolean(first.githubSynced)) - Number(Boolean(second.githubSynced));
    });
};

const actionMarkup = (project) => {
  const label = escapeHtml(project.action || 'View build');
  const isSaved = savedProjectTitles.has(project.title);
  const saveAction = `<button class="build-save" type="button" aria-pressed="${isSaved}" data-build-save data-project-title="${escapeHtml(project.title)}" data-action="save-build" onclick="window.portfolioAction(this)"><span aria-hidden="true">${isSaved ? '♥' : '♡'}</span>${isSaved ? ' Saved' : ' Save'}</button>`;
  const repositoryAction = project.repository
    ? `<a class="build-repository" href="${escapeHtml(project.repository)}" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>`
    : '';
  const extraActions = (project.extraLinks || [])
    .filter((link) => link?.href)
    .map((link) => `<a class="build-repository" href="${escapeHtml(link.href)}" target="_blank" rel="noreferrer">${escapeHtml(link.label || 'Open link')} <span aria-hidden="true">↗</span></a>`)
    .join('');

  if (project.href) {
    return `<div class="build-actions"><a class="build-action" href="${escapeHtml(project.href)}" target="_blank" rel="noreferrer">${label} <span aria-hidden="true">↗</span></a>${repositoryAction}${extraActions}${saveAction}</div>`;
  }

  return `<div class="build-actions"><span class="build-private">${label}</span>${repositoryAction}${extraActions}${saveAction}</div>`;
};

const featuredActionMarkup = (project) => {
  const primary = project.href
    ? `<a href="${escapeHtml(project.href)}" target="_blank" rel="noreferrer">${escapeHtml(project.action || 'Explore project')} <span aria-hidden="true">↗</span></a>`
    : `<span class="featured-project-private">${escapeHtml(project.action || 'Private build')}</span>`;
  const repository = project.repository
    ? `<a class="featured-project-repository" href="${escapeHtml(project.repository)}" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>`
    : '';
  return `<div class="featured-project-actions">${primary}${repository}</div>`;
};

const playProjectSelection = (container, selectedCard) => {
  container?.querySelectorAll('[data-project-card]').forEach((card) => {
    card.classList.toggle('is-selected', card === selectedCard);
    card.classList.remove('is-selecting');
  });

  if (!selectedCard || reduceMotion) return;
  void selectedCard.offsetWidth;
  selectedCard.classList.add('is-selecting');
  window.setTimeout(() => selectedCard.classList.remove('is-selecting'), 520);
};

const renderFeaturedProjects = () => {
  if (!featuredProjectList) return;

  featuredProjectList.innerHTML = featuredProjects
    .map(
      (project, index) => `
        <article class="featured-project featured-project--${escapeHtml(project.accent || 'blue')}" data-project-card tabindex="0" style="--featured-delay:${index * 80}ms">
          <div class="featured-project-top"><span>0${index + 1} · Main project</span><b>${escapeHtml(project.status || 'Build')}</b></div>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.description)}</p>
          <ul>${(project.tags || []).map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}</ul>
          ${featuredActionMarkup(project)}
        </article>
      `,
    )
    .join('');

  featuredProjectList.querySelectorAll('[data-project-card]').forEach((card) => {
    card.addEventListener('click', () => playProjectSelection(featuredProjectList, card));
    card.addEventListener('keydown', (event) => {
      if (!['Enter', ' '].includes(event.key)) return;
      event.preventDefault();
      playProjectSelection(featuredProjectList, card);
    });
  });
};

const renderProjects = () => {
  if (!projectList) return;

  const visibleProjects = smallBuilds.filter(
    (project) => activeProjectFilter === 'all' || project.category === activeProjectFilter,
  );

  projectList.innerHTML = visibleProjects
    .map(
      (project, index) => `
        <article class="build-card build-card--${escapeHtml(project.accent || 'blue')}${project.githubSynced ? ' build-card--github' : ''}" data-build-card data-project-card tabindex="0" style="--card-order:${index};--card-delay:${index * 55}ms">
          <div class="build-card-top"><span>${escapeHtml(project.eyebrow)}</span><b>${escapeHtml(project.status || 'Build')}</b></div>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.description)}</p>
          <ul class="build-tags">${(project.tags || []).map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}</ul>
          ${actionMarkup(project)}
        </article>
      `,
    )
    .join('');

  projectList.querySelectorAll('[data-build-card]').forEach((card) => {
    card.addEventListener('click', () => {
      playProjectSelection(projectList, card);
    });
    card.addEventListener('keydown', (event) => {
      if (!['Enter', ' '].includes(event.key)) return;
      event.preventDefault();
      playProjectSelection(projectList, card);
    });
  });

  projectList.querySelectorAll('[data-build-save]').forEach((button) => {
    button.addEventListener('portfolio-action', () => {
      const wasSaved = button.getAttribute('aria-pressed') === 'true';
      const icon = button.querySelector('span');
      button.setAttribute('aria-pressed', String(!wasSaved));
      if (icon) icon.textContent = wasSaved ? '♡' : '♥';
      button.lastChild.textContent = wasSaved ? ' Save' : ' Saved';
      const title = button.dataset.projectTitle;

      if (title) {
        if (wasSaved) savedProjectTitles.delete(title);
        else savedProjectTitles.add(title);

        try {
          window.localStorage.setItem(
            'nitish-saved-projects',
            JSON.stringify([...savedProjectTitles]),
          );
        } catch {
          // The visual save state still works if a browser blocks storage.
        }
      }
    });
  });

  if (projectCount) {
    projectCount.textContent = `${visibleProjects.length} ${visibleProjects.length === 1 ? 'build' : 'builds'} shown`;
  }

  if (projectEmpty) projectEmpty.hidden = visibleProjects.length !== 0;
};

projectFilters.forEach((filter) => {
  filter.addEventListener('portfolio-action', () => {
    activeProjectFilter = filter.dataset.projectFilter || 'all';
    projectFilters.forEach((button) => {
      button.setAttribute(
        'aria-pressed',
        String(button === filter),
      );
    });
    renderProjects();
  });
});

const searchPanel = document.querySelector('[data-search-panel]');
const headerSearch = document.querySelector('[data-header-search]');
const searchTriggers = document.querySelectorAll('[data-search-trigger]');
const searchInput = document.querySelector('[data-portfolio-search]');
const searchClear = document.querySelector('[data-search-clear]');
const searchStatus = document.querySelector('[data-search-status]');
const searchResults = document.querySelector('[data-search-results]');

let searchEntries = [];

const rebuildSearchEntries = () => {
  searchEntries = [
  ...projects.map((project) => ({
    type: project.featured ? 'Main project' : 'Small build',
    title: project.title,
    description: project.description,
    terms: [project.eyebrow, project.status, ...(project.tags || [])],
    href: project.featured ? '#work' : '#builds',
  })),
  ...tools.map((tool) => ({
    type: 'Toolkit',
    title: tool.label,
    description: tool.role || 'A useful part of Nitish’s build loop.',
    terms: [tool.id, 'tool', 'skill', 'stack'],
    href: '#toolkit',
  })),
  ...events.map((event) => ({
    type: 'Event',
    title: event.title,
    description: event.description,
    terms: [event.date],
    href: '#events',
  })),
  ...(resume.education || []).map((entry) => ({
    type: 'Education',
    title: entry.institution,
    description: `${entry.qualification} · ${entry.dates}`,
    terms: [entry.qualification, entry.dates, 'education', 'college'],
    href: '#about',
  })),
  ...(resume.skills || []).map((group) => ({
    type: 'Technical skill',
    title: group.label,
    description: (group.items || []).join(' · '),
    terms: [...(group.items || []), 'skills', 'technical'],
    href: '#about',
  })),
  ...(resume.certifications || []).map((certification) => ({
    type: 'Certification',
    title: typeof certification === 'string' ? certification : certification.title,
    description: typeof certification === 'string'
      ? 'Certification and learning record.'
      : [certification.issuer, certification.date, certification.skills, certification.credentialId ? `ID: ${certification.credentialId}` : ''].filter(Boolean).join(' · '),
    terms: typeof certification === 'string'
      ? ['certification', 'course', 'workshop']
      : [certification.issuer, certification.date, certification.skills, certification.credentialId, 'certification', 'course', 'workshop'].filter(Boolean),
    href: '#about',
  })),
  {
    type: 'About',
    title: 'About Nitish',
    description: 'AI Engineer and full-stack developer building useful agentic products.',
    terms: ['generative ai', 'rag', 'llm', 'mooncee', 'noida'],
    href: '#about',
  },
  {
    type: 'Contact',
    title: 'Contact Nitish',
    description: 'Send an email or WhatsApp message to start a conversation.',
    terms: ['email', 'whatsapp', 'resume', 'linkedin', 'github'],
    href: '#contact',
  },
  {
    type: 'Social profile',
    title: 'LinkedIn — Nitish Kumar',
    description: 'Professional profile, experience, and recent work updates.',
    terms: ['linkedin', 'professional', 'connections', 'career'],
    href: 'https://www.linkedin.com/in/nitish-ai-engineer',
    external: true,
  },
  {
    type: 'Social profile',
    title: 'GitHub — @cod4nitish',
    description: 'Public repositories, experiments, and developer projects.',
    terms: ['github', 'repositories', 'code', 'open source', 'cod4nitish'],
    href: 'https://github.com/Cod4Nitish',
    external: true,
  },
  {
    type: 'Social profile',
    title: 'Instagram — @nitish.10.1',
    description: 'A look at Nitish outside the build loop.',
    terms: ['instagram', 'insta', 'nitish.10.1', 'social'],
    href: 'https://www.instagram.com/nitish.10.1',
    external: true,
  },
  {
    type: 'Résumé',
    title: 'Download Nitish’s résumé',
    description: 'A PDF summary of skills, work, projects, and experience.',
    terms: ['resume', 'résumé', 'cv', 'download'],
    href: 'assets/nitish-resume.pdf',
    download: true,
  },
  ];
};

refreshProjectCollections();
renderFeaturedProjects();
renderProjects();
rebuildSearchEntries();

const renderSearchResults = (query = '') => {
  if (!searchResults || !searchStatus) return;

  const normalizedQuery = query.trim().toLowerCase();
  const matches = normalizedQuery
    ? searchEntries.filter((entry) =>
        [entry.title, entry.description, ...(entry.terms || [])]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery),
      )
    : searchEntries.slice(0, 5);

  searchStatus.textContent = normalizedQuery
    ? `${matches.length} ${matches.length === 1 ? 'result' : 'results'} for “${query.trim()}”.`
    : 'Search projects, socials, résumé, events, and contact details.';

  searchResults.innerHTML = matches.length
    ? matches
        .map(
          (entry) => `<a class="search-result" href="${escapeHtml(entry.href)}"${entry.external ? ' target="_blank" rel="noreferrer"' : ''}${entry.download ? ' download' : ''}><span>${escapeHtml(entry.type)}</span><strong>${escapeHtml(entry.title)}</strong><p>${escapeHtml(entry.description)}</p><i aria-hidden="true">${entry.external ? '↗' : '↘'}</i></a>`,
        )
        .join('')
    : '<p class="search-empty">No matches yet. Try a project, skill, event, or “resume”.</p>';
};

const closePortfolioSearch = () => {
  if (!searchPanel || searchPanel.hidden) return;
  searchPanel.hidden = true;
  headerSearch?.classList.remove('is-open');
  searchTriggers.forEach((trigger) => trigger.setAttribute('aria-expanded', 'false'));
};

const openPortfolioSearch = (trigger) => {
  if (!searchPanel || !searchInput) return;
  const shouldOpen = searchPanel.hidden;
  if (!shouldOpen) {
    closePortfolioSearch();
    return;
  }
  searchPanel.hidden = false;
  headerSearch?.classList.add('is-open');
  searchTriggers.forEach((button) => button.setAttribute('aria-expanded', 'true'));
  renderSearchResults(searchInput?.value || '');
  if (trigger?.classList.contains('dock-search-button')) {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }
  window.setTimeout(() => searchInput.focus(), trigger?.classList.contains('dock-search-button') ? 260 : 0);
};

searchTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => openPortfolioSearch(trigger));
});

const clearPortfolioSearch = () => {
  if (!searchInput) return;
  searchInput.value = '';
  searchClear.hidden = true;
  renderSearchResults();
  searchInput.focus();
};

searchClear?.addEventListener('click', clearPortfolioSearch);

searchInput?.addEventListener('input', () => {
  if (searchClear) searchClear.hidden = !searchInput.value;
  renderSearchResults(searchInput.value);
});

searchResults?.addEventListener('click', (event) => {
  if (event.target.closest('a')) closePortfolioSearch();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closePortfolioSearch();
});

document.addEventListener('pointerdown', (event) => {
  if (!searchPanel?.hidden && !headerSearch?.contains(event.target)) closePortfolioSearch();
});

/*
  Small builds stay current without exposing an access token. The browser reads
  only the public repository list, keeps the five curated main projects intact,
  and never invents a link for confidential company work.
*/
const githubSync = portfolioData.githubSync || {};
const githubUsername = String(githubSync.username || '').trim();
const githubCacheKey = `nitish-github-repos:${githubUsername.toLowerCase()}`;
const githubCacheMinutes = Math.max(5, Number(githubSync.cacheMinutes) || 30);
const githubAccentCycle = ['blue', 'violet', 'coral', 'mint', 'sun'];

const normaliseProjectKey = (value = '') =>
  String(value)
    .toLowerCase()
    .replace(/krypton/g, 'crypton')
    .replace(/[^a-z0-9]+/g, '');

const githubRepositorySlug = (value = '') => {
  const match = String(value).match(/github\.com\/([^/?#]+\/[^/?#]+)/i);
  return match ? match[1].toLowerCase() : '';
};

const getCachedGitHubRepos = () => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(githubCacheKey) || 'null');
    if (!saved || !Array.isArray(saved.repos)) return null;
    return saved;
  } catch {
    return null;
  }
};

const saveCachedGitHubRepos = (repos) => {
  try {
    window.localStorage.setItem(githubCacheKey, JSON.stringify({ savedAt: Date.now(), repos }));
  } catch {
    // Sync still works if a browser blocks local storage.
  }
};

const projectCategoryFromRepository = (repository) => {
  const searchable = [repository.name, repository.description, repository.language, ...(repository.topics || [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  if (/(ai|agent|rag|llm|gemini|openai|claude|chat|ml|vision|phish)/.test(searchable)) return 'ai';
  if (/(portfolio|web|frontend|react|next|ui|dashboard|site|app)/.test(searchable)) return 'product';
  return 'foundation';
};

const readableProjectName = (name = '') =>
  String(name)
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replace(/Ai\b/g, 'AI')
    .replace(/Cv\b/g, 'CV');

const publicUrl = (value = '') => {
  const candidate = String(value || '').trim();
  if (!candidate) return '';
  return /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
};

const applyGitHubProjects = (repositories, source = 'live') => {
  const excludedNames = new Set(
    (Array.isArray(githubSync.excludeRepos) ? githubSync.excludeRepos : [])
      .map((name) => String(name).toLowerCase().trim())
      .filter(Boolean),
  );
  const publicRepositories = repositories
    .filter((repository) => repository && !repository.fork && !repository.archived && !repository.disabled)
    .slice(0, Math.max(1, Number(githubSync.maxRepos) || 30));

  const enrichedCuratedProjects = curatedProjects.map((project) => {
    const confidential = /confidential/i.test(String(project.status || ''));
    if (project.repository || confidential) return project;
    const matchingRepository = publicRepositories.find(
      (repository) => normaliseProjectKey(repository.name) === normaliseProjectKey(project.title),
    );
    return matchingRepository
      ? { ...project, repository: matchingRepository.html_url }
      : project;
  });

  const curatedRepositorySlugs = new Set(
    enrichedCuratedProjects
      .map((project) => githubRepositorySlug(project.repository))
      .filter(Boolean),
  );
  const curatedTitleKeys = new Set(
    enrichedCuratedProjects.map((project) => normaliseProjectKey(project.title)).filter(Boolean),
  );

  const syncedProjects = publicRepositories
    .filter((repository) => {
      const repositoryName = String(repository.name || '').toLowerCase();
      const repositorySlug = String(repository.full_name || '').toLowerCase();
      return !excludedNames.has(repositoryName)
        && !curatedRepositorySlugs.has(repositorySlug)
        && !curatedTitleKeys.has(normaliseProjectKey(repository.name));
    })
    .map((repository, index) => {
      const liveUrl = publicUrl(repository.homepage);
      const language = String(repository.language || '').trim();
      const topicTags = Array.isArray(repository.topics) ? repository.topics.slice(0, 3) : [];
      const tags = [...new Set([language, ...topicTags, 'GitHub'].filter(Boolean))].slice(0, 4);
      return {
        title: readableProjectName(repository.name),
        eyebrow: language ? `${language} · GitHub project` : 'GitHub project',
        description: repository.description || 'A public build from Nitish’s GitHub. Open the project or source to see the latest work.',
        tags,
        category: projectCategoryFromRepository(repository),
        status: 'Public · GitHub',
        href: liveUrl || repository.html_url,
        repository: liveUrl ? repository.html_url : null,
        action: liveUrl ? 'Open live project' : 'View on GitHub',
        accent: githubAccentCycle[index % githubAccentCycle.length],
        featured: false,
        githubSynced: true,
        updatedAt: repository.pushed_at || repository.updated_at || '',
      };
    });

  projects = [...enrichedCuratedProjects, ...syncedProjects];
  refreshProjectCollections();
  renderFeaturedProjects();
  renderProjects();
  rebuildSearchEntries();
  if (!searchPanel?.hidden) renderSearchResults(searchInput?.value || '');

  if (githubSyncStatus) {
    const count = syncedProjects.length;
    githubSyncStatus.textContent = count
      ? `${count} public GitHub ${count === 1 ? 'project' : 'projects'} synced automatically (${source}).`
      : 'Public GitHub builds are up to date.';
  }
};

const syncGitHubProjects = async () => {
  if (!githubUsername) {
    if (githubSyncStatus) githubSyncStatus.textContent = 'GitHub sync is not configured yet.';
    return;
  }

  const cached = getCachedGitHubRepos();
  if (cached) {
    applyGitHubProjects(cached.repos, 'cached');
    const cacheAge = Date.now() - Number(cached.savedAt || 0);
    if (cacheAge >= 0 && cacheAge < githubCacheMinutes * 60 * 1000) return;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(githubUsername)}/repos?per_page=100&sort=updated&direction=desc`,
      { headers: { Accept: 'application/vnd.github+json' } },
    );
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
    const repositories = await response.json();
    if (!Array.isArray(repositories)) throw new Error('GitHub returned an unexpected response');
    saveCachedGitHubRepos(repositories);
    applyGitHubProjects(repositories, 'live');
  } catch {
    if (!cached && githubSyncStatus) {
      githubSyncStatus.textContent = 'GitHub could not be reached right now; curated project links are still available.';
    }
  }
};

void syncGitHubProjects();

const profileDialog = document.querySelector('[data-profile-dialog]');
const profileOpeners = document.querySelectorAll('[data-profile-open]');
const profileClosers = document.querySelectorAll('[data-profile-close]');
const resetProfileOpenerState = () => profileOpeners.forEach((button) => button.setAttribute('aria-expanded', 'false'));

const closeProfileSheet = () => {
  if (!profileDialog?.open) return;
  profileDialog.close();
};

profileOpeners.forEach((opener) => {
  opener.addEventListener('click', () => {
    if (!profileDialog) return;
    profileDialog.showModal();
    profileOpeners.forEach((button) => button.setAttribute('aria-expanded', 'true'));
  });
});

profileClosers.forEach((closer) => closer.addEventListener('click', closeProfileSheet));

profileDialog?.addEventListener('click', (event) => {
  if (event.target === profileDialog) closeProfileSheet();
});

profileDialog?.addEventListener('close', () => {
  resetProfileOpenerState();
});

profileDialog?.addEventListener('cancel', resetProfileOpenerState);

const aboutGallery = document.querySelector('[data-about-gallery]');

if (aboutGallery) {
  aboutGallery.innerHTML = aboutPhotos
    .map(
      (photo) => `
        <figure class="about-photo-card">
          <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt)}" loading="lazy" />
          <figcaption><span>${escapeHtml(photo.eyebrow)}</span><strong>${escapeHtml(photo.caption)}</strong></figcaption>
        </figure>
      `,
    )
    .join('');
}

const eventsSection = document.querySelector('.events-section');
const eventList = document.querySelector('[data-event-list]');

if (eventsSection && eventList && events.length) {
  eventsSection.hidden = false;
  eventList.innerHTML = events
    .map((event, index) => {
      const images = Array.isArray(event.images) && event.images.length
        ? event.images
        : [{ src: event.image, alt: event.alt }];
      const media = images.length > 1
        ? `<button class="event-media event-media--duo event-photo-trigger" type="button" data-event-photo aria-label="Play a small celebration animation for ${escapeHtml(event.title)}">${images
          .slice(0, 2)
          .map((image, index) => `<figure class="event-photo-panel event-photo-panel--${index + 1}"><img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" loading="lazy" /></figure>`)
          .join('')}</button>`
        : `<button class="event-media event-photo-trigger" type="button" data-event-photo aria-label="Play a small celebration animation for ${escapeHtml(event.title)}"><img src="${escapeHtml(images[0]?.src || '')}" alt="${escapeHtml(images[0]?.alt || '')}" loading="lazy" /></button>`;
      const highlights = Array.isArray(event.highlights) && event.highlights.length
        ? `<ul class="event-highlights">${event.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
        : '';
      const source = event.href
        ? `<a class="event-source" href="${escapeHtml(event.href)}" target="_blank" rel="noreferrer">View event details on Luma</a>`
        : '';
      return `<div class="event-timeline-step event-timeline-step--${index + 1}"><span class="event-timeline-index" aria-hidden="true">0${index + 1}</span><article class="event-card">${media}<div><span>${escapeHtml(event.date)}</span><h3>${escapeHtml(event.title)}</h3><p>${escapeHtml(event.description)}</p>${highlights}${source}</div></article></div>`;
    })
    .join('');

  eventList.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-event-photo]');
    if (!trigger) return;
    trigger.classList.remove('is-celebrating');
    void trigger.offsetWidth;
    trigger.classList.add('is-celebrating');
  });

  eventList.addEventListener('animationend', (event) => {
    const trigger = event.target.closest('[data-event-photo]');
    if (trigger) trigger.classList.remove('is-celebrating');
  });
}

const toolGrid = document.querySelector('[data-tool-grid]');
const toToolId = (value = '') =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'tool';
const isToolColor = (value) => /^#[0-9a-f]{6}$/i.test(String(value || '').trim());
const toolPaletteStyle = (tool) => {
  const rules = [];
  if (isToolColor(tool.fill)) rules.push(`--tool-fill:${tool.fill}`);
  if (isToolColor(tool.strong)) rules.push(`--tool-strong:${tool.strong}`);
  return rules.length ? ` style="${rules.join(';')}"` : '';
};

if (toolGrid) {
  toolGrid.innerHTML = tools
    .filter((tool) => tool && tool.label)
    .map((tool) => {
      const label = String(tool.label);
      const icon = String(tool.icon || '').trim();
      const iconMarkup = icon
        ? `<img class="tool-logo" src="${escapeHtml(icon)}" alt="" />`
        : `<i class="tool-logo tool-logo--fallback" aria-hidden="true">${escapeHtml(label.slice(0, 1).toUpperCase())}</i>`;
      return `<button class="tool-card ${escapeHtml(toToolId(tool.id || label))}" type="button" draggable="true" data-tool-card data-tool-id="${escapeHtml(toToolId(tool.id || label))}" data-tool-role="${escapeHtml(tool.role || 'A useful part of the build loop')}" aria-pressed="false" data-action="select-tool" onclick="window.portfolioAction(this)"${toolPaletteStyle(tool)}><span>${iconMarkup}</span><b>${escapeHtml(label)}</b></button>`;
    })
    .join('');
}

const toolCards = document.querySelectorAll('[data-tool-card]');
const toolSelection = document.querySelector('[data-tool-selection]');
const toolkitMain = document.querySelector('.toolkit-main');

toolCards.forEach((card) => {
  card.addEventListener('portfolio-action', () => {
    const isActive = card.getAttribute('aria-pressed') === 'true';

    toolCards.forEach((tool) => tool.setAttribute('aria-pressed', 'false'));

    if (isActive) {
      toolSelection.textContent = 'Select a tool to see where it fits in the build loop.';
      return;
    }

    card.setAttribute('aria-pressed', 'true');
    toolkitMain?.classList.remove('is-tool-reacting');
    window.requestAnimationFrame(() => toolkitMain?.classList.add('is-tool-reacting'));
    const name = card.querySelector('b')?.textContent || 'This tool';
    const role = card.dataset.toolRole || 'A dependable part of the build loop';
    toolSelection.textContent = `${name}: ${role}.`;
  });
});

const toolkitOrderKey = 'nitish-toolkit-order';
let draggedToolCard = null;

const getToolId = (card) => card.dataset.toolId || card.querySelector('b')?.textContent?.trim() || '';

const saveToolOrder = () => {
  if (!toolGrid) return;
  try {
    window.localStorage.setItem(
      toolkitOrderKey,
      JSON.stringify([...toolGrid.querySelectorAll('[data-tool-card]')].map(getToolId)),
    );
  } catch {
    // Rearranging stays useful even when local storage is unavailable.
  }
};

const restoreToolOrder = () => {
  if (!toolGrid) return;
  try {
    const savedOrder = JSON.parse(window.localStorage.getItem(toolkitOrderKey) || '[]');
    if (!Array.isArray(savedOrder)) return;
    savedOrder.forEach((toolName) => {
      const tool = [...toolGrid.querySelectorAll('[data-tool-card]')].find((card) => getToolId(card) === toolName);
      if (tool) toolGrid.append(tool);
    });
  } catch {
    // The default order remains when a saved preference cannot be read.
  }
};

const announceToolMove = (card) => {
  if (!toolSelection) return;
  toolSelection.textContent = `${getToolId(card)} moved. Drag any tool card again to arrange your toolkit.`;
};

restoreToolOrder();

toolCards.forEach((card) => {
  card.addEventListener('dragstart', (event) => {
    draggedToolCard = card;
    card.classList.add('is-tool-dragging');
    event.dataTransfer?.setData('text/plain', getToolId(card));
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('is-tool-dragging');
    draggedToolCard = null;
    saveToolOrder();
  });

  card.addEventListener('dragover', (event) => {
    if (!draggedToolCard || draggedToolCard === card) return;
    event.preventDefault();
    const bounds = card.getBoundingClientRect();
    const shouldPlaceAfter = event.clientY > bounds.top + bounds.height / 2 || event.clientX > bounds.left + bounds.width / 2;
    if (shouldPlaceAfter) card.after(draggedToolCard);
    else card.before(draggedToolCard);
  });

  card.addEventListener('drop', (event) => {
    if (!draggedToolCard) return;
    event.preventDefault();
    saveToolOrder();
    announceToolMove(draggedToolCard);
  });

  card.addEventListener('keydown', (event) => {
    if (!event.altKey || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    const sibling = event.key === 'ArrowLeft' ? card.previousElementSibling : card.nextElementSibling;
    if (!sibling?.matches('[data-tool-card]')) return;
    event.preventDefault();
    if (event.key === 'ArrowLeft') sibling.before(card);
    else sibling.after(card);
    saveToolOrder();
    announceToolMove(card);
  });
});

const contactForm = document.querySelector('[data-contact-form]');
const contactStatus = document.querySelector('[data-contact-status]');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const message = String(formData.get('message') || '').trim();
  const hasValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !hasValidEmail || !message) {
    contactStatus.textContent = 'Please add your name, a valid email, and a short message.';
    contactStatus.dataset.state = 'error';
    return;
  }

  contactStatus.textContent = 'Opening your email app with the message ready to send.';
  contactStatus.dataset.state = 'ready';
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:theeditornitish@gmail.com?subject=${subject}&body=${body}`;
});

const quickDock = document.querySelector('.quick-dock');
const projectLibrary = document.querySelector('.project-library');
const dockQuietSections = [projectLibrary, eventsSection].filter(Boolean);

if (quickDock && dockQuietSections.length && 'IntersectionObserver' in window) {
  const visibleDockQuietSections = new Set();
  const dockObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.18) {
          visibleDockQuietSections.add(entry.target);
        } else {
          visibleDockQuietSections.delete(entry.target);
        }
      });

      quickDock.classList.toggle('is-muted', visibleDockQuietSections.size > 0);
    },
    { threshold: [0, 0.18, 0.4] },
  );

  dockQuietSections.forEach((section) => dockObserver.observe(section));
}
