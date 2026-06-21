import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar-wrapper">
      <div className="tricolor-stripe" />
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="emblem">
            <div className="emblem-circle">
              <span>&#9784;</span>
            </div>
          </div>
          <div className="brand-text">
            <span className="brand-title">DemoPortal</span>
            <span className="brand-subtitle">Government of India</span>
          </div>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="/#home" onClick={() => setMenuOpen(false)}>Home</a></li>
          <li><a href="/#services" onClick={() => setMenuOpen(false)}>Services</a></li>
          <li><a href="/#about" onClick={() => setMenuOpen(false)}>About</a></li>
          <li><a href="/#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
          {user ? (
            <>
              <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
              <li>
                <button className="btn-nav btn-logout" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="btn-nav btn-login" onClick={() => setMenuOpen(false)}>Login</Link></li>
              <li><Link to="/signup" className="btn-nav btn-signup" onClick={() => setMenuOpen(false)}>Sign Up</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
