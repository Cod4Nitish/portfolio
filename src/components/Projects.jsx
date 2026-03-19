import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Projects = () => {
  const { projects } = portfolioData;
  const [active, setActive] = useState(null);

  return (
    <section id="projects">
      <div className="section-header center">
        <span className="section-label">my work</span>
        <h2>Featured Projects</h2>
        <p style={{ maxWidth: 480, margin: '1rem auto 0', color: 'var(--text-dim)' }}>
          Things I've built — from AI-powered tools to full-stack applications
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {projects.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text-dim)' }}>
            No projects yet — check back soon!
          </div>
        )}
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            className="glass"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            style={{
              overflow: 'hidden',
              transition: 'transform 0.35s ease, box-shadow 0.35s ease',
              transform: active === i ? 'translateY(-8px)' : 'translateY(0)',
              boxShadow: active === i
                ? '0 0 40px var(--accent-glow), 0 24px 60px rgba(0,0,0,0.5)'
                : 'var(--glass-shadow)',
            }}
          >
            {/* Image */}
            <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
              <img
                src={p.image}
                alt={p.title}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                  transform: active === i ? 'scale(1.06)' : 'scale(1)',
                }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg) 0%, transparent 60%)' }} />

              {/* Links overlay */}
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'absolute', top: 12, right: 12,
                      display: 'flex', gap: '0.5rem',
                    }}
                  >
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer"
                        style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(6,9,21,0.8)', backdropFilter: 'blur(8px)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                        <Github size={16} />
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer"
                        style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Content */}
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.625rem' }}>{p.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                {p.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {p.techStack.map((t, ti) => (
                  <span key={ti} style={{
                    padding: '0.2rem 0.65rem',
                    background: 'var(--accent-bg)',
                    border: '1px solid rgba(100,80,255,0.2)',
                    borderRadius: 6,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--accent-2)',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
