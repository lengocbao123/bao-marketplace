import { CardPopular, Section } from 'components/molecules';
import { FC, HTMLAttributes } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';

export type PopularCollectionsProps = HTMLAttributes<HTMLElement>;

export const PopularCollections: FC<PopularCollectionsProps> = (props) => {
  const { ...popularCollectionsProps } = props;
  const { data: collections, error } = useSWR(`/collections`);

  if (error) {
    return <div>Error</div>;
  }

  if (!collections) {
    return <div>Loading...</div>;
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
        {collections.map((collection) => (
          <SwiperSlide key={collection.id}>
            <CardPopular
              title={collection.name}
              description={collection.description}
              link={{ href: `/collections/${collection.id}` }}
              image={collection.bannerImage}
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
