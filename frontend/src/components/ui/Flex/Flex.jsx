import React from 'react';

const DIRECTION = {
  row:         'flex-row',
  col:         'flex-col',
  'row-reverse': 'flex-row-reverse',
  'col-reverse': 'flex-col-reverse',
};
const ALIGN = {
  start:    'items-start',
  center:   'items-center',
  end:      'items-end',
  stretch:  'items-stretch',
  baseline: 'items-baseline',
};
const JUSTIFY = {
  start:   'justify-start',
  center:  'justify-center',
  end:     'justify-end',
  between: 'justify-between',
  around:  'justify-around',
  evenly:  'justify-evenly',
};
const GAP = {
  none: 'gap-0',
  xs:   'gap-1',
  sm:   'gap-2',
  md:   'gap-4',
  lg:   'gap-6',
  xl:   'gap-8',
};

const Flex = ({
  direction = 'row',
  align     = 'start',
  justify   = 'start',
  gap       = 'md',
  wrap      = false,
  className = '',
  children,
}) => (
  <div
    className={[
      'flex',
      DIRECTION[direction] ?? 'flex-row',
      ALIGN[align]         ?? 'items-start',
      JUSTIFY[justify]     ?? 'justify-start',
      GAP[gap]             ?? 'gap-4',
      wrap ? 'flex-wrap' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {children}
  </div>
);

export default Flex;
