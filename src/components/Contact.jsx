import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import portfolioData from '../data/portfolio.json';
import '../styles/contact.css';

const Contact = () => {
    const { email, github, linkedin } = portfolioData.contact;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitMessage('Thank you! Your message has been sent successfully.');
            setFormData({ name: '', email: '', message: '' });

            // Clear success message after 5 seconds
            setTimeout(() => setSubmitMessage(''), 5000);
        }, 1500);
    };

    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>

                <div className="contact-content">
                    <div className="contact-info glass-panel">
                        <h3>Let's Connect</h3>
                        <p className="contact-desc">
                            Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
                        </p>

                        <div className="contact-links">
                            <a href={`mailto:${email}`} className="contact-link">
                                <div className="contact-icon"><Mail size={20} /></div>
                                <span>{email}</span>
                            </a>
                            <a href={github} target="_blank" rel="noreferrer" className="contact-link">
                                <div className="contact-icon"><Github size={20} /></div>
                                <span>GitHub Profile</span>
                            </a>
                            <a href={linkedin} target="_blank" rel="noreferrer" className="contact-link">
                                <div className="contact-icon"><Linkedin size={20} /></div>
                                <span>LinkedIn Profile</span>
                            </a>
                        </div>
                    </div>

                    <div className="contact-form-container glass-panel">
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    required
                                    className="input-field"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    required
                                    className="input-field"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <textarea
                                    name="message"
                                    placeholder="Your Message..."
                                    required
                                    className="input-field"
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : <><Send size={18} /> Send Message</>}
                            </button>

                            {submitMessage && (
                                <div className="submit-message success">
                                    {submitMessage}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
