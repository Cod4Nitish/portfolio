import React from 'react';
import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';

const Skills = () => {
  const { skills } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="skills" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="section-header">
        <span className="section-label">Expertise</span>
        <h2>My Skills</h2>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}
      >
        {skills.map((skillGroup, index) => (
          <motion.div
            variants={itemVariants}
            key={index}
            className="glass"
            style={{ padding: '2rem', borderRadius: '24px' }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--accent-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontWeight: 'bold' }}>
                {index + 1}
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-h)', margin: 0 }}>
                {skillGroup.category}
              </h3>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {skillGroup.items.map((skill, i) => (
                <motion.span 
                  key={i} 
                  whileHover={{ scale: 1.05, backgroundColor: 'var(--accent-bg)', color: 'var(--accent)', borderColor: 'var(--accent-border)' }}
                  style={{
                    padding: '0.5rem 1rem', fontSize: '0.9rem', borderRadius: '12px',
                    background: 'var(--bg-secondary)', color: 'var(--text)', border: '1px solid var(--border)',
                    transition: 'all 0.2s', cursor: 'default'
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
