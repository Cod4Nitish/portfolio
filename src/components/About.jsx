import React from 'react';
import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';
import aboutImg from '../assets/profile_suit.jpg';

const STATS = [
  { value: '3+',  label: 'Years Coding'   },
  { value: '10+', label: 'Projects Built' },
  { value: '5+',  label: 'Technologies'   },
];

const About = () => {
  const { bio } = portfolioData.personal;

  return (
    <section id="about">
      <div className="section-hd">
        <h2>About Me</h2>
        <p className="section-desc">A Computer Science student building real‑world products with Web Dev &amp; AI.</p>
      </div>

      <div className="about-grid">
        {/* Image */}
        <motion.div
          className="about-img-col"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about-img-wrap">
            <img src={aboutImg} alt="Nitish" className="about-img" loading="lazy" />
            <div className="about-img-accent" aria-hidden="true" />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="about-content-col"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="about-bio">{bio}</p>

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

          <a
            href="#contact"
            className="btn-primary"
            style={{ width: 'fit-content' }}
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            Let's Talk →
          </a>
        </motion.div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
        }
        @media (min-width: 768px) {
          .about-grid { grid-template-columns: 1fr 1fr; gap: 4rem; }
        }

        .about-img-col { display: flex; justify-content: center; align-items: flex-start; }

        /* ── FRAME WRAPPER ───────────────────────────────────── */
        .about-img-wrap {
          position: relative;
          display: inline-block;
          /* Padding creates the inner frame spacing */
          padding: 10px;
          /* Glass card as the frame border */
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          /* Outer glow — matches site accent */
          box-shadow:
            0 0 0 1px rgba(124,92,255,0.18),
            0 0 40px rgba(124,92,255,0.14),
            0 20px 60px rgba(0,0,0,0.35);
        }

        /* Image — object-fit contain so full portrait is visible */
        .about-img {
          display: block;
          width: clamp(180px, 28vw, 280px);   /* tight width — shrunk to fit cleanly */
          height: auto;
          max-height: clamp(240px, 42vw, 380px);
          object-fit: contain;
          object-position: center top;
          border-radius: 16px;
        }

        /* Decorative inner glow layer */
        .about-img-wrap::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 25px;
          background: linear-gradient(
            135deg,
            rgba(124,92,255,0.25) 0%,
            transparent 50%,
            rgba(0,229,255,0.15) 100%
          );
          pointer-events: none;
          z-index: 0;
        }

        /* Decorative corner accent — bottom-right */
        .about-img-accent {
          position: absolute;
          bottom: -14px; right: -14px;
          width: 55%; height: 55%;
          border: 2px solid var(--accent);
          border-radius: 18px;
          opacity: 0.25;
          z-index: -1;
          pointer-events: none;
        }

        /* Second decorative corner — top-left */
        .about-img-wrap::after {
          content: '';
          position: absolute;
          top: -14px; left: -14px;
          width: 35%; height: 35%;
          border: 2px solid var(--accent-2);
          border-radius: 12px;
          opacity: 0.2;
          z-index: -1;
          pointer-events: none;
        }

        .about-content-col {
          display: flex; flex-direction: column; gap: 0;
          text-align: center;
          align-items: center;
        }

        .about-bio {
          font-size: clamp(0.9375rem, 1.5vw, 1.0625rem);
          color: var(--text);
          line-height: 1.8;
          margin-bottom: 1.75rem;
          max-width: 460px;
        }

        .about-stats {
          display: flex; gap: 1rem; flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .about-stat-card {
          flex: 1 1 80px; min-width: 80px; max-width: 120px;
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          padding: 1rem 0.75rem;
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: 14px;
          cursor: default;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .about-stat-card:hover { box-shadow: 0 0 20px var(--accent-glow); }

        .about-stat-value {
          font-family: var(--font-head);
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 800; line-height: 1;
        }
        .about-stat-label {
          font-size: 0.72rem; font-weight: 600;
          color: var(--text-dim);
          text-transform: uppercase; letter-spacing: 0.06em;
          text-align: center;
        }
      `}</style>
    </section>
  );
};

export default About;
