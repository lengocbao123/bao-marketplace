import { CardPopular, Section } from 'components/molecules';
import { FC, HTMLAttributes } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import { CollectionsResponse } from 'types/data';
import { isSuccess } from '../../../lib/utils/response';
import { CardPopularSkeleton } from '../../molecules/skeleton/card-popular-skeleton';

export type PopularCollectionsProps = HTMLAttributes<HTMLElement>;

export const PopularCollections: FC<PopularCollectionsProps> = (props) => {
  const { ...popularCollectionsProps } = props;
  const { data: collections, error } = useSWR<CollectionsResponse>(`/collections`);

  if (error || !isSuccess(collections.message)) {
    return (
      <Section heading={'Popular Collections'} {...popularCollectionsProps}>
        <div className={'text-center'}>Oops! Something went wrong</div>
      </Section>
    );
  }

  if (!collections) {
    return (
      <Section heading={'Popular Collections'}>
        <div className="flex">
          <CardPopularSkeleton />
          <CardPopularSkeleton />
        </div>
      </Section>
    );
  }

  return (
    <Section heading={'Popular Collections'} {...popularCollectionsProps}>
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: '.js-pagination',
          bulletActiveClass: 'bg-primary',
          bulletClass: 'swiper-pagination-bullet bg-neutral-10 opacity-100',
        }}
        spaceBetween={24}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
        }}
      >
        {collections.data.list.map((collection) => (
          <SwiperSlide key={collection.id}>
            <CardPopular
              title={collection.name}
              description={collection.description}
              link={{ href: `/collections/${collection.id}` }}
              image={collection.banner_image}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-5 flex items-center justify-center">
        <div className="js-pagination !w-auto"></div>
      </div>
    </Section>
  );
};
