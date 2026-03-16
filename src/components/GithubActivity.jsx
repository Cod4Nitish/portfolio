import React, { useState, useEffect } from 'react';
import { Star, GitFork, Github as GithubIcon } from 'lucide-react';
import portfolioData from '../data/portfolio.json';
import '../styles/github.css';

const GithubActivity = () => {
    const { github } = portfolioData.contact;
    const username = github.split('/').pop();

    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!username || username === 'yourusername') {
            setLoading(false);
            return;
        }

        const fetchRepos = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
                if (!response.ok) throw new Error('Failed to fetch repositories');
                const data = await response.json();
                setRepos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, [username]);

    return (
        <section id="github" className="section github-section">
            <div className="container">
                <h2 className="section-title">
                    <GithubIcon size={32} className="inline-icon" /> Latest Activity
                </h2>

                {loading ? (
                    <div className="loading-state">Loading repositories...</div>
                ) : error || repos.length === 0 ? (
                    <div className="empty-state glass-panel">
                        <GithubIcon size={48} />
                        <p>Configure your GitHub username in data.json to see recent repositories here.</p>
                    </div>
                ) : (
                    <div className="repo-grid">
                        {repos.map((repo, index) => (
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noreferrer"
                                key={repo.id}
                                className="repo-card glass-panel animate-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="repo-header">
                                    <h3 className="repo-name">{repo.name}</h3>
                                </div>
                                <p className="repo-desc">
                                    {repo.description || 'No description provided.'}
                                </p>
                                <div className="repo-stats">
                                    {repo.language && (
                                        <span className="repo-lang">
                                            <span className="lang-dot"></span> {repo.language}
                                        </span>
                                    )}
                                    <span className="repo-stat">
                                        <Star size={14} /> {repo.stargazers_count}
                                    </span>
                                    <span className="repo-stat">
                                        <GitFork size={14} /> {repo.forks_count}
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default GithubActivity;
