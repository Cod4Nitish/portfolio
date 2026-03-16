import React from 'react';
import { Download, Briefcase, GraduationCap } from 'lucide-react';
import portfolioData from '../data/portfolio.json';
import '../styles/resume.css';

const Resume = () => {
    const { experience } = portfolioData;
    const { resumeUrl } = portfolioData.contact;

    return (
        <section id="resume" className="section resume-section">
            <div className="container">
                <div className="resume-header">
                    <h2 className="section-title" style={{ marginBottom: 0 }}>Experience & Education</h2>
                    <a href={resumeUrl} download className="btn btn-primary" target="_blank" rel="noreferrer">
                        <Download size={18} /> Download Resume
                    </a>
                </div>

                <div className="timeline">
                    {experience.map((item, index) => (
                        <div key={index} className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content glass-panel animate-in" style={{ animationDelay: `${index * 0.2}s` }}>
                                <div className="timeline-header">
                                    <h3 className="timeline-role">{item.role}</h3>
                                    <span className="timeline-period">{item.period}</span>
                                </div>
                                <h4 className="timeline-company">
                                    {item.role.toLowerCase().includes('student') ? <GraduationCap size={16} /> : <Briefcase size={16} />}
                                    {item.company}
                                </h4>
                                <p className="timeline-desc">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Resume;
