import './CardGrid.css';

const services = [
  { icon: '🪪', title: 'Identity Services', desc: 'Aadhaar linking, PAN card, voter ID and digital identity management for all citizens.' },
  { icon: '🏥', title: 'Health & Welfare', desc: 'Ayushman Bharat, health records, vaccination certificates and medical scheme enrollment.' },
  { icon: '🎓', title: 'Education', desc: 'Scholarship applications, certificate verification, DigiLocker document storage.' },
  { icon: '🌾', title: 'Agriculture', desc: 'PM-KISAN benefits, crop insurance, mandi prices and irrigation scheme registration.' },
  { icon: '🏗️', title: 'Housing & Urban', desc: 'PMAY applications, building permits, property registration and urban development schemes.' },
  { icon: '⚡', title: 'Utilities', desc: 'Electricity, water, gas connections, bill payment and subsidy management.' },
];

const announcements = [
  { date: '20 Jun 2026', text: 'New PM Digital Literacy Mission launched across 100 districts.' },
  { date: '15 Jun 2026', text: 'Online scholarship portal now open for session 2026–27.' },
  { date: '10 Jun 2026', text: 'e-RUPI voucher scheme extended to all states.' },
];

const CardGrid = () => (
  <main className="cards-section" id="services">
    <div className="section-header">
      <h2>Our Services</h2>
      <p>Access a wide range of government services online, anytime and anywhere</p>
    </div>

    <div className="card-grid">
      {services.map((s) => (
        <div className="card" key={s.title}>
          <div className="card-icon">{s.icon}</div>
          <h3 className="card-title">{s.title}</h3>
          <p className="card-desc">{s.desc}</p>
          <button className="card-link">Know More &rarr;</button>
        </div>
      ))}
    </div>

    <div className="info-boxes">
      <div className="info-box announcements">
        <div className="info-box-header">
          <span className="info-box-dot saffron" />
          Latest Announcements
        </div>
        <ul>
          {announcements.map((a) => (
            <li key={a.date}>
              <span className="ann-date">{a.date}</span>
              <span className="ann-text">{a.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="info-box quick-links">
        <div className="info-box-header">
          <span className="info-box-dot green" />
          Quick Links
        </div>
        <ul>
          {['Aadhaar Self Service', 'Income Tax Portal', 'Passport Seva', 'EPFO Member Portal', 'DigiLocker'].map((l) => (
            <li key={l}>
              <span className="quick-arrow">&#9658;</span> {l}
            </li>
          ))}
        </ul>
      </div>

      <div className="info-box helpline">
        <div className="info-box-header">
          <span className="info-box-dot blue" />
          Helpline
        </div>
        <div className="helpline-content">
          <div className="helpline-number">1800-111-555</div>
          <div className="helpline-sub">Toll Free | 24×7</div>
          <hr className="helpline-divider" />
          <p className="helpline-info">For grievances, queries or assistance regarding any government service, call our national helpline.</p>
        </div>
      </div>
    </div>
  </main>
);

export default CardGrid;
