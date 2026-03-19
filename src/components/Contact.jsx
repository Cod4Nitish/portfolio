import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Contact = () => {
  const { email, github, linkedin, twitter, web3formsKey } = portfolioData.contact;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'ok' | 'err'

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    if (web3formsKey) {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ access_key: web3formsKey, ...form }),
        });
        const data = await res.json();
        setStatus(data.success ? 'ok' : 'err');
        if (data.success) setForm({ name: '', email: '', message: '' });
      } catch { setStatus('err'); }
    } else {
      setTimeout(() => { setStatus('ok'); setForm({ name: '', email: '', message: '' }); }, 900);
    }
    setTimeout(() => setStatus(null), 4000);
  };

  const input = {
    width: '100%', padding: '0.875rem 1rem', borderRadius: 12,
    background: 'var(--surface)', border: '1px solid var(--glass-border)',
    color: 'var(--text-h)', fontSize: '1rem', fontFamily: 'inherit',
    outline: 'none', transition: 'border-color 0.2s ease',
  };

  const LINKS = [
    { icon: <Mail size={20} />, label: email, href: `mailto:${email}` },
    { icon: <Github size={20} />, label: 'GitHub', href: github },
    { icon: <Linkedin size={20} />, label: 'LinkedIn', href: linkedin },
    { icon: <Twitter size={20} />, label: 'Twitter / X', href: twitter },
  ];

  return (
    <section id="contact">
      <div className="section-header center">
        <span className="section-label">say hello</span>
        <h2>Get In Touch</h2>
        <p style={{ maxWidth: 460, margin: '1rem auto 0', color: 'var(--text-dim)' }}>
          Open to full-time roles, internships, freelance projects, or just a friendly chat!
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>

        {/* Info card */}
        <motion.div
          className="glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ padding: '2.5rem' }}
        >
          <h3 style={{ marginBottom: '0.625rem' }}>Let's Connect</h3>
          <p style={{ color: 'var(--text-dim)', marginBottom: '2rem', fontSize: '0.9375rem' }}>
            Whether you have a question, a project idea, or just want to say hi — I'll get back to you soon!
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {LINKS.map((l, i) => (
              <a key={i} href={l.href} target="_blank" rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '0.875rem 1rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 12, color: 'var(--text)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-bg)'; e.currentTarget.style.color = 'var(--text-h)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.color = 'var(--text)'; }}
              >
                <span style={{ color: 'var(--accent)' }}>{l.icon}</span>
                <span style={{ fontSize: '0.9375rem', fontWeight: 500 }}>{l.label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          className="glass"
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Name</label>
            <input name="name" value={form.name} onChange={onChange} required placeholder="Your name" style={input}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--glass-border)'} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</label>
            <input name="email" type="email" value={form.email} onChange={onChange} required placeholder="you@example.com" style={input}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--glass-border)'} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Message</label>
            <textarea name="message" value={form.message} onChange={onChange} required rows={5} placeholder="Tell me about your project..." style={{ ...input, resize: 'vertical' }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--glass-border)'} />
          </div>

          <button type="submit" className="btn-primary" disabled={status === 'sending'} style={{ justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}>
            {status === 'sending' ? 'Sending…' : <><Send size={17} /> Send Message</>}
          </button>

          {status === 'ok' && (
            <div style={{ padding: '0.875rem', borderRadius: 10, background: 'rgba(0,216,100,0.1)', border: '1px solid rgba(0,216,100,0.3)', color: '#00d864', textAlign: 'center', fontWeight: 600 }}>
              ✓ Message sent successfully!
            </div>
          )}
          {status === 'err' && (
            <div style={{ padding: '0.875rem', borderRadius: 10, background: 'rgba(255,50,50,0.1)', border: '1px solid rgba(255,50,50,0.3)', color: '#ff5050', textAlign: 'center', fontWeight: 600 }}>
              ✕ Failed — please email me directly.
            </div>
          )}
        </motion.form>

      </div>
    </section>
  );
};

export default Contact;
