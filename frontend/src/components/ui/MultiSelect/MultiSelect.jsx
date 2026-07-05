import React, { useEffect, useRef, useState } from 'react';

const MultiSelect = ({
  label,
  id,
  error,
  placeholder = 'Select options…',
  options = [],
  value = [],
  onChange,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const toggle = (optValue) => {
    const next = value.includes(optValue)
      ? value.filter((v) => v !== optValue)
      : [...value, optValue];
    onChange?.(next);
  };

  const remove = (optValue, e) => {
    e.stopPropagation();
    toggle(optValue);
  };

  const selectedOptions = options.filter((o) => value.includes(o.value));

  return (
    <div className="flex flex-col gap-1" ref={containerRef}>
      {label && (
        <label className="text-sm font-semibold text-gray-700" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative">
        {/* trigger */}
        <div
          className={[
            'relative w-full min-h-[44px] px-3 py-2 pr-10 border-[1.5px] rounded-md flex flex-wrap gap-1.5 items-center',
            'transition-[border-color,box-shadow] duration-150',
            open ? 'border-primary shadow-[0_0_0_3px_rgba(0,48,135,0.1)]' : error ? 'border-red-400' : 'border-border-strong',
            disabled ? 'bg-gray-50 cursor-not-allowed opacity-50' : 'bg-white cursor-pointer',
          ].join(' ')}
          onClick={() => !disabled && setOpen((o) => !o)}
        >
          {selectedOptions.length === 0 && (
            <span className="text-[0.95rem] text-gray-400">{placeholder}</span>
          )}
          {selectedOptions.map((opt) => (
            <span
              key={opt.value}
              className="inline-flex items-center gap-1 bg-primary text-white text-xs font-semibold rounded-full px-2.5 py-0.5"
            >
              {opt.label}
              <button
                type="button"
                onClick={(e) => remove(opt.value, e)}
                aria-label={`Remove ${opt.label}`}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'white' }}
              >
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                  <path d="M1 1l7 7M8 1L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </span>
          ))}
          {/* chevron */}
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            aria-hidden="true"
          >
            <path
              d={open ? 'M4 10l4-4 4 4' : 'M4 6l4 4 4-4'}
              stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* dropdown */}
        {open && (
          <div className="absolute z-50 w-full top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-52 overflow-y-auto">
            {options.map((opt) => {
              const isChecked = value.includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggle(opt.value)}
                    className="sr-only"
                  />
                  <span
                    style={{
                      width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                      border: `2px solid ${isChecked ? '#003087' : '#d1d5db'}`,
                      backgroundColor: isChecked ? '#003087' : 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 150ms, border-color 150ms',
                    }}
                  >
                    {isChecked && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="text-sm text-gray-800">{opt.label}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default MultiSelect;
