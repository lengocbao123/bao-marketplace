import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { UserForm } from '../../../types';

export interface UseFormLogin {
  email: string;
  password: string;
}

export const useFormLogin = (options: { initialData?: UseFormLogin } & UserForm<UseFormLogin, any>) => {
  const schema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().required('Password is required')
  });

  const defaultValues = useMemo(() => options.initialData, [options.initialData]);

  const methods = useForm<UseFormLogin>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues
  });

  const onSubmit = async (formData: UseFormLogin) => {
    try {
      const body = new FormData();
      body.append('email', formData.email);
      body.append('password', formData.password);

      // Wait for 1 second to simulate a slow network
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Random result to simulate a random error
      const result =
        Math.random() > 0.5
          ? { success: true, statusCode: 200 }
          : {
              success: false,
              message: 'Internal server error',
              statusCode: 500
            };
      if (result.statusCode === 200) {
        await options?.onSuccess?.(formData, result);
      } else {
        await options?.onError?.(`StatusCode: ${result.statusCode}. message: ${result.message}`);
      }
    } catch (error) {
      await options?.onError?.(error);
    }
  };

  return {
    ...methods,
    onSubmit: methods.handleSubmit(onSubmit)
  };
};
