import Image from 'next/image';
import { FC, HTMLAttributes } from 'react';
import { ButtonLink } from 'components/atoms';
import { ChevronRightIcon } from 'components/icons/outline';

export type HeroProps = HTMLAttributes<HTMLElement>;

export const Hero: FC<HeroProps> = (props) => {
  return (
    <section
      className={'bg-[url(/assets/images/background/hero-background.png)] bg-cover bg-center bg-no-repeat'}
      {...props}
    >
      <div className="gap-7.5 container grid overflow-hidden md:grid-cols-2">
        <div className="py-10 sm:pb-0 lg:py-20">
          <h1 className={'text-4xl font-bold lg:text-5xl xl:text-6xl'}>
            Discover, <br /> Collect and Sell <br /> Extraordinary NFTs <br />
            <span className={'bg-gradient-2 relative mt-2 w-fit bg-clip-text text-transparent md:mt-1'}>
              by Credit Card
              <div className={'md:h-0.75 bottom-0.75 bg-gradient-2 absolute h-0.5 w-full'} />
            </span>
          </h1>
          <div className={'mt-7.5 text-sm text-neutral-50 lg:text-base xl:text-lg'}>
            The largest NFT marketplace. Authentic and truly unique digital creation. Signed and issued by the creator,
            made possible by blockchain technology.
          </div>
          <div className="mt-10">
            <ButtonLink
              label={'Explore The Marketplace'}
              icon={ChevronRightIcon}
              iconOrientation={'right'}
              size={'lg'}
              href={'/nfts'}
              className={'inline-flex'}
            />
          </div>
        </div>
        <div className="relative hidden overflow-hidden md:block">
          <div className="absolute right-0">
            <div className="flex max-w-[31rem] items-start justify-between">
              <Image
                src={'/assets/images/hero/hero-small.png'}
                alt={'banner-small'}
                width={388 / 2}
                height={5284 / 2}
                className={'md:animate-hero-small w-[calc((194/486)*100%)]'}
              />
              <Image
                src={'/assets/images/hero/hero-large.png'}
                alt={'banner-large'}
                width={564 / 2}
                height={5668 / 2}
                className={'md:animate-hero-large w-[calc((282/486)*100%)]'}
              />
            </div>
          </div>
          <div className="bg-hero-overlay absolute inset-x-0 top-0 z-10 h-[7.9375rem]" />
          <div className="bg-hero-overlay absolute inset-x-0 bottom-0 z-10 h-[7.9375rem] rotate-180" />
        </div>
      </div>
    </section>
  );
};
