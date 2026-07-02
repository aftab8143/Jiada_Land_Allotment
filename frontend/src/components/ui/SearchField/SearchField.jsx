import React, { useRef } from 'react';

const SearchField = ({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search…',
  disabled = false,
  label,
  id,
  className = '',
}) => {
  const inputRef = useRef(null);

  const handleClear = () => {
    onChange?.({ target: { value: '' } });
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-gray-700" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {/* search icon */}
        <svg
          className="absolute left-3 text-gray-400 pointer-events-none flex-shrink-0"
          width="16" height="16" viewBox="0 0 20 20" fill="none"
          aria-hidden="true"
        >
          <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.75" />
          <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>

        <input
          ref={inputRef}
          id={id}
          type="search"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={[
            'w-full pl-9 pr-9 py-[0.65rem] border-[1.5px] rounded-md text-[0.95rem] outline-none text-gray-900',
            'transition-[border-color,box-shadow] duration-150',
            'focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,48,135,0.1)]',
            disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-border-strong' : 'border-border-strong bg-white',
            '[&::-webkit-search-cancel-button]:hidden',
          ].join(' ')}
        />

        {/* clear button — only shown when there is a value */}
        {value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-3 flex items-center justify-center w-4 h-4 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchField;
