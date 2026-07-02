const Timeline = ({ steps }) => (
  <div className="flex flex-col">
    {steps.map((step, i) => {
      const isLast = i === steps.length - 1;
      const isCompleted = step.status === 'completed';
      const isActive = step.status === 'active';

      const connectorClass = isLast
        ? ''
        : isCompleted
          ? "before:content-[''] before:absolute before:left-[11px] before:top-6 before:w-0.5 before:h-full before:bg-primary"
          : "before:content-[''] before:absolute before:left-[11px] before:top-6 before:w-0.5 before:h-full before:bg-gray-200";

      const iconClass = isCompleted
        ? 'border-primary bg-primary text-white'
        : isActive
          ? 'border-accent bg-accent text-white'
          : 'border-gray-200 bg-white';

      const labelClass = isActive
        ? 'text-sm font-bold text-gray-900 mb-0.5'
        : step.status === 'pending'
          ? 'text-sm font-bold text-gray-400 mb-0.5'
          : 'text-sm font-bold text-gray-900 mb-0.5';

      return (
        <div key={i} className={`flex gap-4 relative ${connectorClass}`}>
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[0.65rem] shrink-0 relative z-[1] ${iconClass}`}
          >
            {isCompleted ? '✓' : i + 1}
          </div>
          <div className="pb-5 flex-1">
            <div className={labelClass}>{step.label}</div>
            {step.meta && <div className="text-xs text-gray-500">{step.meta}</div>}
          </div>
        </div>
      );
    })}
  </div>
);

export default Timeline;
