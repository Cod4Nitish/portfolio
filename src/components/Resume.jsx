import React from 'react';
import { motion } from 'framer-motion';
import { Download, Briefcase, GraduationCap } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const ICONS = [<Briefcase size={16} />, <GraduationCap size={16} />];

const Resume = () => {
  const { experience }     = portfolioData;
  const { resumeUrl }      = portfolioData.contact;
  const base = import.meta.env.BASE_URL ?? '/';
  const res  = p => (p ? `${base}${p.replace(/^\//, '')}` : '');

  return (
    <section id="resume" className="container">
      {/* Heading row */}
      <div className="exp-head">
        <div className="s-head" style={{ marginBottom: 0, textAlign: 'left' }}>
          <span className="s-tag">Journey</span>
          <h2>Experience</h2>
        </div>
        {resumeUrl && (
          <a href={res(resumeUrl)} download target="_blank" rel="noreferrer" className="btn btn-ghost">
            <Download size={15} /> Download CV
          </a>
        )}
      </div>

      {/* Timeline */}
      <div className="exp-timeline">
        {experience.map((item, i) => (
          <motion.div
            key={i}
            className="exp-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
          >
            <div className="exp-icon card">{ICONS[i % ICONS.length]}</div>
            <div className="exp-card card">
              <div className="exp-card-head">
                <div>
                  <h3 className="exp-role">{item.role}</h3>
                  <span className="exp-company">{item.company}</span>
                </div>
                <span className="exp-period">{item.period}</span>
              </div>
              <p className="exp-desc">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .exp-head {
          display: flex; align-items: flex-end; justify-content: space-between;
          flex-wrap: wrap; gap: 1rem; margin-bottom: 3rem;
        }
        .exp-timeline { display: flex; flex-direction: column; gap: 1.25rem; }

        .exp-item { display: flex; gap: 1rem; align-items: flex-start; }
        .exp-icon {
          flex-shrink: 0; width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          border-radius: var(--radius-sm); color: var(--accent-light);
          background: var(--accent-bg); border-color: rgba(108,99,255,.2);
          margin-top: 1.25rem;
        }
        .exp-card { flex: 1; padding: 1.5rem 1.625rem; }

        .exp-card-head {
          display: flex; justify-content: space-between;
          flex-wrap: wrap; gap: .5rem; margin-bottom: .75rem;
        }
        .exp-role { font-size: 1rem; font-weight: 700; color: var(--text-h); margin-bottom: .2rem; }
        .exp-company { font-size: .85rem; color: var(--accent-light); font-weight: 600; }
        .exp-period {
          font-size: .78rem; font-weight: 600; white-space: nowrap;
          color: var(--text-dim); padding: .2rem .625rem;
          background: var(--card-bg); border: 1px solid var(--border);
          border-radius: 999px; align-self: flex-start; margin-top: .1rem;
        }
        .exp-desc { font-size: .875rem; color: var(--text); line-height: 1.7; }
      `}</style>
    </section>
  );
};

export default Resume;
