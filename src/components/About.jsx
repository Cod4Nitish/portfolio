import React from 'react';
import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';
import aboutImg from '../assets/profile1.jpg';

// ── Stats data ────────────────────────────────────────────────────
const STATS = [
  { value: '3+',  label: 'Years Coding'   },
  { value: '10+', label: 'Projects Built' },
  { value: '5+',  label: 'Technologies'   },
];

// ── Reusable animation config ─────────────────────────────────────
const fadeLeft  = { hidden: { opacity: 0, x: -36 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };
const fadeRight = { hidden: { opacity: 0, x:  36 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] } } };

const About = () => {
  const { name, bio } = portfolioData.personal;

  return (
    <section id="about" className="about-section">

      {/* ── GRID WRAPPER ─────────────────────────────────────── */}
      <div className="about-grid">

        {/* IMAGE — left column ─────────────────────────────── */}
        <motion.div
          className="about-image-col"
          variants={fadeLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="about-img-wrap">
            <img
              src={aboutImg}
              alt={`${name} — about photo`}
              className="about-img"
              loading="lazy"
              decoding="async"
            />
            {/* Decorative accent corner — subtle, consistent in both modes */}
            <div className="about-img-accent" aria-hidden="true" />
          </div>
        </motion.div>

        {/* CONTENT — right column ─────────────────────────── */}
        <motion.div
          className="about-content-col"
          variants={fadeRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Section label */}
          <span className="section-label">get to know me</span>

          {/* Heading */}
          <h2 className="about-heading">About Me</h2>

          {/* Bio — short and readable */}
          <p className="about-bio">{bio}</p>

          {/* Stats ─────────────────────────────────────────── */}
          <div className="about-stats">
            {STATS.map(({ value, label }) => (
              <motion.div
                key={label}
                className="about-stat-card"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <span className="about-stat-value gradient-text-accent">{value}</span>
                <span className="about-stat-label">{label}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA ────────────────────────────────────────────── */}
          <a
            href="#contact"
            className="btn-primary"
            style={{ width: 'fit-content' }}
            onClick={e => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            Let's Talk →
          </a>
        </motion.div>

      </div>

      {/* ── ALL SCOPED CSS ────────────────────────────────────── */}
      <style>{`
        /* Section padding */
        .about-section {
          padding: 0; /* handled by main gap */
        }

        /* ── 2-column grid ───────────────────────────── */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;     /* mobile: single column */
          gap: 2.5rem;
          align-items: center;
          width: 100%;
        }

        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
        }

        /* ── Image column ────────────────────────────── */
        .about-image-col {
          display: flex;
          justify-content: center;
        }

        .about-img-wrap {
          position: relative;
          display: inline-block;
        }

        /* Clean, balanced image — Step 3 */
        .about-img {
          display: block;
          width: 100%;
          max-width: 340px;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          border-radius: 20px;
          margin: 0 auto;
          /* Subtle shadow that works in both modes */
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
          border: 1px solid var(--glass-border);
        }

        /* Accent corner decoration — consistent in dark/light */
        .about-img-accent {
          position: absolute;
          bottom: -10px;
          right: -10px;
          width: 60%;
          height: 60%;
          border: 2px solid var(--accent);
          border-radius: 16px;
          opacity: 0.2;
          z-index: -1;
          pointer-events: none;
        }

        /* ── Content column ──────────────────────────── */
        .about-content-col {
          display: flex;
          flex-direction: column;
          gap: 0;
          text-align: center;                   /* mobile */
        }
        @media (min-width: 768px) {
          .about-content-col { text-align: left; }
        }

        .about-content-col .section-label {
          display: inline-block;
          margin-bottom: 0.875rem;
          align-self: center;
        }
        @media (min-width: 768px) {
          .about-content-col .section-label { align-self: flex-start; }
        }

        /* Heading — Step 4 */
        .about-heading {
          font-size: clamp(2rem, 4.5vw, 3rem);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin-bottom: 1.125rem;
          color: var(--text-h);             /* respects dark/light var */
        }

        /* Bio text — readable, not overwhelming */
        .about-bio {
          font-size: clamp(0.9375rem, 1.5vw, 1.0625rem);
          color: var(--text);               /* respects dark/light var */
          line-height: 1.8;
          margin-bottom: 1.75rem;
          max-width: 460px;
          margin-left: auto;
          margin-right: auto;
        }
        @media (min-width: 768px) {
          .about-bio { margin-left: 0; margin-right: 0; }
        }

        /* ── Stats — Step 5 ──────────────────────────── */
        .about-stats {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;          /* mobile */
          margin-bottom: 2rem;
        }
        @media (min-width: 768px) {
          .about-stats { justify-content: flex-start; }
        }
        @media (max-width: 480px) {
          .about-stats { flex-direction: row; }      /* stay horizontal even on small */
        }

        /* Stat card — uses CSS variables → works in dark & light */
        .about-stat-card {
          flex: 1 1 80px;
          min-width: 80px;
          max-width: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 1rem 0.75rem;
          background: var(--surface);                 /* dark: rgba white 4% | light: rgba black 4% */
          border: 1px solid var(--glass-border);      /* dark: rgba white 7% | light: rgba black 8% */
          border-radius: 14px;
          cursor: default;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .about-stat-card:hover {
          box-shadow: 0 0 20px var(--accent-glow);
        }

        /* Big number */
        .about-stat-value {
          font-family: var(--font-head);
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 800;
          line-height: 1;
        }

        /* Label */
        .about-stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-dim);           /* works in both modes */
          text-transform: uppercase;
          letter-spacing: 0.06em;
          text-align: center;
        }
      `}</style>
    </section>
  );
};

export default About;
