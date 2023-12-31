import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { UpdateUserInput, UserForm } from 'types/index';
import { updateUserInfo } from 'services';
import { useSession } from 'next-auth/react';

export const useFormCreateProfile = (options: { initialData: UpdateUserInput } & UserForm<UpdateUserInput, any>) => {
  const { data: session } = useSession();
  const schema = yup.object().shape({
    socialAccount: yup.object().shape({
      website: yup.string().url('Invalid URL'),
      facebook: yup.string().url('Invalid URL'),
      twitter: yup.string().url('Invalid URL'),
      instagram: yup.string().url('Invalid URL'),
      medium: yup.string().url('Invalid URL'),
    }),
  });

  const defaultValues = useMemo(() => options.initialData, [options.initialData]);

  const methods = useForm<UpdateUserInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  const onSubmit = async (formData: UpdateUserInput) => {
    try {
      const result = await updateUserInfo(formData, session.accessToken);

      if (result.statusCode === 200) {
        await options?.onSuccess?.(formData, result);
      } else {
        await options?.onError?.(`StatusCode: ${result.statusCode}. \n Message: ${result.message}`);
      }
    } catch (error) {
      await options?.onError?.(error);
    }
  };

  return {
    ...methods,
    onSubmit: methods.handleSubmit(onSubmit),
  };
};
