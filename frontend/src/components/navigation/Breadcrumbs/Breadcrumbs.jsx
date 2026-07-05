import React from 'react';

const ChevronSep = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="text-gray-300 flex-shrink-0">
    <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Breadcrumbs = ({
  items = [],
  separator = 'chevron',
}) => {
  const Sep =
    separator === 'chevron'
      ? <ChevronSep />
      : <span className="text-gray-300 select-none text-sm">{separator}</span>;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <span className="flex items-center">{Sep}</span>}
              {isLast ? (
                <span
                  className="text-sm font-semibold text-navy"
                  aria-current="page"
                >
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="text-sm text-primary hover:text-primary-light hover:underline transition-colors duration-150 flex items-center gap-1"
                >
                  {item.icon && <span>{item.icon}</span>}
                  {item.label}
                </a>
              ) : (
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  {item.icon && <span>{item.icon}</span>}
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
