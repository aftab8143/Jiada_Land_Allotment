const EmptyState = ({ icon = '📭', title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-12 px-8 text-center">
    <div className="text-[3rem] mb-4 opacity-60">{icon}</div>
    <div className="text-base font-bold text-gray-700 mb-2">{title}</div>
    {description && <p className="text-sm text-gray-400 max-w-xs">{description}</p>}
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export default EmptyState;
