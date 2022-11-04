import { ButtonLink, ListItem } from 'components/atoms';
import { CardNft, ChipFilter, ChipOption, Section } from 'components/molecules';
import { fetcher } from 'lib/utils/fetcher';
import { FC, HTMLAttributes } from 'react';
import useSWR, { mutate } from 'swr';

export type ExplorerProps = HTMLAttributes<HTMLElement>;

export const Explorer: FC<ExplorerProps> = ({}) => {
  const { data: categories, error: errorCategories } = useSWR(`/categories`);
  const { data: nfts, error: errorNfts } = useSWR(`/nfts`);

  if (errorCategories || errorNfts) {
    return <div>failed to load</div>;
  }

  if (!categories || !nfts) {
    return <div>loading...</div>;
  }

  const onChangeFilter = async (value: string) => {
    await mutate(`/nfts`, fetcher(`/nfts?category=${value}`), { revalidate: false });
  };

  const options: ChipOption[] =
    categories?.map((category) => ({
      label: category.name,
      value: category.id,
    })) || [];

  return (
    <Section heading="Explore The Marketplace" lead="Discover NFTs">
      <div className="sm:space-y-7.5 space-y-5">
        <ChipFilter options={options} onChange={(value) => onChangeFilter(value)} />

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
