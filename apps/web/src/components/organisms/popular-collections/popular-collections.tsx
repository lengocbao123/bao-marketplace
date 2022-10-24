import { FC, HTMLAttributes } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CardPopular, Section } from '../../molecules';

export type PopularCollectionsProps = HTMLAttributes<HTMLElement>;

export const PopularCollections: FC<PopularCollectionsProps> = (props) => {
  const { ...popularCollectionsProps } = props;

  return (
    <Section heading={'Popular Collections'} {...popularCollectionsProps}>
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: '.js-pagination',
          bulletActiveClass: 'bg-primary',
          bulletClass: 'swiper-pagination-bullet bg-neutral-10 opacity-100'
        }}
        spaceBetween={24}
        breakpoints={{
          768: {
            slidesPerView: 2
          }
        }}
      >
        <SwiperSlide>
          <CardPopular
            title={'Async Music Auctions'}
            description={'Unique works from Pak, Mike Shinoda, Richie Hawtin and more...'}
            link={{ as: '/collections/async-music-auctions', href: '/collections/[slug]' }}
            image={
              'https://images.unsplash.com/photo-1645731507198-bafe5986bf84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1384&q=80'
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <CardPopular
            title={'The Underground Sistine Chapel'}
            description={'Collect the 400 characters of a major piece of art'}
            link={{ as: '/collections/the-underground-sistine-chapel', href: '/collections/[slug]' }}
            image={
              'https://images.unsplash.com/photo-1656381428168-0b782534259e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1315&q=80'
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <CardPopular
            title={'Async Music Auctions'}
            description={'Unique works from Pak, Mike Shinoda, Richie Hawtin and more...'}
            link={{ as: '/collections/async-music-auctions', href: '/collections/[slug]' }}
            image={
              'https://images.unsplash.com/photo-1645731504303-860e0da74fee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <CardPopular
            title={'The Underground Sistine Chapel'}
            description={'Collect the 400 characters of a major piece of art'}
            link={{ as: '/collections/the-underground-sistine-chapel', href: '/collections/[slug]' }}
            image={
              'https://images.unsplash.com/photo-1645731504636-72725e46b26b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
            }
          />
        </SwiperSlide>
      </Swiper>

      <div className="mt-5 flex items-center justify-center">
        <div className="js-pagination !w-auto"></div>
      </div>
    </Section>
  );
};
