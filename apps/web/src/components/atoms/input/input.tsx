import clsx from 'clsx';
import React from 'react';
import { SVG } from '../../../types/index';
import { AlertIcon } from '../../icons/outline';

const NAME = 'Input';

export type InputIconOrientation = 'left' | 'right';

/**
 * The class name for the icon relative to the orientation
 * @param iconOrientation
 */
export const IconOrientations: Record<InputIconOrientation, string> = {
  left: 'order-0 pr-2',
  right: 'order-1 pl-2'
} as const;

/**
 * The class name for the input relative to the orientation
 * @param iconOrientation
 */
export const InputOrientations: Record<InputIconOrientation, string> = {
  left: 'order-1',
  right: 'order-0'
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  Icon?: SVG;
  iconOrientation?: InputIconOrientation;
  hasWarningIcon?: boolean;
}

/* ---------------------------------------------------------------------------------------------------------------------
 * Input
 * ------------------------------------------------------------------------------------------------------------------ */

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    id,
    iconOrientation = 'left',
    disabled = false,
    placeholder,
    Icon,
    error,
    children,
    hasWarningIcon = true,
    ...rest
  } = props;

  /**
   * The class name for the input wrapper
   * @type {string}
   */
  const rootClasses = clsx(
    'px-4 py-2 text-sm border border-neutral-10 rounded-full flex items-center hover:border-primary-30 focus:border-primary',
    error
      ? 'border-accent-error bg-accent-error/20 hover:border-accent-error focus:border-accent-error'
      : 'focus-within:!bg-primary-5 focus-within:!border-primary hover:border-primary-30',
    disabled ? '!bg-neutral-10 border-neutral-30 hover:border-neutral-30 text-neutral-50' : 'text-neutral',
    className
  );

  const inputClassName = clsx(
    'w-full h-full outline-none font-normal py-0.5 bg-transparent',
    InputOrientations[iconOrientation]
  );
  return (
    <div className={rootClasses}>
      {Icon && !(error && iconOrientation === 'right') && (
        <span
          className={clsx('flex items-center justify-center', IconOrientations[iconOrientation])}
          data-component={'icon'}
        >
          <Icon className={'text-2xl'} />
        </span>
      )}
      <input
        ref={ref}
        id={id}
        readOnly={disabled}
        disabled={disabled}
        placeholder={placeholder}
        className={inputClassName}
        {...rest}
        data-component={'input'}
      />
      {children && (
        <span className="border-neutral-10 order-3 border-l pl-3" data-component={'trailing'}>
          {children}
        </span>
      )}
      {!disabled && error && hasWarningIcon && (
        <span className="order-last pl-2" data-component={'warning-icon'}>
          <AlertIcon className="text-accent-error text-2xl" />
        </span>
      )}
    </div>
  );
});

Input.displayName = NAME;
