import { FC, HTMLAttributes, useState } from 'react';
import { CATEGORIES, NFTS } from 'lib/dummy';
import { ButtonLink, ListItem } from 'components/atoms';
import { CardNft, ChipFilter, Section } from 'components/molecules';

export type ExplorerProps = HTMLAttributes<HTMLElement>;

export const Explorer: FC<ExplorerProps> = ({}) => {
  const [filter, setFilter] = useState('all');
  const [nfts, setNfts] = useState(NFTS);

  const onChangeFilter = (value: string) => {
    setFilter(value);
    setNfts(nfts.reverse());
  };

  return (
    <Section heading="Explore The Marketplace" lead="Discover NFTs">
      <div className="sm:space-y-7.5 space-y-5">
        <ChipFilter value={filter} options={CATEGORIES.nfts} onChange={(value) => onChangeFilter(value)} />

        <ListItem>
          {nfts.map((nft) => (
            <CardNft
              key={nft.id}
              link={{ as: `/nfts/async-music-auctions-${nft.id}`, href: '/nfts/[slug]' }}
              image={nft.image}
              title={nft.name}
              subtitle="Game NFTs"
              price={nft.price}
              user={nft.user}
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
