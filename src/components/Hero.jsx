import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, Instagram, ArrowRight, Download } from 'lucide-react';
import portfolioData from '../data/portfolio.json';
import heroImg from '../assets/profile_pro.jpg';

const ROLES = ['Full Stack Developer', 'AI Enthusiast', 'Problem Solver', 'Builder'];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const Hero = () => {
  const { name }                    = portfolioData.personal;
  const { github, linkedin, email, twitter, instagram, resumeUrl } = portfolioData.contact;
  const base = import.meta.env.BASE_URL ?? '/';
  const res  = p => (p ? `${base}${p.replace(/^\//, '')}` : '');

  const [idx, setIdx]           = useState(0);
  const [typed, setTyped]       = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full  = ROLES[idx];
    const speed = deleting ? 38 : 85;
    const t = setTimeout(() => {
      if (!deleting && typed === full) return setTimeout(() => setDeleting(true), 1800);
      if (deleting  && typed === '') { setDeleting(false); setIdx(i => (i + 1) % ROLES.length); return; }
      setTyped(deleting ? full.slice(0, typed.length - 1) : full.slice(0, typed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [typed, deleting, idx]);

  const socials = [
    { icon: <Github size={17} />,    href: github,   label: 'GitHub'    },
    { icon: <Linkedin size={17} />,  href: linkedin, label: 'LinkedIn'  },
    { icon: <Twitter size={17} />,   href: twitter,  label: 'Twitter'   },
    { icon: <Instagram size={17} />, href: instagram,label: 'Instagram' },
    { icon: <Mail size={17} />,      href: email ? `mailto:${email}` : null, label: 'Email' },
  ].filter(s => s.href);

  const scrollTo = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="hero">
      {/* Ambient glow */}
      <div className="hero-glow" aria-hidden />

      <div className="container">
        <div className="hero-grid">

          {/* ── Text ── */}
          <motion.div className="hero-text" variants={stagger} initial="hidden" animate="show">
            <motion.span variants={fadeUp} className="hero-tag">
              ✦ Open to Internship &amp; Full‑time
            </motion.span>

            <motion.h1 variants={fadeUp} className="hero-h1">
              Hi, I'm <span className="grad">{name.split(' ')[0]}</span>
            </motion.h1>

            <motion.div variants={fadeUp} className="hero-role" aria-live="polite">
              <span className="hero-role-prefix">I'm a </span>
              <span className="hero-role-word">{typed}</span>
              <span className="hero-cursor" aria-hidden />
            </motion.div>

            <motion.p variants={fadeUp} className="hero-bio">
              Building real‑world products with <strong>Web Development</strong> &amp; <strong>Artificial Intelligence</strong>. CS student, constant learner, passionate builder.
            </motion.p>

            <motion.div variants={fadeUp} className="hero-btns">
              <button className="btn btn-primary" onClick={() => scrollTo('#projects')}>
                View Projects <ArrowRight size={15} />
              </button>
              {resumeUrl && (
                <a href={res(resumeUrl)} download className="btn btn-ghost">
                  <Download size={15} /> Resume
                </a>
              )}
            </motion.div>

            <motion.div variants={fadeUp} className="hero-socials">
              {socials.map(s => (
                <a key={s.label} href={s.href} className="social-btn" target="_blank" rel="noreferrer" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Image ── */}
          <motion.div
            className="hero-img-wrap"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-img-frame">
              <img src={heroImg} alt="Nitish Singh" className="hero-img" loading="eager" />
            </div>
            {/* Floating badge */}
            <motion.div
              className="hero-badge"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              🚀 <strong>Open to work</strong>
            </motion.div>
          </motion.div>

        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          padding-top: 80px;
          overflow: hidden;
        }
        .hero-glow {
          position: absolute;
          top: -20%; right: -10%;
          width: 60vw; height: 60vw;
          max-width: 600px; max-height: 600px;
          background: radial-gradient(circle, rgba(108,99,255,.12) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }
        .hero > .container { position: relative; z-index: 1; width: 100%; }

        /* Grid */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          padding: 2rem 0 3rem;
        }
        .hero-img-wrap { order: -1; }
        @media (min-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            padding: 0;
          }
          .hero-img-wrap { order: 0; }
        }
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1.1fr .9fr; gap: 6rem; }
        }

        /* Text side */
        .hero-text { display: flex; flex-direction: column; gap: .5rem; align-items: center; text-align: center; }
        @media (min-width: 768px) { .hero-text { align-items: flex-start; text-align: left; } }

        .hero-tag {
          display: inline-block;
          padding: .3rem .9rem;
          font-size: .75rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
          color: var(--cyan);
          background: var(--cyan-bg);
          border: 1px solid rgba(34,211,238,.18);
          border-radius: 999px;
          margin-bottom: .5rem;
        }

        .hero-h1 { font-size: clamp(2.25rem, 7vw, 4rem); line-height: 1.1; margin-bottom: .25rem; }

        .hero-role {
          display: flex; align-items: center; gap: 0;
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          color: var(--text); min-height: 1.8em; margin-bottom: .25rem;
          justify-content: center;
        }
        @media (min-width: 768px) { .hero-role { justify-content: flex-start; } }
        .hero-role-prefix { color: var(--text-dim); margin-right: 4px; }
        .hero-role-word { color: var(--accent-light); font-weight: 600; }
        .hero-cursor {
          display: inline-block; width: 2px; height: 1.1em;
          background: var(--accent); border-radius: 1px; margin-left: 3px;
          vertical-align: middle; animation: blink 1s step-end infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }

        .hero-bio {
          font-size: clamp(.9rem, 1.8vw, 1.05rem); line-height: 1.75;
          color: var(--text); max-width: 440px; margin: .5rem auto .25rem;
        }
        .hero-bio strong { color: var(--text-h); font-weight: 600; }
        @media (min-width: 768px) { .hero-bio { margin-left: 0; } }

        .hero-btns {
          display: flex; gap: .75rem; flex-wrap: wrap;
          justify-content: center; margin: 1rem 0 .5rem;
        }
        @media (min-width: 768px) { .hero-btns { justify-content: flex-start; } }

        .hero-socials {
          display: flex; gap: .5rem; flex-wrap: wrap; justify-content: center;
          margin-top: .5rem;
        }
        @media (min-width: 768px) { .hero-socials { justify-content: flex-start; } }

        .social-btn {
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 9px;
          background: var(--card-bg); border: 1px solid var(--border);
          color: var(--text);
          transition: background .2s, border-color .2s, color .2s, transform .2s;
        }
        .social-btn:hover {
          background: var(--accent-bg); border-color: var(--accent);
          color: var(--accent-light); transform: translateY(-2px);
        }

        /* Image side */
        .hero-img-wrap {
          display: flex; justify-content: center; align-items: center;
          position: relative;
        }
        .hero-img-frame {
          width: clamp(200px, 45vw, 320px);
          padding: 8px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: 0 0 0 1px rgba(108,99,255,.1), 0 20px 60px rgba(0,0,0,.3);
        }
        @media (min-width: 768px) {
          .hero-img-frame { width: clamp(220px, 26vw, 300px); }
        }
        .hero-img {
          width: 100%; height: auto;
          max-height: clamp(280px, 50vw, 400px);
          object-fit: contain; object-position: center bottom;
          border-radius: calc(var(--radius-lg) - 6px);
          display: block;
        }
        .hero-badge {
          position: absolute; bottom: -14px; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 6px;
          padding: .375rem 1rem;
          background: var(--bg-card, var(--bg-2));
          border: 1px solid var(--border);
          border-radius: 999px;
          font-size: .8rem; color: var(--text-h); white-space: nowrap;
          box-shadow: 0 4px 16px rgba(0,0,0,.25);
        }
        .hero-badge strong { font-weight: 700; color: var(--accent-light); }
      `}</style>
    </section>
  );
};

export default Hero;