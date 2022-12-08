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
    username: yup.string().required('Please enter your display name.'),
    email: yup.string().email(),
    bio: yup.string().max(1200),
    website: yup.string().nullable().url(),
    facebook: yup.string().nullable().url(),
    twitter: yup.string().nullable().url(),
    instagram: yup.string().nullable().url(),
    medium: yup.string().nullable().url(),
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
