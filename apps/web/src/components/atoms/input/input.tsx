import clsx from 'clsx';
import { ButtonIcon } from 'components/atoms/button';
import { AlertIcon, EyeClosedIcon, EyeIcon } from 'components/icons/outline';
import { forwardRef, InputHTMLAttributes, ReactElement, useId, useRef, useState } from 'react';
import { SVG } from 'types/index';

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
  /**
   * Full-width input
   */
  block?: boolean;
  help?: string;
  hint?: string;
  /**
   * A visual that renders inside the input after the typing area
   */
  trailingAction?: ReactElement;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, forwardedRef) => {
  const { label, error, help, hint, block, trailingVisual, leadingVisual, trailingAction, className, ...inputProps } =
    props;
  const id = useId();
  const disabled = inputProps.disabled;
  const LeadingVisual = leadingVisual;
  const TrailingVisual = error ? AlertIcon : trailingVisual;

  const innerRef = useRef(null);

  // Switch type when click show password icon
  const [currentInputType, setCurrentInputType] = useState(innerRef.current?.type);
  const handleShowPassword = () => {
    if (innerRef.current) {
      innerRef.current.type = innerRef.current.type === 'password' ? 'text' : 'password';
      setCurrentInputType(innerRef.current.type);
    }
  };

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
            error && '!border-accent-error !bg-accent-error/10',
            {
              'pl-4': leadingVisual,
              'pr-4': trailingVisual || trailingAction,
            },
            className,
          )}
        >
          {leadingVisual && (
            <span className={'text-sm'}>
              {typeof leadingVisual === 'string' ? leadingVisual : <LeadingVisual className={'text-2xl'} />}
            </span>
          )}

          <input
            data-component="input"
            {...inputProps}
            id={id}
            ref={(e) => {
              if (typeof forwardedRef === 'function') {
                forwardedRef(e);
              } else if (forwardedRef?.current) {
                forwardedRef.current = e;
              }
              innerRef.current = e;
            }}
            className={
              'py-2.25 inline-flex w-full rounded-full border-none bg-transparent px-4 text-sm focus:ring-0 focus-visible:outline-none'
            }
          />

          {inputProps.type !== 'password' ? (
            trailingVisual && (
              <span className={'text-sm'}>
                {typeof trailingVisual === 'string' ? trailingVisual : <TrailingVisual className={'text-2xl'} />}
              </span>
            )
          ) : (
            <ButtonIcon
              onClick={handleShowPassword}
              variant={'tertiary'}
              className={'border-none bg-transparent'}
              icon={currentInputType === 'password' ? EyeIcon : EyeClosedIcon}
            />
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
