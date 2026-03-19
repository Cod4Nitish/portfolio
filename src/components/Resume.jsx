import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Resume = () => {
  const { experience } = portfolioData;
  const { resumeUrl } = portfolioData.contact;
  const base = import.meta.env.BASE_URL ?? '/';
  const resolveUrl = p => p ? `${base}${p.replace(/^\//, '')}` : '';

  return (
    <section id="resume">
      <div className="section-hd section-hd--row">
        <div>
          <h2>Experience</h2>
          <p className="section-desc">My professional journey &amp; education</p>
        </div>
        {resumeUrl && (
          <a href={resolveUrl(resumeUrl)} download className="btn-secondary" target="_blank" rel="noreferrer">
            <Download size={16} /> Download CV
          </a>
        )}
      </div>

      <div className="timeline">
        <div className="timeline-line" aria-hidden="true" />
        {experience.map((item, i) => (
          <motion.div
            key={i}
            className="timeline-item"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="timeline-dot" aria-hidden="true" />
            <div className="timeline-card">
              <div className="timeline-card-head">
                <div>
                  <h3 className="timeline-role">{item.role}</h3>
                  <span className="timeline-company">{item.company}</span>
                </div>
                <span className="timeline-period">{item.period}</span>
              </div>
              <p className="timeline-desc">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .section-hd--row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .timeline { position: relative; padding-left: 2.25rem; }
        .timeline-line {
          position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
          background: linear-gradient(to bottom, var(--accent), var(--accent-2), transparent);
          border-radius: 1px;
        }
        .timeline-item { position: relative; margin-bottom: 1.75rem; }
        .timeline-item:last-child { margin-bottom: 0; }

        .timeline-dot {
          position: absolute; left: -2.6rem; top: 1.25rem;
          width: 14px; height: 14px; border-radius: 50%;
          background: var(--accent); border: 3px solid var(--bg);
          box-shadow: 0 0 0 3px var(--accent-glow);
        }
        .timeline-card {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: 16px; padding: 1.5rem 1.75rem;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .timeline-card:hover {
          border-color: var(--accent);
          box-shadow: 0 0 20px var(--accent-glow), 0 12px 30px rgba(0,0,0,0.2);
        }
        .timeline-card-head {
          display: flex; align-items: flex-start;
          justify-content: space-between; flex-wrap: wrap;
          gap: 0.75rem; margin-bottom: 0.875rem;
        }
        .timeline-role { font-size: 1.125rem; font-weight: 700; color: var(--text-h); margin: 0; }
        .timeline-company { font-size: 0.9rem; font-weight: 600; color: var(--accent-2); }
        .timeline-period {
          display: inline-block; padding: 0.2rem 0.75rem;
          background: var(--accent-bg);
          border: 1px solid rgba(100,80,255,0.25);
          border-radius: 999px; font-size: 0.8rem; font-weight: 600;
          color: var(--accent); white-space: nowrap; flex-shrink: 0;
        }
        .timeline-desc { font-size: 0.9375rem; color: var(--text-dim); line-height: 1.7; margin: 0; }

        @media (max-width: 640px) {
          .timeline { padding-left: 1.75rem; }
          .timeline-dot { left: -2.1rem; }
          .timeline-card { padding: 1.25rem; }
        }
      `}</style>
    </section>
  );
};

export default Resume;
