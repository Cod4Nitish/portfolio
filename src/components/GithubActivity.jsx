import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, Github as GithubIcon } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const GithubActivity = () => {
  const { github } = portfolioData.contact;
  const username = github?.split('/').filter(Boolean).pop();

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

  if (!username || username === 'yourusername') return null;

  return (
    <section id="github" className="container">
      <div className="s-head">
        <span className="s-tag">Code</span>
        <h2>Latest Activity</h2>
        <p className="s-sub">Recent repositories and contributions from my GitHub</p>
      </div>

      {loading ? (
        <div className="gh-status">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
            <GithubIcon size={32} color="var(--text-dim)" />
          </motion.div>
        </div>
      ) : error || repos.length === 0 ? (
        <div className="gh-status card">
          <p>No recent public repositories found.</p>
        </div>
      ) : (
        <div className="gh-grid">
          {repos.map((repo, i) => (
            <motion.a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              key={repo.id}
              className="gh-card card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4, borderColor: 'var(--accent)' }}
            >
              <div className="gh-card-head">
                <GithubIcon size={18} color="var(--accent-light)" />
                <h3 className="gh-title">{repo.name}</h3>
              </div>
              <p className="gh-desc">
                {repo.description ? repo.description.substring(0, 100) + (repo.description.length > 100 ? '...' : '') : 'No description provided.'}
              </p>
              <div className="gh-stats">
                {repo.language && (
                  <span className="gh-stat"><span className="gh-lang-dot" /> {repo.language}</span>
                )}
                <span className="gh-stat"><Star size={14} /> {repo.stargazers_count}</span>
                <span className="gh-stat"><GitFork size={14} /> {repo.forks_count}</span>
              </div>
            </motion.a>
          ))}
        </div>
      )}

      <style>{`
        .gh-grid {
          display: grid; gap: 1.25rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 600px) { .gh-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .gh-grid { grid-template-columns: repeat(3, 1fr); } }

        .gh-status { padding: 4rem 2rem; display: flex; justify-content: center; align-items: center; text-align: center; color: var(--text-dim); }

        .gh-card {
          padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;
          text-decoration: none;
        }
        .gh-card-head { display: flex; align-items: center; gap: .625rem; }
        .gh-title { font-size: 1.0625rem; font-weight: 700; color: var(--text-h); margin: 0; }
        .gh-desc { font-size: .875rem; color: var(--text); line-height: 1.6; flex: 1; }
        
        .gh-stats { display: flex; gap: 1.25rem; flex-wrap: wrap; }
        .gh-stat { display: flex; align-items: center; gap: .375rem; font-size: .8rem; font-weight: 600; color: var(--text-dim); }
        .gh-lang-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); }
      `}</style>
    </section>
  );
};

export default GithubActivity;
