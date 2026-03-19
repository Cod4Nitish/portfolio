import React from 'react';
import portfolioData from '../data/portfolio.json';

const Footer = () => {
  const { name } = portfolioData.personal;
  const year = new Date().getFullYear();

  return (
    <footer style={{
      textAlign: 'center',
      padding: '4rem 0 2rem 0',
      color: 'var(--text-dim)',
      fontSize: '0.9rem',
      background: 'transparent',
      marginTop: 'auto',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--border), transparent)', marginBottom: '2rem' }}></div>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <p style={{ fontWeight: 500 }}>&copy; {year} <span style={{ color: 'var(--text-h)' }}>{name}</span>. All rights reserved.</p>
        <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>
          Built dynamically with React & Framer Motion
        </p>
      </div>
    </footer>
  );
};

export default Footer;
