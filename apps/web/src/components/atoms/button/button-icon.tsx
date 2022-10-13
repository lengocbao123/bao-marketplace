import clsx from 'clsx';
import React from 'react';
import { SpinIcon } from '../../icons/animate';
import { ButtonProps } from './button';

export const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'md',
      variant = 'primary',
      icon,
      disabled = false,
      loading = false,
      type = 'button',
      className,
      onClick,
      ...rest
    },
    ref
  ) => {
    const Icon = loading ? SpinIcon : icon;

    const buttonSize = {
      'h-8 w-8': size === 'sm',
      'h-10 w-10': size === 'md',
      'h-12 w-12': size === 'lg'
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
      'text-neutral whitespace-nowrap flex items-center justify-center gap-2 rounded-full font-semibold disabled:pointer-events-none',
      {
        'pointer-events-none': loading
      },
      buttonVariant,
      buttonSize,
      className
    );

    return (
      <button ref={ref} type={type} disabled={disabled} className={buttonClasses} onClick={onClick} {...rest}>
        <Icon className={'text-xl'} />
      </button>
    );
  }
);

ButtonIcon.displayName = 'ButtonIcon';
