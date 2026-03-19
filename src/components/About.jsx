import React from 'react';
import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';
import aboutProfileImg from '../assets/profile1.jpg';

const About = () => {
  const { name, bio } = portfolioData.personal;

  return (
    <section id="about" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="section-header">
        <span className="section-label">Discover</span>
        <h2>About Me</h2>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          style={{ flex: '1 1 400px', position: 'relative' }}
        >
          <div className="glass" style={{ padding: '1rem', borderRadius: '24px', display: 'inline-block', position: 'relative', zIndex: 2 }}>
            <img 
              src={aboutProfileImg} 
              alt={name} 
              style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', display: 'block' }} 
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
          </div>
          <div 
            style={{ 
              position: 'absolute', top: '10%', right: '-10%', width: '100%', height: '100%', 
              background: 'linear-gradient(135deg, var(--accent) 0%, transparent 100%)', 
              borderRadius: '24px', zIndex: 1, opacity: 0.3, filter: 'blur(20px)' 
            }} 
          ></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ flex: '1 1 400px' }}
        >
          <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--text-h)' }}>Get to know me</h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-dim)', marginBottom: '2.5rem', lineHeight: 1.8 }}>
              {bio}
            </p>
            
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {[
                { number: '3+', label: 'Years of Coding' },
                { number: '10+', label: 'Projects Completed' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  style={{ 
                    flex: '1', minWidth: '120px', padding: '1.5rem', background: 'var(--bg-secondary)', 
                    borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'center'
                  }}
                >
                  <div className="gradient-text-accent" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    {item.number}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
