import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { UserForm, UserResponse } from '../../../types';
import { register } from '../../services';

export interface UseFormSignUp {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useFormSignUp = (options: { initialData?: UseFormSignUp } & UserForm<UseFormSignUp, any>) => {
  const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
  });

  const defaultValues = useMemo(() => options.initialData, [options.initialData]);

  const methods = useForm<UseFormSignUp>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues
  });

  const onSubmit = async (formData: UseFormSignUp) => {
    try {
      const result: UserResponse = await register(formData.email, formData.password, formData.confirmPassword);
      if (result.statusCode === 200) {
        await options?.onSuccess?.(formData, result.data);
      } else {
        await options?.onError?.(result);
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
