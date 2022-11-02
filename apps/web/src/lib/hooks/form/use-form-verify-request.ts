import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { UserForm } from 'types/index';

export interface UseFormVerifyRequest {
  otp: string;
}

export const useFormVerifyRequest = (
  options?: UserForm<UseFormVerifyRequest, any> & {
    onResendSuccess?: () => void;
  }
) => {
  const router = useRouter();
  // const { callbackUrl } = router.query as { callbackUrl: string };

  const schema = yup.object().shape({
    otp: yup.string().required('Please enter an OTP.').length(6, 'OTP must be 6 characters.')
  });

  const defaultValues = useMemo<UseFormVerifyRequest>(() => ({ otp: '' }), []);

  const methods = useForm<UseFormVerifyRequest>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues
  });

  const onSubmit = async (data: UseFormVerifyRequest) => {
    try {
      // Fake a slow network
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Random result to simulate a random error
      const result =
        Math.random() > 0.5
          ? { success: true, statusCode: 200, data }
          : {
              success: false,
              message: 'Internal server error',
              statusCode: 500
            };
      if (result.statusCode === 200) {
        await router.replace('/') /* .then(router.reload) */;
      } else {
        await options?.onError?.('Invalid OTP or missing session id.');
      }
    } catch (error) {
      await options?.onError?.(error);
    }
  };

  const onResend = async (email?: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const result =
        Math.random() > 0.5
          ? { email, success: true, statusCode: 200 }
          : {
              success: false,
              message: 'Internal server error',
              statusCode: 500
            };
      if (result.statusCode === 200) {
        await options?.onResendSuccess?.();
        await router.replace('/') /* .then(router.reload) */;
      } else {
        await options?.onError?.('Invalid OTP or missing session id.');
      }
    } catch (error) {
      await options?.onError?.(error);
    }
  };

  return {
    ...methods,
    onSubmit: methods.handleSubmit(onSubmit),
    onResend
  };
};
