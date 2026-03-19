import React from 'react';
import { motion } from 'framer-motion';
import { Download, Briefcase, GraduationCap } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Resume = () => {
  const { experience } = portfolioData;
  const { resumeUrl } = portfolioData.contact;

  const resolveUrl = (path) => path ? `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}` : '';

  return (
    <section id="resume" style={{ padding: '6rem 0', position: 'relative' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
        <div>
          <span className="section-label">Journey</span>
          <h2 style={{ margin: 0 }}>Experience & Education</h2>
        </div>
        <a href={resolveUrl(resumeUrl)} download className="btn-primary" target="_blank" rel="noreferrer" style={{ width: 'fit-content' }}>
          <Download size={18} /> Download Resume
        </a>
      </div>

      <div style={{ position: 'relative', borderLeft: '2px solid var(--border)', paddingLeft: '2rem', marginLeft: '1rem' }}>
        {experience.map((item, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ position: 'relative', marginBottom: index === experience.length - 1 ? 0 : '3rem' }}
          >
            <div style={{ 
              position: 'absolute', left: '-33px', top: '0', width: '24px', height: '24px', 
              borderRadius: '50%', background: 'var(--accent)', border: '4px solid var(--bg)', 
              boxShadow: '0 0 0 4px var(--accent-bg)' 
            }}></div>
            
            <div className="glass" style={{ padding: '2rem', borderRadius: '24px', position: 'relative' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text-h)', marginBottom: '0.25rem' }}>{item.role}</h3>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontSize: '1rem', fontWeight: 500, margin: 0 }}>
                    {item.role.toLowerCase().includes('student') ? <GraduationCap size={18} /> : <Briefcase size={18} />}
                    {item.company}
                  </h4>
                </div>
                <span style={{ padding: '0.25rem 0.75rem', borderRadius: '999px', background: 'var(--accent-bg)', color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600 }}>
                  {item.period}
                </span>
              </div>
              <p style={{ color: 'var(--text-dim)', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
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
