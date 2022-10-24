import { FC, HTMLAttributes, useState } from 'react';
import { CATEGORIES } from '../../../lib/dummy';
import { ButtonLink } from '../../atoms';
import { CardCollectionRanking, ChipFilter, Section } from '../../molecules';

export interface TopCollectionsProps extends HTMLAttributes<HTMLDivElement> {
  collections: Array<any>;
}

export const TopCollections: FC<TopCollectionsProps> = ({ collections }) => {
  const [filter, setFilter] = useState('24h');

  return (
    <Section heading="Top Collections">
      <div className="sm:space-y-7.5 space-y-5">
        <ChipFilter value={filter} options={CATEGORIES.collections} onChange={(value) => setFilter(value)} />

        <div className="grid gap-y-5 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <CardCollectionRanking
              key={collection.id}
              order={index + 1}
              link={{ as: '/collections/async-music-auctions-' + collection.id, href: '/collections/[slug]' }}
              logoImage={collection.logoImage}
              title={collection.name}
              floor={2300}
              total={2500}
              profit={index % 2 == 0 ? 2.3 : -2.3}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <ButtonLink variant="tertiary" label="View All Collections" href={'/collections'} />
        </div>
      </div>
    </Section>
  );
};
