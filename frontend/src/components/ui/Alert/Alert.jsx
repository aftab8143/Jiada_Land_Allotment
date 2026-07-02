const icons = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '❌' };

const typeClasses = {
  info:    'bg-blue-50 border border-blue-200 text-blue-700',
  success: 'bg-green-50 border border-green-200 text-green-700',
  warning: 'bg-amber-50 border border-amber-200 text-amber-700',
  error:   'bg-red-50 border border-red-200 text-red-700',
};

const Alert = ({ type = 'info', children }) => (
  <div className={`flex items-start gap-2 rounded-md px-4 py-3 text-sm ${typeClasses[type] ?? typeClasses.info}`}>
    <span className="shrink-0">{icons[type]}</span>
    <span>{children}</span>
  </div>
);

export default Alert;
