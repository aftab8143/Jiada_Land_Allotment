import React from 'react';

const ChevronIcon = ({ dir }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d={dir === 'left' ? 'M9 2L4 7l5 5' : 'M5 2l5 5-5 5'}
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const getPageRange = (page, total, sibling = 1) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const left  = Math.max(2, page - sibling);
  const right = Math.min(total - 1, page + sibling);
  const range = [];

  range.push(1);
  if (left > 2) range.push('…');
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push('…');
  range.push(total);

  return range;
};

const Pagination = ({
  page = 1,
  totalPages = 1,
  onChange,
  sibling = 1,
  showInfo = false,
  pageSize,
  totalItems,
}) => {
  if (totalPages <= 1) return null;

  const pages  = getPageRange(page, totalPages, sibling);
  const isFirst = page === 1;
  const isLast  = page === totalPages;

  const btnBase = [
    'flex items-center justify-center min-w-[34px] h-[34px] px-2 rounded-md text-sm font-semibold',
    'border border-border transition-[background,border-color,color] duration-150 select-none',
  ].join(' ');

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* info text */}
      {showInfo && totalItems != null && pageSize != null && (
        <span className="text-xs text-gray-400 mr-1">
          {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, totalItems)} of {totalItems}
        </span>
      )}

      <div className="flex items-center gap-1">
        {/* prev */}
        <button
          onClick={() => !isFirst && onChange?.(page - 1)}
          disabled={isFirst}
          aria-label="Previous page"
          className={[
            btnBase,
            isFirst
              ? 'text-gray-300 border-border cursor-not-allowed bg-white'
              : 'text-gray-600 bg-white hover:bg-gray-50 hover:border-primary/40 cursor-pointer',
          ].join(' ')}
          style={{ fontFamily: 'inherit' }}
        >
          <ChevronIcon dir="left" />
        </button>

        {/* page numbers */}
        {pages.map((p, i) =>
          p === '…' ? (
            <span key={`ellipsis-${i}`} className="px-1 text-gray-400 text-sm select-none">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => p !== page && onChange?.(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
              className={[
                btnBase,
                p === page
                  ? 'bg-primary text-white border-primary cursor-default'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:border-primary/40 cursor-pointer',
              ].join(' ')}
              style={{ fontFamily: 'inherit' }}
            >
              {p}
            </button>
          ),
        )}

        {/* next */}
        <button
          onClick={() => !isLast && onChange?.(page + 1)}
          disabled={isLast}
          aria-label="Next page"
          className={[
            btnBase,
            isLast
              ? 'text-gray-300 border-border cursor-not-allowed bg-white'
              : 'text-gray-600 bg-white hover:bg-gray-50 hover:border-primary/40 cursor-pointer',
          ].join(' ')}
          style={{ fontFamily: 'inherit' }}
        >
          <ChevronIcon dir="right" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
