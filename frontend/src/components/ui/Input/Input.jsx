const Input = ({ label, error, id, ...props }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-sm font-semibold text-gray-700" htmlFor={id}>
        {label}
      </label>
    )}
    <input
      id={id}
      className={[
        'px-[0.9rem] py-[0.65rem] border-[1.5px] rounded-md text-[0.95rem] outline-none text-gray-900 w-full transition-[border-color,box-shadow] duration-150',
        'focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,48,135,0.1)]',
        error ? 'border-red-400' : 'border-border-strong',
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

export default Input;
