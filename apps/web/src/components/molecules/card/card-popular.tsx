import { LinkProps } from 'next/link';
import { FC, HTMLAttributes } from 'react';
import { ButtonLink } from 'components/atoms';
import { ChevronRightIcon } from 'components/icons/outline';

export type CardPopularProps = HTMLAttributes<HTMLElement> & {
  image: string;
  title: string;
  description: string;
  link: LinkProps;
};

export const CardPopular: FC<CardPopularProps> = (props) => {
  const { title, description, image, link, ...cardPopularProps } = props;

  return (
    <div
      className="sm:p-7.5 flex aspect-[588/319] h-auto w-full select-none flex-col gap-2 rounded-lg bg-cover bg-center bg-no-repeat p-4"
      style={{
        background: `linear-gradient(105.38deg, #020202 0.11%, rgba(231, 231, 231, 0) 99.63%), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      {...cardPopularProps}
    >
      <div className="max-w-[80%] space-y-2 lg:max-w-[65%]">
        <h3 className={'text-neutral-0 line-clamp-2 text-sm font-medium sm:text-2xl'}>{title}</h3>
        <p className={'text-neutral-30 line-clamp-3 min-h-[3.75rem] text-xs sm:text-sm'}>{description}</p>
      </div>
      <div className="mt-auto">
        <ButtonLink
          {...link}
          label={'View Collection'}
          icon={ChevronRightIcon}
          iconOrientation={'right'}
          variant={'secondary'}
          className={'text-secondary hover:bg-secondary-10/90 bg-white active:text-white'}
        />
      </div>
    </div>
  );
};
