import React from 'react';

import btnPrimary       from '../../../assets/icons/buttons/btn-primary.svg';
import btnAccent        from '../../../assets/icons/buttons/btn-accent.svg';
import btnTeal          from '../../../assets/icons/buttons/btn-teal.svg';
import btnDanger        from '../../../assets/icons/buttons/btn-danger.svg';
import btnSecondary     from '../../../assets/icons/buttons/btn-secondary.svg';
import btnOutlineAccent from '../../../assets/icons/buttons/btn-outline-accent.svg';
import btnGhost         from '../../../assets/icons/buttons/btn-ghost.svg';

type ButtonVariant = 'primary' | 'accent' | 'teal' | 'danger' | 'secondary' | 'outline-accent' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  block?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
}

const SVG_MAP: Record<ButtonVariant, string> = {
  primary:          btnPrimary,
  accent:           btnAccent,
  teal:             btnTeal,
  danger:           btnDanger,
  secondary:        btnSecondary,
  'outline-accent': btnOutlineAccent,
  ghost:            btnGhost,
};

const TEXT_COLOR: Record<ButtonVariant, string> = {
  primary:          'text-white',
  accent:           'text-white',
  teal:             'text-white',
  danger:           'text-white',
  secondary:        'text-primary',
  'outline-accent': 'text-accent',
  ghost:            'text-gray-600 hover:text-primary',
};

const SHADOW: Record<ButtonVariant, string> = {
  primary:
    'shadow-[0_6px_20px_rgba(0,48,135,0.45)] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(0,48,135,0.55)] hover:[&>img]:brightness-110',
  accent:
    'shadow-[0_6px_20px_rgba(255,153,51,0.45)] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(255,153,51,0.55)] hover:[&>img]:brightness-110',
  teal:
    'shadow-[0_6px_20px_rgba(69,183,178,0.45)] hover:-translate-y-0.5 hover:[&>img]:brightness-110',
  danger:
    'shadow-[0_6px_20px_rgba(238,124,113,0.45)] hover:-translate-y-0.5 hover:[&>img]:brightness-110',
  secondary:        'hover:[&>img]:brightness-[0.96]',
  'outline-accent': 'hover:[&>img]:brightness-[0.96]',
  ghost:            'hover:[&>img]:brightness-[0.94]',
};

const SIZE: Record<ButtonSize, string> = {
  sm: 'text-xs px-4 py-2 min-h-[36px]',
  md: 'text-sm px-6 py-3 min-h-[50px]',
  lg: 'text-base px-8 py-4 min-h-[60px]',
};

/*
 * The button element itself is invisible (transparent background, no border).
 * The SVG <img> provides the entire visual — pill shape, colour, border, shine arc.
 * overflow-hidden + rounded-full clips the SVG img to the pill boundary.
 */
/*
 * appearance-none: removes -webkit-appearance:button which triggers OS-native
 * white Aqua button painting that background-color:transparent cannot override.
 */
const base =
  'appearance-none rounded-full relative overflow-hidden inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 cursor-pointer select-none whitespace-nowrap focus:outline-none active:translate-y-0.5 disabled:opacity-55 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0';

/* Inline style — kills UA background and border; padding intentionally omitted
   so Tailwind SIZE classes (px-*, py-*, min-h-*) control spacing. */
const resetStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  border: 'none',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  block = false,
  iconLeft,
  iconRight,
  children,
  className = '',
  disabled,
  as: Tag = 'button',
  href,
  style,
  ...rest
}) => {
  const cls = [base, TEXT_COLOR[variant], SHADOW[variant], SIZE[size], block ? 'w-full' : '', className]
    .filter(Boolean)
    .join(' ');

  const mergedStyle: React.CSSProperties = { ...resetStyle, ...style };

  const content = (
    <>
      {/* SVG pill — positioned to fill the entire button */}
      <img
        src={SVG_MAP[variant]}
        className="absolute inset-0 w-full h-full pointer-events-none select-none transition-[filter] duration-150"
        style={{ objectFit: 'fill' }}
        alt=""
        aria-hidden="true"
      />
      {/* Text + icons rendered above the SVG */}
      <span className="relative z-10 inline-flex items-center gap-2">
        {loading && (
          <span
            className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            aria-hidden="true"
          />
        )}
        {!loading && iconLeft && <span className="inline-flex">{iconLeft}</span>}
        {children}
        {!loading && iconRight && <span className="inline-flex">{iconRight}</span>}
      </span>
    </>
  );

  if (Tag === 'a') {
    return (
      <a className={cls} style={mergedStyle} href={href} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  return (
    <button
      className={cls}
      style={mergedStyle}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...rest}
    >
      {content}
    </button>
  );
};

export default Button;
