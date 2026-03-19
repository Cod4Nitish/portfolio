import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import portfolioData from '../data/portfolio.json';
import '../App.css';

const Navigation = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { name } = portfolioData.personal;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`navbar${isScrolled ? ' scrolled' : ''}`}
      >
        <a href="#" className="nav-logo">{name.split(' ')[0]}<span>.</span></a>

        <nav>
          <ul className="nav-links-list">
            {links.map(l => (
              <li key={l.label}>
                <a href={l.href} className="nav-link" onClick={() => setMobileOpen(false)}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <button className="nav-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="mobile-menu-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', top: '70px', left: 0, right: 0,
              background: 'var(--glass-bg)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--glass-border)',
              padding: '1.5rem 2rem', zIndex: 999,
              display: 'flex', flexDirection: 'column', gap: '1.25rem',
            }}
          >
            {links.map(l => (
              <a key={l.label} href={l.href} style={{ color: 'var(--text-h)', fontWeight: 500, fontSize: '1.125rem' }} onClick={() => setMobileOpen(false)}>
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
