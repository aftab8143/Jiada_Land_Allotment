import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import * as authApi from "../../../api/auth";
import PageWrapper from '../../../components/layout/PageWrapper';

const stats = [
  { icon: '📝', label: 'Applications', value: '0', bg: 'bg-blue-50', iconBg: 'bg-blue-100' },
  { icon: '⏳', label: 'Pending', value: '0', bg: 'bg-amber-50', iconBg: 'bg-amber-100' },
  { icon: '✅', label: 'Approved', value: '0', bg: 'bg-green-50', iconBg: 'bg-green-100' },
  { icon: '💳', label: 'Payments', value: '0', bg: 'bg-purple-50', iconBg: 'bg-purple-100' },
];

const quickActions = [
  { icon: '🏭', label: 'Browse Land Bank' },
  { icon: '📝', label: 'New Application' },
  { icon: '📊', label: 'Check Status' },
  { icon: '💰', label: 'View Payments' },
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const { data } = await authApi.getMe();
        setProfile(data.user);
      } catch (error) {
        console.error(error);

        logout();
        navigate("/login", { replace: true });
      }
    };

    // fetchProfile();
  }, [user, logout, navigate]);

  if (!user) {
    return null;
  }

  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Welcome bar */}
        <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-6 text-white flex items-center justify-between">
          <div>
            <div className="text-xl font-bold">Welcome back, {user.name}</div>
            <div className="text-blue-200 text-sm mt-1">Track your land allotment journey</div>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold">
            📅 {today}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className={`${s.bg} rounded-xl p-5 border border-border shadow-sm`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-3 ${s.iconBg}`}>
                {s.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Two-column row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile Information */}
          <div className="bg-white rounded-xl border border-border shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900">Profile Information</h3>
            </div>
            {profile ? (
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ['Name', profile.name],
                    ['Email', profile.email],
                    ['Member Since', new Date(profile.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })],
                    ['Account ID', `#${String(profile.id).padStart(6, '0')}`],
                  ].map(([key, val]) => (
                    <tr key={key} className="border-b border-border last:border-0">
                      <td className="py-2.5 text-gray-500 font-medium w-32">{key}</td>
                      <td className="py-2.5 text-gray-900">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-sm text-gray-400">Loading profile...</p>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-border shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900">Recent Activity</h3>
              <button className="text-xs text-accent hover:underline">View All</button>
            </div>
            <ul className="flex flex-col gap-3">
              {[
                { dot: 'bg-gov-green', text: 'Logged in successfully' },
                { dot: 'bg-primary', text: 'Profile verified' },
                { dot: 'bg-accent', text: 'Account created' },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${item.dot}`} />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-border shadow-sm p-5">
          <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((a) => (
              <button
                key={a.label}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary-50 transition-all cursor-pointer"
              >
                <span className="text-2xl">{a.icon}</span>
                <span className="text-xs font-medium text-gray-700 text-center">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AdminDashboard;
