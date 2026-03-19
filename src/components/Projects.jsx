import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Projects = () => {
  const { projects } = portfolioData;
  const [filter, setFilter] = useState('All');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Get unique tech stacks for filter buttons
  const allTechStack = useMemo(() => {
    const stacks = new Set();
    projects.forEach(p => p.techStack.forEach(t => stacks.add(t)));
    return ['All', ...Array.from(stacks)];
  }, [projects]);

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.techStack.includes(filter));

  return (
    <section id="projects" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="section-header">
        <span className="section-label">Portfolio</span>
        <h2>Selected Works</h2>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '3rem' }}>
        {allTechStack.map(tech => (
          <button
            key={tech}
            onClick={() => setFilter(tech)}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '999px',
              border: `1px solid ${filter === tech ? 'var(--accent)' : 'var(--border)'}`,
              background: filter === tech ? 'var(--accent-bg)' : 'transparent',
              color: filter === tech ? 'var(--accent)' : 'var(--text)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: 500,
              fontSize: '0.9rem'
            }}
          >
            {tech}
          </button>
        ))}
      </div>

      <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={project.id || index}
              className="glass"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: hoveredIndex === index ? '0 20px 40px rgba(0,0,0,0.4)' : 'var(--glass-shadow)',
                transform: hoveredIndex === index ? 'translateY(-8px)' : 'translateY(0)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
            >
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', zIndex: 1, opacity: hoveredIndex === index ? 0.6 : 0.8, transition: 'opacity 0.3s'
                }} />
                <motion.img 
                  animate={{ scale: hoveredIndex === index ? 1.05 : 1 }}
                  transition={{ duration: 0.5 }}
                  src={project.image} 
                  alt={project.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0, y: hoveredIndex === index ? 0 : 20 }}
                  style={{ position: 'absolute', bottom: '1rem', right: '1rem', zIndex: 2, display: 'flex', gap: '0.5rem' }}
                >
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" style={{ background: 'var(--glass-bg)', padding: '0.5rem', borderRadius: '50%', color: '#fff', border: '1px solid var(--glass-border)' }}>
                      <Github size={18} />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer" style={{ background: 'var(--accent)', padding: '0.5rem', borderRadius: '50%', color: '#fff' }}>
                      <ExternalLink size={18} />
                    </a>
                  )}
                </motion.div>
              </div>

              <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-h)' }}>{project.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-dim)', marginBottom: '1.5rem', flexGrow: 1, lineHeight: 1.6 }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.techStack.map((tech, i) => (
                    <span key={i} style={{ 
                      fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '999px', 
                      background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Projects;
