import React from 'react';

const COLS = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};
const COLS_SM = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
};
const COLS_MD = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};
const COLS_LG = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};
const GAP = {
  none: 'gap-0',
  xs:   'gap-1',
  sm:   'gap-2',
  md:   'gap-4',
  lg:   'gap-6',
  xl:   'gap-8',
};

const Grid = ({
  cols = 2,
  colsSm,
  colsMd,
  colsLg,
  gap = 'md',
  className = '',
  children,
}) => (
  <div
    className={[
      'grid',
      COLS[cols]    ?? 'grid-cols-2',
      colsSm ? (COLS_SM[colsSm] ?? '') : '',
      colsMd ? (COLS_MD[colsMd] ?? '') : '',
      colsLg ? (COLS_LG[colsLg] ?? '') : '',
      GAP[gap]      ?? 'gap-4',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {children}
  </div>
);

export default Grid;
