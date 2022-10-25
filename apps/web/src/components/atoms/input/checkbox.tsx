import clsx from 'clsx';
import { FC, InputHTMLAttributes, ReactNode } from 'react';

export interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
}

export const CheckboxInput: FC<CheckboxInputProps> = ({ label, disabled, className, ...rest }) => {
  return (
    <label className={clsx('flex items-center', className)}>
      <input
        type="checkbox"
        disabled={disabled}
        className={'h-4.5 w-4.5 border-neutral-30 mr-3 rounded border-2 focus:ring-0 focus:ring-offset-0'}
        data-component={'checkbox'}
        {...rest}
      />
      <div
        className={clsx('select-none', {
          'text-neutral-30': disabled
        })}
        data-component={'label'}
      >
        {label}
      </div>
    </label>
  );
};
