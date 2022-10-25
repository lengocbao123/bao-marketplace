import clsx from 'clsx';
import { NextSeo } from 'next-seo';
import React, { createRef, Fragment, ReactElement, useEffect, useState } from 'react';
import { DropzoneRef } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { Button, Input, Textarea } from '../../../components/atoms';
import { FacebookIcon, InstagramIcon, MediumIcon, TwitterIcon } from '../../../components/icons/brand';
import { PlusIcon } from '../../../components/icons/outline';
import { BrowserIcon } from '../../../components/icons/solid';
import { Layout } from '../../../components/layouts';
import { CardPaymentMethod, FileImage } from '../../../components/molecules';
import { USER } from '../../../lib/dummy';
import { useFormCreateProfile } from '../../../lib/hooks/form/use-form-create-profile';
import { convertImageUrlToFile } from '../../../lib/utils/navigator';
import { NextPageWithLayout } from '../../_app';

const Index: NextPageWithLayout = () => {
  const dropzoneRef = createRef<DropzoneRef>();
  const [avatarUrl, setAvatarUrl] = useState<any>(null);
  const [bannerUrl, setBannerUrl] = useState<any>(null);
  const [isEnable, setIsEnable] = useState(false);
  const [wallets, setWallets] = useState<any[]>([]);

  const {
    onSubmit,
    register,
    setValue,
    formState: { errors, isValid, isSubmitting, isDirty }
  } = useFormCreateProfile({
    initialData: USER,

    onSuccess: async () => {
      // refreshUser();
      toast.success('Your profile has been updated!');
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  useEffect(() => {
    setWallets(USER?.wallets);
    convertImageUrlToFile(USER?.avatarUrl)?.then((data) => {
      setValue('avatarUrl', data);
      setAvatarUrl(data);
    });
    convertImageUrlToFile(USER?.bannerUrl)?.then((data) => {
      setValue('bannerUrl', data);
      setBannerUrl(data);
    });
  }, [setValue]);

  const handleClick = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };

  const onDeleteWallet = (walletId: string) => {
    setWallets(wallets.filter((item) => item.walletAddress !== walletId));
    setValue(
      'wallets',
      wallets.filter((item) => item.walletAddress !== walletId)
    );
  };

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
                setValue('avatarUrl', file);
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

          <div className="mt-7.5 mb-4">
            <div className="text-base font-semibold sm:text-base">Profile Banner</div>
            <div className="text-neutral-70 mt-2 text-sm">Recommended 1400px x 350px. Max size: 200 MB</div>
          </div>

          <FileImage
            imageType="rectangle"
            size="lg"
            value={bannerUrl}
            onSubmit={(file) => {
              setValue('bannerUrl', file);
              setBannerUrl(file);
            }}
          />

          <div className="mt-7.5">
            <div className="text-base font-semibold sm:text-base">Display Name</div>
            <Input block className="mt-2" error={errors.username?.message} {...register('username')} />
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
          <div className="mt-7.5">
            <div className="text-base font-semibold sm:text-base">Bio</div>
            <Textarea className="mt-1 h-40 w-full" error={errors?.bio?.message} {...register('bio')} />
          </div>

          <div className="mt-7 text-base font-semibold sm:text-base">Links</div>
          <div className="border-neutral-10 mt-1 flex w-full flex-col rounded-xl border text-neutral-50">
            <div className={'border-neutral-10 flex h-10 w-full border-b'}>
              <div className={'border-neutral-10 flex w-12 items-center justify-center border-r'}>
                <BrowserIcon height={20} width={20} />
              </div>

              <div className={clsx(errors?.website?.message && 'border-accent-error border', 'h-full w-full px-3')}>
                <input
                  placeholder={'yoursite.io'}
                  className={clsx('text-neutral h-full w-full text-sm font-medium outline-none')}
                  {...register('website')}
                />
              </div>
            </div>

            <div className={'border-neutral-10 flex h-10 w-full border-b'}>
              <div className={'border-neutral-10 flex w-12 items-center justify-center border-r'}>
                <FacebookIcon height={20} width={20} />
              </div>

              <div className={'h-full w-full px-3'}>
                <input
                  placeholder={'https://www.facebook.com/yourfacebook'}
                  className={'text-neutral h-full w-full text-sm font-medium outline-none'}
                  {...register('facebook')}
                />
              </div>
            </div>

            <div className={'border-neutral-10 flex h-10 w-full border-b'}>
              <div className={'border-neutral-10 flex w-12 items-center justify-center border-r'}>
                <TwitterIcon height={20} width={20} />
              </div>

              <div className={'h-full w-full px-3'}>
                <input
                  placeholder={'@YourTwitterHandle'}
                  className={'text-neutral h-full w-full text-sm font-medium outline-none'}
                  {...register('twitter')}
                />
              </div>
            </div>

            <div className={'border-neutral-10 flex h-10 w-full border-b'}>
              <div className={'border-neutral-10 flex w-12 items-center justify-center border-r'}>
                <InstagramIcon height={20} width={20} />
              </div>
              <div className={'h-full w-full px-3'}>
                <input
                  placeholder={'@YourInstagramHandle'}
                  className={'text-neutral h-full w-full text-sm font-medium outline-none'}
                  {...register('instagram')}
                />
              </div>
            </div>

            <div className={'flex h-10 w-full'}>
              <div className={'border-neutral-10 flex w-12 items-center justify-center border-r'}>
                <MediumIcon height={20} width={20} />
              </div>
              <div className={'h-full w-full px-3'}>
                <input
                  placeholder={'@YourMediumHandle'}
                  className={'text-neutral h-full w-full text-sm font-medium outline-none'}
                  {...register('medium')}
                />
              </div>
            </div>
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
              disabled={isEnable || !avatarUrl || !isValid || !isDirty}
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