import React from 'react';

const SIZE = {
  xs:  'text-xs',
  sm:  'text-sm',
  md:  'text-base',
  lg:  'text-lg',
  xl:  'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
};

/* default size when no `size` prop is given, based on the HTML element */
const TAG_SIZE = { h1: '4xl', h2: '3xl', h3: '2xl', h4: 'xl', h5: 'lg', h6: 'md' };

const WEIGHT = {
  light:    'font-light',
  normal:   'font-normal',
  semibold: 'font-semibold',
  bold:     'font-bold',
  black:    'font-black',
};

const COLOR = {
  default: 'text-navy',
  primary: 'text-primary',
  accent:  'text-accent',
  teal:    'text-teal',
  coral:   'text-coral',
  muted:   'text-gray-400',
  white:   'text-white',
};

const ALIGN = {
  left:   'text-left',
  center: 'text-center',
  right:  'text-right',
};

const Heading = ({
  as: Tag = 'h2',
  size,
  weight   = 'bold',
  color    = 'default',
  align    = 'left',
  font,
  truncate = false,
  className = '',
  children,
  ...props
}) => {
  const resolvedSize = size ?? TAG_SIZE[Tag] ?? 'xl';

  return (
    <Tag
      className={[
        SIZE[resolvedSize] ?? 'text-xl',
        WEIGHT[weight]     ?? 'font-bold',
        COLOR[color]       ?? 'text-navy',
        ALIGN[align]       ?? 'text-left',
        'leading-tight',
        truncate ? 'truncate' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={font ? { fontFamily: font } : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Heading;
