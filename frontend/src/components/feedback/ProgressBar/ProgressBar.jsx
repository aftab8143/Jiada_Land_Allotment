const ProgressBar = ({ value, max = 100, label, showPercent = true }) => {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      {(label || showPercent) && (
        <div className="flex justify-between mb-1 text-xs">
          {label && <span className="text-gray-700 font-semibold">{label}</span>}
          {showPercent && <span className="text-gray-400">{pct}%</span>}
        </div>
      )}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-[width] duration-[400ms] ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
