import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import jharLogo from '../../../../assets/images/jharlogo.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="tricolor-stripe" />
      <nav className="flex items-center justify-between px-8 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={jharLogo} alt="JIADA Logo" className="w-10 h-10 rounded-full object-cover shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-primary text-base leading-tight">JIADA</span>
            <span className="text-[10px] text-gray-500 leading-tight hidden sm:block">
              Jharkhand Industrial Area Development Authority
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <li><a href="/#home" className="hover:text-primary transition-colors">Home</a></li>
          <li><a href="/#services" className="hover:text-primary transition-colors">Services</a></li>
          <li><a href="/#about" className="hover:text-primary transition-colors">About</a></li>
          <li><a href="/#contact" className="hover:text-primary transition-colors">Contact</a></li>
          {user && (
            <li>
              <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            </li>
          )}
        </ul>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full text-sm font-bold border border-primary text-primary hover:bg-primary hover:text-white transition-all"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-full text-sm font-bold border border-primary text-primary hover:bg-primary/5 transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 rounded-full text-sm font-bold bg-accent text-white hover:bg-accent-dark transition-all shadow-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className="block w-6 h-0.5 bg-gray-700" />
          <span className="block w-6 h-0.5 bg-gray-700" />
          <span className="block w-6 h-0.5 bg-gray-700" />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border px-8 py-4 flex flex-col gap-3 text-sm font-medium text-gray-700">
          <a href="/#home" onClick={() => setMenuOpen(false)} className="hover:text-primary">Home</a>
          <a href="/#services" onClick={() => setMenuOpen(false)} className="hover:text-primary">Services</a>
          <a href="/#about" onClick={() => setMenuOpen(false)} className="hover:text-primary">About</a>
          <a href="/#contact" onClick={() => setMenuOpen(false)} className="hover:text-primary">Contact</a>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-primary">Dashboard</Link>
              <button onClick={handleLogout} className="text-left hover:text-primary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-primary">Login</Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="px-5 py-2 rounded-full text-center font-bold bg-accent text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
