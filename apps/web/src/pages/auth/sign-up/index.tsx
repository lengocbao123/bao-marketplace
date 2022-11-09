import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { unstable_getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { Button } from 'components/atoms';
import { Layout } from 'components/layouts';
import { FormAuth, TextField } from 'components/molecules';
import { useFormSignUp } from 'lib/hooks/form/use-form-sign-up';
import { getErrorMessage } from 'lib/utils/get-error-message';
import { redirectIfAuthenticated } from 'lib/utils/server';
import { UserData } from 'types/data';
import { NextPageWithLayout } from 'pages/_app';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    return redirectIfAuthenticated();
  }

  return {
    props: {},
  };
};

const SignUp: NextPageWithLayout = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const {
    register,
    onSubmit,
    formState: { errors, isSubmitting },
  } = useFormSignUp({
    onSuccess: async (formData, response: UserData) => {
      await router.push(`/auth/verify-request?email=${response.email}`);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  return (
    <div className={'relative flex items-center justify-center pt-[120px] pb-10'}>
      <FormAuth
        title={'Sign up with your email'}
        footer={
          <div className={'mt-8 text-center text-sm text-neutral-50'}>
            Already have an account?
            <Link href={'/auth/sign-in'} className={'text-secondary ml-2 text-sm font-semibold'}>
              Log in
            </Link>
          </div>
        }
      >
        <form onSubmit={onSubmit}>
          <TextField
            {...register('username')}
            error={errors?.username?.message}
            className={'mt-10'}
            title={'Username'}
            placeholder={'Enter name'}
            block
          />
          <TextField
            {...register('email')}
            error={errors?.email?.message}
            className={'mt-10'}
            title={'Email Address'}
            placeholder={'example@name.com'}
            type={'email'}
            block
          />
          <TextField
            {...register('password')}
            error={errors?.password?.message}
            className={'mt-10'}
            title={'Password'}
            type={'password'}
            block
          />
          <TextField
            {...register('confirmPassword')}
            error={errors?.confirmPassword?.message}
            className={'mt-10'}
            title={'Confirm Password'}
            type={'password'}
            block
          />
          <Button
            type={'submit'}
            loading={isSubmitting}
            disabled={isSubmitting}
            label={'Create Account'}
            className={'mt-10 w-full !py-2.5 !text-sm md:!text-base lg:!py-3 lg:!text-lg'}
            size={'lg'}
          />
        </form>
      </FormAuth>
      <div className={'hidden sm:block'}>
        <Image
          width={173}
          height={173}
          src={'/assets/images/background/auth/background-auth-1.png'}
          alt={'background-1'}
          className={'absolute top-36 -left-5'}
        />
        <Image
          width={161}
          height={161}
          src={'/assets/images/background/auth/background-auth-2.png'}
          alt={'background-2'}
          className={'absolute top-64 left-32'}
        />

        <Image
          width={217}
          height={217}
          src={'/assets/images/background/auth/background-auth-4.png'}
          alt={'background-4'}
          className={'absolute bottom-[21.25] left-11'}
        />
        <Image
          width={161}
          height={173}
          src={'/assets/images/background/auth/background-auth-3.png'}
          alt={'background-3'}
          className={'absolute -left-4 bottom-[23.5625rem]'}
        />
        <Image
          width={156}
          height={156}
          src={'/assets/images/background/auth/background-auth-5.png'}
          alt={'background-5'}
          className={'absolute right-12 top-[4.64625rem]'}
        />
        <Image
          width={196}
          height={196}
          src={'/assets/images/background/auth/background-auth-6.png'}
          alt={'background-6'}
          className={'absolute -right-6 top-[12.7rem]'}
        />
        <Image
          width={127}
          height={127}
          src={'/assets/images/background/auth/background-auth-7.png'}
          alt={'background-7'}
          className={'absolute right-[10.8125rem] top-[21.58375rem]'}
        />
        <Image
          width={170}
          height={170}
          src={'/assets/images/background/auth/background-auth-9.png'}
          alt={'background-9'}
          className={'right-0.75 absolute bottom-[9.58375rem]'}
        />
        <Image
          width={188}
          height={188}
          src={'/assets/images/background/auth/background-auth-8.png'}
          alt={'background-8'}
          className={'absolute right-28 bottom-[17.35375rem]'}
        />
      </div>
    </div>
  );
};

SignUp.getLayout = (page) => <Layout>{page}</Layout>;

export default SignUp;
