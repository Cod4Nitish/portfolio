import React from 'react';
import portfolioData from '../data/portfolio.json';

const Footer = () => {
  const { name } = portfolioData.personal;
  const year = new Date().getFullYear();

  return (
    <footer className="footer container">
      <div className="footer-inner">
        <p className="footer-copy">
          © {year} <span>{name}</span>. All rights reserved.
        </p>
        <p className="footer-credits">
          Built with React &amp; Framer Motion
        </p>
      </div>

      <style>{`
        .footer { padding-top: 2rem; padding-bottom: 2rem; }
        .footer-inner {
          display: flex; flex-wrap: wrap; gap: 1rem;
          justify-content: space-between; align-items: center;
          padding-top: 2rem; border-top: 1px solid var(--border);
        }
        .footer-copy, .footer-credits { margin: 0; font-size: .85rem; color: var(--text-dim); }
        .footer-copy span { color: var(--text-h); font-weight: 600; }
      `}</style>
    </footer>
  );
};

export default Footer;
