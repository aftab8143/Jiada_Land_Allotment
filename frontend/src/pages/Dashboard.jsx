import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Dashboard.css';

const widgets = [
  { icon: '🪪', label: 'Identity Documents', value: '3 Linked', color: '#003087' },
  { icon: '🏥', label: 'Health Schemes', value: '2 Active', color: '#138808' },
  { icon: '🎓', label: 'Scholarships', value: '1 Pending', color: '#FF9933' },
  { icon: '📋', label: 'Applications', value: '5 Total', color: '#0047AB' },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    api.get('/user/me')
      .then(({ data }) => setProfile(data.user))
      .catch(() => {
        logout();
        navigate('/login');
      });
  }, [user, navigate, logout]);

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-hero">
          <div className="dashboard-welcome">
            <div className="welcome-avatar">{user.name?.[0]?.toUpperCase()}</div>
            <div>
              <h1>Welcome, {user.name}</h1>
              <p>{user.email} &nbsp;|&nbsp; Citizen Dashboard</p>
            </div>
          </div>
        </div>

        <div className="dashboard-body">
          <div className="widget-grid">
            {widgets.map((w) => (
              <div className="widget" key={w.label} style={{ borderTopColor: w.color }}>
                <div className="widget-icon">{w.icon}</div>
                <div className="widget-info">
                  <div className="widget-value" style={{ color: w.color }}>{w.value}</div>
                  <div className="widget-label">{w.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-grid">
            <div className="dash-card">
              <div className="dash-card-header">Profile Information</div>
              <div className="dash-card-body">
                {profile ? (
                  <table className="profile-table">
                    <tbody>
                      <tr><td>Name</td><td>{profile.name}</td></tr>
                      <tr><td>Email</td><td>{profile.email}</td></tr>
                      <tr><td>Member Since</td><td>{new Date(profile.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</td></tr>
                      <tr><td>Account ID</td><td>#{String(profile.id).padStart(6, '0')}</td></tr>
                    </tbody>
                  </table>
                ) : (
                  <p className="loading-text">Loading profile...</p>
                )}
              </div>
            </div>

            <div className="dash-card">
              <div className="dash-card-header">Recent Activity</div>
              <div className="dash-card-body">
                <ul className="activity-list">
                  <li><span className="act-dot green" />Logged in successfully</li>
                  <li><span className="act-dot blue" />Profile verified</li>
                  <li><span className="act-dot saffron" />Account created</li>
                </ul>
              </div>
            </div>

            <div className="dash-card">
              <div className="dash-card-header">Quick Actions</div>
              <div className="dash-card-body">
                <div className="quick-actions">
                  {['Update Profile', 'Apply for Scheme', 'Download Documents', 'Raise Grievance'].map((a) => (
                    <button key={a} className="quick-action-btn">{a}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
