import React from 'react';

const SIZE = {
  xs:  'text-xs',
  sm:  'text-sm',
  md:  'text-base',
  lg:  'text-lg',
};

const WEIGHT = {
  normal:   'font-normal',
  medium:   'font-medium',
  semibold: 'font-semibold',
  bold:     'font-bold',
};

const COLOR = {
  primary: { base: 'text-primary',  hover: 'hover:text-primary-light'  },
  teal:    { base: 'text-teal',     hover: 'hover:text-teal-dark'      },
  accent:  { base: 'text-accent',   hover: 'hover:text-accent-dark'    },
  coral:   { base: 'text-coral',    hover: 'hover:text-coral-dark'     },
  navy:    { base: 'text-navy',     hover: 'hover:text-gray-600'       },
  muted:   { base: 'text-gray-400', hover: 'hover:text-gray-600'       },
  white:   { base: 'text-white',    hover: 'hover:text-gray-100'       },
};

const UNDERLINE = {
  always: 'underline',
  hover:  'no-underline hover:underline',
  none:   'no-underline',
};

const ExternalIcon = () => (
  <svg
    width="11" height="11" viewBox="0 0 11 11" fill="none"
    aria-hidden="true" className="inline ml-0.5 mb-0.5"
  >
    <path
      d="M2 9L9 2M9 2H5M9 2v4"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const Link = ({
  as: Tag    = 'a',
  href,
  size       = 'md',
  weight     = 'normal',
  color      = 'primary',
  underline  = 'hover',
  external   = false,
  disabled   = false,
  font,
  className  = '',
  children,
  onClick,
  ...props
}) => {
  const c = COLOR[color] ?? COLOR.primary;

  const externalProps =
    external && Tag === 'a'
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};

  return (
    <Tag
      href={Tag === 'a' ? href : undefined}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled || undefined}
      className={[
        SIZE[size]           ?? 'text-base',
        WEIGHT[weight]       ?? 'font-normal',
        c.base,
        c.hover,
        UNDERLINE[underline] ?? UNDERLINE.hover,
        'transition-colors duration-150 cursor-pointer',
        disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        ...(font ? { fontFamily: font } : {}),
        ...(Tag === 'button' ? { background: 'none', border: 'none', padding: 0 } : {}),
      }}
      {...externalProps}
      {...props}
    >
      {children}
      {external && <ExternalIcon />}
    </Tag>
  );
};

export default Link;
