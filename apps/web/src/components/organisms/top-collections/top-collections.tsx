import { useRouter } from 'next/router';
import { FC, HTMLAttributes, useState } from 'react';
import { CATEGORIES } from '../../../lib/dummy';
import { Button } from '../../atoms';
import { CardCollectionRanking, ChipFilter, Section } from '../../molecules';

export interface TopCollectionsProps extends HTMLAttributes<HTMLDivElement> {
  collections: Array<any>;
  viewMorePageUrl?: string;
}

export const TopCollections: FC<TopCollectionsProps> = ({ collections, viewMorePageUrl }) => {
  const router = useRouter();
  const [filter, setFilter] = useState('24h');
  return (
    <Section className="mb-20" heading="Top Collections">
      <ChipFilter value={filter} options={CATEGORIES.collections} onChange={(value) => setFilter(value)} />
      <div className="py-7.5 grid grid-rows-5 gap-4 sm:grid-flow-col">
        {collections.map((collection, index) => (
          <CardCollectionRanking
            key={collection.id}
            order={index + 1}
            link={{
              href: '/collections/' + collection.id
            }}
            logoImage={collection.logoImage}
            title={collection.name}
            floor={2300}
            total={2500}
            profit={index % 2 == 0 ? 2.3 : -2.3}
          />
        ))}
      </div>

      {viewMorePageUrl && (
        <div className="flex justify-center">
          <Button variant="tertiary" label="View All Collections" onClick={() => router.push(viewMorePageUrl)} />
        </div>
      )}
    </Section>
  );
};
