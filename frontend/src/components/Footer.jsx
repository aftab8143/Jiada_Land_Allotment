import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-top">
      <div className="footer-brand">
        <strong>DemoPortal</strong>
        <p>Government of India's digital services gateway. Committed to transparent, accessible, and efficient governance for every citizen.</p>
      </div>
      <div className="footer-links">
        <h4>Services</h4>
        <ul>
          <li>Identity</li>
          <li>Health</li>
          <li>Education</li>
          <li>Agriculture</li>
        </ul>
      </div>
      <div className="footer-links">
        <h4>Help</h4>
        <ul>
          <li>FAQs</li>
          <li>Contact Us</li>
          <li>Grievance Portal</li>
          <li>RTI</li>
        </ul>
      </div>
      <div className="footer-links">
        <h4>Policies</h4>
        <ul>
          <li>Privacy Policy</li>
          <li>Terms of Use</li>
          <li>Accessibility</li>
          <li>Sitemap</li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="tricolor-footer" />
      <p>&copy; 2026 DemoPortal, Government of India. All Rights Reserved.</p>
      <p className="footer-disclaimer">Content on this website is published and managed by the Ministry of Electronics & IT.</p>
    </div>
  </footer>
);

export default Footer;
