import { NavLink } from 'react-router-dom';

const applicantNav = [
  { icon: '🏠', label: 'Dashboard', to: '/dashboard' },
  { icon: '🗺️', label: 'Land Bank', to: '/land-bank' },
  { icon: '📝', label: 'My Applications', to: '/applications' },
  { icon: '💳', label: 'Payments', to: '/payments' },
  { icon: '📄', label: 'Documents', to: '/documents' },
  { icon: '🔔', label: 'Notifications', to: '/notifications' },
];

const Sidebar = () => (
  <aside className="w-60 min-h-[calc(100vh-60px)] bg-[#002060] flex flex-col py-6 shrink-0">
    <nav className="mb-6">
      <div className="text-[0.65rem] font-bold uppercase tracking-[1.5px] text-[#4a6894] px-5 mb-2">
        Main Menu
      </div>
      {applicantNav.map(({ icon, label, to }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-5 py-[0.6rem] text-sm no-underline transition-[background,color] duration-200 border-l-[3px] ${
              isActive
                ? 'bg-[rgba(255,153,51,0.12)] text-accent border-l-accent'
                : 'text-[#8aaec9] border-l-transparent hover:bg-white/[0.06] hover:text-white'
            }`
          }
        >
          <span className="text-base w-5 text-center">{icon}</span>
          {label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
