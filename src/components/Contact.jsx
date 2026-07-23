import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle } from 'lucide-react';
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
        await new Promise(r => setTimeout(r, 800));
        setStatus('ok');
        setForm({ name: '', email: '', message: '' });
      }
    } catch { setStatus('err'); }
    setTimeout(() => setStatus(null), 5000);
  };

  const SOCIALS = [
    { icon: <Github  size={19} />, label: 'GitHub',   href: github   },
    { icon: <Linkedin size={19} />, label: 'LinkedIn', href: linkedin },
    { icon: <Twitter  size={19} />, label: 'Twitter',  href: twitter  },
    { icon: <Mail     size={19} />, label: 'Email',    href: email ? `mailto:${email}` : null },
  ].filter(s => s.href);

  return (
    <section id="contact" className="container">
      <div className="s-head">
        <span className="s-tag">Contact</span>
        <h2>Get In Touch</h2>
        <p className="s-sub">Open to internships, full‑time roles &amp; freelance projects</p>
      </div>

      <div className="ct-grid">
        {/* Info panel */}
        <motion.div
          className="ct-info card"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="ct-info-h">Let's Connect</h3>
          <p className="ct-info-p">
            Whether you have a project idea, an opportunity, or just want to say hi — my inbox is always open.
          </p>

          <div className="ct-socials">
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} className="ct-social" target="_blank" rel="noreferrer" aria-label={s.label}>
                {s.icon}
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          className="ct-form card"
          onSubmit={onSubmit}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="ct-row">
            <div className="ct-field">
              <label className="ct-label">Name</label>
              <input className="ct-input" type="text" name="name" placeholder="Your name" value={form.name} onChange={onChange} required />
            </div>
            <div className="ct-field">
              <label className="ct-label">Email</label>
              <input className="ct-input" type="email" name="email" placeholder="your@email.com" value={form.email} onChange={onChange} required />
            </div>
          </div>
          <div className="ct-field">
            <label className="ct-label">Message</label>
            <textarea className="ct-input ct-textarea" name="message" placeholder="Tell me about your project or opportunity..." value={form.message} onChange={onChange} required rows={5} />
          </div>

          <button type="submit" className="btn btn-primary ct-submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : (<><Send size={15} /> Send Message</>)}
          </button>

          {status === 'ok'  && <div className="ct-status ct-ok"><CheckCircle  size={16} /> Message sent!</div>}
          {status === 'err' && <div className="ct-status ct-err"><AlertCircle size={16} /> Something went wrong. Try again.</div>}
        </motion.form>
      </div>

      <style>{`
        .ct-grid {
          display: grid; grid-template-columns: 1fr;
          gap: 1.5rem; align-items: start;
        }
        @media (min-width: 768px) { .ct-grid { grid-template-columns: 1fr 1.5fr; gap: 2rem; } }

        .ct-info { padding: 2rem; display: flex; flex-direction: column; gap: 1.25rem; }
        .ct-info-h { font-size: 1.25rem; font-weight: 700; color: var(--text-h); }
        .ct-info-p { font-size: .9rem; color: var(--text); line-height: 1.75; }

        .ct-socials { display: flex; flex-direction: column; gap: .5rem; }
        .ct-social {
          display: flex; align-items: center; gap: .75rem;
          padding: .625rem .875rem; border-radius: var(--radius-sm);
          color: var(--text); font-size: .9rem; font-weight: 500;
          background: var(--card-bg); border: 1px solid var(--border);
          transition: all .2s;
        }
        .ct-social:hover { color: var(--accent-light); background: var(--accent-bg); border-color: rgba(108,99,255,.25); }

        .ct-form { padding: 2rem; display: flex; flex-direction: column; gap: 1.125rem; }
        .ct-row { display: grid; gap: 1.125rem; grid-template-columns: 1fr; }
        @media (min-width: 500px) { .ct-row { grid-template-columns: 1fr 1fr; } }

        .ct-field { display: flex; flex-direction: column; gap: .4rem; }
        .ct-label { font-size: .8rem; font-weight: 600; color: var(--text-dim); letter-spacing: .04em; text-transform: uppercase; }
        .ct-input {
          width: 100%; padding: .75rem 1rem;
          background: var(--bg-2); color: var(--text-h);
          border: 1px solid var(--border); border-radius: var(--radius-sm);
          font-family: var(--font); font-size: .9375rem;
          outline: none; transition: border-color .2s, box-shadow .2s;
          resize: vertical;
        }
        .ct-input::placeholder { color: var(--text-dim); }
        .ct-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-bg); }
        .ct-textarea { min-height: 130px; }
        .ct-submit { align-self: flex-start; }
        .ct-status {
          display: flex; align-items: center; gap: .5rem;
          padding: .6rem .875rem; border-radius: var(--radius-sm);
          font-size: .875rem; font-weight: 500;
        }
        .ct-ok  { color: #34d399; background: rgba(52,211,153,.1); border: 1px solid rgba(52,211,153,.2); }
        .ct-err { color: #f87171; background: rgba(248,113,113,.1); border: 1px solid rgba(248,113,113,.2); }
      `}</style>
    </section>
  );
};

export default Contact;
