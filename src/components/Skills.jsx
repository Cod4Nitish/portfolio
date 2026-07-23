import React from 'react';
import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';

const Skills = () => {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="container">
      <div className="s-head">
        <span className="s-tag">Stack</span>
        <h2>Tech Stack</h2>
        <p className="s-sub">Tools &amp; technologies I build with every day</p>
      </div>

      <div className="sk-grid">
        {skills.map((group, gi) => (
          <motion.div
            key={gi}
            className="sk-card card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: gi * 0.06 }}
            whileHover={{ y: -4, borderColor: 'var(--accent)' }}
          >
            <div className="sk-head">
              <span className="sk-icon">{group.icon ?? '💡'}</span>
              <h3 className="sk-title">{group.category}</h3>
            </div>
            <ul className="sk-list">
              {group.items.map(item => (
                <li key={item} className="sk-item">
                  <span className="sk-dot" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <style>{`
        .sk-grid {
          display: grid; gap: 1.25rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 580px)  { .sk-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .sk-grid { grid-template-columns: repeat(3, 1fr); } }

        .sk-card { padding: 1.625rem; cursor: default; }

        .sk-head {
          display: flex; align-items: center; gap: .75rem;
          margin-bottom: 1.125rem;
        }
        .sk-icon { font-size: 1.375rem; line-height: 1; }
        .sk-title { font-size: 1rem; font-weight: 700; color: var(--text-h); }

        .sk-list { display: flex; flex-direction: column; gap: .5rem; }
        .sk-item {
          display: flex; align-items: center; gap: .625rem;
          font-size: .9rem; color: var(--text); font-weight: 500;
          transition: color .2s;
        }
        .sk-card:hover .sk-item { color: var(--text-h); }
        .sk-dot {
          flex-shrink: 0; width: 5px; height: 5px; border-radius: 50%;
          background: var(--accent); opacity: .65;
          transition: opacity .2s, transform .2s;
        }
        .sk-card:hover .sk-dot { opacity: 1; transform: scale(1.4); }
      `}</style>
    </section>
  );
};

export default Skills;
