import React, { useState, useMemo } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import portfolioData from '../data/portfolio.json';
import '../styles/projects.css';

const Projects = () => {
    const { projects } = portfolioData;
    const [filter, setFilter] = useState('All');

    // Get unique tech stacks for filter buttons
    const allTechStack = useMemo(() => {
        const stacks = new Set();
        projects.forEach(p => p.techStack.forEach(t => stacks.add(t)));
        return ['All', ...Array.from(stacks)];
    }, [projects]);

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.techStack.includes(filter));

    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <h2 className="section-title">Featured Projects</h2>

                <div className="project-filters">
                    {allTechStack.map(tech => (
                        <button
                            key={tech}
                            className={`filter-btn ${filter === tech ? 'active' : ''}`}
                            onClick={() => setFilter(tech)}
                        >
                            {tech}
                        </button>
                    ))}
                </div>

                <div className="projects-grid">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-card glass-panel"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="project-image-container">
                                <img src={project.image} alt={project.title} className="project-image" />
                                <div className="project-overlay">
                                    <div className="project-links">
                                        {project.github && (
                                            <a href={project.github} target="_blank" rel="noreferrer" className="btn-icon" aria-label="GitHub Repository">
                                                <Github size={20} />
                                            </a>
                                        )}
                                        {project.live && (
                                            <a href={project.live} target="_blank" rel="noreferrer" className="btn-icon" aria-label="Live Demo">
                                                <ExternalLink size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-desc">{project.description}</p>
                                <div className="project-tech">
                                    {project.techStack.map((tech, i) => (
                                        <span key={i} className="tech-badge">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
