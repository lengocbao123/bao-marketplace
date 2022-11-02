import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Button, CheckboxInput } from 'components/atoms';
import { Layout } from 'components/layouts';
import { FormAuth, TextField } from 'components/molecules';
import { useFormLogin } from 'lib/hooks/form/use-form-login';
import { redirectIfAuthenticated } from 'lib/utils/server';
import { NextPageWithLayout } from 'pages/_app';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session && session.user.status !== 'verify_email') {
    return redirectIfAuthenticated();
  }

  return {
    props: {}
  };
};

const SignIn: NextPageWithLayout = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    register,
    onSubmit,
    formState: { errors, isSubmitting }
  } = useFormLogin({
    initialData: { email: '', password: '' },
    onError: (error) => {
      toast.error(error);
    }
  });

  useEffect(() => {
    signOut({
      redirect: false
    });
  }, []);

  return (
    <div className={'relative flex items-center justify-center pt-[120px] pb-10'}>
      <FormAuth
        title={'Sign in with your email'}
        footer={
          <div className={'mt-8 text-center text-sm text-neutral-50'}>
            Not a member?
            <Link href={'/auth/sign-up'} className={'text-secondary ml-2 text-sm font-semibold'}>
              Create Account
            </Link>
          </div>
        }
      >
        <form onSubmit={onSubmit}>
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
          <CheckboxInput
            className={'[&_[data-component="checkbox"]]:text-secondary mt-5 [&_[data-component="label"]]:text-sm'}
            label={'Remember me'}
          />
          <Button
            type={'submit'}
            loading={isSubmitting}
            disabled={isSubmitting}
            label={'Sign In'}
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
          className={'absolute bottom-12 left-11'}
        />
        <Image
          width={161}
          height={173}
          src={'/assets/images/background/auth/background-auth-3.png'}
          alt={'background-3'}
          className={'absolute -left-4 bottom-[14.3125rem]'}
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
          className={'right-0.75 absolute bottom-[0.33375rem]'}
        />
        <Image
          width={188}
          height={188}
          src={'/assets/images/background/auth/background-auth-8.png'}
          alt={'background-8'}
          className={'absolute right-28 bottom-[8.10375rem]'}
        />
      </div>
    </div>
  );
};

SignIn.getLayout = (page) => <Layout>{page}</Layout>;

export default SignIn;
