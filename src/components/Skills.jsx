import React from 'react';
import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';

const CATEGORY_ICONS = {
  Frontend: '🎨', Backend: '⚙️', Database: '🗄️',
  'AI / ML': '🤖', 'Dev Tools': '🛠️',
};

const Skills = () => {
  const { skills } = portfolioData;

  return (
    <section id="skills">
      <div className="section-hd">
        <h2>Tech Stack</h2>
        <p className="section-desc">Tools &amp; technologies I build with</p>
      </div>

      <div className="skills-grid">
        {skills.map((group, gi) => {
          const icon = group.icon ?? CATEGORY_ICONS[group.category] ?? '💡';
          return (
            <motion.div
              key={gi}
              className="skill-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.42, delay: gi * 0.07 }}
              whileHover={{ y: -6 }}
            >
              <div className="skill-card-head">
                <span className="skill-card-icon">{icon}</span>
                <h3 className="skill-card-title">{group.category}</h3>
              </div>
              <ul className="skill-list">
                {group.items.map((item, ii) => (
                  <li key={ii} className="skill-item">
                    <span className="skill-dot" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 600px)  { .skills-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .skills-grid { grid-template-columns: repeat(3, 1fr); } }

        .skill-card {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: 18px;
          padding: 1.75rem 1.625rem;
          cursor: default;
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .skill-card:hover {
          border-color: var(--accent);
          box-shadow: 0 0 24px var(--accent-glow), 0 12px 40px rgba(0,0,0,0.25);
        }

        .skill-card-head {
          display: flex; align-items: center; gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .skill-card-icon { font-size: 1.5rem; line-height: 1; flex-shrink: 0; }
        .skill-card-title {
          font-size: 1.0625rem; font-weight: 700;
          color: var(--text-h); margin: 0;
        }

        .skill-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.625rem; }
        .skill-item {
          display: flex; align-items: center; gap: 0.625rem;
          font-size: 0.9375rem; color: var(--text); font-weight: 500;
          transition: color 0.2s;
        }
        .skill-card:hover .skill-item { color: var(--text-h); }
        .skill-dot {
          flex-shrink: 0; width: 6px; height: 6px;
          border-radius: 50%; background: var(--accent); opacity: 0.7;
          transition: opacity 0.2s, transform 0.2s;
        }
        .skill-card:hover .skill-dot { opacity: 1; transform: scale(1.3); }
      `}</style>
    </section>
  );
};

export default Skills;
