import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HeroSection.css';

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-badge">Digital India Initiative</div>
        <h1 className="hero-title">
          Empowering Citizens Through <span className="hero-accent">Digital Governance</span>
        </h1>
        <p className="hero-subtitle">
          Access government services, schemes, and information from anywhere. Fast, transparent, and secure digital services for every citizen of India.
        </p>
        <div className="hero-actions">
          {user ? (
            <Link to="/dashboard" className="btn-hero-primary">Go to Dashboard</Link>
          ) : (
            <>
              <Link to="/signup" className="btn-hero-primary">Get Started</Link>
              <Link to="/login" className="btn-hero-secondary">Sign In</Link>
            </>
          )}
        </div>
        <div className="hero-stats">
          <div className="stat">
            <strong>1.4B+</strong>
            <span>Citizens</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <strong>500+</strong>
            <span>Services</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <strong>28</strong>
            <span>States</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
