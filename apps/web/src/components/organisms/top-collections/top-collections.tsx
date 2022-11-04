import { ButtonLink } from 'components/atoms';
import { CardCollectionRanking, ChipFilter, ChipOption, Section } from 'components/molecules';
import { fetcher } from 'lib/utils/fetcher';
import { FC, HTMLAttributes } from 'react';
import useSWR, { mutate } from 'swr';

export type TopCollectionsProps = HTMLAttributes<HTMLDivElement>;

export const TopCollections: FC<TopCollectionsProps> = ({}) => {
  // const [timeRange, setTimeRage] = useState('24h');
  // const { data: collections, error } = useGetCollectionsRanking('24h');
  // const [displayedCollections, setDisplayedCollections] = useState(collections.data || []);

  const { data: periods, error: errorPeriods } = useSWR(`/periods`);
  const { data: collections, error: errorCollections } = useSWR(`/top-collections`);

  console.log('collections', collections);

  if (errorPeriods || errorCollections) {
    return <div>failed to load</div>;
  }

  if (!periods || !collections) {
    return <div>loading...</div>;
  }

  const handleChangeTimeRange = async (range: string) => {
    await mutate(`/top-collections`, fetcher(`/top-collections?period=${range}`), { revalidate: false });
  };

  const options: ChipOption[] =
    periods?.map((period) => ({
      label: period.title,
      value: period.value,
    })) || [];

  return (
    <Section heading="Top Collections">
      <div className="sm:space-y-7.5 space-y-5">
        <ChipFilter options={options} onChange={handleChangeTimeRange} />

        <div className="grid gap-y-5 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <CardCollectionRanking
              key={collection.id}
              order={index + 1}
              link={{ href: `/collections/${collection.id}` }}
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
