import Image from 'next/future/image';
import { FC, HTMLAttributes } from 'react';

export type HeroProps = HTMLAttributes<HTMLElement>;

export const Hero: FC<HeroProps> = (props) => {
  return (
    <section className={'bg-white'} {...props}>
      <div className="gap-7.5 container grid overflow-hidden md:grid-cols-2">
        <div className="py-20">
          {/* TODO: add more here */}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias commodi, dolores et eveniet, facilis labore
          obcaecati quis quisquam quo rem sit soluta veniam veritatis, vero voluptates. Alias aliquam architecto, autem
          cum deleniti deserunt dolorum ea error incidunt ipsa itaque nemo neque nostrum odit officia pariatur
          praesentium quaerat quas, quod reiciendis tempore temporibus totam ullam ut veniam voluptas voluptatem.
          Commodi cupiditate distinctio dolore doloribus hic incidunt, itaque laborum, minus numquam quos rem suscipit
          vitae! Assumenda, blanditiis commodi dolor dolore dolorem fugit hic laboriosam laudantium maxime nostrum omnis
          optio perferendis porro quae quisquam quos saepe sequi unde vel vitae? Ab alias aliquam aut beatae dolore
          doloribus ducimus enim et facilis inventore ipsa ipsum labore magnam maiores maxime modi molestiae nesciunt,
          nobis obcaecati officiis praesentium quaerat, quia quibusdam ratione reiciendis tempore veniam. A atque
          corporis ducimus exercitationem facilis harum impedit inventore ipsum laboriosam libero nam natus neque nihil
          odit quam rem sit, voluptatum!
        </div>
        <div className="relative hidden md:block">
          <div className="absolute">
            <div className="flex gap-2.5">
              <Image
                src={'/assets/images/hero/hero-small.png'}
                alt={'banner-small'}
                width={388 / 2}
                height={5284 / 2}
                className={'md:animate-hero-small'}
              />
              <Image
                src={'/assets/images/hero/hero-large.png'}
                alt={'banner-large'}
                width={564 / 2}
                height={5668 / 2}
                className={'md:animate-hero-large'}
              />
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-0 z-10 h-[127px] bg-red-300"
            style={{ background: 'linear-gradient(180deg, #ffffff 14.51%, rgba(255, 255, 255, 0) 100%)' }}
          />
          <div
            className="absolute inset-x-0 bottom-0 z-10 h-[127px] rotate-180 bg-red-300"
            style={{ background: 'linear-gradient(180deg, #ffffff 14.51%, rgba(255, 255, 255, 0) 100%)' }}
          />
        </div>
      </div>
    </section>
  );
};
