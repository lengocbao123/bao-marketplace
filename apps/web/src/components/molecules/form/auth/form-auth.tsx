import Link from 'next/link';
import { FC, HTMLAttributes, ReactNode } from 'react';
import { ButtonIcon } from 'components/atoms';
import { FacebookIcon, GithubIcon, GoogleIcon, TwitterIcon } from 'components/icons/brand';

export interface FormAuthProps extends HTMLAttributes<HTMLElement> {
  title: string;
  footer: ReactNode;
}

export const FormAuth: FC<FormAuthProps> = ({ children, footer, title }) => {
  return (
    <div className={'py-15 shadow-box-hover z-10 w-full max-w-xl rounded-3xl bg-white px-10'}>
      <h1 className={'text-neutral text-center text-2xl font-bold md:text-3xl'}>{title}</h1>
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
      {children}
      <div className={'mt-5 flex hidden items-center'}>
        <hr className={'flex-1'} />
        <div className={'text-neutral-30 px-3 text-xs sm:text-sm md:text-base'}>Or continue with</div>
        <hr className={'flex-1'} />
      </div>
      <div className={'mt-5 flex hidden justify-center gap-5'}>
        <ButtonIcon icon={GoogleIcon} variant={'tertiary'} />
        <ButtonIcon icon={TwitterIcon} variant={'tertiary'} />
        <ButtonIcon icon={FacebookIcon} variant={'tertiary'} />
        <ButtonIcon icon={GithubIcon} variant={'tertiary'} />
      </div>
      {footer}
    </div>
  );
};
