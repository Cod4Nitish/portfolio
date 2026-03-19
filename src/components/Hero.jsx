import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Github, Linkedin, Mail, Twitter, Instagram } from 'lucide-react';
import portfolioData from '../data/portfolio.json';
import heroProfileImg from '../assets/profile4.jpg';
import HeroCanvas from './HeroCanvas';

const ROLE_LABELS = ['Full Stack Developer', 'AI Enthusiast', 'Problem Solver'];

const Hero = () => {
  const { name, tagline, bio } = portfolioData.personal;
  const { github, linkedin, email, twitter, instagram, resumeUrl } = portfolioData.contact;
  const resolveUrl = (p) => p ? `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}` : '';

  // Typing effect
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = ROLE_LABELS[roleIdx];
    const speed = deleting ? 38 : 90;
    const t = setTimeout(() => {
      if (!deleting && typed === full) return setTimeout(() => setDeleting(true), 1400);
      if (deleting && typed === '') {
        setDeleting(false);
        setRoleIdx(i => (i + 1) % ROLE_LABELS.length);
        return;
      }
      setTyped(deleting ? full.slice(0, typed.length - 1) : full.slice(0, typed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [typed, deleting, roleIdx]);

  const socials = [
    { icon: <Github size={18} />, href: github },
    { icon: <Linkedin size={18} />, href: linkedin },
    { icon: <Twitter size={18} />, href: twitter },
    { icon: <Instagram size={18} />, href: instagram },
    { icon: <Mail size={18} />, href: email ? `mailto:${email}` : null },
  ].filter(s => s.href);

  const containerVars = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };
  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="home" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      paddingTop: '100px',
    }}>
      {/* 3D background canvas */}
      <HeroCanvas />

      {/* Glow blobs */}
      <div className="glow-blob glow-blob-1" />
      <div className="glow-blob glow-blob-2" />

      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>

          {/* LEFT — text */}
          <motion.div
            variants={containerVars}
            initial="hidden"
            animate="show"
            style={{ flex: '1 1 340px', minWidth: 0 }}
          >
            <motion.div variants={itemVars} style={{ marginBottom: '1.5rem' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.375rem 1rem',
                background: 'var(--accent-bg)',
                color: 'var(--accent-2)',
                borderRadius: '999px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: '1px solid rgba(0,216,255,0.2)',
              }}>
                ▹ Available for work
              </span>
            </motion.div>

            <motion.h1 variants={itemVars} style={{ marginBottom: '0.75rem', lineHeight: 1.05 }}>
              Hi, I'm<br />
              <span className="gradient-text-accent">{name}</span>
            </motion.h1>

            <motion.div variants={itemVars} style={{
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              fontWeight: 600,
              color: 'var(--text-h)',
              marginBottom: '1.5rem',
              minHeight: '2em',
              display: 'flex',
              alignItems: 'center',
            }}>
              <span>{typed}</span>
              <span style={{ borderRight: '2px solid var(--accent)', marginLeft: 2, animation: 'blink 1s step-end infinite', height: '1.2em' }} />
            </motion.div>

            <motion.p variants={itemVars} style={{ maxWidth: 520, marginBottom: '2.5rem', color: 'var(--text)' }}>
              {tagline}
            </motion.p>

            <motion.div variants={itemVars} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <a href="#projects" className="btn-primary">
                View Projects <ArrowRight size={18} />
              </a>
              <a href={resolveUrl(resumeUrl)} download className="btn-secondary" target="_blank" rel="noreferrer">
                <Download size={18} /> Resume
              </a>
            </motion.div>

            <motion.div variants={itemVars} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {socials.map((s, i) => (
                <a key={i} href={s.href} className="social-btn" target="_blank" rel="noreferrer">
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ flex: '0 0 auto', position: 'relative' }}
          >
            <div style={{
              width: 'clamp(220px, 30vw, 320px)',
              height: 'clamp(220px, 30vw, 320px)',
              borderRadius: '32px',
              overflow: 'hidden',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 0 60px var(--accent-glow), 0 20px 60px rgba(0,0,0,0.5)',
              position: 'relative',
            }}>
              <img src={heroProfileImg} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              {/* Overlay gradient */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,9,21,0.4) 0%, transparent 60%)' }} />
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              style={{
                position: 'absolute', bottom: -16, left: -24,
                background: 'var(--glass-bg)', backdropFilter: 'blur(16px)',
                border: '1px solid var(--glass-border)',
                borderRadius: '14px', padding: '0.75rem 1.25rem',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>🚀</span>
              <div>
                <div style={{ color: 'var(--text-h)', fontWeight: 700, fontSize: '0.875rem' }}>Open to work</div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>Full-time / Internship</div>
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ position: 'absolute', bottom: -60, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
          />
        </motion.div>
      </div>

      <style>{`@keyframes blink { 50% { border-color: transparent } }`}</style>
    </section>
  );
};

export default Hero;
