import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/future/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useFormLogin } from '../../../lib/hooks/form/use-form-login';
import { Button, ButtonIcon, CheckboxInput } from '../../../components/atoms';
import { FacebookIcon, GithubIcon, GoogleIcon, TwitterIcon } from '../../../components/icons/brand';
import { Layout } from '../../../components/layouts';
import { TextField } from '../../../components/molecules';
import { NextPageWithLayout } from '../../_app';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}
  };
};

const SignIn: NextPageWithLayout = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    register,
    onSubmit,
    formState: { errors, isValid, isSubmitting}
  } = useFormLogin({
    onSuccess: () => {
      toast.success('Login success');
    },
    onError: (error) => {
      toast.error(error);
    }
  });
  return (
    <div className={'relative flex items-center justify-center pt-[120px] pb-10'}>
      <div className={'py-15 shadow-box-hover w-full max-w-xl rounded-3xl px-10 bg-white z-10'}>
        <form onSubmit={onSubmit}>
        <h1 className={'text-neutral text-center text-2xl md:text-3xl font-bold'}>Sign in with your email</h1>
        <p className={'mt-4 text-center text-sm md:text-base'}>
          By entering your email, you agree to our
          <br />
          <Link className={'font-bold'} href={'/'}>
            Term of Service
          </Link>{' '}
          and our{' '}
          <Link className={'font-bold'} href={'/'}>
            Privacy Policy
          </Link>
        </p>
        <TextField {...register("email")} error={errors?.email?.message} className={'mt-10'} title={'Email Address'} placeholder={'example@name.com'} type={'email'} block />
        <TextField {...register("password")} error={errors?.password?.message} className={'mt-10'} title={'Password'} type={'password'} block />
        <CheckboxInput
          className={'[&_[data-component="checkbox"]]:text-secondary mt-5 [&_[data-component="label"]]:text-sm'}
          label={'Remember me'}
        />
        <Button type={'submit'} loading={isSubmitting} disabled={isSubmitting || !isValid} label={'Sign In'} className={'!text-sm md:!text-base lg:!text-lg !py-2.5 lg:!py-3 mt-10 w-full'} size={'lg'} />
        <div className={'mt-5 flex items-center'}>
          <hr className={'flex-1'} />
          <div className={'text-neutral-30 px-3 text-xs sm:text-sm md:text-base'}>Or continue with</div>
          <hr className={'flex-1'} />
        </div>
        <div className={'mt-5 flex justify-center gap-5'}>
          <ButtonIcon icon={GoogleIcon} variant={'tertiary'} />
          <ButtonIcon icon={TwitterIcon} variant={'tertiary'} />
          <ButtonIcon icon={FacebookIcon} variant={'tertiary'} />
          <ButtonIcon icon={GithubIcon} variant={'tertiary'} />
        </div>
        <div className={'mt-8 text-center text-sm text-neutral-50'}>
          Not a member?
          <Link href={'/auth/sign-up'} className={'text-secondary ml-2 text-sm font-semibold'}>
            Create Account
          </Link>
        </div>
        </form>
      </div>
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
        className={'absolute right-0.75 bottom-[0.33375rem]'}
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
