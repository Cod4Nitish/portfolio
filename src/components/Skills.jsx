import React from 'react';
import portfolioData from '../data/portfolio.json';
import '../styles/skills.css';

const Skills = () => {
    const { skills } = portfolioData;

    return (
        <section id="skills" className="section skills-section">
            <div className="container">
                <h2 className="section-title">My Skills</h2>

                <div className="skills-grid">
                    {skills.map((skillGroup, index) => (
                        <div
                            key={index}
                            className="skill-category glass-panel"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <h3 className="category-title">{skillGroup.category}</h3>
                            <div className="skill-badges">
                                {skillGroup.items.map((skill, i) => (
                                    <span key={i} className="skill-badge">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
