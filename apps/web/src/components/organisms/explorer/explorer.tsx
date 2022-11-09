import { ButtonLink, ListItem } from 'components/atoms';
import { CardNft, ChipFilter, ChipOption, Section } from 'components/molecules';
import { FC, HTMLAttributes, useState } from 'react';
import useSWR from 'swr';

export type ExplorerProps = HTMLAttributes<HTMLElement>;

export const Explorer: FC<ExplorerProps> = ({}) => {
  const { data: categories, error: errorCategories } = useSWR(`/categories`);
  const [category, setCategory] = useState('b1527454-385d-4c9e-b91d-f84c6a1b6e12');
  const { data: nfts, error: errorNfts } = useSWR(`/nfts?_limit=8&category=${category}`);

  if (errorCategories || errorNfts) {
    return <div>failed to load</div>;
  }

  if (!categories || !nfts) {
    return <div>loading...</div>;
  }

  const onChangeCategory = (value: string) => {
    setCategory(value);
  };

  const options: ChipOption[] =
    categories?.map((category) => ({
      label: category.name,
      value: category.id,
    })) || [];

  return (
    <Section heading="Explore The Marketplace" lead="Discover NFTs">
      <div className="sm:space-y-7.5 space-y-5">
        <ChipFilter value={category} options={options} onChange={onChangeCategory} />

        <ListItem>
          {nfts.map((nft) => (
            <CardNft
              key={nft.id}
              link={{ href: `/nfts/${nft.id}` }}
              image={nft.image}
              title={nft.name}
              subtitle="Game NFTs"
              price={nft.price}
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
