import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../api/axios';
import jharLogo from '../../../assets/images/jharlogo.png';

const inputClass =
  'w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-white transition-all';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }
    setLoading(true);
    try {
      console.log("hello")
      console.log("form",form)
      await api.post('/auth/signup', form);
      setSuccess('Account created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — hidden on mobile */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-primary to-primary-dark w-[45%] p-12 text-white">
        <img src={jharLogo} alt="JIADA Logo" className="w-28 h-28 rounded-full object-cover mb-6 bg-white/10" />
        <h2 className="text-3xl font-bold mb-3 text-center">Join JIADA Portal</h2>
        <p className="text-blue-200 text-center max-w-xs text-sm leading-relaxed">
          Create your account to access industrial land allotment services in Jharkhand
        </p>

        {/* Benefits list */}
        <div className="mt-8 flex flex-col gap-3 w-full max-w-xs">
          {[
            '📝 Apply for industrial plots online',
            '📊 Track application status in real time',
            '💰 Pay fees through secure gateway',
            '📄 Manage all documents digitally',
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 text-sm">
              {item}
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
            <h1 className="text-2xl font-bold text-primary mb-1">Create Account</h1>
            <p className="text-sm text-gray-500 mb-6">JIADA Portal — Government of Jharkhand</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  {error}
                </div>
              )}
              {success && (
                <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                  {success}
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ramesh Kumar"
                  required
                  autoComplete="name"
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
                  autoComplete="email"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  required
                  autoComplete="new-password"
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white rounded-full py-3 font-bold text-sm hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <p className="text-sm text-gray-500 text-center mt-5">
              Already have an account?{' '}
              <Link to="/login" className="text-accent font-semibold hover:underline">
                Sign in here
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

export default RegisterPage;
