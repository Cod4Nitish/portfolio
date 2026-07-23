import React from 'react';
import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';
import aboutImg from '../assets/profile_suit.jpg';
import { ArrowRight } from 'lucide-react';

const STATS = [
  { value: '3+',  label: 'Years Coding'   },
  { value: '10+', label: 'Projects Built' },
  { value: '5+',  label: 'Technologies'   },
];

const fade = dir => ({
  hidden: { opacity: 0, x: dir === 'left' ? -28 : dir === 'right' ? 28 : 0, y: dir === 'up' ? 20 : 0 },
  show:   { opacity: 1, x: 0, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
});

const About = () => {
  const { bio } = portfolioData.personal;
  return (
    <section id="about" className="container">
      {/* Heading */}
      <div className="s-head">
        <span className="s-tag">About</span>
        <h2>About Me</h2>
        <p className="s-sub">CS student building real‑world products with Web Dev &amp; AI.</p>
      </div>

      <div className="about-grid">
        {/* Image */}
        <motion.div
          className="about-img-col"
          variants={fade('left')} initial="hidden"
          whileInView="show" viewport={{ once: true, margin: '-60px' }}
        >
          <div className="about-img-frame">
            <img src={aboutImg} alt="Nitish Singh" className="about-img" loading="lazy" />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="about-content"
          variants={fade('right')} initial="hidden"
          whileInView="show" viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.1 }}
        >
          <p className="about-bio">{bio}</p>

          {/* Stats */}
          <div className="about-stats">
            {STATS.map(({ value, label }) => (
              <div key={label} className="about-stat card">
                <span className="about-stat-val grad">{value}</span>
                <span className="about-stat-lbl">{label}</span>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            className="btn btn-primary"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            Let's Talk <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        @media (min-width: 768px) {
          .about-grid { grid-template-columns: 1fr 1fr; gap: 5rem; }
        }

        .about-img-col { display: flex; justify-content: center; }
        .about-img-frame {
          width: clamp(200px, 55vw, 320px);
          padding: 8px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: 0 0 0 1px rgba(108,99,255,.08), 0 20px 50px rgba(0,0,0,.25);
        }
        @media (min-width: 768px) { .about-img-frame { width: clamp(220px, 28vw, 320px); } }
        .about-img {
          width: 100%; height: auto;
          max-height: clamp(260px, 50vw, 420px);
          object-fit: contain; object-position: center top;
          border-radius: calc(var(--radius-lg) - 6px);
          display: block;
        }

        .about-content {
          display: flex; flex-direction: column; gap: 1.5rem;
          align-items: center; text-align: center;
        }
        @media (min-width: 768px) {
          .about-content { align-items: flex-start; text-align: left; }
        }

        .about-bio {
          font-size: clamp(.9rem, 1.6vw, 1.05rem);
          line-height: 1.8; color: var(--text); max-width: 480px;
        }

        .about-stats {
          display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;
        }
        @media (min-width: 768px) { .about-stats { justify-content: flex-start; } }

        .about-stat {
          flex: 1 1 90px; min-width: 90px; max-width: 130px;
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          padding: 1rem .75rem; border-radius: var(--radius);
          cursor: default;
        }
        .about-stat-val { font-family: var(--font-head); font-size: 2rem; font-weight: 800; line-height: 1; }
        .about-stat-lbl { font-size: .72rem; font-weight: 600; color: var(--text-dim); text-transform: uppercase; letter-spacing: .06em; text-align: center; }
      `}</style>
    </section>
  );
};

export default About;
