import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes, forwardRef } from 'react';
import { SpinIcon } from '../../icons/animate';
import { ButtonIconOrientation, ButtonSize, ButtonVariant, IconButton } from './button';

// Root size classes
const sizes: Record<ButtonSize, string> = {
  sm: 'text-sm py-1.5',
  md: 'text-sm py-2.5',
  lg: 'text-lg !leading-6 py-3'
};

// Root outline size classes
const outlineSizes: Record<ButtonSize, string> = {
  sm: 'text-sm py-1.25',
  md: 'text-sm py-2.25',
  lg: 'text-lg !leading-6 py-2.75'
};

// Root variant classes
const variants: Record<ButtonVariant, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-neutral'
};

export interface ButtonLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
  label?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconOrientation?: ButtonIconOrientation;
  icon?: IconButton;
  loading?: boolean;
  disabled?: boolean;
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      className,
      label,
      size = 'md',
      variant = 'primary',
      icon,
      loading,
      disabled = false,
      iconOrientation = 'left',
      ...rest
    },
    ref
  ) => {
    const Icon = loading ? SpinIcon : icon;

    const iconTextSize = {
      'text-base': size === 'sm',
      'text-lg': size === 'md' || size === 'lg'
    };
    const iconClasses = clsx(
      iconTextSize,
      {
        'animate-spin': loading
      },
      label && !loading
        ? {
            '-my-0.5': size === 'sm' || size === 'md',
            '-ml-2': iconOrientation === 'left',
            '-mr-2': iconOrientation === 'right'
          }
        : { 'my-0.5': size === 'sm', '-my-0.5': size === 'md' }
    );

    return (
      <Link
        className={clsx(
          'relative inline-flex min-w-max items-center justify-center gap-2 rounded-full px-2 font-semibold hover:underline hover:underline-offset-2',
          {
            'pointer-events-none': loading,
            'flex-row-reverse': iconOrientation === 'right'
          },
          variant === 'tertiary' ? outlineSizes[size] : sizes[size],
          !disabled ? variants[variant] : 'text-neutral-30 pointer-events-none',
          className
        )}
        {...rest}
        ref={ref}
      >
        {Icon && <Icon className={iconClasses} />}
        {label && !loading && <span>{label}</span>}
      </Link>
    );
  }
);

ButtonLink.displayName = 'ButtonLink';
