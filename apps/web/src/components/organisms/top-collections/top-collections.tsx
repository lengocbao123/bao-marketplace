import { ButtonLink } from 'components/atoms';
import { CardCollectionRanking, ChipFilter, ChipOption, Section, TopCollectionsSkeleton } from 'components/molecules';
import { convertToSlug } from 'lib/utils/string';
import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { PERIODS } from 'lib/dummy';
import { convertPeriod } from 'lib/utils/time';
import { Collection } from '@prisma/client';

export type TopCollectionsProps = HTMLAttributes<HTMLDivElement> & {
  collections: Collection[];
};

export const TopCollections: FC<TopCollectionsProps> = ({ collections }) => {
  const [periodQuery, setPeriodQuery] = useState('');

  const [period, setPeriod] = useState(PERIODS[0].value);

  const loading = !collections;

  const handleChangeTimeRange = async (range: string) => {
    setPeriod(range);
  };
  useEffect(() => {
    const time = convertPeriod(period);
    if (period === PERIODS[0].value) {
      setPeriodQuery('');
    } else {
      setPeriodQuery(
        new URLSearchParams({
          createdAtMax: time.endTime,
          createdAtMin: time.startTime,
        } as any).toString(),
      );
    }
  }, [period, setPeriodQuery]);
  const options: ChipOption[] =
    PERIODS?.map((period) => ({
      label: period.title,
      value: period.value,
    })) || [];

  return (
    <Section heading="Top Collections">
      <div className="sm:space-y-7.5 space-y-5">
        <ChipFilter value={period} options={options} onChange={handleChangeTimeRange} />
        <div className="grid gap-y-5 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <CardCollectionRanking
              key={collection.id}
              order={index + 1}
              link={{ href: `/collections/${collection.id}/${convertToSlug(collection.name)}` }}
              logoImage={collection.logo_image}
              title={collection.name}
              floor={2300}
              total={collection.total_nft}
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
