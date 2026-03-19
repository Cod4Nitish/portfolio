import React from 'react';
import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';

const Skills = () => {
  const { skills } = portfolioData;

  return (
    <section id="skills">
      <div className="section-header center">
        <span className="section-label">what I know</span>
        <h2>My Tech Stack</h2>
        <p style={{ maxWidth: 520, margin: '1rem auto 0', color: 'var(--text-dim)' }}>
          Technologies and tools I use to craft digital experiences
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
        {skills.map((group, gi) => (
          <motion.div
            key={gi}
            className="glass"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: gi * 0.08 }}
            whileHover={{ y: -6, boxShadow: '0 0 30px var(--accent-glow), 0 20px 50px rgba(0,0,0,0.3)' }}
            style={{ padding: '1.75rem', cursor: 'default' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '1.75rem' }}>{group.icon}</span>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-h)', margin: 0 }}>
                {group.category}
              </h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {group.items.map((item, ii) => (
                <motion.span
                  key={ii}
                  whileHover={{ scale: 1.07 }}
                  style={{
                    padding: '0.3rem 0.75rem',
                    background: 'var(--surface)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 8,
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: 'var(--text)',
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--accent-bg)';
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.color = 'var(--accent-2)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--surface)';
                    e.currentTarget.style.borderColor = 'var(--glass-border)';
                    e.currentTarget.style.color = 'var(--text)';
                  }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
