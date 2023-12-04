import { CardPopular, Section } from 'components/molecules';
import { FC, HTMLAttributes } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CardPopularSkeleton } from 'components/molecules/skeleton/card-popular-skeleton';
import { convertToSlug } from 'lib/utils/string';
import { Collection } from '@prisma/client';

export type PopularCollectionsProps = HTMLAttributes<HTMLElement> & {
  collections: Collection[];
};

export const PopularCollections: FC<PopularCollectionsProps> = ({ collections }) => {
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
    <Section heading={'Popular Collections'}>
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
        {collections.map((collection) => (
          <SwiperSlide key={collection.id}>
            <CardPopular
              title={collection.name}
              description={collection.description}
              link={{ href: `/collections/${collection.id}/${convertToSlug(collection.name)}` }}
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
