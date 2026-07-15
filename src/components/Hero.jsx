import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Github, Linkedin, Mail, Twitter, Instagram } from 'lucide-react';
import portfolioData from '../data/portfolio.json';
import heroProfileImg from '../assets/profile_pro.jpg';
import Hero3D from './Hero3D';

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

        {/* 3D background scene */}
        <Hero3D />

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

      {/* ── All scoped CSS ─────────────────────────────────── */}
      <style>{`

        /* ── Hero section wrapper ──────────────────────────── */
        .hero-section {
          position: relative;
          min-height: 100svh;         /* full viewport, safe on mobile */
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: 72px;          /* navbar clearance */
        }

        /* Single, subtle glow — no stacking */
        .hero-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 55% 50% at 70% 50%,
            rgba(124,92,255,0.08) 0%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
        }

        /* ── Layout grid ───────────────────────────────────── */
        .hero-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1160px;
          margin: 0 auto;
          padding: 2.5rem 1.25rem 4rem;   /* mobile padding */

          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
        }

        /* Mobile: image above text */
        .hero-image { order: -1; }

        @media (min-width: 768px) {
          .hero-container {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            padding: 0 2rem;
          }
          .hero-image { order: 0; }
        }

        @media (min-width: 1100px) {
          .hero-container {
            grid-template-columns: 1.15fr 0.85fr;
            gap: 5rem;
          }
        }

        /* ── Text side ─────────────────────────────────────── */
        .hero-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0;
        }
        @media (min-width: 768px) {
          .hero-text {
            align-items: flex-start;
            text-align: left;
          }
        }

        /* Status chip */
        .hero-chip {
          display: inline-block;
          padding: 0.35rem 1rem;
          background: rgba(124,92,255,0.12);
          color: #00e5ff;
          border: 1px solid rgba(0,229,255,0.2);
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          margin-bottom: 1.25rem;
          white-space: nowrap;
        }

        /* Headline */
        .hero-headline {
          font-size: clamp(2rem, 6vw, 3.75rem);
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 0.875rem;
          color: #e8ecf5;
        }

        /* Value statement */
        .hero-statement {
          font-size: clamp(0.9375rem, 2vw, 1.125rem);
          color: #9da8c2;
          line-height: 1.7;
          margin: 0 auto 1rem;
          max-width: 440px;
        }
        @media (min-width: 768px) { .hero-statement { margin-left: 0; } }
        .hero-statement strong { color: #e8ecf5; font-weight: 600; }

        /* Typing line */
        .hero-typing {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(0.875rem, 1.6vw, 1rem);
          min-height: 1.7em;
          margin-bottom: 1.75rem;
          color: #5a6380;
        }
        @media (min-width: 768px) { .hero-typing { justify-content: flex-start; } }
        .hero-typing-prefix { color: #5a6380; }
        .hero-typing-word   { color: #e8ecf5; font-weight: 600; margin-left: 4px; }
        .hero-caret {
          display: inline-block;
          width: 2px; height: 1.1em;
          background: #7c5cff;
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
        @media (min-width: 768px) { .hero-cta { justify-content: flex-start; } }

        /* Socials */
        .hero-socials {
          display: flex;
          gap: 0.625rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        @media (min-width: 768px) { .hero-socials { justify-content: flex-start; } }

        /* ── Image side ─────────────────────────────────────── */
        .hero-image {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        /* Glow ring wrapper */
        .hero-img-glow-ring {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* Single soft glow behind image */
        .hero-img-glow-bg {
          position: absolute;
          inset: -15%;
          border-radius: 50%;
          background: radial-gradient(
            circle at center,
            rgba(124,92,255,0.18) 0%,
            transparent 65%
          );
          pointer-events: none;
          z-index: 0;
          animation: img-pulse 4s ease-in-out infinite alternate;
        }
        @keyframes img-pulse {
          0%   { opacity: 0.6; transform: scale(0.97); }
          100% { opacity: 1;   transform: scale(1.03); }
        }
        [data-theme='light'] .hero-img-glow-bg {
          background: radial-gradient(
            circle at center,
            rgba(124,92,255,0.1) 0%,
            transparent 65%
          );
        }

        /* Glass frame */
        .hero-img-container {
          position: relative;
          z-index: 1;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 22px;
          padding: 10px;
          box-shadow:
            0 0 0 1px rgba(124,92,255,0.12),
            0 16px 48px rgba(0,0,0,0.4);
          /* Width is controlled here — one place only */
          width: clamp(200px, 38vw, 300px);
        }
        @media (min-width: 768px) {
          .hero-img-container {
            width: clamp(220px, 26vw, 300px);
          }
        }
        [data-theme='light'] .hero-img-container {
          background: rgba(255,255,255,0.75);
          box-shadow: 0 0 0 1px rgba(124,92,255,0.08), 0 12px 40px rgba(0,0,0,0.08);
        }

        /* Image — contain, never cropped */
        .hero-img {
          display: block;
          width: 100%;
          height: auto;
          max-height: clamp(280px, 44vw, 420px);
          object-fit: contain;
          object-position: center bottom;
          border-radius: 14px;
          filter: drop-shadow(0 4px 20px rgba(124,92,255,0.22));
        }

        /* "Open to work" chip */
        .hero-work-chip {
          position: absolute;
          bottom: -16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 0.375rem 0.875rem;
          background: rgba(13,18,36,0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(124,92,255,0.28);
          border-radius: 999px;
          font-size: 0.78rem;
          color: #e8ecf5;
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
          z-index: 2;
        }
        .hero-work-chip strong { font-weight: 700; }
        .hero-work-sub {
          color: #5a6380;
          font-size: 0.68rem;
          margin-left: 4px;
        }

        /* ── Scroll indicator ──────────────────────────────── */
        .scroll-indicator {
          position: fixed;
          bottom: 22px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          z-index: 40;
          pointer-events: none;
        }
        @media (max-width: 480px) { .scroll-indicator { display: none; } }
        .scroll-label {
          color: #5a6380;
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .scroll-line {
          display: block;
          width: 1px;
          height: 28px;
          background: linear-gradient(to bottom, #7c5cff, transparent);
          border-radius: 1px;
          transform-origin: top;
        }
      `}</style>
    </>
  );
};

export default Hero;