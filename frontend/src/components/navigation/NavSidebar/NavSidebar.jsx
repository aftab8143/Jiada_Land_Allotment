import React, { useState } from 'react';

const VARIANT = {
  dark: {
    wrap:    'bg-primary-dark',
    section: 'text-[#4a6894]',
    item:    'text-[#8aaec9] border-l-transparent hover:bg-white/[0.06] hover:text-white',
    active:  'bg-accent/10 text-accent border-l-accent',
    sub:     'text-[#6a8caa] hover:text-white hover:bg-white/[0.05]',
    subActive: 'text-accent',
    divider: 'border-white/10',
  },
  light: {
    wrap:    'bg-white border-r border-border',
    section: 'text-gray-400',
    item:    'text-gray-500 border-l-transparent hover:bg-gray-50 hover:text-navy',
    active:  'bg-primary/8 text-primary border-l-primary',
    sub:     'text-gray-400 hover:text-navy hover:bg-gray-50',
    subActive: 'text-primary font-semibold',
    divider: 'border-gray-100',
  },
};

const ChevronDown = ({ open }) => (
  <svg
    width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
    style={{ transition: 'transform 200ms', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}
  >
    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NavSidebar = ({
  items = [],
  active,
  onSelect,
  variant = 'dark',
  collapsed = false,
  width = 224,
}) => {
  const [openGroups, setOpenGroups] = useState({});
  const c = VARIANT[variant] ?? VARIANT.dark;

  const toggleGroup = (key) =>
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <aside
      className={`${c.wrap} flex flex-col py-4 shrink-0 overflow-hidden`}
      style={{ width: collapsed ? 56 : width, transition: 'width 220ms ease' }}
      aria-label="Sidebar navigation"
    >
      {items.map((item) => {
        const isActive  = active === item.key;
        const hasChildren = item.children?.length > 0;
        const isOpen    = openGroups[item.key];

        return (
          <div key={item.key}>
            {/* section label */}
            {item.type === 'section' && !collapsed && (
              <div className={`px-4 pt-4 pb-1 text-[0.6rem] font-bold uppercase tracking-[1.5px] ${c.section}`}>
                {item.label}
              </div>
            )}

            {/* divider */}
            {item.type === 'divider' && (
              <div className={`my-2 mx-3 border-t ${c.divider}`} />
            )}

            {/* nav item */}
            {item.type !== 'section' && item.type !== 'divider' && (
              <button
                onClick={() => hasChildren ? toggleGroup(item.key) : onSelect?.(item.key)}
                title={collapsed ? item.label : undefined}
                className={[
                  'w-full flex items-center gap-3 border-l-[3px] text-sm font-semibold',
                  'transition-[background,color] duration-150',
                  collapsed ? 'px-0 py-[0.65rem] justify-center' : 'px-4 py-[0.6rem]',
                  isActive && !hasChildren ? c.active : c.item,
                ].join(' ')}
                style={{ background: 'none', border: 'none', borderLeft: undefined, fontFamily: 'inherit', cursor: 'pointer' }}
              >
                {/* re-apply border-l via inline because Tailwind border-l-[3px] conflicts with border:none reset */}
                <span
                  className="absolute left-0 top-0 h-full w-[3px]"
                  style={{ display: 'none' }}
                />
                {item.icon && (
                  <span className="text-[1.05rem] w-5 text-center leading-none flex-shrink-0">
                    {item.icon}
                  </span>
                )}
                {!collapsed && <span className="flex-1 text-left truncate">{item.label}</span>}
                {!collapsed && item.badge != null && (
                  <span className="bg-coral text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    {item.badge}
                  </span>
                )}
                {!collapsed && hasChildren && <ChevronDown open={isOpen} />}
              </button>
            )}

            {/* sub-items */}
            {hasChildren && isOpen && !collapsed && (
              <div className={`ml-3 pl-3 border-l ${c.divider} flex flex-col`}>
                {item.children.map((child) => (
                  <button
                    key={child.key}
                    onClick={() => onSelect?.(child.key)}
                    className={[
                      'w-full text-left px-3 py-[0.42rem] text-[0.82rem] transition-colors duration-150',
                      active === child.key ? c.subActive : c.sub,
                    ].join(' ')}
                    style={{ background: 'none', border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}
                  >
                    {child.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
};

export default NavSidebar;
