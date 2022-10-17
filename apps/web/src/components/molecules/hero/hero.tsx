import Image from 'next/future/image';
import { FC, HTMLAttributes } from 'react';

export type HeroProps = HTMLAttributes<HTMLElement>;

export const Hero: FC<HeroProps> = (props) => {
  return (
    <section className={'bg-white'} {...props}>
      <div className="gap-7.5 container grid overflow-hidden md:grid-cols-2">
        <div className="py-20">
          {/* TODO: add more here */}
          <div className="hidden lg:block">
            {' '}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci alias culpa dolorem ducimus
            facere, ipsa iste itaque iure magnam maiores necessitatibus non nostrum officia perferendis ratione rerum
            sed veritatis vero vitae. Aliquid aut consequatur cumque fugit, impedit ipsam iste itaque maiores molestiae
            neque pariatur possimus quaerat quod unde voluptates. Illum molestias obcaecati voluptatum? Ab accusantium
            aliquam at beatae consequatur corporis cum debitis dolor ea eius eos excepturi explicabo fugiat illo in
            ipsum iusto laborum laudantium maxime nam nemo nulla, numquam officiis possimus praesentium provident quia
            quidem quisquam quod reiciendis rerum similique sunt temporibus totam unde veniam, voluptatum! Ab accusamus
            ad, adipisci animi architecto assumenda at cum deserunt dicta eius eos facere, fuga fugit hic impedit in
            iste itaque labore laboriosam libero nisi nobis nostrum odit porro praesentium provident, quaerat quia
            quibusdam recusandae repellendus reprehenderit sequi sint tempore tenetur vel veniam voluptatem. Ab ad animi
            architecto, autem dolorum explicabo fuga fugit in ipsa ipsam iure iusto magnam minima minus mollitia nulla
            obcaecati odio omnis pariatur quae rem sequi similique soluta tempora voluptas! Iure molestias quia quis
            soluta. Ab atque beatae commodi consequuntur debitis distinctio error excepturi fugit illo, incidunt ipsam
            nostrum perspiciatis, placeat quod quos reiciendis repellendus ullam vel voluptatum!
          </div>
          <div className="lg:hidden">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem blanditiis culpa cum dolorem,
            doloribus ducimus ea facere id molestias nemo, nesciunt nobis numquam, porro possimus quaerat quisquam
            recusandae rem reprehenderit sequi sint suscipit totam vero! Accusamus adipisci architecto, assumenda
            blanditiis cupiditate, dignissimos dolor eligendi enim eos eveniet ex facere fugit laborum nostrum obcaecati
            omnis optio quaerat quisquam reiciendis repellendus repudiandae soluta veniam voluptatem! Aliquam commodi,
            eveniet exercitationem harum inventore maiores ratione rem veniam! Ab dolorum eum hic magni nulla ratione.
            Aliquid cum cumque cupiditate earum eius enim, et eum explicabo hic, impedit neque obcaecati officia porro
            quae sit. Vero!
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
