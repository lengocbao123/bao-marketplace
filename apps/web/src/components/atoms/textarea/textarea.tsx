import clsx from 'clsx';
import React from 'react';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  help?: string;
  error?: string;
}

/* ---------------------------------------------------------------------------------------------------------------------
 * Textarea
 * ------------------------------------------------------------------------------------------------------------------ */

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, help, title, error, disabled = false, maxLength = 100, ...rest }, ref) => {
    const id = React.useId();
    const [countText, setCountText] = React.useState(0);
    const textareaClasses = clsx(
      disabled ? '!bg-neutral-10 border-neutral-30 hover:border-neutral-30 text-neutral-50' : 'text-neutral',
      'w-full p-2 mt-0 text-sm border border-neutral-10 rounded-xl focus-within:!border-primary hover:border-primary-30',
      error &&
        'border-accent-error bg-accent-error/20 hover:border-accent-error focus:border-accent-error focus-within:!border-accent-error',
      className
    );
    const handleChange = (event: any) => {
      const countText = event.target.value;
      setCountText(countText.length);
    };
    return (
      <div className={clsx('w-full', className)}>
        {title && (
          <label className="text-neutral mb-2 flex w-full justify-between" htmlFor={id}>
            <span className="font-semibold capitalize" data-component={'title'}>
              {title}
            </span>
            <span className="text-sm" data-component={'count-text'}>
              {countText}/{maxLength}
            </span>
          </label>
        )}
        <div className={textareaClasses}>
          <textarea
            ref={ref}
            readOnly={disabled}
            disabled={disabled}
            maxLength={maxLength}
            id={id}
            className={clsx(
              'disabled:bg-neutral-10 h-full w-full border-none bg-transparent p-2 outline-none ring-0 hover:border-none focus:border-none focus:ring-0 disabled:cursor-not-allowed'
            )}
            onChange={handleChange}
            {...rest}
            data-component={'textarea'}
          />
        </div>
        {
          <div
            className={clsx(error ? 'text-accent-error' : 'text-neutral-50', 'mt-2.5 px-3 text-xs font-normal')}
            data-component={'helper-text'}
          >
            {error ? !disabled && error : help}
          </div>
        }
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
