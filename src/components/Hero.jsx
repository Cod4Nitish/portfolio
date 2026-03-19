import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Github, Linkedin, Mail, Twitter, Instagram } from 'lucide-react';
import portfolioData from '../data/portfolio.json';
import heroProfileImg from '../assets/profile4.jpg';
import HeroCanvas from './HeroCanvas';

const ROLES = ['Full Stack Developer', 'AI Enthusiast', 'Problem Solver'];

// ── Scroll Indicator — fixed at viewport bottom ──────────────────
const ScrollIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2 }}
    style={{
      position: 'fixed',
      bottom: 28,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      zIndex: 50,
      pointerEvents: 'none',
    }}
  >
    <span style={{
      color: 'var(--text-dim)',
      fontSize: '0.6875rem',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
    }}>
      scroll
    </span>
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
      style={{
        width: 1,
        height: 36,
        background: 'linear-gradient(to bottom, var(--accent), transparent)',
      }}
    />
  </motion.div>
);

// ── Main Hero ─────────────────────────────────────────────────────
const Hero = () => {
  const { name, tagline } = portfolioData.personal;
  const { github, linkedin, email, twitter, instagram, resumeUrl } = portfolioData.contact;
  const resolveUrl = (p) => p ? `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}` : '';

  // Typing effect
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = ROLES[roleIdx];
    const delay = deleting ? 38 : 90;
    const t = setTimeout(() => {
      if (!deleting && typed === full) return setTimeout(() => setDeleting(true), 1500);
      if (deleting && typed === '') {
        setDeleting(false);
        setRoleIdx(i => (i + 1) % ROLES.length);
        return;
      }
      setTyped(deleting ? full.slice(0, typed.length - 1) : full.slice(0, typed.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [typed, deleting, roleIdx]);

  const socials = [
    { icon: <Github size={18} />, href: github, label: 'GitHub' },
    { icon: <Linkedin size={18} />, href: linkedin, label: 'LinkedIn' },
    { icon: <Twitter size={18} />, href: twitter, label: 'Twitter' },
    { icon: <Instagram size={18} />, href: instagram, label: 'Instagram' },
    { icon: <Mail size={18} />, href: email ? `mailto:${email}` : null, label: 'Email' },
  ].filter(s => s.href);

  const itemVars = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  };
  const containerVars = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
  };

  return (
    <>
      <section
        id="home"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* 3D canvas — hidden on mobile (performance) */}
        <div style={{ display: 'var(--canvas-display, block)' }}>
          <HeroCanvas />
        </div>

        {/* Glow blobs */}
        <div className="glow-blob glow-blob-1" />
        <div className="glow-blob glow-blob-2" />

        {/* ── HERO GRID ─────────────────────────────────────── */}
        <div className="hero-grid">

          {/* LEFT — text block */}
          <motion.div
            className="hero-text"
            variants={containerVars}
            initial="hidden"
            animate="show"
          >
            {/* Available badge */}
            <motion.div variants={itemVars} style={{ marginBottom: '1.5rem' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '0.375rem 1rem',
                background: 'var(--accent-bg)',
                color: 'var(--accent-2)',
                borderRadius: 999,
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: '1px solid rgba(0,216,255,0.2)',
              }}>
                ▹&nbsp;Available for work
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1 variants={itemVars} style={{ marginBottom: '0.75rem' }}>
              Hi, I'm <span className="gradient-text-accent">{name}</span>
            </motion.h1>

            {/* Typing role */}
            <motion.div variants={itemVars} style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              fontWeight: 600,
              color: 'var(--text-h)',
              marginBottom: '1.25rem',
              minHeight: '1.8em',
              display: 'flex',
              alignItems: 'center',
            }}>
              <span>{typed}</span>
              <span style={{
                display: 'inline-block',
                width: 2,
                height: '1.1em',
                background: 'var(--accent)',
                marginLeft: 3,
                borderRadius: 1,
                animation: 'blink 1s step-end infinite',
                verticalAlign: 'middle',
              }} />
            </motion.div>

            {/* Tagline */}
            <motion.p variants={itemVars} style={{
              maxWidth: 500,
              marginBottom: '2rem',
              color: 'var(--text)',
              fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
            }}>
              {tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVars} style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
              <a href="#projects" className="btn-primary">
                View Projects <ArrowRight size={16} />
              </a>
              <a href={resolveUrl(resumeUrl)} download className="btn-secondary" target="_blank" rel="noreferrer">
                <Download size={16} /> Resume
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div variants={itemVars} style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
              {socials.map((s, i) => (
                <a key={i} href={s.href} className="social-btn" target="_blank" rel="noreferrer" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — image block */}
          <motion.div
            className="hero-img-block"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Circular image wrapper */}
            <div className="profile-img-wrapper">
              <img
                src={heroProfileImg}
                alt={name}
                className="profile-img"
              />
              {/* Badge — safe inside wrapper */}
              <motion.div
                className="hero-badge"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                <span style={{ fontSize: '1.25rem' }}>🚀</span>
                <div>
                  <div style={{ color: 'var(--text-h)', fontWeight: 700, fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                    Open to work
                  </div>
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.6875rem', whiteSpace: 'nowrap' }}>
                    Full-time / Internship
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      <ScrollIndicator />

      <style>{`
        /* ── Hero Grid ── */
        .hero-grid {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 100px 20px 80px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        /* Mobile: image on top */
        .hero-img-block { order: -1; }

        /* Desktop: side by side, text first */
        @media (min-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr;
            padding: 120px 2rem 100px;
            gap: 4rem;
          }
          .hero-img-block { order: 0; }
        }

        /* Text alignment */
        .hero-text { text-align: center; }
        @media (min-width: 768px) { .hero-text { text-align: left; } }

        /* Heading size — Phase 3 */
        .hero-text h1 {
          font-size: clamp(1.8rem, 5vw, 3.5rem);
          line-height: 1.15;
        }

        /* Image wrapper */
        .profile-img-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
        }

        /* Circular image — Phase 3 */
        .profile-img {
          width: clamp(150px, 35vw, 220px);
          height: clamp(150px, 35vw, 220px);
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--glass-border);
          box-shadow: 0 0 50px var(--accent-glow), 0 16px 50px rgba(0,0,0,0.5);
          display: block;
        }

        /* Badge — safe positioning inside wrapper */
        .hero-badge {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--glass-bg);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.625rem;
          box-shadow: 0 8px 25px rgba(0,0,0,0.35);
          white-space: nowrap;
        }

        @media (min-width: 768px) {
          .profile-img {
            width: clamp(180px, 28vw, 260px);
            height: clamp(180px, 28vw, 260px);
          }
          .hero-badge {
            left: auto;
            right: -10px;
            transform: none;
            bottom: 16px;
          }
        }

        /* Canvas visible only on desktop */
        @media (max-width: 767px) {
          #hero-canvas-wrap { display: none; }
        }

        /* Blink animation for cursor */
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </>
  );
};

export default Hero;
