import React from 'react';

const base = {
  background: 'linear-gradient(90deg, #e5e7eb 25%, #f1f3f5 50%, #e5e7eb 75%)',
  backgroundSize: '1200px 100%',
  animation: 'sk-shimmer 1.5s infinite linear',
};

/* ── primitive ──────────────────────────────────────────────────── */
const Skeleton = ({ width = '100%', height = 16, radius = 5, className = '', style = {} }) => (
  <div
    className={className}
    aria-hidden="true"
    style={{ ...base, width, height, borderRadius: radius, flexShrink: 0, ...style }}
  />
);

/* ── Text block (N lines, last line shorter) ────────────────────── */
Skeleton.Text = ({ lines = 3, className = '' }) => (
  <div className={`flex flex-col gap-2 ${className}`} aria-hidden="true">
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        style={{ ...base, width: i === lines - 1 ? '60%' : '100%', height: 13, borderRadius: 4 }}
      />
    ))}
  </div>
);

/* ── Circle (avatar) ────────────────────────────────────────────── */
Skeleton.Avatar = ({ size = 40 }) => (
  <div
    aria-hidden="true"
    style={{ ...base, width: size, height: size, borderRadius: '50%', flexShrink: 0 }}
  />
);

/* ── Card compound ──────────────────────────────────────────────── */
Skeleton.Card = () => (
  <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col gap-3" aria-hidden="true">
    {/* header: avatar + name/meta */}
    <div className="flex items-center gap-3">
      <div style={{ ...base, width: 42, height: 42, borderRadius: '50%', flexShrink: 0 }} />
      <div className="flex-1 flex flex-col gap-1.5">
        <div style={{ ...base, width: '58%', height: 13, borderRadius: 4 }} />
        <div style={{ ...base, width: '38%', height: 11, borderRadius: 4 }} />
      </div>
    </div>
    {/* image placeholder */}
    <div style={{ ...base, width: '100%', height: 90, borderRadius: 8 }} />
    {/* body text */}
    <div className="flex flex-col gap-1.5">
      <div style={{ ...base, width: '100%', height: 12, borderRadius: 4 }} />
      <div style={{ ...base, width: '100%', height: 12, borderRadius: 4 }} />
      <div style={{ ...base, width: '52%',  height: 12, borderRadius: 4 }} />
    </div>
    {/* footer button placeholder */}
    <div style={{ ...base, width: 90, height: 30, borderRadius: 20 }} />
  </div>
);

/* ── Table rows ─────────────────────────────────────────────────── */
Skeleton.Table = ({ rows = 4, cols = 4 }) => (
  <div className="rounded-xl border border-gray-100 overflow-hidden" aria-hidden="true">
    {/* header */}
    <div className="flex gap-4 px-4 py-3 bg-gray-50 border-b border-gray-100">
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} style={{ ...base, flex: 1, height: 12, borderRadius: 4, background: 'linear-gradient(90deg, #d1d5db 25%, #e5e7eb 50%, #d1d5db 75%)', backgroundSize: '1200px 100%' }} />
      ))}
    </div>
    {/* rows */}
    {Array.from({ length: rows }).map((_, r) => (
      <div key={r} className="flex gap-4 px-4 py-3 border-b border-gray-50">
        {Array.from({ length: cols }).map((_, c) => (
          <div key={c} style={{ ...base, flex: 1, height: 12, borderRadius: 4 }} />
        ))}
      </div>
    ))}
  </div>
);

/* ── Form field placeholder ─────────────────────────────────────── */
Skeleton.Field = ({ labeled = true }) => (
  <div className="flex flex-col gap-1.5" aria-hidden="true">
    {labeled && <div style={{ ...base, width: 80, height: 12, borderRadius: 4 }} />}
    <div style={{ ...base, width: '100%', height: 40, borderRadius: 6 }} />
  </div>
);

export default Skeleton;
