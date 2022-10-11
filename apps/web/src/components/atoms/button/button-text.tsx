import { SvgSpinAnimate } from '@/assets/svg';
import clsx from 'clsx';
import React from 'react';
import { ButtonProps } from './button';

export const ButtonText = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'md',
      variant = 'primary',
      icon,
      iconOrientation = 'left',
      disabled = false,
      loading = false,
      type = 'button',
      className,
      label,
      onClick,
      ...rest
    },
    ref
  ) => {
    const Icon = loading ? SvgSpinAnimate : icon;

    const buttonSize = { 'py-1.5': size === 'sm', 'py-2.5': size === 'md', 'py-3': size === 'lg' };

    const iconSize = { 'px-2 py-1.5': size === 'sm', 'px-2 py-2.5': size === 'md', 'p-3': size === 'lg' };
    const textSize = {
      'text-sm': size === 'sm' || size === 'md',
      'text-lg leading-6': size === 'lg'
    };

    const iconTextSize = {
      'text-base': size === 'sm',
      'text-lg': size === 'md' || size === 'lg'
    };

    const buttonVariant = {
      'text-neutral hover:text-secondary active:hover:text-secondary-70 disabled:text-neutral-30':
        variant === 'secondary',
      'text-neutral hover:text-primary active:text-primary-50 disabled:text-neutral-30': variant === 'primary'
    };

    const buttonClasses = clsx(
      'whitespace-nowrap flex items-center justify-center gap-2 rounded-full font-semibold disabled:pointer-events-none px-2',
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
      <button ref={ref} type={type} disabled={disabled} className={buttonClasses} onClick={onClick} {...rest}>
        {Icon && <Icon className={iconClasses} />}
        {label && !loading && <span>{label}</span>}
      </button>
    );
  }
);

ButtonText.displayName = 'ButtonText';
