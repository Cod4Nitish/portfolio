import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Resume = () => {
  const { experience } = portfolioData;
  const { resumeUrl } = portfolioData.contact;
  const resolveUrl = (p) => p ? `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}` : '';

  return (
    <section id="resume">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
        <div>
          <span className="section-label">my journey</span>
          <h2 style={{ marginTop: '1rem' }}>Experience & Education</h2>
        </div>
        <a href={resolveUrl(resumeUrl)} download className="btn-secondary" target="_blank" rel="noreferrer">
          <Download size={17} /> Download CV
        </a>
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative', paddingLeft: '2rem' }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: 2,
          background: 'linear-gradient(to bottom, var(--accent), var(--accent-2), transparent)',
          borderRadius: 1,
        }} />

        {experience.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: i * 0.12 }}
            style={{ position: 'relative', marginBottom: i === experience.length - 1 ? 0 : '2.5rem' }}
          >
            {/* Dot */}
            <div style={{
              position: 'absolute', left: '-2.4rem', top: '0.25rem',
              width: 14, height: 14,
              borderRadius: '50%',
              background: 'var(--accent)',
              border: '3px solid var(--bg)',
              boxShadow: '0 0 12px var(--accent-glow)',
            }} />

            <div className="glass" style={{ padding: '1.75rem 2rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{item.role}</h3>
                  <div style={{ color: 'var(--accent-2)', fontWeight: 600, fontSize: '0.9rem' }}>{item.company}</div>
                </div>
                <span style={{
                  padding: '0.2rem 0.75rem',
                  background: 'var(--accent-bg)',
                  border: '1px solid rgba(100,80,255,0.3)',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--accent)',
                  whiteSpace: 'nowrap',
                }}>
                  {item.period}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.9375rem', color: 'var(--text-dim)', lineHeight: 1.65 }}>
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Resume;
