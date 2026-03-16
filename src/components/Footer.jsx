import React from 'react';
import portfolioData from '../data/portfolio.json';

const Footer = () => {
    const { name } = portfolioData.personal;
    const year = new Date().getFullYear();

    return (
        <footer style={{
            textAlign: 'center',
            padding: '2rem 0',
            borderTop: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            background: 'var(--bg-primary)',
            marginTop: 'var(--spacing-2xl)'
        }}>
            <div className="container">
                <p>&copy; {year} {name}. Designed & Built for the future.</p>
                <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
                    Data injected from <code style={{ color: 'var(--accent-primary)' }}>portfolio.json</code>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
