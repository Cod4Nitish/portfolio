import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Projects = () => {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="projects-section">

      {/* ── Header ────────────────────────────────────────── */}
      <div className="section-header-centered">
        <span className="section-label">my work</span>
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          Things I've built — from AI tools to full‑stack web apps
        </p>
      </div>

      {/* ── Grid ──────────────────────────────────────────── */}
      {projects.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--text-dim)' }}>
          Projects coming soon — check back!
        </p>
      ) : (
        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.id ?? i} project={p} index={i} />
          ))}
        </div>
      )}

      <style>{`
        /* ── Header ──────────────────────────── */
        .section-header-centered {
          text-align: center;
          margin-bottom: 3rem;
        }
        .section-header-centered .section-label { margin-bottom: 0.875rem; }
        .section-title {
          font-size: clamp(2rem, 4.5vw, 3rem);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin-bottom: 0.75rem;
          color: var(--text-h);
        }
        .section-subtitle {
          font-size: clamp(0.9375rem, 1.5vw, 1.0625rem);
          color: var(--text-dim);
          margin: 0 auto;
          max-width: 420px;
          line-height: 1.6;
        }

        /* ── Grid: 1 → 2 → 3 columns ─────────── */
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 640px) {
          .projects-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* ── Card ────────────────────────────── */
        .project-card {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: 18px;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .project-card:hover {
          border-color: var(--accent);
          box-shadow: 0 0 26px var(--accent-glow), 0 16px 40px rgba(0,0,0,0.25);
        }

        /* Image */
        .project-img-wrap {
          position: relative;
          overflow: hidden;
          height: 190px;
          background: var(--bg-2);
        }
        .project-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s ease;
        }
        .project-card:hover .project-img { transform: scale(1.06); }

        /* Overlay links */
        .project-overlay {
          position: absolute;
          inset: 0;
          background: rgba(6,9,21,0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .project-card:hover .project-overlay { opacity: 1; }

        .project-overlay-btn {
          display: flex; align-items: center; justify-content: center;
          width: 42px; height: 42px;
          border-radius: 10px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          transition: background 0.2s ease;
          text-decoration: none;
        }
        .project-overlay-btn:hover { background: var(--accent); }
        .project-overlay-btn.primary { background: var(--accent); }

        /* Body */
        .project-body {
          padding: 1.375rem 1.5rem 1.25rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .project-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-h);
          margin-bottom: 0.5rem;
        }
        .project-desc {
          font-size: 0.9rem;
          color: var(--text-dim);
          line-height: 1.65;
          margin-bottom: 1.125rem;
          flex: 1;
        }

        /* Tech tags */
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.125rem;
        }
        .project-tag {
          padding: 0.2rem 0.625rem;
          background: var(--accent-bg);
          border: 1px solid rgba(100,80,255,0.18);
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--accent-2);
        }

        /* Footer links */
        .project-links {
          display: flex;
          gap: 0.625rem;
        }
        .project-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 0.4rem 0.875rem;
          border-radius: 8px;
          font-size: 0.8125rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .project-link-btn.gh {
          background: var(--surface-hover);
          border: 1px solid var(--glass-border);
          color: var(--text);
        }
        .project-link-btn.gh:hover { border-color: var(--accent); color: var(--text-h); }
        .project-link-btn.live {
          background: var(--accent);
          color: #fff;
        }
        .project-link-btn.live:hover { opacity: 0.88; }
      `}</style>
    </section>
  );
};

// ── ProjectCard sub-component ─────────────────────────────────────
const ProjectCard = ({ project: p, index }) => (
  <motion.div
    className="project-card"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.45, delay: index * 0.07 }}
    whileHover={{ y: -6 }}
  >
    {/* Image + overlay */}
    <div className="project-img-wrap">
      {p.image && (
        <img src={p.image} alt={p.title} className="project-img" loading="lazy" />
      )}
      <div className="project-overlay">
        {p.github && (
          <a href={p.github} className="project-overlay-btn" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
        )}
        {p.live && (
          <a href={p.live} className="project-overlay-btn primary" target="_blank" rel="noreferrer" aria-label="Live demo">
            <ExternalLink size={18} />
          </a>
        )}
      </div>
    </div>

    {/* Content */}
    <div className="project-body">
      <h3 className="project-title">{p.title}</h3>
      <p className="project-desc">{p.description}</p>

      {/* Tags */}
      {p.techStack?.length > 0 && (
        <div className="project-tags">
          {p.techStack.map((t, i) => (
            <span key={i} className="project-tag">{t}</span>
          ))}
        </div>
      )}

      {/* Links */}
      <div className="project-links">
        {p.github && (
          <a href={p.github} className="project-link-btn gh" target="_blank" rel="noreferrer">
            <Github size={14} /> Code
          </a>
        )}
        {p.live && (
          <a href={p.live} className="project-link-btn live" target="_blank" rel="noreferrer">
            <ExternalLink size={14} /> Live
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

export default Projects;
