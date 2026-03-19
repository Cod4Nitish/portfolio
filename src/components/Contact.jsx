import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Contact = () => {
  const { email, github, linkedin, twitter, web3formsKey } = portfolioData.contact;

  const [form,   setForm]   = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'ok' | 'err'

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      if (web3formsKey) {
        const res  = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ access_key: web3formsKey, ...form }),
        });
        const data = await res.json();
        setStatus(data.success ? 'ok' : 'err');
        if (data.success) setForm({ name: '', email: '', message: '' });
      } else {
        // Demo mode — simulate success
        await new Promise(r => setTimeout(r, 900));
        setStatus('ok');
        setForm({ name: '', email: '', message: '' });
      }
    } catch { setStatus('err'); }
    setTimeout(() => setStatus(null), 4500);
  };

  const SOCIAL_LINKS = [
    { icon: <Github size={20} />,   label: 'GitHub',    href: github },
    { icon: <Linkedin size={20} />, label: 'LinkedIn',  href: linkedin },
    { icon: <Twitter size={20} />,  label: 'Twitter',   href: twitter },
    { icon: <Mail size={20} />,     label: email,       href: email ? `mailto:${email}` : null },
  ].filter(s => s.href);

  return (
    <section id="contact" className="contact-section">

      {/* ── Header ────────────────────────────────────────── */}
      <div className="section-header-centered">
        <span className="section-label">say hello</span>
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Open to internships, full‑time roles, freelance projects, or just a friendly chat!
        </p>
      </div>

      {/* ── Two-column grid ───────────────────────────────── */}
      <div className="contact-grid">

        {/* LEFT — info + social links */}
        <motion.div
          className="contact-info-card"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="contact-info-title">Let's Connect</h3>
          <p className="contact-info-body">
            Whether you have a project idea, an opportunity, or just want to say hi —
            my inbox is always open. I'll get back to you!
          </p>

          <div className="contact-social-list">
            {SOCIAL_LINKS.map((s, i) => (
              <a
                key={i}
                href={s.href}
                className="contact-social-link"
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={s.label}
              >
                <span className="contact-social-icon">{s.icon}</span>
                <span className="contact-social-label">{s.label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — form */}
        <motion.form
          className="contact-form-card"
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          {/* Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              className="form-input"
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Your name"
              required
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              className="form-input"
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          {/* Message */}
          <div className="form-group">
            <label className="form-label" htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              className="form-input form-textarea"
              name="message"
              value={form.message}
              onChange={onChange}
              placeholder="Tell me about your project or idea…"
              rows={5}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary"
            disabled={status === 'sending'}
            style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}
          >
            {status === 'sending'
              ? 'Sending…'
              : <><Send size={16} /> Send Message</>
            }
          </button>

          {/* Status messages */}
          {status === 'ok' && (
            <div className="form-status form-status--ok">
              ✓ Message sent! I'll reply soon.
            </div>
          )}
          {status === 'err' && (
            <div className="form-status form-status--err">
              ✕ Something went wrong — email me directly at {email}
            </div>
          )}
        </motion.form>

      </div>

      <style>{`
        /* ── Two-column grid: 1 → 2 ──────────── */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr 1.4fr;
            gap: 2rem;
          }
        }

        /* ── Info card ───────────────────────── */
        .contact-info-card {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: 18px;
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .contact-info-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-h);
          margin-bottom: 0.75rem;
        }
        .contact-info-body {
          font-size: 0.9375rem;
          color: var(--text-dim);
          line-height: 1.7;
          margin-bottom: 1.75rem;
        }

        /* Social links list */
        .contact-social-list {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }
        .contact-social-link {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 0.75rem 1rem;
          background: var(--bg-2, var(--bg));
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          text-decoration: none;
          transition: border-color 0.25s ease, background 0.25s ease;
        }
        .contact-social-link:hover {
          border-color: var(--accent);
          background: var(--accent-bg);
        }
        .contact-social-icon { color: var(--accent); flex-shrink: 0; }
        .contact-social-label {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .contact-social-link:hover .contact-social-label {
          color: var(--text-h);
        }

        /* ── Form card ───────────────────────── */
        .contact-form-card {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: 18px;
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* Form group */
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        /* Label */
        .form-label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        /* Input + textarea */
        .form-input {
          width: 100%;
          padding: 0.8125rem 1rem;
          border-radius: 10px;
          border: 1px solid var(--glass-border);
          background: var(--bg-2, var(--bg));
          color: var(--text-h);
          font-family: inherit;
          font-size: 0.9375rem;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
          box-sizing: border-box;
        }
        .form-input::placeholder { color: var(--text-dim); }
        .form-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-glow);
        }
        .form-textarea { resize: vertical; min-height: 120px; }

        /* Status box */
        .form-status {
          padding: 0.875rem 1rem;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 500;
          text-align: center;
          line-height: 1.5;
        }
        .form-status--ok {
          background: rgba(0, 220, 100, 0.1);
          border: 1px solid rgba(0, 220, 100, 0.3);
          color: #00dc64;
        }
        .form-status--err {
          background: rgba(255, 60, 60, 0.1);
          border: 1px solid rgba(255, 60, 60, 0.3);
          color: #ff5454;
        }

        @media (max-width: 480px) {
          .contact-info-card,
          .contact-form-card { padding: 1.5rem 1.25rem; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
