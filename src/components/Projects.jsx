import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Projects = () => {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="container">
      <div className="s-head">
        <span className="s-tag">Work</span>
        <h2>Projects</h2>
        <p className="s-sub">Things I've built — from AI tools to full‑stack apps</p>
      </div>

      <div className="proj-grid">
        {projects.map((p, i) => (
          <motion.article
            key={p.id ?? i}
            className="proj-card card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            whileHover={{ y: -5, borderColor: 'var(--accent)' }}
          >
            {/* Image */}
            <div className="proj-img-wrap">
              <img src={p.image} alt={p.title} className="proj-img" loading="lazy" />
              {/* Hover overlay */}
              <div className="proj-overlay">
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer" className="proj-link-btn" aria-label="GitHub">
                    <Github size={18} />
                  </a>
                )}
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="proj-link-btn" aria-label="Live demo">
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="proj-body">
              <h3 className="proj-title">{p.title}</h3>
              <p className="proj-desc">{p.description}</p>

              {/* Tech tags */}
              <div className="proj-tags">
                {p.techStack?.map(t => (
                  <span key={t} className="proj-tag">{t}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <style>{`
        .proj-grid {
          display: grid; gap: 1.375rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 620px)  { .proj-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .proj-grid { grid-template-columns: repeat(3, 1fr); } }

        .proj-card { overflow: hidden; display: flex; flex-direction: column; cursor: default; }

        .proj-img-wrap { position: relative; height: 180px; overflow: hidden; background: var(--bg-2); }
        .proj-img { width: 100%; height: 100%; object-fit: cover; transition: transform .45s ease; }
        .proj-card:hover .proj-img { transform: scale(1.05); }

        .proj-overlay {
          position: absolute; inset: 0;
          background: rgba(10,10,15,.7);
          display: flex; align-items: center; justify-content: center; gap: .75rem;
          opacity: 0; transition: opacity .25s ease;
        }
        .proj-card:hover .proj-overlay { opacity: 1; }
        .proj-link-btn {
          display: flex; align-items: center; justify-content: center;
          width: 40px; height: 40px; border-radius: 9px;
          background: rgba(255,255,255,.1);
          border: 1px solid rgba(255,255,255,.18);
          color: #fff; transition: background .2s, transform .2s;
        }
        .proj-link-btn:hover { background: var(--accent); transform: scale(1.08); }

        .proj-body { padding: 1.25rem 1.375rem 1.375rem; display: flex; flex-direction: column; gap: .625rem; flex: 1; }
        .proj-title { font-size: 1.0625rem; font-weight: 700; color: var(--text-h); }
        .proj-desc { font-size: .875rem; color: var(--text); line-height: 1.65; }
        .proj-tags { display: flex; flex-wrap: wrap; gap: .375rem; margin-top: auto; padding-top: .5rem; }
        .proj-tag {
          padding: .2rem .65rem;
          font-size: .725rem; font-weight: 600;
          color: var(--accent-light); background: var(--accent-bg);
          border: 1px solid rgba(108,99,255,.18); border-radius: 999px;
        }
      `}</style>
    </section>
  );
};

export default Projects;
