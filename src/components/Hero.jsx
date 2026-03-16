import React, { useState, useEffect } from 'react';
import { Download, ArrowRight, Github, Linkedin, Mail, Twitter, Instagram } from 'lucide-react';
import portfolioData from '../data/portfolio.json';
import heroProfileImg from '../assets/profile4.jpg';
import '../styles/hero.css';

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

    // Mouse Parallax Logic
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20; // -10 to 10
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const typingSpeed = isDeleting ? 50 : 100;
        const currentFullText = roles[currentRoleIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting && currentText === currentFullText) {
                setTimeout(() => setIsDeleting(true), 1500); // Pause at end
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

    return (
        <section id="home" className="hero-section">
            {/* 3D Parallax Background Elements */}
            <div className="bg-shapes">
                <div
                    className="shape parallax-shape shape-1"
                    style={{ transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px) rotate(${mousePosition.x}deg)` }}
                ></div>
                <div
                    className="shape parallax-shape shape-2"
                    style={{ transform: `translate(${mousePosition.x * -1.5}px, ${mousePosition.y * -1.5}px) rotate(${mousePosition.y}deg)` }}
                ></div>
                <div
                    className="shape parallax-shape shape-3"
                    style={{ transform: `translate(${mousePosition.x * 3}px, ${mousePosition.y * -2}px)` }}
                ></div>
                {/* Extra 3D floating orb */}
                <div
                    className="parallax-orb"
                    style={{ transform: `translate(${mousePosition.x * -4}px, ${mousePosition.y * 5}px) scale(1.1) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)` }}
                ></div>
            </div>

            <div className="container hero-container">
                <div className="hero-content" style={{ transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)` }}>
                    <h2 className="greeting">Hello, I'm</h2>
                    <h1 className="name">{name}</h1>

                    <div className="typing-container">
                        <span className="typing-text">{currentText}</span>
                        <span className="cursor">|</span>
                    </div>

                    <p className="tagline" style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1rem', fontWeight: 500 }}>{tagline}</p>
                    <p className="bio">{bio}</p>

                    <div className="hero-cta">
                        <a href="#projects" className="btn btn-primary">
                            View Projects <ArrowRight size={18} />
                        </a>
                        <a href={resolveUrl(resumeUrl)} download className="btn btn-outline" target="_blank" rel="noreferrer">
                            <Download size={18} /> Resume
                        </a>
                    </div>

                    <div className="social-links">
                        {github && (
                            <a href={github} target="_blank" rel="noreferrer" className="btn-icon" aria-label="GitHub">
                                <Github size={20} />
                            </a>
                        )}
                        {linkedin && (
                            <a href={linkedin} target="_blank" rel="noreferrer" className="btn-icon" aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </a>
                        )}
                        {twitter && (
                            <a href={twitter} target="_blank" rel="noreferrer" className="btn-icon" aria-label="Twitter">
                                <Twitter size={20} />
                            </a>
                        )}
                        {instagram && (
                            <a href={instagram} target="_blank" rel="noreferrer" className="btn-icon" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                        )}
                        {email && (
                            <a href={`mailto:${email}`} className="btn-icon" aria-label="Email">
                                <Mail size={20} />
                            </a>
                        )}
                    </div>
                </div>

                <div className="hero-image-container" style={{ transform: `translate(${mousePosition.x * 1}px, ${mousePosition.y * 1}px) perspective(1000px) rotateY(${mousePosition.x * -0.5}deg) rotateX(${mousePosition.y * 0.5}deg)` }}>
                    <div className="hero-image-glow"></div>
                    <img src={heroProfileImg} alt={name} className="hero-img" onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
            </div>
        </section>
    );
};

export default Hero;
