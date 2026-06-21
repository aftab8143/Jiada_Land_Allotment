import { useState } from 'react';
import './ContactSection.css';

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner">
        <div className="contact-info">
          <div className="section-tag">Contact Us</div>
          <h2>Get in Touch</h2>
          <p>Reach out to us for any queries, grievances, or feedback regarding government services. Our team is available 24×7 to assist you.</p>

          <div className="contact-cards">
            <div className="contact-card">
              <span className="ccard-icon">📞</span>
              <div>
                <strong>Helpline</strong>
                <p>1800-111-555 (Toll Free)</p>
                <p>Available 24×7</p>
              </div>
            </div>
            <div className="contact-card">
              <span className="ccard-icon">📧</span>
              <div>
                <strong>Email</strong>
                <p>support@demoportal.gov.in</p>
                <p>Response within 24 hrs</p>
              </div>
            </div>
            <div className="contact-card">
              <span className="ccard-icon">🏛️</span>
              <div>
                <strong>Office</strong>
                <p>Electronics Niketan, CGO Complex</p>
                <p>New Delhi – 110003</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-wrap">
          <div className="form-header">Send a Message</div>
          {submitted ? (
            <div className="contact-success">
              <span>✅</span>
              <p>Your message has been submitted. We will respond within 24 hours.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Full Name
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Ramesh Kumar" required />
              </label>
              <label>
                Email Address
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
              </label>
              <label>
                Subject
                <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Query regarding..." required />
              </label>
              <label>
                Message
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Describe your query or grievance..." rows={4} required />
              </label>
              <button type="submit" className="btn-contact">Submit Message</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
