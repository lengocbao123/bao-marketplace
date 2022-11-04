import { FC, HTMLAttributes, useState } from 'react';
import { CATEGORIES } from 'lib/dummy';
import { ButtonLink } from 'components/atoms';
import { CardCollectionRanking, ChipFilter, Section } from 'components/molecules';
import { useGetCollectionsRanking } from 'lib/hooks/database';
import { getCollectionsRanking } from 'lib/services';

export interface TopCollectionsProps extends HTMLAttributes<HTMLDivElement> {
  collections: Array<any>;
}

export const TopCollections: FC<TopCollectionsProps> = ({}) => {
  const [timeRange, setTimeRage] = useState('24h');
  const { data: collections, error } = useGetCollectionsRanking('24h');
  const [displayedCollections, setDisplayedCollections] = useState(collections.data || []);
  if (error) {
    return <div>Error</div>;
  }

  const handleChangeTimeRange = async (range: string) => {
    setTimeRage(range);
    const { data } = await getCollectionsRanking(range);
    if (data) {
      setDisplayedCollections(data);
    }
  };

  return (
    <Section heading="Top Collections">
      <div className="sm:space-y-7.5 space-y-5">
        <ChipFilter
          value={timeRange}
          options={CATEGORIES.collections}
          onChange={(value) => handleChangeTimeRange(value)}
        />

        <div className="grid gap-y-5 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedCollections.map((collection, index) => (
            <CardCollectionRanking
              key={collection.id}
              order={index + 1}
              link={{ as: `/collections/${collection.id}`, href: '/collections/[slug]' }}
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
