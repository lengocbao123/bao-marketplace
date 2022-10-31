import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import * as yup from 'yup';
import { UserForm } from '../../../types';
import { useRouter } from 'next/router';

export interface UseFormLogin {
  email: string;
  password: string;
}

export const useFormLogin = (options: { initialData?: UseFormLogin } & UserForm<UseFormLogin, any>) => {
  const router = useRouter();
  const { callbackUrl } = router.query as { callbackUrl: string };
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

      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
        callbackUrl: callbackUrl || '/'
      });
      if (result.ok) {
        await router.replace(result?.url || '/') /* .then(router.reload) */;
      } else {
        await options?.onError?.(`StatusCode: ${result.status}. message: ${result.error}`);
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
