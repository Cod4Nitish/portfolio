import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Navigation = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { name } = portfolioData.personal;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`glass ${isScrolled ? 'scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: isScrolled ? '15px' : '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        padding: '0.75rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        maxWidth: '800px',
        transition: 'all 0.3s ease',
        borderRadius: '999px',
        background: isScrolled ? 'var(--glass-bg)' : 'transparent',
        border: isScrolled ? '1px solid var(--border)' : '1px solid transparent',
        boxShadow: isScrolled ? 'var(--glass-shadow)' : 'none'
      }}
    >
      <a href="#" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-h)', textDecoration: 'none' }}>
        {name.split(' ')[0]}<span style={{ color: 'var(--accent)' }}>.</span>
      </a>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <ul className="nav-links" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {navLinks.map(link => (
            <li key={link.name}>
              <a href={link.href} className="nav-link" style={{ fontSize: '0.9rem' }}>{link.name}</a>
            </li>
          ))}
        </ul>
        
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme} 
            style={{
              background: 'transparent', border: 'none', color: 'var(--text-h)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem',
              borderRadius: '50%', transition: 'background 0.2s'
            }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {/* Mobile menu button logic here - for simplicity inline styling */}
          <button 
            className="mobile-menu-btn"
            style={{
              background: 'transparent', border: 'none', color: 'var(--text-h)', cursor: 'pointer',
              display: 'none' // You'd handle media query via CSS classes or window matching
            }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: flex !important; align-items: center; padding: 0.5rem; }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navigation;
