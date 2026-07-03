import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import jharLogo from '../../../assets/images/jharlogo.png';
import * as AuthApi from '../../../api/auth';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      const { data } = await AuthApi.logout();

      alert(data.message);

    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      logout();
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className="sticky top-0 z-[1000] shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
      <div className="tricolor-stripe" />
      <div className="flex items-center justify-between bg-primary px-8 py-[0.6rem]">
        <Link to="/dashboard" className="flex items-center gap-3 no-underline">
          <img src={jharLogo} alt="JIADA Logo" className="w-11 h-11 rounded-full object-cover bg-white" />
          <div className="flex flex-col">
            <span className="text-[1.05rem] font-bold text-white">JIADA Portal</span>
            <span className="text-[0.65rem] text-[#b8cce4] tracking-[1px] uppercase">
              Jharkhand Industrial Area Development Authority
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <button
            className="bg-transparent border-none text-white text-[1.25rem] cursor-pointer p-1"
            title="Notifications"
          >
            🔔
          </button>
          <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded px-3 py-[0.35rem] text-white text-sm font-semibold">
            <span>👤</span>
            <span>{user?.name ?? 'User'}</span>
          </div>
          <button
            className="flex items-center gap-2 bg-white/10 border border-white/20 rounded px-3 py-[0.35rem] cursor-pointer text-white text-sm font-semibold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
