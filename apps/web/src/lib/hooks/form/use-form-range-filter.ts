import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { UserForm } from '../../../types/index';

export interface UseFormRangeFilter {
  min: number;
  max: number;
}

export const useFormRangeFilter = (
  options?: { initialData?: UseFormRangeFilter } & UserForm<UseFormRangeFilter, any>
) => {
  const schema = yup.object().shape({
    min: yup
      .number()
      .min(0, 'Min at least 0')
      .test('min', 'Min must be less than max', function (value) {
        const { max } = this.parent;
        if (max !== 0 && !max) {
          return true;
        }

        return value < max;
      })
      .typeError('Numeric inputs only')
      .nullable()
      .defined(),
    max: yup.number().min(0, 'Min at least 0').nullable().defined().typeError('Numeric inputs only')
  });

  const defaultValues = useMemo(() => {
    return options?.initialData;
  }, [options?.initialData]);

  const methods = useForm<UseFormRangeFilter>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues
  });

  const onSubmit = async (formData: UseFormRangeFilter) => {
    try {
      await options?.onSuccess?.(formData, {});
    } catch (error) {
      await options?.onError?.(error);
    }
  };

  return {
    ...methods,
    onSubmit: methods.handleSubmit(onSubmit)
  };
};
