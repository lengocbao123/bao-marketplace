import { ButtonLink } from 'components/atoms';
import { CardCollectionRanking, ChipFilter, ChipOption, Section, TopCollectionsSkeleton } from 'components/molecules';
import { convertToSlug } from 'lib/utils/string';
import { FC, HTMLAttributes } from 'react';
import useSWR, { mutate, useSWRConfig } from 'swr';
import { CollectionsResponse } from 'types/data';
import { PERIODS } from 'lib/dummy';
import { isSuccess } from 'lib/utils/response';

export type TopCollectionsProps = HTMLAttributes<HTMLDivElement>;

export const TopCollections: FC<TopCollectionsProps> = ({}) => {
  const { data: collections, error: errorCollections } = useSWR<CollectionsResponse>(`/top-collections`);
  const { fetcher } = useSWRConfig();
  const isError = errorCollections || !isSuccess(collections.message);
  const loading = !collections;

  const handleChangeTimeRange = async (range: string) => {
    await mutate(`/top-collections`, fetcher(`/top-collections?period=${range}`), { revalidate: false });
  };

  const options: ChipOption[] =
    PERIODS?.map((period) => ({
      label: period.title,
      value: period.value,
    })) || [];

  return (
    <Section heading="Top Collections">
      <div className="sm:space-y-7.5 space-y-5">
        <ChipFilter options={options} onChange={handleChangeTimeRange} />
        {isError ? (
          <div className={'text-center'}>Oops! Something went wrong</div>
        ) : loading ? (
          <div className="grid gap-y-5 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            <TopCollectionsSkeleton />
          </div>
        ) : (
          <div className="grid gap-y-5 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            {collections.data.list.map((collection, index) => (
              <CardCollectionRanking
                key={collection.id}
                order={index + 1}
                link={{ href: `/collections/${collection.id}/${convertToSlug(collection.name)}` }}
                logoImage={collection.logo_image}
                title={collection.name}
                floor={2300}
                total={2500}
                profit={index % 2 == 0 ? 2.3 : -2.3}
              />
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <ButtonLink variant="tertiary" label="View All Collections" href={'/collections'} />
        </div>
      </div>
    </Section>
  );
};
