import React from 'react';

const DatePicker = ({ label, id, error, disabled = false, ...props }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-sm font-semibold text-gray-700" htmlFor={id}>
        {label}
      </label>
    )}
    <div className="relative">
      <input
        id={id}
        type="date"
        disabled={disabled}
        className={[
          'w-full px-[0.9rem] py-[0.65rem] border-[1.5px] rounded-md text-[0.95rem] outline-none',
          'transition-[border-color,box-shadow] duration-150',
          'focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,48,135,0.1)]',
          error ? 'border-red-400' : 'border-border-strong',
          disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-900',
        ].join(' ')}
        {...props}
      />
    </div>
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

export default DatePicker;
