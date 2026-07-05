import React from 'react';

const VARIANT = {
  underline: {
    wrap:   'border-b border-border gap-0',
    tab:    'px-4 py-2.5 text-sm font-semibold border-b-2 border-transparent -mb-px text-gray-500 hover:text-navy hover:border-gray-300 transition-colors duration-150',
    active: 'text-primary border-b-2 border-primary -mb-px',
  },
  pill: {
    wrap:   'bg-gray-100 rounded-lg p-1 gap-1 w-fit',
    tab:    'px-4 py-1.5 text-sm font-semibold rounded-md text-gray-500 hover:text-navy transition-colors duration-150',
    active: 'bg-white text-navy shadow-sm',
  },
  boxed: {
    wrap:   'border border-border rounded-lg overflow-hidden gap-0',
    tab:    'px-4 py-2.5 text-sm font-semibold text-gray-500 border-r border-border last:border-r-0 hover:bg-gray-50 hover:text-navy transition-colors duration-150',
    active: 'bg-primary text-white border-r border-primary last:border-r-primary',
  },
};

const Tabs = ({
  tabs = [],
  active,
  onChange,
  variant = 'underline',
  fullWidth = false,
}) => {
  const c = VARIANT[variant] ?? VARIANT.underline;

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={`flex ${c.wrap} ${fullWidth ? 'w-full' : ''}`}
    >
      {tabs.map((tab) => {
        const isActive   = active === tab.key;
        const isDisabled = tab.disabled;

        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={isActive}
            aria-disabled={isDisabled}
            onClick={() => !isDisabled && onChange?.(tab.key)}
            className={[
              c.tab,
              isActive ? c.active : '',
              isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
              fullWidth ? 'flex-1 text-center' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{ background: isActive && variant !== 'pill' && variant !== 'boxed' ? 'none' : undefined, border: 'none', fontFamily: 'inherit' }}
          >
            <span className="flex items-center justify-center gap-1.5">
              {tab.icon && <span className="text-base leading-none">{tab.icon}</span>}
              {tab.label}
              {tab.badge != null && (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
                    isActive ? 'bg-white/25 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
