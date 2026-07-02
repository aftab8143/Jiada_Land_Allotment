import { useState } from 'react';

const contactItems = [
  { icon: '📞', label: 'Helpline', lines: ['1800-345-6789 (Toll Free)', 'Mon–Sat, 9AM–6PM'] },
  { icon: '📧', label: 'Email', lines: ['support@jiada.jharkhand.gov.in', 'Response within 48 hrs'] },
  { icon: '🏛️', label: 'Head Office', lines: ['JIADA Bhawan, Ranchi', 'Jharkhand – 834001'] },
];

const inputClass =
  'w-full px-4 py-2.5 border border-border-strong rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-white transition-all';

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
    <section className="py-20 bg-bg" id="contact">
      <div className="max-w-4xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Contact Us</div>
          <h2 className="text-3xl font-bold text-primary mb-2">Get in Touch</h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Reach out to us for any queries, grievances, or feedback regarding industrial land allotment services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: Contact info */}
          <div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Our team is available Monday–Saturday for all inquiries. You can reach us via phone, email, or visit our head office in Ranchi.
            </p>
            <div className="flex flex-col gap-5">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-bold text-sm text-gray-800 mb-0.5">{item.label}</div>
                    {item.lines.map((line) => (
                      <div key={line} className="text-sm text-gray-600">{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
            <div className="font-bold text-gray-900 mb-5">Send a Message</div>
            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <span className="text-4xl">✅</span>
                <p className="text-sm text-gray-600">
                  Your message has been submitted. We will respond within 48 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-accent hover:underline mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Rajesh Kumar"
                    required
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Query regarding plot allotment..."
                    required
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-700">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your query or grievance..."
                    rows={4}
                    required
                    className={`${inputClass} min-h-[120px] resize-y`}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white rounded-full py-3 font-bold text-sm hover:bg-primary-dark transition-colors mt-1"
                >
                  Submit Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
