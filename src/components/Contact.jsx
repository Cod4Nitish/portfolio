import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Contact = () => {
  const { email, github, linkedin, web3formsKey } = portfolioData.contact;

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

    if (web3formsKey) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ access_key: web3formsKey, ...formData }),
        });
        const result = await response.json();
        if (result.success) {
          setSubmitMessage('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        } else {
          setIsError(true);
          setSubmitMessage('Failed to send. Please email directly.');
        }
      } catch (error) {
        setIsError(true);
        setSubmitMessage('Network error. Please email directly.');
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setSubmitMessage(''), 5000);
      }
    } else {
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitMessage('Message simulated successfully!');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitMessage(''), 5000);
      }, 1000);
    }
  };

  return (
    <section id="contact" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="section-header">
        <span className="section-label">Connect</span>
        <h2>Get In Touch</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass" style={{ padding: '3rem', borderRadius: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-h)' }}>Let's work together.</h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-dim)', marginBottom: '3rem', lineHeight: 1.6 }}>
              I'm always open to discussing product design work or partnership opportunities.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <a href={`mailto:${email}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text)', fontSize: '1.1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  <Mail size={24} />
                </div>
                <span>{email}</span>
              </a>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <a href={github} target="_blank" rel="noreferrer" style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-secondary)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-h)' }}>
                  <Github size={24} />
                </a>
                <a href={linkedin} target="_blank" rel="noreferrer" style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-secondary)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-h)' }}>
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form className="glass" onSubmit={handleSubmit} style={{ padding: '3rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 500 }}>Name</label>
              <input 
                type="text" name="name" value={formData.name} onChange={handleChange} required
                style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'var(--code-bg)', border: '1px solid var(--border)', color: 'var(--text-h)', fontSize: '1rem', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 500 }}>Email</label>
              <input 
                type="email" name="email" value={formData.email} onChange={handleChange} required
                style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'var(--code-bg)', border: '1px solid var(--border)', color: 'var(--text-h)', fontSize: '1rem', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 500 }}>Message</label>
              <textarea 
                name="message" value={formData.message} onChange={handleChange} required rows={4}
                style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'var(--code-bg)', border: '1px solid var(--border)', color: 'var(--text-h)', fontSize: '1rem', outline: 'none', resize: 'vertical' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={isSubmitting}
              style={{ width: '100%', justifyContent: 'center', padding: '1.25rem', marginTop: '1rem', opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting ? 'Sending...' : <><Send size={20} /> Send Message</>}
            </button>
            
            {submitMessage && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ padding: '1rem', borderRadius: '12px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 500, background: isError ? 'rgba(239, 68, 68, 0.1)' : 'var(--accent-bg)', color: isError ? '#ef4444' : 'var(--accent)', border: `1px solid ${isError ? 'rgba(239,68,68,0.3)' : 'var(--accent-border)'}` }}
              >
                {submitMessage}
              </motion.div>
            )}
          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
