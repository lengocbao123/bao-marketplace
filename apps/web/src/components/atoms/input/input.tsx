import clsx from 'clsx';
import { createRef, forwardRef, InputHTMLAttributes, ReactElement, RefObject, useId } from 'react';
import { SVG } from '../../../types/index';
import { AlertIcon } from '../../icons/outline';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  /**
   * A visual that renders inside the input before the typing area
   */
  leadingVisual?: string | SVG;
  /**
   * A visual that renders inside the input after the typing area
   */
  trailingVisual?: string | SVG;
  loadingPosition?: 'leading' | 'trailing';
  block?: boolean;
  help?: string;
  hint?: string;
  /**
   * A visual that renders inside the input after the typing area
   */
  trailingAction?: ReactElement;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, forwardedRef) => {
  const { label, error, help, hint, block, trailingVisual, leadingVisual, trailingAction, ...inputProps } = props;
  const id = useId();
  const disabled = inputProps.disabled;
  const LeadingVisual = leadingVisual;
  const TrailingVisual = error ? AlertIcon : trailingVisual;

  const inputRef = (forwardedRef as RefObject<HTMLInputElement>) || createRef<HTMLInputElement>();

  return (
    <div className={clsx('flex-col gap-2.5', block ? 'flex' : 'inline-flex')}>
      {(label || hint) && (
        <div className={'flex items-center justify-between'}>
          <label className={'text-base font-semibold'} htmlFor={id}>
            {label}
          </label>

          <div className="text-sm text-neutral-50">{hint}</div>
        </div>
      )}

      <div className="inline-flex flex-col gap-2">
        <div
          className={clsx(
            'focus-within:border-primary focus-within:bg-primary-5 border-neutral-10 inline-flex items-center rounded-full border',
            disabled ? 'border-neutral-30 bg-neutral-10' : 'hover:border-primary-30',
            error && 'border-accent-error bg-accent-error/10',
            {
              'pl-4': leadingVisual,
              'pr-4': trailingVisual || trailingAction
            }
          )}
        >
          {leadingVisual && (
            <span className={'text-sm'}>
              {typeof leadingVisual === 'string' ? leadingVisual : <LeadingVisual className={'text-2xl'} />}
            </span>
          )}

          <input
            {...inputProps}
            id={id}
            ref={inputRef}
            className={
              'inline-flex w-full rounded-full border-none bg-transparent px-4 py-2.5 text-sm focus:ring-0 focus-visible:outline-none'
            }
          />

          {trailingVisual && (
            <span className={'text-sm'}>
              {typeof trailingVisual === 'string' ? trailingVisual : <TrailingVisual className={'text-2xl'} />}
            </span>
          )}

          {trailingAction}
        </div>

        {help && <div className={'text-xs text-neutral-50'}>{help}</div>}

        {error && <div className={'text-accent-error text-xs'}>{error}</div>}
      </div>
    </div>
  );
});

Input.displayName = 'Input';
