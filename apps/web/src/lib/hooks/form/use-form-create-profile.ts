import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { UserForm } from 'types/index';

export interface UseFormCreateProfile {
  id?: string;
  avatarUrl: any;
  bannerUrl: any;
  username: string;
  email: string;
  bio: string;
  website: string;
  facebook: string;
  twitter: string;
  instagram: string;
  medium: string;
  wallets: any[];
}

export const useFormCreateProfile = (
  options: { initialData: UseFormCreateProfile } & UserForm<UseFormCreateProfile, any>
) => {
  const schema = yup.object().shape({
    username: yup.string().required('Please enter your display name.'),
    email: yup.string().email(),
    bio: yup.string().max(1200),
    website: yup.string().nullable().url(),
    facebook: yup.string().nullable().url(),
    twitter: yup.string().nullable().url(),
    instagram: yup.string().nullable().url(),
    medium: yup.string().nullable().url()
  });

  const defaultValues = useMemo(() => options.initialData, [options.initialData]);

  const methods = useForm<UseFormCreateProfile>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues
  });

  const onSubmit = async (formData: UseFormCreateProfile) => {
    try {
      const body = new FormData();
      body.append('username', formData.username);
      body.append('avatarUrl', formData.avatarUrl);

      // const requestOptions = {
      //   method: 'PUT',
      //   body,
      //   headers: {
      //     // Authorization: `Bearer ${data?.accessToken}`,
      //     mode: 'no-cors'
      //   }
      // };

      // const result = await fetch(`${openApiBaseUrl}/users/update-info`, requestOptions).then((response) =>
      //   response.json()
      // );

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
