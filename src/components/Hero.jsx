import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Github, Linkedin, Mail, Twitter, Instagram } from 'lucide-react';
import portfolioData from '../data/portfolio.json';
import heroProfileImg from '../assets/profile4.jpg';
import HeroCanvas from './HeroCanvas';

const Hero = () => {
  const { name, role, bio, tagline } = portfolioData.personal;
  const { github, linkedin, email, twitter, instagram, resumeUrl } = portfolioData.contact;

  // Typing Effect Logic
  const roles = role.split('|').map(r => r.trim());
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Resolve public URLs for GitHub Pages
  const resolveUrl = (path) => path ? `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}` : '';

  useEffect(() => {
    const typingSpeed = isDeleting ? 40 : 100;
    const currentFullText = roles[currentRoleIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === currentFullText) {
        setTimeout(() => setIsDeleting(true), 1500); 
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        const nextText = isDeleting
            ? currentFullText.substring(0, currentText.length - 1)
            : currentFullText.substring(0, currentText.length + 1);
        setCurrentText(nextText);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentRoleIndex, roles]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section id="home" style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <HeroCanvas />
      
      <div className="glow-blob" style={{ top: '10%', left: '10%' }}></div>
      <div className="glow-blob" style={{ bottom: '10%', right: '10%', background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, rgba(0,0,0,0) 70%)' }}></div>

      <motion.div 
        className="hero-content-wrapper" 
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 10, padding: '0 20px', maxWidth: '800px' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="profile-img-wrapper" style={{ marginBottom: '2rem' }}>
          <img src={heroProfileImg} alt={name} style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-light)', boxShadow: 'var(--glass-shadow)' }} onError={(e) => { e.target.style.display = 'none'; }} />
        </motion.div>

        <motion.h2 variants={itemVariants} style={{ fontSize: '1.25rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
          Hello, world.
        </motion.h2>

        <motion.h1 variants={itemVariants} style={{ marginBottom: '0.5rem' }}>
          I'm <span className="gradient-text-accent">{name}</span>
        </motion.h1>

        <motion.div variants={itemVariants} style={{ fontSize: '1.5rem', fontWeight: 500, height: '35px', marginBottom: '1.5rem', color: 'var(--text-h)' }}>
          <span style={{ borderRight: '2px solid var(--accent)', paddingRight: '5px', animation: 'blink 1s step-end infinite' }}>
            {currentText}
          </span>
        </motion.div>

        <motion.p variants={itemVariants} style={{ fontSize: '1.1rem', color: 'var(--text)', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
          {tagline} {bio}
        </motion.p>

        <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <a href="#projects" className="btn-primary">
            View Projects <ArrowRight size={18} />
          </a>
          <a href={resolveUrl(resumeUrl)} download className="btn-secondary" target="_blank" rel="noreferrer">
            <Download size={18} /> Resume
          </a>
        </motion.div>

        <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          {[
            { icon: <Github size={20} />, url: github, label: "GitHub" },
            { icon: <Linkedin size={20} />, url: linkedin, label: "LinkedIn" },
            { icon: <Twitter size={20} />, url: twitter, label: "Twitter" },
            { icon: <Instagram size={20} />, url: instagram, label: "Instagram" },
            { icon: <Mail size={20} />, url: email ? `mailto:${email}` : null, label: "Email" }
          ].map((item, idx) => item.url && (
            <motion.a 
              key={idx}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              whileHover={{ scale: 1.1, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: '45px', height: '45px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-h)', transition: 'all 0.2s',
                boxShadow: 'var(--glass-shadow)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-h)'; }}
            >
              {item.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
      
      <style>{`
        @keyframes blink { 50% { border-color: transparent } }
      `}</style>
    </section>
  );
};

export default Hero;
