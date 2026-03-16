import React from 'react';
import portfolioData from '../data/portfolio.json';
import '../styles/about.css';

const About = () => {
    const { name, bio, aboutImage } = portfolioData.personal;

    const resolveUrl = (path) => path ? `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}` : '';

    return (
        <section id="about" className="section about-section">
            <div className="container">
                <h2 className="section-title">About Me</h2>

                <div className="about-content">
                    <div className="about-image-wrapper">
                        <div className="image-glass-panel glass-panel">
                            <img src={resolveUrl(aboutImage || '/profile2.jpg')} alt={name} className="profile-image" />
                        </div>
                        {/* Decorative element */}
                        <div className="about-shape"></div>
                    </div>

                    <div className="about-text glass-panel">
                        <h3>Get to know me</h3>
                        <p className="bio-text">
                            {bio}
                        </p>
                        <div className="about-highlights">
                            <div className="highlight">
                                <span className="highlight-number">3+</span>
                                <span className="highlight-text">Years of Coding</span>
                            </div>
                            <div className="highlight">
                                <span className="highlight-number">10+</span>
                                <span className="highlight-text">Projects Completed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
