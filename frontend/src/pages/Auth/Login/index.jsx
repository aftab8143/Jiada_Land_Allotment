import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../api/axios';
import jharLogo from '../../../assets/images/jharlogo.png';

const inputClass =
  'w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-white transition-all';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — hidden on mobile */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-primary to-primary-dark w-[45%] p-12 text-white">
        <img src={jharLogo} alt="JIADA Logo" className="w-28 h-28 rounded-full object-cover mb-6 bg-white/10" />
        <h2 className="text-3xl font-bold mb-3 text-center">JIADA Portal</h2>
        <p className="text-blue-200 text-center max-w-xs text-sm leading-relaxed">
          Jharkhand Industrial Area Development Authority — Digital Land Allotment Platform
        </p>

        {/* Stats grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-xs">
          {[
            { value: '500+', label: 'Plots Available' },
            { value: '75 Days', label: 'Guaranteed SLA' },
            { value: '100%', label: 'Digital Process' },
            { value: '8', label: 'User Roles' },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-accent">{s.value}</div>
              <div className="text-xs text-blue-200 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-bg">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
          {/* Top accent stripe */}
          <div className="tricolor-stripe" />

          <div className="p-8">
            <h1 className="text-2xl font-bold text-primary mb-1">Sign In</h1>
            <p className="text-sm text-gray-500 mb-6">JIADA Portal — Government of Jharkhand</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-700">Password</label>
                  <a href="#" className="text-xs text-accent hover:underline">Forgot password?</a>
                </div>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white rounded-full py-3 font-bold text-sm hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-sm text-gray-500 text-center mt-5">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-accent font-semibold hover:underline">
                Register here
              </Link>
            </p>
            <div className="text-center mt-3">
              <Link to="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                &#8592; Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
