import React from 'react';
import portfolioData from '../data/portfolio.json';

const Footer = () => {
  const { name } = portfolioData.personal;
  const year = new Date().getFullYear();
  return (
    <footer style={{ padding: '3rem 2rem 2rem', position: 'relative', zIndex: 1 }}>
      <div style={{
        width: '100%', maxWidth: 1200, margin: '0 auto',
        borderTop: '1px solid var(--glass-border)',
        paddingTop: '2rem',
        display: 'flex', flexWrap: 'wrap', gap: '1rem',
        justifyContent: 'space-between', alignItems: 'center',
      }}>
        <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: '0.875rem' }}>
          © {year} <span style={{ color: 'var(--text-h)', fontWeight: 600 }}>{name}</span>. All rights reserved.
        </p>
        <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: '0.875rem' }}>
          Built with React, Three.js & Framer Motion
        </p>
      </div>
    </footer>
  );
};

export default Footer;
