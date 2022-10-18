import clsx from 'clsx';
import { LinkProps } from 'next/dist/client/link';
import Link from 'next/link';
import React, { AnchorHTMLAttributes } from 'react';
import { SpinIcon } from '../../icons/animate';
import { ButtonIconOrientation, ButtonSize, ButtonVariant, IconButton } from './button';

export type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps & {
    size?: ButtonSize;
    variant?: ButtonVariant;
    icon?: IconButton;
    iconOrientation?: ButtonIconOrientation;
    loading?: boolean;
    disabled?: boolean;
    label?: string;
    block?: boolean;
  };

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      size = 'md',
      variant = 'primary',
      icon,
      iconOrientation = 'left',
      loading = false,
      type = 'button',
      className,
      label,
      onClick,
      block = false,
      ...rest
    },
    ref
  ) => {
    const Icon = loading ? SpinIcon : icon;

    const buttonSize =
      variant === 'tertiary'
        ? { 'py-1.25 px-7.75': size === 'sm', 'py-2.25 px-7.75': size === 'md', 'py-2.75 px-7.75': size === 'lg' }
        : { 'py-1.5 px-8': size === 'sm', 'py-2.5 px-8': size === 'md', 'py-3 px-8': size === 'lg' };

    const iconSize =
      variant === 'tertiary'
        ? { 'px-1.75 py-1.25': size === 'sm', 'px-1.75 py-2.25': size === 'md', 'p-2.75': size === 'lg' }
        : { 'px-2 py-1.5': size === 'sm', 'px-2 py-2.5': size === 'md', 'p-3': size === 'lg' };

    const textSize = {
      'text-sm': size === 'sm' || size === 'md',
      'text-lg leading-6': size === 'lg'
    };

    const iconTextSize = {
      'text-base': size === 'sm',
      'text-lg': size === 'md' || size === 'lg'
    };

    const buttonVariant = {
      'bg-secondary text-neutral-0 hover:bg-secondary-30 active:bg-secondary-70 disabled:bg-secondary/50':
        variant === 'secondary',
      'bg-primary text-neutral hover:bg-primary-30 active:bg-primary-50 disabled:bg-primary/50 disabled:text-neutral/50':
        variant === 'primary',
      'bg-neutral-0 border-neutral-10 hover:border-primary-30 hover:bg-primary-5 active:border-primary-50 active:bg-primary-20 disabled:border-neutral-30 disabled:text-neutral-30 border':
        variant === 'tertiary'
    };

    const buttonClasses = clsx(
      'whitespace-nowrap items-center justify-center gap-2 rounded-full font-semibold disabled:pointer-events-none',
      block ? 'flex' : 'inline-flex',
      {
        'pointer-events-none': loading,
        'flex-row-reverse': iconOrientation === 'right'
      },
      buttonVariant,
      textSize,
      label ? buttonSize : iconSize,
      className
    );

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
      <Link ref={ref} type={type} className={buttonClasses} onClick={onClick} {...rest}>
        {Icon && <Icon className={iconClasses} />}
        {label && !loading && <span>{label}</span>}
      </Link>
    );
  }
);

ButtonLink.displayName = 'ButtonLink';
