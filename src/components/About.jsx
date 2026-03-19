import React from 'react';
import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';
import aboutProfileImg from '../assets/profile1.jpg';

const STATS = [
  { value: '3+', label: 'Years Coding' },
  { value: '10+', label: 'Projects' },
  { value: '5+', label: 'Technologies' },
];

const About = () => {
  const { name, bio } = portfolioData.personal;

  return (
    <section id="about">
      <div className="section-header">
        <span className="section-label">get to know me</span>
        <h2>About Me</h2>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center' }}>

        {/* Image column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
          style={{ flex: '0 1 320px', maxWidth: '100%', margin: '0 auto' }}
        >
          <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
            <div style={{
              borderRadius: 24,
              overflow: 'hidden',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 0 40px var(--accent-glow), 0 20px 50px rgba(0,0,0,0.4)',
            }}>
              <img src={aboutProfileImg} alt={name} style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
            </div>
            {/* Accent border decoration */}
            <div style={{
              position: 'absolute', bottom: -12, right: -12,
              width: '70%', height: '70%',
              border: '2px solid var(--accent)',
              borderRadius: 24,
              opacity: 0.3,
              zIndex: -1,
            }} />
          </div>
        </motion.div>

        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16,1,0.3,1] }}
          style={{ flex: '1 1 320px', minWidth: 0 }}
        >
          <p style={{ marginBottom: '2rem', fontSize: '1.0625rem' }}>{bio}</p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {STATS.map(s => (
              <motion.div
                key={s.label}
                whileHover={{ y: -4 }}
                style={{
                  flex: '1 1 100px',
                  padding: '1.25rem 1rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 16,
                  textAlign: 'center',
                  cursor: 'default',
                }}
              >
                <div className="gradient-text-accent" style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-head)' }}>
                  {s.value}
                </div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.8125rem', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          <a href="#contact" className="btn-primary" style={{ width: 'fit-content' }}>
            Let's Talk →
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
