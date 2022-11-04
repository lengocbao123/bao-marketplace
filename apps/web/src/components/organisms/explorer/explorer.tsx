import { FC, HTMLAttributes, useState } from 'react';
import { ButtonLink, ListItem } from 'components/atoms';
import { CardNft, ChipFilter, Section } from 'components/molecules';
import { useGetCategories, useGetNfts } from 'lib/hooks/database';
import { getNfts } from 'lib/services';

export type ExplorerProps = HTMLAttributes<HTMLElement>;

export const Explorer: FC<ExplorerProps> = ({}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { data: categories, error } = useGetCategories();
  const { data: nfts, error: nftsError } = useGetNfts({ _limit: 8 });
  const [displayedNfts, setDisplayedNfts] = useState(nfts.data || []);

  if (error || nftsError) {
    return <div>Error</div>;
  }

  const showNftsByCategory = async (value: string) => {
    setSelectedCategory(value);
    const query = { _limit: 8 };
    if (value !== 'all') {
      query['category.0'] = value;
    }
    const { data } = await getNfts(query);
    setDisplayedNfts(data);
  };

  const categoryOptions = [
    { id: 'all', label: 'All', value: 'all' },
    ...(categories.data as Array<any>).map((category) => ({
      id: category.id,
      label: category.name,
      value: category.id
    }))
  ];

  return (
    <Section heading="Explore The Marketplace" lead="Discover NFTs">
      <div className="sm:space-y-7.5 space-y-5">
        <ChipFilter
          value={selectedCategory}
          options={categoryOptions}
          onChange={(value) => showNftsByCategory(value)}
        />

        {displayedNfts.length > 0 ? (
          <ListItem>
            {displayedNfts.map((nft) => (
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
        ) : (
          <p className="text-center">This category has no nfts.</p>
        )}

        <div className="flex justify-center">
          <ButtonLink variant="tertiary" label="View more" href={'/nfts'} />
        </div>
      </div>
    </Section>
  );
};
