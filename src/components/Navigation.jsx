import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#resume' },
  { label: 'Contact',    href: '#contact' },
];

const Navigation = ({ theme, toggleTheme }) => {
  const [scrolled,    setScrolled]    = useState(false);
  const [activeLink,  setActiveLink]  = useState('');
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const { name } = portfolioData.personal;

  /* ── Scroll: glass + active section tracking ───────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map(l => l.href.replace('#', ''));
    const observers  = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveLink(`#${id}`); },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  /* ── Smooth scroll with navbar-offset ─────────────────────── */
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    const navH   = document.querySelector('.navbar')?.offsetHeight ?? 72;
    const top    = target.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }, []);

  return (
    <>
      <motion.header
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ── Logo ─────────────────────────────────────────── */}
        <a
          href="#home"
          className="nav-logo"
          onClick={e => handleNavClick(e, '#home')}
          aria-label="Home"
        >
          {name.split(' ')[0]}<span className="nav-logo-dot">.</span>
        </a>

        {/* ── Desktop links ────────────────────────────────── */}
        <nav aria-label="Main navigation">
          <ul className="nav-links-list">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activeLink === href;
              return (
                <li key={label}>
                  <a
                    href={href}
                    className={`nav-link${isActive ? ' nav-link--active' : ''}`}
                    onClick={e => handleNavClick(e, href)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                    <span className="nav-link-bar" />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Actions ──────────────────────────────────────── */}
        <div className="nav-actions">
          <button
            className="nav-icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            className="nav-icon-btn nav-hamburger"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </motion.header>

      {/* ── Mobile drawer ──────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 998,
              }}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mobile-drawer"
            >
              <nav aria-label="Mobile navigation">
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {NAV_LINKS.map(({ label, href }) => {
                    const isActive = activeLink === href;
                    return (
                      <li key={label}>
                        <a
                          href={href}
                          className={`mobile-nav-link${isActive ? ' active' : ''}`}
                          onClick={e => handleNavClick(e, href)}
                        >
                          {label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        /* ── Navbar base ──────────────────────────────── */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.125rem 2rem;
          transition: padding 0.3s ease, background 0.3s ease,
                      border-color 0.3s ease, box-shadow 0.3s ease;
          border-bottom: 1px solid transparent;
        }

        /* ── Scrolled = glass ────────────────────────── */
        .navbar.scrolled {
          padding: 0.75rem 2rem;
          background: rgba(6, 9, 21, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom-color: rgba(255,255,255,0.07);
          box-shadow: 0 4px 30px rgba(0,0,0,0.3);
        }
        [data-theme='light'] .navbar.scrolled {
          background: rgba(244,246,251,0.80);
        }

        /* ── Logo ────────────────────────────────────── */
        .nav-logo {
          font-family: var(--font-head);
          font-size: 1.375rem;
          font-weight: 800;
          color: var(--text-h);
          letter-spacing: -0.04em;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .nav-logo:hover { opacity: 0.8; }
        .nav-logo-dot { color: var(--accent); }

        /* ── Desktop links ───────────────────────────── */
        .nav-links-list {
          display: flex;
          gap: 0.25rem;
          list-style: none;
          margin: 0; padding: 0;
        }

        .nav-link {
          position: relative;
          display: block;
          padding: 0.5rem 0.875rem;
          font-size: 0.9375rem;
          font-weight: 500;
          color: var(--text);
          text-decoration: none;
          border-radius: 8px;
          transition: color 0.2s ease, background 0.2s ease, transform 0.15s ease;
          outline-offset: 3px;
        }
        .nav-link:hover {
          color: var(--text-h);
          background: var(--surface);
          transform: translateY(-1px);
        }
        .nav-link:active { transform: scale(0.96); }

        /* Active state */
        .nav-link--active { color: var(--accent) !important; }

        /* Animated underline bar */
        .nav-link-bar {
          position: absolute;
          bottom: 4px; left: 0.875rem; right: 0.875rem;
          height: 2px;
          background: var(--accent);
          border-radius: 1px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.28s ease;
        }
        .nav-link:hover .nav-link-bar,
        .nav-link--active .nav-link-bar {
          transform: scaleX(1);
        }

        /* ── Action buttons ──────────────────────────── */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px; height: 38px;
          border-radius: 9px;
          background: var(--surface);
          border: 1px solid var(--glass-border);
          color: var(--text-h);
          cursor: none;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
        }
        .nav-icon-btn:hover { background: var(--accent-bg); border-color: var(--accent); }
        .nav-icon-btn:active { transform: scale(0.9); }

        /* hamburger only on mobile */
        .nav-hamburger { display: none; cursor: auto; }

        /* ── Mobile ──────────────────────────────────── */
        @media (max-width: 768px) {
          .navbar { padding: 1rem; }
          .navbar.scrolled { padding: 0.75rem 1rem; }
          .nav-links-list { display: none; }
          .nav-hamburger { display: flex; }
        }

        /* ── Mobile drawer ───────────────────────────── */
        .mobile-drawer {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          width: min(280px, 80vw);
          background: var(--bg-2);
          border-left: 1px solid var(--glass-border);
          padding: 5rem 1.5rem 2rem;
          z-index: 999;
          display: flex;
          flex-direction: column;
        }

        .mobile-nav-link {
          display: block;
          padding: 0.875rem 1rem;
          font-size: 1.0625rem;
          font-weight: 600;
          color: var(--text);
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.2s ease;
        }
        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: var(--accent);
          background: var(--accent-bg);
          padding-left: 1.25rem;
        }
      `}</style>
    </>
  );
};

export default Navigation;
