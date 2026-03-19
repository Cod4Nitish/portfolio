import React from 'react';
import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';

// Map icon emoji to each category (fallback if icon not in JSON)
const CATEGORY_ICONS = {
  Frontend:          '🎨',
  Backend:           '⚙️',
  Database:          '🗄️',
  'AI / ML':         '🤖',
  'Dev Tools':       '🛠️',
};

const Skills = () => {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="skills-section">

      {/* ── Section Header ──────────────────────────────────── */}
      <div className="skills-header">
        <span className="section-label">what I know</span>
        <h2 className="skills-title">My Tech Stack</h2>
        <p className="skills-subtitle">
          Technologies and tools I use to build real‑world products
        </p>
      </div>

      {/* ── Card Grid ───────────────────────────────────────── */}
      <div className="skills-grid">
        {skills.map((group, gi) => {
          const icon = group.icon ?? CATEGORY_ICONS[group.category] ?? '💡';
          return (
            <motion.div
              key={gi}
              className="skill-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: gi * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
            >
              {/* Card heading */}
              <div className="skill-card-head">
                <span className="skill-card-icon" aria-hidden="true">{icon}</span>
                <h3 className="skill-card-title">{group.category}</h3>
              </div>

              {/* Technology list */}
              <ul className="skill-list">
                {group.items.map((item, ii) => (
                  <li key={ii} className="skill-item">
                    <span className="skill-dot" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* ── Scoped CSS ──────────────────────────────────────── */}
      <style>{`
        /* ── Header ──────────────────────────────── */
        .skills-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .skills-header .section-label {
          display: inline-block;
          margin-bottom: 0.875rem;
        }
        .skills-title {
          font-size: clamp(2rem, 4.5vw, 3rem);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin-bottom: 0.75rem;
          color: var(--text-h);  /* works in dark & light */
        }
        .skills-subtitle {
          font-size: clamp(0.9375rem, 1.5vw, 1.0625rem);
          color: var(--text-dim); /* works in dark & light */
          margin: 0 auto;
          max-width: 420px;
          line-height: 1.6;
        }

        /* ── CSS Grid — mobile → tablet → desktop ── */
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr;                    /* mobile  */
          gap: 1.25rem;
        }
        @media (min-width: 600px) {
          .skills-grid { grid-template-columns: 1fr 1fr; } /* tablet  */
        }
        @media (min-width: 1024px) {
          .skills-grid { grid-template-columns: repeat(3, 1fr); } /* desktop */
        }

        /* ── Card ────────────────────────────────── */
        .skill-card {
          background: var(--surface);          /* dark: rgba white 4% | light: rgba black 4% */
          border: 1px solid var(--glass-border);  /* dark: rgba white 7% | light: rgba black 8% */
          border-radius: 18px;
          padding: 1.75rem 1.625rem;
          cursor: default;
          transition:
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        /* Hover — lift (handled by Framer), glow border */
        .skill-card:hover {
          border-color: var(--accent);
          box-shadow: 0 0 24px var(--accent-glow), 0 12px 40px rgba(0,0,0,0.25);
        }

        /* ── Card heading ────────────────────────── */
        .skill-card-head {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .skill-card-icon {
          font-size: 1.5rem;
          line-height: 1;
          flex-shrink: 0;
        }

        .skill-card-title {
          font-size: 1.0625rem;
          font-weight: 700;
          color: var(--text-h);    /* works in dark & light */
          margin: 0;
          letter-spacing: -0.01em;
        }

        /* ── Skill list ──────────────────────────── */
        .skill-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }

        .skill-item {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          font-size: 0.9375rem;
          color: var(--text);      /* works in dark & light */
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .skill-card:hover .skill-item { color: var(--text-h); }

        /* Custom bullet — accent dot */
        .skill-dot {
          flex-shrink: 0;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.7;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .skill-card:hover .skill-dot {
          opacity: 1;
          transform: scale(1.3);
        }
      `}</style>
    </section>
  );
};

export default Skills;
