import clsx from 'clsx';
import { Button, Input } from 'components/atoms';
import { AccordionSection } from 'components/molecules/section';
import { UseFormRangeFilter, useFormRangeFilter } from 'lib/hooks/form/use-form-range-filter';
import { FC, HTMLAttributes } from 'react';

const NAME = 'RangeFilter';

export interface RangeFilterProps extends HTMLAttributes<HTMLDivElement> {
  onApply?: (formData: UseFormRangeFilter) => void;
  heading?: string;
  defaultRange?: UseFormRangeFilter;
}

export const RangeFilter: FC<RangeFilterProps> = ({ className, children, heading, onApply, defaultRange }) => {
  const {
    onSubmit,
    register,
    formState: { isValid, errors, isSubmitting },
  } = useFormRangeFilter({
    onSuccess: onApply,
  });

  return (
    <AccordionSection heading={heading} className={clsx(className)}>
      <form onSubmit={onSubmit}>
        <div className={clsx('flex items-center justify-between', className)}>
          {children && <div className="pr-3">{children}</div>}
          <Input
            className="w-full"
            placeholder={'Min'}
            defaultValue={defaultRange ? defaultRange.min : ''}
            {...register('min', {
              deps: ['max'],
            })}
          />
          <span className="mx-3 text-sm text-neutral-50">to</span>
          <Input
            className="w-full"
            placeholder={'Max'}
            defaultValue={defaultRange ? defaultRange.max : ''}
            {...register('max', {
              deps: ['min'],
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
          type="submit"
          disabled={!isValid}
          loading={isSubmitting}
        />
      </form>
    </AccordionSection>
  );
};

RangeFilter.displayName = NAME;
