import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

/* ── icons ─────────────────────────────────────────────────────── */
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7" fill="rgba(255,255,255,0.22)" />
    <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const XCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7" fill="rgba(255,255,255,0.22)" />
    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const WarnIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 2.5L14 13.5H2L8 2.5z" fill="rgba(255,255,255,0.22)" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8 7v3" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <circle cx="8" cy="11.5" r="0.8" fill="white" />
  </svg>
);
const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7" fill="rgba(255,255,255,0.22)" />
    <path d="M8 7.5V11" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <circle cx="8" cy="5.5" r="0.85" fill="white" />
  </svg>
);
const DismissIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <path d="M1 1l11 11M12 1L1 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

/* ── config ─────────────────────────────────────────────────────── */
const VARIANTS = {
  success: { bg: '#003087', icon: <CheckIcon />  },
  error:   { bg: '#EE7C71', icon: <XCircleIcon /> },
  warning: { bg: '#FF9933', icon: <WarnIcon />   },
  info:    { bg: '#45B7B2', icon: <InfoIcon />   },
};

/* ── single toast item ──────────────────────────────────────────── */
const ToastItem = ({ id, type, message, onDismiss }) => {
  const { bg, icon } = VARIANTS[type] ?? VARIANTS.info;
  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 10,
        background: bg, color: 'white',
        borderRadius: 10, padding: '12px 14px',
        minWidth: 270, maxWidth: 360,
        boxShadow: '0 8px 28px rgba(0,0,0,0.20)',
        animation: 'toast-in 200ms ease',
        fontFamily: 'inherit',
      }}
    >
      <span style={{ marginTop: 1, flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1, fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.45 }}>{message}</span>
      <button
        onClick={() => onDismiss(id)}
        aria-label="Dismiss"
        style={{
          background: 'none', border: 'none', padding: 0, marginTop: 2,
          color: 'rgba(255,255,255,0.70)', cursor: 'pointer', flexShrink: 0,
          display: 'flex', alignItems: 'center',
        }}
      >
        <DismissIcon />
      </button>
    </div>
  );
};

/* ── context ────────────────────────────────────────────────────── */
const ToastCtx = createContext(null);

/* ── provider + toaster ─────────────────────────────────────────── */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    clearTimeout(timers.current[id]);
    delete timers.current[id];
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (type) => (message, duration = 3500) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setToasts((prev) => [...prev, { id, type, message }]);
      timers.current[id] = setTimeout(() => dismiss(id), duration);
    },
    [dismiss],
  );

  const toast = useMemo(
    () => ({
      success: show('success'),
      error:   show('error'),
      warning: show('warning'),
      info:    show('info'),
    }),
    [show],
  );

  return (
    <ToastCtx.Provider value={toast}>
      {children}
      <div
        style={{
          position: 'fixed', top: 24, right: 24, zIndex: 9999,
          display: 'flex', flexDirection: 'column', gap: 10,
          pointerEvents: 'none',
        }}
        aria-label="Notifications"
      >
        {toasts.map((t) => (
          <div key={t.id} style={{ pointerEvents: 'auto' }}>
            <ToastItem {...t} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
};

/* ── hook ───────────────────────────────────────────────────────── */
export const useToast = () => useContext(ToastCtx);
