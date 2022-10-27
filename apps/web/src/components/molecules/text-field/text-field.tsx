import clsx from 'clsx';
import React from 'react';
import { Input, InputProps } from '../../atoms';

const NAME = 'TextField';

export interface TextFieldProps extends InputProps {
  help?: string;
  action?: React.ReactNode;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ help, title, error, className, action, disabled, ...rest }, ref) => {
    const id = React.useId();
    return (
      <div className={clsx('w-full', className)}>
        {(title || action) && (
          <div className="mb-2 flex w-full items-center justify-between">
            <label htmlFor={id} className="text-neutral font-semibold capitalize" data-component={'title'}>
              {title}
            </label>
            {action && <div data-component={'action'}>{action}</div>}
          </div>
        )}
        <Input id={id} ref={ref} {...rest} error={error} disabled={disabled} data-component={'input'} hint={help} />
      </div>
    );
  }
);

TextField.displayName = NAME;
