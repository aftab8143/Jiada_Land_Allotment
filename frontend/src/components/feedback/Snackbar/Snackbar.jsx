import React, { useEffect } from 'react';

const Snackbar = ({
  isOpen,
  message,
  action,
  onAction,
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed', bottom: 28, left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9998,
        display: 'flex', alignItems: 'center', gap: 14,
        background: '#222533', color: 'white',
        borderRadius: 9, padding: '11px 18px',
        minWidth: 280, maxWidth: 500,
        boxShadow: '0 8px 28px rgba(0,0,0,0.24)',
        animation: 'snack-up 220ms ease',
        fontFamily: 'inherit',
        fontSize: '0.875rem',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ flex: 1, whiteSpace: 'normal', lineHeight: 1.4 }}>{message}</span>

      {action && (
        <button
          onClick={() => { onAction?.(); onClose(); }}
          style={{
            background: 'none', border: 'none', padding: '0 4px',
            color: '#45B7B2', fontWeight: 700, fontSize: '0.875rem',
            cursor: 'pointer', flexShrink: 0, letterSpacing: '0.01em',
          }}
        >
          {action}
        </button>
      )}

      <button
        onClick={onClose}
        aria-label="Dismiss"
        style={{
          background: 'none', border: 'none', padding: 0,
          color: 'rgba(255,255,255,0.45)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', flexShrink: 0,
        }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <path d="M1 1l11 11M12 1L1 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

export default Snackbar;
