import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const NAV_LINKS = [
  { label: 'About',      href: '#about'    },
  { label: 'Skills',     href: '#skills'   },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#resume'   },
  { label: 'Contact',    href: '#contact'  },
];

const Navigation = ({ theme, toggleTheme }) => {
  const [scrolled,   setScrolled]   = useState(false);
  const [active,     setActive]     = useState('');
  const [menuOpen,   setMenuOpen]   = useState(false);
  const { name } = portfolioData.personal;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids  = NAV_LINKS.map(l => l.href.slice(1));
    const obs  = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(`#${id}`); },
        { rootMargin: '-35% 0px -60% 0px' }
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o?.disconnect());
  }, []);

  const scrollTo = useCallback((e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el  = document.querySelector(href);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }, []);

  return (
    <>
      <motion.header
        className={`nav${scrolled ? ' nav--scrolled' : ''}`}
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <a href="#home" className="nav-logo" onClick={e => scrollTo(e, '#home')}>
          {name.split(' ')[0]}<span>.</span>
        </a>

        {/* Desktop nav */}
        <nav className="nav-links">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`nav-link${active === href ? ' active' : ''}`}
              onClick={e => scrollTo(e, href)}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          <button className="nav-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="nav-btn nav-ham" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="bd"
              className="nav-backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              key="drawer"
              className="nav-drawer"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="nav-drawer-head">
                <span className="nav-logo">{name.split(' ')[0]}.</span>
                <button className="nav-btn" onClick={() => setMenuOpen(false)}><X size={18} /></button>
              </div>
              <nav className="nav-drawer-links">
                {NAV_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className={`nav-drawer-link${active === href ? ' active' : ''}`}
                    onClick={e => scrollTo(e, href)}
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.125rem 2.5rem;
          transition: padding .3s ease, background .3s ease, border-color .3s ease, box-shadow .3s ease;
          border-bottom: 1px solid transparent;
        }
        .nav--scrolled {
          padding: .75rem 2.5rem;
          background: rgba(10,10,15,.82);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom-color: var(--border);
          box-shadow: 0 1px 32px rgba(0,0,0,.25);
        }
        [data-theme='light'] .nav--scrolled { background: rgba(248,248,252,.88); }

        .nav-logo {
          font-family: var(--font-head);
          font-size: 1.375rem; font-weight: 800;
          color: var(--text-h); letter-spacing: -.04em;
        }
        .nav-logo span { color: var(--accent); }

        .nav-links {
          display: flex; align-items: center; gap: .25rem;
        }
        .nav-link {
          padding: .45rem .85rem;
          font-size: .9rem; font-weight: 500;
          color: var(--text); border-radius: 8px;
          transition: color .2s, background .2s;
          position: relative;
        }
        .nav-link::after {
          content: ''; position: absolute;
          bottom: 2px; left: .85rem; right: .85rem;
          height: 2px; border-radius: 1px;
          background: var(--accent);
          transform: scaleX(0); transform-origin: center;
          transition: transform .22s ease;
        }
        .nav-link:hover { color: var(--text-h); background: var(--card-bg); }
        .nav-link.active { color: var(--accent); }
        .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }

        .nav-actions { display: flex; gap: .5rem; align-items: center; }
        .nav-btn {
          width: 36px; height: 36px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          background: var(--card-bg); border: 1px solid var(--border);
          color: var(--text-h);
          transition: background .2s, border-color .2s, transform .15s;
        }
        .nav-btn:hover { background: var(--card-bg-h); border-color: var(--border-h); }
        .nav-btn:active { transform: scale(.9); }
        .nav-ham { display: none; cursor: pointer; }

        @media (max-width: 768px) {
          .nav { padding: 1rem 1.25rem; }
          .nav--scrolled { padding: .75rem 1.25rem; }
          .nav-links { display: none; }
          .nav-ham { display: flex; }
        }

        .nav-backdrop {
          position: fixed; inset: 0;
          background: rgba(0,0,0,.55); z-index: 101;
        }
        .nav-drawer {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: min(300px, 85vw);
          background: var(--bg-2); z-index: 102;
          border-left: 1px solid var(--border);
          display: flex; flex-direction: column; gap: 0;
        }
        .nav-drawer-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border);
        }
        .nav-drawer-links {
          display: flex; flex-direction: column; gap: .25rem;
          padding: 1.25rem 1rem;
        }
        .nav-drawer-link {
          padding: .85rem 1rem;
          font-size: 1rem; font-weight: 500;
          color: var(--text); border-radius: 10px;
          transition: all .2s;
        }
        .nav-drawer-link:hover, .nav-drawer-link.active {
          color: var(--accent); background: var(--accent-bg);
        }
      `}</style>
    </>
  );
};

export default Navigation;
