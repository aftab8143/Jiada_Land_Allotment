const colorClasses = {
  blue:    'bg-blue-100 text-blue-700',
  green:   'bg-green-100 text-green-700',
  saffron: 'bg-orange-100 text-orange-700',
  red:     'bg-red-100 text-red-700',
  gray:    'bg-gray-100 text-gray-600',
  purple:  'bg-violet-100 text-violet-700',
};

const Badge = ({ color = 'gray', children }) => (
  <span
    className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${colorClasses[color] ?? colorClasses.gray}`}
  >
    {children}
  </span>
);

export default Badge;
