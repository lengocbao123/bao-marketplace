import { FC, HTMLAttributes, useState } from 'react';
import { ButtonLink, ListItem } from 'components/atoms';
import { CardNft, ChipFilter, Section } from 'components/molecules';
import { useGetCategories, useGetNfts } from 'lib/hooks/database';

export type ExplorerProps = HTMLAttributes<HTMLElement>;

export const Explorer: FC<ExplorerProps> = ({}) => {
  const [filter, setFilter] = useState('all');

  const { data: categories, error } = useGetCategories();
  const { data: nfts, error: nftsError } = useGetNfts({ _limit: 8 });
  if (error || nftsError) {
    return <div>Error</div>;
  }
  const onChangeFilter = (value: string) => {
    setFilter(value);
  };

  const categoryOptions = [
    { id: 'all', label: 'All', value: 'all' },
    ...(categories.data as Array<any>).map((category) => ({
      id: category.id,
      label: category.name,
      value: category.code
    }))
  ];

  return (
    <Section heading="Explore The Marketplace" lead="Discover NFTs">
      <div className="sm:space-y-7.5 space-y-5">
        <ChipFilter value={filter} options={categoryOptions} onChange={(value) => onChangeFilter(value)} />

        <ListItem>
          {nfts.data.map((nft) => (
            <CardNft
              key={nft.id}
              link={{ as: `/nfts/async-music-auctions-${nft.id}`, href: '/nfts/[slug]' }}
              image={nft.image}
              title={nft.name}
              subtitle="Game NFTs"
              price={10}
              user={nft.owner}
            />
          ))}
        </ListItem>

        <div className="flex justify-center">
          <ButtonLink variant="tertiary" label="View more" href={'/nfts'} />
        </div>
      </div>
    </Section>
  );
};
