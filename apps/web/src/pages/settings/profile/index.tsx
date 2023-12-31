import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { NextSeo } from 'next-seo';
import React, { createRef, Fragment, ReactElement, useEffect, useState } from 'react';
import { DropzoneRef } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { Button, Input } from 'components/atoms';
import { FacebookIcon, InstagramIcon, MediumIcon, TwitterIcon } from 'components/icons/brand';
import { PlusIcon } from 'components/icons/outline';
import { BrowserIcon } from 'components/icons/solid';
import { Layout } from 'components/layouts';
import { CardPaymentMethod, FileImage, SocialLinkTextField } from 'components/molecules';
import { useFormCreateProfile } from 'hooks/form/use-form-create-profile';
import { convertImageUrlToFile } from 'lib/utils/navigator';
import { redirectIfUnverified } from 'lib/utils/server';
import { refreshUserProfile } from 'lib/auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { NextPageWithLayout } from 'pages/_app';
import { UpdateUserInput } from 'types/data';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session && session.user.status === 'verify_email') {
    return redirectIfUnverified();
  }

  return {
    props: {
      session,
    },
  };
};
const Index: NextPageWithLayout = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dropzoneRef = createRef<DropzoneRef>();
  const [avatarUrl, setAvatarUrl] = useState<any>(null);
  const [isEnable, setIsEnable] = useState(false);
  const [wallets, setWallets] = useState<any[]>([]);
  const router = useRouter();
  const { data: session } = useSession();
  const user: UpdateUserInput = session?.user;
  const {
    onSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormCreateProfile({
    initialData: {
      ...user,
    },

    onSuccess: async () => {
      await refreshUserProfile(false);
      toast.success('Your profile has been updated!');
      router.reload();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setWallets(user.wallets || []);
    convertImageUrlToFile(user.avatar)?.then((data) => {
      setValue('avatar', data);
      setAvatarUrl(data);
    });
  }, [setValue, user.avatar, user.wallets]);

  const handleClick = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };

  const onDeleteWallet = (walletId: string) => {
    setWallets(wallets.filter((item) => item.walletAddress !== walletId));
    setValue(
      'wallets',
      wallets.filter((item) => item.walletAddress !== walletId),
    );
  };
  console.log({ errors });

  return (
    <Fragment>
      <NextSeo title="Profile Detail" />
      <div className={'flex justify-center'}>
        <form onSubmit={onSubmit} className={'max-w-xl px-4'}>
          <h1 className={'lg:mt-15 text-neutral mt-5 text-2xl font-bold md:mt-10 md:text-3xl'}>Profile Detail</h1>
          <div className={'mt-2 text-neutral-50 md:mt-3'}>
            You can set preferred display name, create your branded profile URL and manage other personal settings
          </div>
          <div className="mt-7.5 flex items-center space-x-3">
            <FileImage
              size="sm"
              imageType="circle"
              value={avatarUrl}
              ref={dropzoneRef}
              onSubmit={(file) => {
                setValue('avatar', file);
                setAvatarUrl(file);
              }}
            />
            <div>
              <div className="text-base font-semibold sm:text-xl">Your Avatar</div>
              <div className="mt-2 max-w-sm text-sm text-neutral-50">
                We recommend an image of at least 400x400.
                <br /> Gifs work too.
              </div>
              <Button size="sm" className="mt-2" label={'Choose file'} type={'button'} onClick={handleClick} />
            </div>
          </div>

          <div className="mt-7.5">
            <div className="text-base font-semibold sm:text-base">First name</div>
            <Input block className="mt-2" error={errors.firstName?.message} {...register('firstName')} />
          </div>

          <div className="mt-7.5">
            <div className="text-base font-semibold sm:text-base">Last name</div>
            <Input block className="mt-2" error={errors.lastName?.message} {...register('lastName')} />
          </div>

          <div className="mt-7">
            <div className="text-base font-semibold sm:text-base">Email</div>
            <Input
              block
              disabled={true}
              className="mt-1"
              type={'email'}
              error={errors.email?.message}
              {...register('email')}
            />
          </div>
          {/*<div className="mt-7.5">*/}
          {/*  <div className="text-base font-semibold sm:text-base">Bio</div>*/}
          {/*  <Textarea className="mt-1 h-40 w-full" error={errors?.bio?.message} {...register('bio')} />*/}
          {/*</div>*/}

          <div className="mt-7 text-base font-semibold sm:text-base">Links</div>
          <div className="border-neutral-10 mt-1 flex w-full flex-col overflow-hidden rounded-xl border text-neutral-50">
            <SocialLinkTextField
              className={'border-neutral-10 flex h-10 w-full border-b'}
              url={user.socialAccount.website || ''}
              error={!!errors?.socialAccount && !!errors?.socialAccount.website}
              icon={BrowserIcon}
              inputProps={{ ...register('socialAccount.website') }}
            />
            <SocialLinkTextField
              className={'border-neutral-10 flex h-10 w-full border-b'}
              url={user.socialAccount.facebook || ''}
              error={!!errors?.socialAccount && !!errors?.socialAccount.facebook}
              icon={FacebookIcon}
              inputProps={{
                ...register('socialAccount.facebook'),
                placeholder: 'https://www.facebook.com/yourfacebook',
              }}
            />
            <SocialLinkTextField
              className={'border-neutral-10 flex h-10 w-full border-b'}
              url={user.socialAccount.twitter || ''}
              error={!!errors?.socialAccount && !!errors?.socialAccount.twitter}
              icon={TwitterIcon}
              inputProps={{
                ...register('socialAccount.twitter'),
                placeholder: '@YourTwitter',
              }}
            />
            <SocialLinkTextField
              className={'border-neutral-10 flex h-10 w-full border-b'}
              url={user.socialAccount.instagram || ''}
              error={!!errors?.socialAccount && !!errors?.socialAccount.instagram}
              icon={InstagramIcon}
              inputProps={{
                ...register('socialAccount.instagram'),
                placeholder: '@YourInstagram',
              }}
            />
            <SocialLinkTextField
              className={'border-neutral-10 flex h-10 w-full border-b'}
              url={user.socialAccount.medium || ''}
              error={!!errors?.socialAccount && !!errors?.socialAccount.medium}
              icon={MediumIcon}
              inputProps={{
                ...register('socialAccount.medium'),
                placeholder: '@YourMedium',
              }}
            />
          </div>

          <div className="mt-7.5 flex w-full justify-between">
            <div className="flex items-center text-base font-semibold sm:text-base">Payment Method</div>
            <Button
              className="text-secondary border-none px-0 hover:bg-transparent active:bg-transparent"
              icon={PlusIcon}
              disabled={true}
              size="sm"
              type={'button'}
              variant={'tertiary'}
              label={'Add Payment'}
              onClick={() => setIsEnable(!isEnable)}
            />
          </div>

          <div className={'mt-2 grid w-full grid-cols-1 gap-4'}>
            {wallets.map((wallet, index) => (
              <CardPaymentMethod
                key={index}
                title={wallet.name}
                cardNumber={wallet.walletAddress}
                onClose={() => onDeleteWallet(wallet.walletAddress)}
              />
            ))}
          </div>

          <div className="mb-10 mt-10">
            <Button
              loading={isSubmitting}
              // disabled={isEnable || !avatarUrl || !isValid || !isDirty}
              size="md"
              label={'Save'}
              type={'submit'}
              className={'w-40'}
            />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Index;
