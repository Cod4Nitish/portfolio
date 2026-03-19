import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Github, Linkedin, Mail, Twitter, Instagram } from 'lucide-react';
import portfolioData from '../data/portfolio.json';
import heroProfileImg from '../assets/profile_suit.jpg';

const ROLES = ['Web Developer', 'AI Learner', 'Problem Solver', 'Builder'];

const Hero = () => {
  const { name } = portfolioData.personal;
  const { github, linkedin, email, twitter, instagram, resumeUrl } = portfolioData.contact;
  const base = import.meta.env.BASE_URL ?? '/';
  const resolveUrl = (p) => p ? `${base}${p.replace(/^\//, '')}` : '';

  /* ── Typing effect ────────────────────────────────────────── */
  const [roleIdx,  setRoleIdx]  = useState(0);
  const [typed,    setTyped]    = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full  = ROLES[roleIdx];
    const speed = deleting ? 42 : 90;
    const t = setTimeout(() => {
      if (!deleting && typed === full) return setTimeout(() => setDeleting(true), 1600);
      if (deleting && typed === '') {
        setDeleting(false);
        setRoleIdx(i => (i + 1) % ROLES.length);
        return;
      }
      setTyped(deleting ? full.slice(0, typed.length - 1) : full.slice(0, typed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [typed, deleting, roleIdx]);

  /* ── Socials ──────────────────────────────────────────────── */
  const socials = [
    { icon: <Github size={18} />,    href: github,               label: 'GitHub' },
    { icon: <Linkedin size={18} />,  href: linkedin,             label: 'LinkedIn' },
    { icon: <Twitter size={18} />,   href: twitter,              label: 'Twitter' },
    { icon: <Instagram size={18} />, href: instagram,            label: 'Instagram' },
    { icon: <Mail size={18} />,      href: email ? `mailto:${email}` : null, label: 'Email' },
  ].filter(s => s.href);

  /* ── Animation variants ───────────────────────────────────── */
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <>
      {/* ── Fixed scroll indicator ────────────────────────── */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        aria-hidden="true"
      >
        <span className="scroll-label">scroll</span>
        <motion.span
          className="scroll-line"
          animate={{ scaleY: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section id="home" className="hero-section" aria-label="Hero">

        {/* Subtle radial glow — not distracting */}
        <div className="hero-glow" aria-hidden="true" />

        <div className="hero-container">

          {/* ─── TEXT (left on desktop) ──────────────────────── */}
          <motion.div
            className="hero-text"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Status chip */}
            <motion.div variants={item}>
              <span className="hero-chip">✦ Open to Internship &amp; Full‑time</span>
            </motion.div>

            {/* Primary headline */}
            <motion.h1 variants={item} className="hero-headline">
              Hi, I'm{' '}
              <span className="gradient-text-accent">Nitish</span>
            </motion.h1>

            {/* Value statement — clear, concrete */}
            <motion.p variants={item} className="hero-statement">
              I build real‑world tech products using{' '}
              <strong>Web Development</strong> &amp; <strong>AI</strong>.
            </motion.p>

            {/* Typing role */}
            <motion.div variants={item} className="hero-typing" aria-live="polite">
              <span className="hero-typing-prefix">I am a&nbsp;</span>
              <span className="hero-typing-word">{typed}</span>
              <span className="hero-caret" aria-hidden="true" />
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={item} className="hero-cta">
              <a
                href="#projects"
                className="btn-primary"
                onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
              >
                View Projects <ArrowRight size={16} />
              </a>
              <a
                href="#contact"
                className="btn-secondary"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
              >
                Contact Me
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} className="hero-socials">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="social-btn"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── IMAGE (right on desktop, top on mobile) ─────── */}
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Outer glow ring — blends image into the design */}
            <div className="hero-img-glow-ring">

              {/* Radial gradient background — makes image feel part of design */}
              <div className="hero-img-glow-bg" aria-hidden="true" />

              {/* Image container — object-fit: contain, full visible */}
              <div className="hero-img-container">
                <img
                  src={heroProfileImg}
                  alt="Nitish Singh — portfolio photo"
                  className="hero-img"
                  loading="eager"
                  decoding="async"
                />
              </div>

            </div>

            {/* Floating "open to work" chip — anchored to bottom */}
            <motion.div
              className="hero-work-chip"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
              aria-label="Open to work"
            >
              🚀&nbsp;<strong>Open to work</strong>
              <span className="hero-work-sub">Full‑time / Internship</span>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ── All scoped CSS in one <style> ─────────────────────── */}
      <style>{`
        /* ── Section ────────────────────────────────── */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow-x: hidden;
          /* scroll-margin-top handled globally */
        }

        .hero-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 65% 55% at 65% 50%,
            rgba(100, 80, 255, 0.09) 0%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
        }

        /* ── Grid container ──────────────────────── */
        .hero-container {
          width: 100%;
          max-width: 1160px;
          margin: 0 auto;
          padding: 80px 20px 80px;
          position: relative;
          z-index: 2;

          /* Grid: 1 column on mobile */
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
        }

        /* Mobile: image above text */
        .hero-image { order: -1; }

        /* Desktop: 2-column, text left, image right */
        @media (min-width: 768px) {
          .hero-container {
            grid-template-columns: 1.1fr 0.9fr;
            gap: 4rem;
            padding: 0 2rem;
          }
          .hero-image { order: 0; }
        }

        @media (min-width: 1024px) {
          .hero-container { gap: 6rem; }
        }

        /* ── Text side ───────────────────────────── */
        .hero-text {
          text-align: center;           /* mobile */
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        @media (min-width: 768px) {
          .hero-text { text-align: left; }
        }

        /* Status chip */
        .hero-chip {
          display: inline-block;
          padding: 0.35rem 0.9rem;
          background: var(--accent-bg);
          color: var(--accent-2);
          border: 1px solid rgba(0, 216, 255, 0.22);
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          margin-bottom: 1.25rem;
        }

        /* Headline */
        .hero-headline {
          font-size: clamp(2.2rem, 6vw, 4rem);
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 0.875rem;
        }

        /* Value statement */
        .hero-statement {
          font-size: clamp(1rem, 2.2vw, 1.2rem);
          color: var(--text);
          line-height: 1.65;
          margin: 0 auto 1rem;
          max-width: 460px;
        }
        @media (min-width: 768px) { .hero-statement { margin-left: 0; } }
        .hero-statement strong { color: var(--text-h); }

        /* Typing line */
        .hero-typing {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          font-size: clamp(0.9rem, 1.8vw, 1.05rem);
          min-height: 1.7em;
          margin-bottom: 1.625rem;
          color: var(--text-dim);
        }
        @media (min-width: 768px) {
          .hero-typing { justify-content: flex-start; }
        }

        .hero-typing-prefix { color: var(--text-dim); }
        .hero-typing-word   { color: var(--text-h); font-weight: 600; }

        .hero-caret {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          background: var(--accent);
          border-radius: 1px;
          margin-left: 2px;
          vertical-align: middle;
          animation: caret-blink 1s step-end infinite;
        }
        @keyframes caret-blink { 50% { opacity: 0; } }

        /* CTA row */
        .hero-cta {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 1.625rem;
        }
        @media (min-width: 768px) {
          .hero-cta { justify-content: flex-start; }
        }

        /* Socials row */
        .hero-socials {
          display: flex;
          gap: 0.625rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        @media (min-width: 768px) {
          .hero-socials { justify-content: flex-start; }
        }

        /* ── Image side ──────────────────────────── */
        .hero-image {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        /* Outer glow ring — soft purple halo around image */
        .hero-img-glow-ring {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* Radial gradient behind image — blends into dark/light bg */
        .hero-img-glow-bg {
          position: absolute;
          inset: -20%;
          border-radius: 50%;
          background: radial-gradient(
            circle at center,
            rgba(139, 92, 246, 0.22) 0%,
            rgba(100, 80, 255, 0.10) 40%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
          /* Subtle pulse animation */
          animation: img-pulse 4s ease-in-out infinite alternate;
        }
        @keyframes img-pulse {
          0%   { transform: scale(0.96); opacity: 0.7; }
          100% { transform: scale(1.04); opacity: 1;   }
        }
        [data-theme='light'] .hero-img-glow-bg {
          background: radial-gradient(
            circle at center,
            rgba(139, 92, 246, 0.12) 0%,
            rgba(100, 80, 255, 0.05) 40%,
            transparent 70%
          );
        }

        /* Glass container — premium frame */
        .hero-img-container {
          position: relative;
          z-index: 1;
          /* Glassmorphism card */
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          padding: 12px;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          box-shadow:
            0 0 0 1px rgba(100, 80, 255, 0.15),
            0 20px 60px rgba(0, 0, 0, 0.35),
            0 0 40px rgba(100, 80, 255, 0.12);
          overflow: hidden;
        }
        [data-theme='light'] .hero-img-container {
          background: rgba(255, 255, 255, 0.7);
          box-shadow:
            0 0 0 1px rgba(100, 80, 255, 0.1),
            0 16px 48px rgba(0, 0, 0, 0.10);
        }

        /* ── THE IMAGE — object-fit: contain, never cropped ── */
        .hero-img {
          display: block;
          /* Width matches container */
          width: 100%;
          /* Auto height — preserves aspect ratio perfectly */
          height: auto;
          /* Hard cap on height so it doesn't overflow on desktop */
          max-height: clamp(340px, 55vw, 480px);
          /* CONTAIN: full image, no cropping ever */
          object-fit: contain;
          object-position: center bottom;
          border-radius: 12px;
          /* Filter: blend image edges into the glow background */
          filter: drop-shadow(0 8px 32px rgba(100, 80, 255, 0.25));
        }

        @media (min-width: 768px) {
          .hero-img-container {
            /* Fixed width on desktop so image doesn't grow too wide */
            width: clamp(260px, 30vw, 360px);
          }
        }

        /* Open to work chip — centered below image on mobile, right on desktop */
        .hero-work-chip {
          position: absolute;
          bottom: -18px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 0.4rem 0.9rem;
          background: var(--glass-bg);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(100, 80, 255, 0.3);
          border-radius: 999px;
          font-size: 0.8rem;
          color: var(--text-h);
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          z-index: 2;
        }
        .hero-work-chip strong { font-weight: 700; }
        .hero-work-sub {
          color: var(--text-dim);
          font-size: 0.7rem;
          margin-left: 4px;
        }
        @media (min-width: 768px) {
          .hero-work-chip {
            bottom: -14px;
            left: 50%;
            transform: translateX(-50%);
          }
        }

        /* ── Fixed scroll indicator ──────────────── */
        .scroll-indicator {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          z-index: 40;
          pointer-events: none;
        }

        .scroll-label {
          color: var(--text-dim);
          font-size: 0.6rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .scroll-line {
          display: block;
          width: 1px;
          height: 32px;
          background: linear-gradient(to bottom, var(--accent), transparent);
          border-radius: 1px;
          transform-origin: top;
        }
      `}</style>
    </>
  );
};

export default Hero;
