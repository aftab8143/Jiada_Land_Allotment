import React from 'react';

const Select = ({ label, id, error, placeholder, options = [], disabled = false, ...props }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-sm font-semibold text-gray-700" htmlFor={id}>
        {label}
      </label>
    )}
    <div className="relative">
      <select
        id={id}
        disabled={disabled}
        className={[
          'w-full appearance-none px-[0.9rem] py-[0.65rem] pr-10 border-[1.5px] rounded-md text-[0.95rem] outline-none',
          'transition-[border-color,box-shadow] duration-150',
          'focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,48,135,0.1)]',
          error ? 'border-red-400' : 'border-border-strong',
          disabled
            ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-900 cursor-pointer',
        ].join(' ')}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
        width="16" height="16" viewBox="0 0 16 16" fill="none"
        aria-hidden="true"
      >
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

export default Select;
