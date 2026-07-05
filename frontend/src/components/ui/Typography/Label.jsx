import React from 'react';

const SIZE = {
  xs:  'text-xs',
  sm:  'text-sm',
  md:  'text-sm',    // labels rarely go larger than sm in forms
  lg:  'text-base',
};

const WEIGHT = {
  normal:   'font-normal',
  medium:   'font-medium',
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

const VARIANT = {
  default: '',
  form:    'block mb-0.5',             /* use above a form field  */
  inline:  'inline-flex items-center', /* for checkbox/radio rows */
  badge:   'inline-flex items-center px-2.5 py-0.5 rounded-full border',
};

const Label = ({
  as: Tag    = 'label',
  htmlFor,
  size       = 'md',
  weight     = 'semibold',
  color      = 'default',
  variant    = 'default',
  required   = false,
  optional   = false,
  font,
  className  = '',
  children,
  ...props
}) => (
  <Tag
    htmlFor={Tag === 'label' ? htmlFor : undefined}
    className={[
      SIZE[size]     ?? 'text-sm',
      WEIGHT[weight] ?? 'font-semibold',
      COLOR[color]   ?? 'text-gray-700',
      VARIANT[variant] ?? '',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    style={font ? { fontFamily: font } : undefined}
    {...props}
  >
    {children}
    {required && (
      <span className="text-coral ml-0.5" aria-hidden="true">*</span>
    )}
    {optional && !required && (
      <span className="text-gray-400 font-normal ml-1 text-xs">(optional)</span>
    )}
  </Tag>
);

export default Label;
