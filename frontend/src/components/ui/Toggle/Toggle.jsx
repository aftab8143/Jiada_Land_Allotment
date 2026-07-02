import React from 'react';

/* Track [width, height], thumb diameter, thumb translateX when ON */
const SIZES = {
  sm: { w: 52,  h: 28, thumb: 20, on: 24 },
  md: { w: 64,  h: 34, thumb: 26, on: 30 },
  lg: { w: 80,  h: 42, thumb: 34, on: 38 },
};

/* Matches button variant colors exactly */
const ON_COLORS = {
  primary: { bg: '#003087', border: '#222533', glow: 'rgba(0,48,135,0.40)' },
  accent:  { bg: '#FF9933', border: '#222533', glow: 'rgba(255,153,51,0.40)' },
  teal:    { bg: '#45B7B2', border: '#222533', glow: 'rgba(69,183,178,0.40)' },
  danger:  { bg: '#EE7C71', border: '#222533', glow: 'rgba(238,124,113,0.40)' },
};

const OFF = { bg: '#e5e7eb', border: '#d1d5db', glow: null };

const Toggle = ({
  checked = false,
  onChange,
  color = 'primary',
  size = 'md',
  label,
  labelPosition = 'right',
  disabled = false,
}) => {
  const { w, h, thumb, on } = SIZES[size];
  const c = checked ? ON_COLORS[color] : OFF;

  const visual = (
    <span
      aria-hidden="true"
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        flexShrink: 0,
        width: w,
        height: h,
        borderRadius: 9999,
        backgroundColor: c.bg,
        border: `2px solid ${c.border}`,
        boxShadow: checked && c.glow ? `0 6px 18px ${c.glow}` : 'none',
        transition: 'background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
      }}
    >
      {/* sliding thumb */}
      <span
        style={{
          display: 'inline-block',
          width: thumb,
          height: thumb,
          borderRadius: '50%',
          backgroundColor: 'white',
          boxShadow: '0 1px 5px rgba(0,0,0,0.28)',
          transform: checked ? `translateX(${on}px)` : 'translateX(3px)',
          transition: 'transform 180ms ease',
          flexShrink: 0,
          pointerEvents: 'none',
        }}
      />
    </span>
  );

  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
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
      {labelPosition === 'left' && label && (
        <span className="text-sm font-semibold text-navy">{label}</span>
      )}
      {visual}
      {labelPosition === 'right' && label && (
        <span className="text-sm font-semibold text-navy">{label}</span>
      )}
    </label>
  );
};

export default Toggle;
