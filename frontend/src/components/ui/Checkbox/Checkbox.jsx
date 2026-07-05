import React from 'react';

const Checkbox = ({ checked = false, onChange, label, disabled = false, error }) => (
  <div className="flex flex-col gap-1">
    <label
      style={{
        display: 'inline-flex', alignItems: 'flex-start', gap: 10,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        userSelect: 'none',
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
        className="sr-only"
      />
      <span
        style={{
          width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 1,
          border: `2px solid ${error ? '#f87171' : checked ? '#003087' : '#d1d5db'}`,
          backgroundColor: checked ? '#003087' : 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 150ms, border-color 150ms',
          boxShadow: checked ? '0 0 0 3px rgba(0,48,135,0.12)' : 'none',
        }}
      >
        {checked && (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label && <span className="text-sm text-gray-700 font-medium leading-snug">{label}</span>}
    </label>
    {error && <span className="text-xs text-red-500 pl-[30px]">{error}</span>}
  </div>
);

export default Checkbox;
