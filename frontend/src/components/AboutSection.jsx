import './AboutSection.css';

const pillars = [
  { icon: '🔒', title: 'Secure', desc: 'End-to-end encrypted data with highest security standards.' },
  { icon: '⚡', title: 'Fast', desc: 'Instant access to services with 99.9% uptime guarantee.' },
  { icon: '🌐', title: 'Accessible', desc: 'Available in 22 official languages across all devices.' },
  { icon: '📊', title: 'Transparent', desc: 'Real-time tracking of all applications and requests.' },
];

const AboutSection = () => (
  <section className="about-section" id="about">
    <div className="about-inner">
      <div className="about-text">
        <div className="section-tag">About Us</div>
        <h2>Building a Digital India for Every Citizen</h2>
        <p>
          DemoPortal is a unified digital gateway launched by the Government of India to deliver essential services to citizens seamlessly. Our mission is to eliminate paperwork, reduce wait times, and bring governance to the fingertips of every Indian — from metro cities to the remotest villages.
        </p>
        <p>
          Backed by the Ministry of Electronics & Information Technology, we connect citizens to over 500 government schemes, certificates, and welfare programmes through a single, secure platform.
        </p>
        <div className="about-stats">
          <div className="astat"><strong>500+</strong><span>Services Online</span></div>
          <div className="astat"><strong>28</strong><span>States Covered</span></div>
          <div className="astat"><strong>10Cr+</strong><span>Citizens Served</span></div>
        </div>
      </div>
      <div className="about-pillars">
        {pillars.map((p) => (
          <div className="pillar" key={p.title}>
            <div className="pillar-icon">{p.icon}</div>
            <div>
              <strong>{p.title}</strong>
              <p>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
