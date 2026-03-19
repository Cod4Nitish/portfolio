import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, Github as GithubIcon } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const GithubActivity = () => {
  const { github } = portfolioData.contact;
  const username = github.split('/').filter(Boolean).pop();

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
    <section id="github" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="section-header">
        <span className="section-label">Code</span>
        <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
          <GithubIcon size={36} color="var(--accent)" /> Latest Activity
        </h2>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-dim)' }}>
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ display: 'inline-block', marginBottom: '1rem' }}>
            <GithubIcon size={32} />
          </motion.div>
          <p>Loading repositories...</p>
        </div>
      ) : error || repos.length === 0 ? (
        <div className="glass" style={{ textAlign: 'center', padding: '4rem 2rem', borderRadius: '24px' }}>
          <GithubIcon size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <p>Configure your GitHub username in data.json to see recent repositories here.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {repos.map((repo, index) => (
            <motion.a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              key={repo.id}
              className="glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.3)', borderColor: 'var(--accent)' }}
              style={{
                padding: '2rem',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-h)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {repo.name}
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-dim)', flexGrow: 1, marginBottom: '1.5rem', lineHeight: 1.5 }}>
                {repo.description ? repo.description.substring(0, 100) + (repo.description.length > 100 ? '...' : '') : 'No description provided.'}
              </p>
              
              <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text)', fontWeight: 500 }}>
                {repo.language && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)' }}></span> 
                    {repo.language}
                  </span>
                )}
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Star size={14} color="var(--text-dim)" /> {repo.stargazers_count}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <GitFork size={14} color="var(--text-dim)" /> {repo.forks_count}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
};

export default GithubActivity;
