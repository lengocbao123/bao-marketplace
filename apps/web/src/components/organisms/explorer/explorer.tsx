import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { CATEGORIES, NFTS } from '../../../lib/dummy';
import { Button } from '../../atoms';
import { CardNft, ChipFilter, Section } from '../../molecules';

export interface ExplorerProps {
  viewMorePageUrl?: string;
}

export const Explorer: FC<ExplorerProps> = ({ viewMorePageUrl }) => {
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  const [nfts, setNfts] = useState(NFTS);

  const onChangeFilter = (value: string) => {
    setFilter(value);
    setNfts(nfts.reverse());
  };

  return (
    <Section heading="Explore The Marketplace" lead="Discover NFTs">
      <ChipFilter value={filter} options={CATEGORIES.nfts} onChange={(value) => onChangeFilter(value)} />

      <div className="py-7.5 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {nfts.map((nft) => (
          <CardNft
            key={nft.id}
            link={{ href: 'nfts/' + nft.id }}
            image={nft.image}
            title={nft.name}
            subtitle="Game NFTs"
            price={nft.price}
            user={{
              email: 'baole@codelight.co'
            }}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Button variant="tertiary" label="View more" onClick={() => router.push(viewMorePageUrl)} />
      </div>
    </Section>
  );
};
