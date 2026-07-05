import React from 'react';

const RadioGroup = ({
  options = [],
  value,
  onChange,
  name,
  label,
  disabled = false,
  error,
  direction = 'vertical',
}) => (
  <div className="flex flex-col gap-1.5">
    {label && <span className="text-sm font-semibold text-gray-700">{label}</span>}
    <div className={direction === 'horizontal' ? 'flex flex-wrap gap-5' : 'flex flex-col gap-2.5'}>
      {options.map((opt) => {
        const isChecked = value === opt.value;
        const isDisabled = disabled || opt.disabled;
        return (
          <label
            key={opt.value}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              opacity: isDisabled ? 0.5 : 1,
              userSelect: 'none',
            }}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={isChecked}
              onChange={() => onChange?.(opt.value)}
              disabled={isDisabled}
              className="sr-only"
            />
            <span
              style={{
                width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                border: `2px solid ${isChecked ? '#003087' : '#d1d5db'}`,
                backgroundColor: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 150ms, box-shadow 150ms',
                boxShadow: isChecked ? '0 0 0 3px rgba(0,48,135,0.12)' : 'none',
              }}
            >
              {isChecked && (
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#003087' }} />
              )}
            </span>
            <span className="text-sm text-gray-700 font-medium">{opt.label}</span>
          </label>
        );
      })}
    </div>
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

export default RadioGroup;
