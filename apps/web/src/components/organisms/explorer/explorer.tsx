import { ButtonLink, ListItem } from 'components/atoms';
import { CardNft, ChipFilter, ChipOption, ListNftsSkeleton, Section } from 'components/molecules';
import { FC, HTMLAttributes, useState } from 'react';
import { convertToSlug } from 'lib/utils/string';
import { getNftPrice } from 'lib/utils/nft';
import { useCategories, useFeatureNfts } from 'hooks/services';

export type ExplorerProps = HTMLAttributes<HTMLElement>;

export const Explorer: FC<ExplorerProps> = ({}) => {
  const { categories, error: errorCategories } = useCategories();
  const [category, setCategory] = useState('');
  const { nfts, loading: nftsLoading, error: errorNfts } = useFeatureNfts(`category=${category}`);

  if (errorCategories || errorNfts) {
    return <div className={'text-center'}>Oops! Something went wrong</div>;
  }

  const onChangeCategory = (value: string) => {
    setCategory(value);
  };

  let options: ChipOption[] = [
    {
      label: 'All',
      value: '',
    },
  ];
  options = [
    ...options,
    ...(categories.map((category) => ({
      label: category.name,
      value: category.code,
    })) || []),
  ];

  return (
    <Section heading="Explore The Marketplace" lead="Discover NFTs">
      <div className="sm:space-y-7.5 space-y-5">
        <ChipFilter value={category} options={options} onChange={onChangeCategory} />

        {!nftsLoading ? (
          <ListItem>
            {nfts.list.map((nft) => {
              const nftPrice = getNftPrice(nft.orders);

              return (
                <CardNft
                  key={nft.id}
                  link={{ as: `/nfts/${nft.id}/${convertToSlug(nft.name)}`, href: '/nfts/[id]/[slug]' }}
                  image={nft.image}
                  title={nft.name}
                  subtitle={nft.collection_info.name}
                  price={nftPrice ? nftPrice.price : null}
                  user={nft.created_by_info}
                />
              );
            })}
          </ListItem>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            <ListNftsSkeleton number={8} />
          </div>
        )}

        <div className="flex justify-center">
          <ButtonLink variant="tertiary" label="View more" href={'/nfts'} />
        </div>
      </div>
    </Section>
  );
};
