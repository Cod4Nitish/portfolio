import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Github, Linkedin, Mail, Twitter, Instagram } from 'lucide-react';
import portfolioData from '../data/portfolio.json';
import heroProfileImg from '../assets/profile4.jpg';

const ROLES = ['Web Developer', 'AI Learner', 'Problem Solver', 'Builder'];

const Hero = () => {
  const { name } = portfolioData.personal;
  const { github, linkedin, email, twitter, instagram, resumeUrl } = portfolioData.contact;
  const resolveUrl = (p) => p ? `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}` : '';

  // ── Typing effect ──────────────────────────────────────────────
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = ROLES[roleIdx];
    const delay = deleting ? 42 : 88;
    const t = setTimeout(() => {
      if (!deleting && typed === full) return setTimeout(() => setDeleting(true), 1600);
      if (deleting && typed === '') {
        setDeleting(false);
        setRoleIdx(i => (i + 1) % ROLES.length);
        return;
      }
      setTyped(deleting ? full.slice(0, typed.length - 1) : full.slice(0, typed.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [typed, deleting, roleIdx]);

  // ── Social links ───────────────────────────────────────────────
  const socials = [
    { icon: <Github size={18} />, href: github, label: 'GitHub' },
    { icon: <Linkedin size={18} />, href: linkedin, label: 'LinkedIn' },
    { icon: <Twitter size={18} />, href: twitter, label: 'Twitter' },
    { icon: <Instagram size={18} />, href: instagram, label: 'Instagram' },
    { icon: <Mail size={18} />, href: email ? `mailto:${email}` : null, label: 'Email' },
  ].filter(s => s.href);

  // ── Animation variants ─────────────────────────────────────────
  const containerVars = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const itemVars = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <>
      {/* ── Fixed scroll indicator ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        style={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 5,
          zIndex: 40,
          pointerEvents: 'none',
        }}
      >
        <span style={{ color: 'var(--text-dim)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
        />
      </motion.div>

      {/* ── Hero Section ────────────────────────────────────── */}
      <section id="home" className="hero-section">

        {/* Subtle background glow — not distracting */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 60% 50%, rgba(100,80,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        <div className="hero-container">

          {/* ─── LEFT: Text ─────────────────────────────────── */}
          <motion.div
            className="hero-text"
            variants={containerVars}
            initial="hidden"
            animate="show"
          >
            {/* Status badge */}
            <motion.div variants={itemVars} style={{ marginBottom: '1.25rem' }}>
              <span className="hero-badge-status">
                ✦ Available for Internship / Full-time
              </span>
            </motion.div>

            {/* Strong headline */}
            <motion.h1 variants={itemVars} className="hero-h1">
              Hi, I'm <span className="gradient-text-accent">Nitish</span>
            </motion.h1>

            {/* Clear tagline */}
            <motion.h2 variants={itemVars} className="hero-h2">
              Building real-world tech using{' '}
              <span style={{ color: 'var(--accent-2)', fontWeight: 700 }}>Web Dev</span> &amp;{' '}
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>AI</span>
            </motion.h2>

            {/* Typing role line */}
            <motion.div variants={itemVars} className="hero-typing">
              <span style={{ color: 'var(--text-dim)', marginRight: 6 }}>I am a</span>
              <span style={{ color: 'var(--text-h)', fontWeight: 600 }}>{typed}</span>
              <span className="cursor-blink" />
            </motion.div>

            {/* Short bio */}
            <motion.p variants={itemVars} className="hero-bio">
              Computer Science student passionate about creating practical applications
              that solve real problems — one project at a time.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={itemVars} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
              <a href="#projects" className="btn-primary">
                View Projects <ArrowRight size={16} />
              </a>
              <a href="#contact" className="btn-secondary">
                Contact Me
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVars} style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
              {socials.map((s, i) => (
                <a key={i} href={s.href} className="social-btn" target="_blank" rel="noreferrer" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── RIGHT: Image ───────────────────────────────── */}
          <motion.div
            className="hero-image-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-img-ring">
              <img src={heroProfileImg} alt="Nitish Singh" className="hero-profile-img" />
            </div>

            {/* Simple floating "open to work" chip */}
            <motion.div
              className="hero-work-chip"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              <span style={{ fontSize: '0.9rem' }}>🚀</span>
              <span style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-h)' }}>
                Open to work
              </span>
            </motion.div>
          </motion.div>

        </div>
      </section>

      <style>{`
        /* ── Section ─────────────────────────────────────── */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        /* ── Grid container ──────────────────────────────── */
        .hero-container {
          width: 100%;
          max-width: 1160px;
          margin: 0 auto;
          padding: 80px 20px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        /* Mobile: image on top */
        .hero-image-block { order: -1; }

        @media (min-width: 768px) {
          .hero-container {
            grid-template-columns: 1.1fr 0.9fr;
            gap: 5rem;
            padding: 0 2.5rem;
          }
          .hero-image-block { order: 0; }
        }

        /* ── Text side ───────────────────────────────────── */
        .hero-text { text-align: center; }
        @media (min-width: 768px) { .hero-text { text-align: left; } }

        /* h1 headline */
        .hero-h1 {
          font-size: clamp(2.2rem, 6vw, 4rem);
          line-height: 1.1;
          margin-bottom: 0.75rem;
          letter-spacing: -0.03em;
        }

        /* h2 tagline — clear, readable */
        .hero-h2 {
          font-size: clamp(1rem, 2.5vw, 1.35rem);
          font-weight: 500;
          color: var(--text);
          margin-bottom: 1rem;
          line-height: 1.5;
          letter-spacing: normal;
        }

        /* Typing line */
        .hero-typing {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          font-size: clamp(0.9rem, 1.8vw, 1.05rem);
          margin-bottom: 1.375rem;
          min-height: 1.6em;
        }
        @media (min-width: 768px) { .hero-typing { justify-content: flex-start; } }

        /* Bio text */
        .hero-bio {
          font-size: clamp(0.9rem, 1.5vw, 1rem);
          color: var(--text-dim);
          max-width: 460px;
          margin: 0 auto 1.75rem;
          line-height: 1.75;
        }
        @media (min-width: 768px) { .hero-bio { margin-left: 0; } }

        /* Status badge */
        .hero-badge-status {
          display: inline-block;
          padding: 0.35rem 0.9rem;
          background: var(--accent-bg);
          color: var(--accent-2);
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          border: 1px solid rgba(0,216,255,0.2);
        }

        /* Cursor blink */
        .cursor-blink {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: var(--accent);
          border-radius: 1px;
          margin-left: 2px;
          vertical-align: middle;
          animation: cursor-blink 1s step-end infinite;
        }
        @keyframes cursor-blink { 50% { opacity: 0; } }

        /* ── Image side ──────────────────────────────────── */
        .hero-image-block {
          display: flex;
          justify-content: center;
          position: relative;
        }

        .hero-img-ring {
          position: relative;
          display: inline-block;
        }

        /* Profile image: circular, clean border */
        .hero-profile-img {
          display: block;
          width: clamp(160px, 32vw, 240px);
          height: clamp(160px, 32vw, 240px);
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid rgba(100,80,255,0.5);
          box-shadow:
            0 0 0 8px rgba(100,80,255,0.07),
            0 20px 60px rgba(0,0,0,0.45);
        }

        /* Open to work chip — inside img-ring, no overflow */
        .hero-work-chip {
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0.4rem 0.875rem;
          background: rgba(13,18,36,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(100,80,255,0.3);
          border-radius: 999px;
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        }

        @media (min-width: 768px) {
          .hero-profile-img {
            width: clamp(200px, 25vw, 280px);
            height: clamp(200px, 25vw, 280px);
          }
        }
      `}</style>
    </>
  );
};

export default Hero;
