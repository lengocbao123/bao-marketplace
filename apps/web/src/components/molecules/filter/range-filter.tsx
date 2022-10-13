import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';
import { UseFormRangeFilter, useFormRangeFilter } from '../../../lib/hooks/form/use-form-range-filter';
import { Button, Input } from '../../atoms';
import { AccordionSection } from '../section';

const NAME = 'RangeFilter';

export interface RangeFilterProps extends HTMLAttributes<HTMLDivElement> {
  onApply?: (formData: UseFormRangeFilter) => void;
  heading?: string;
}

export const RangeFilter: FC<RangeFilterProps> = ({ className, children, heading, onApply }) => {
  const {
    onSubmit,
    register,
    formState: { isValid, errors, isSubmitting }
  } = useFormRangeFilter({
    onSuccess: onApply
  });

  return (
    <AccordionSection heading={heading} className={clsx(className)}>
      <form onSubmit={onSubmit}>
        <div className={clsx('flex items-center justify-between', className)}>
          {children && <div className="pr-3">{children}</div>}
          <Input
            className="w-full"
            placeholder={'Min'}
            {...register('min', {
              deps: ['max']
            })}
          />
          <span className="mx-3 text-sm text-neutral-50">to</span>
          <Input
            className="w-full"
            placeholder={'Max'}
            {...register('max', {
              deps: ['min']
            })}
          />
        </div>
        {!isValid && (
          <div className="text-accent-error mt-2 text-sm">{errors?.min?.message || errors?.max?.message}</div>
        )}
        <Button
          className="mt-4 w-full"
          label={'Apply'}
          variant={'secondary'}
          disabled={!isValid}
          loading={isSubmitting}
        />
      </form>
    </AccordionSection>
  );
};

RangeFilter.displayName = NAME;
