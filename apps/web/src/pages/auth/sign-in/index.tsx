import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/future/image';
import Link from 'next/link';
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
  return (
    <div className={'relative flex items-center justify-center pt-20'}>
      <Image
        width={160}
        height={160}
        src={'/assets/images/background/auth/background-auth-1.png'}
        alt={'background-1'}
        className={'absolute top-36 -left-5'}
      />
      <div className={'py-15 shadow-box-hover w-full max-w-xl rounded-3xl px-10'}>
        <h1 className={'text-neutral text-center text-3xl font-bold'}>Sign in with your email</h1>
        <p className={'mt-4 text-center text-base'}>
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
        <TextField className={'mt-10'} title={'Email Address'} placeholder={'example@name.com'} type={'email'} block />
        <TextField className={'mt-10'} title={'Password'} type={'password'} block />
        <CheckboxInput
          className={'[&_[data-component="checkbox"]]:text-secondary mt-5 [&_[data-component="label"]]:text-sm'}
          label={'Remember me'}
        />
        <Button label={'Sign In'} className={'mt-10 w-full'} size={'lg'} />
        <div className={'mt-5 flex items-center'}>
          <hr className={'flex-1'} />
          <div className={'text-neutral-30 px-3 text-base'}>Or continue with</div>
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
      </div>
    </div>
  );
};

SignIn.getLayout = (page) => <Layout>{page}</Layout>;

export default SignIn;
