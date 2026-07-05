import React from 'react';

const SIZE = {
  xs:  'text-xs',
  sm:  'text-sm',
  md:  'text-base',
  lg:  'text-lg',
  xl:  'text-xl',
};

const WEIGHT = {
  light:    'font-light',
  normal:   'font-normal',
  semibold: 'font-semibold',
  bold:     'font-bold',
};

const COLOR = {
  default: 'text-gray-700',
  primary: 'text-primary',
  accent:  'text-accent',
  teal:    'text-teal',
  coral:   'text-coral',
  navy:    'text-navy',
  muted:   'text-gray-400',
  white:   'text-white',
};

const LEADING = {
  tight:   'leading-tight',
  snug:    'leading-snug',
  normal:  'leading-normal',
  relaxed: 'leading-relaxed',
  loose:   'leading-loose',
};

const ALIGN = {
  left:    'text-left',
  center:  'text-center',
  right:   'text-right',
  justify: 'text-justify',
};

const Paragraph = ({
  as: Tag  = 'p',
  size     = 'md',
  weight   = 'normal',
  color    = 'default',
  leading  = 'relaxed',
  align    = 'left',
  font,
  truncate = false,
  clamp,            // line-clamp: 2 | 3 | 4
  className = '',
  children,
  ...props
}) => {
  const clampClass = clamp ? `line-clamp-${clamp}` : '';

  return (
    <Tag
      className={[
        SIZE[size]      ?? 'text-base',
        WEIGHT[weight]  ?? 'font-normal',
        COLOR[color]    ?? 'text-gray-700',
        LEADING[leading]?? 'leading-relaxed',
        ALIGN[align]    ?? 'text-left',
        truncate ? 'truncate' : '',
        clampClass,
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

export default Paragraph;
