import React, { useState } from 'react';

const VARIANT = {
  dark: {
    wrap:   'bg-primary shadow-md',
    link:   'text-[#8aaec9] hover:text-white hover:bg-white/10',
    active: 'text-white bg-white/[0.12] font-bold',
    divider: 'bg-white/20',
  },
  light: {
    wrap:   'bg-primary-50 border-b border-primary/10',
    link:   'text-gray-500 hover:text-primary hover:bg-primary/5',
    active: 'text-primary bg-primary/10 font-bold',
    divider: 'bg-gray-200',
  },
  white: {
    wrap:   'bg-white border-b border-border shadow-sm',
    link:   'text-gray-500 hover:text-navy hover:bg-gray-100',
    active: 'text-navy bg-gray-100 font-bold',
    divider: 'bg-gray-200',
  },
};

const HamburgerIcon = ({ open }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    {open
      ? <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      : <>
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </>
    }
  </svg>
);

const Navbar = ({
  logo,
  items = [],
  actions,
  active,
  onSelect,
  variant = 'dark',
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const c = VARIANT[variant] ?? VARIANT.dark;

  return (
    <nav className={`${c.wrap} relative`} role="navigation">
      {/* main bar */}
      <div className="flex items-center justify-between px-5 py-3 gap-4">
        {/* logo slot */}
        {logo && <div className="flex items-center shrink-0">{logo}</div>}

        {/* desktop links */}
        <div className="hidden sm:flex items-center gap-1 flex-1">
          {items.map((item) => (
            <button
              key={item.key}
              onClick={() => onSelect?.(item.key)}
              disabled={item.disabled}
              className={[
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors duration-150 select-none',
                active === item.key ? c.active : c.link,
                item.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
              ].join(' ')}
              style={{ background: 'none', border: 'none', fontFamily: 'inherit' }}
            >
              {item.icon && <span className="text-base leading-none">{item.icon}</span>}
              {item.label}
              {item.badge != null && (
                <span className="ml-0.5 bg-coral text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* actions slot */}
          {actions && <div className="hidden sm:flex items-center gap-3">{actions}</div>}
          {/* hamburger — mobile */}
          <button
            className={`sm:hidden p-1.5 rounded-md ${c.link} transition-colors`}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      {mobileOpen && (
        <div className={`sm:hidden ${c.wrap} border-t ${c.divider} px-3 pb-3 flex flex-col gap-1`}>
          {items.map((item) => (
            <button
              key={item.key}
              onClick={() => { onSelect?.(item.key); setMobileOpen(false); }}
              className={[
                'w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors duration-150',
                active === item.key ? c.active : c.link,
              ].join(' ')}
              style={{ background: 'none', border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
              {item.badge != null && (
                <span className="ml-auto bg-coral text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
          {actions && <div className="pt-2 border-t border-current/10">{actions}</div>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
