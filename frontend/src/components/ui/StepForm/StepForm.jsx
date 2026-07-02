import { useState } from 'react';

const StepForm = ({ steps, onComplete }) => {
  const [current, setCurrent] = useState(0);

  const getStatus = (i) => {
    if (i < current) return 'completed';
    if (i === current) return 'active';
    return 'pending';
  };

  return (
    <div>
      {/* Steps header */}
      <div className="flex items-center mb-8">
        {steps.map((step, i) => {
          const status = getStatus(i);
          const isLast = i === steps.length - 1;

          const circleClass =
            status === 'completed'
              ? 'border-primary bg-primary text-white'
              : status === 'active'
                ? 'border-accent bg-accent text-white'
                : 'border-gray-300 bg-white text-gray-400';

          const labelClass =
            status === 'active'
              ? 'text-[0.72rem] mt-1 text-accent font-bold'
              : status === 'completed'
                ? 'text-[0.72rem] mt-1 text-primary'
                : 'text-[0.72rem] mt-1 text-gray-400';

          const connectorClass =
            status === 'completed'
              ? 'flex-1 h-0.5 bg-primary mx-2'
              : 'flex-1 h-0.5 bg-gray-200 mx-2';

          return (
            <div key={i} className={`flex items-center ${isLast ? '' : 'flex-1'}`}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${circleClass}`}
                >
                  {i < current ? '✓' : i + 1}
                </div>
                <div className={labelClass}>{step.label}</div>
              </div>
              {!isLast && <div className={connectorClass} />}
            </div>
          );
        })}
      </div>

      {/* Step body */}
      <div className="mb-8">
        {steps[current].component}
      </div>

      {/* Footer */}
      <div className="flex justify-between pt-4 border-t border-gray-200">
        <button
          onClick={() => setCurrent((p) => p - 1)}
          disabled={current === 0}
          style={{ visibility: current === 0 ? 'hidden' : 'visible' }}
        >
          &larr; Previous
        </button>
        {current < steps.length - 1 ? (
          <button onClick={() => setCurrent((p) => p + 1)}>Next &rarr;</button>
        ) : (
          <button onClick={onComplete}>Submit Application</button>
        )}
      </div>
    </div>
  );
};

export default StepForm;
