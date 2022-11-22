import { ButtonLink, ListItem } from 'components/atoms';
import { CardNft, ChipFilter, ChipOption, ListNftsSkeleton, Section } from 'components/molecules';
import { FC, HTMLAttributes, useState } from 'react';
import useSWR from 'swr';
import { CategoriesResponse, NftsResponse } from 'types/data';
import { isSuccess } from 'lib/utils/response';
import { convertToSlug } from 'lib/utils/string';
import { getNftPrice } from '../../../lib/utils/nft';

export type ExplorerProps = HTMLAttributes<HTMLElement>;

export const Explorer: FC<ExplorerProps> = ({}) => {
  const { data: categoriesResponse, error: errorCategories } = useSWR<CategoriesResponse>(`/category/list`);
  const [category, setCategory] = useState('b1527454-385d-4c9e-b91d-f84c6a1b6e12');
  const { data: nftsResponse, error: errorNfts } = useSWR<NftsResponse>(`/nft/exchange/list?limit=8`);

  if (errorCategories || errorNfts || !isSuccess(nftsResponse.message) || !isSuccess(categoriesResponse.message)) {
    return <div>failed to load</div>;
  }

  const onChangeCategory = (value: string) => {
    setCategory(value);
  };

  const options: ChipOption[] =
    categoriesResponse.data?.map((category) => ({
      label: category.name,
      value: category.id,
    })) || [];

  const { list: nftsList } = nftsResponse.data;

  return (
    <Section heading="Explore The Marketplace" lead="Discover NFTs">
      <div className="sm:space-y-7.5 space-y-5">
        <ChipFilter value={category} options={options} onChange={onChangeCategory} />

        {nftsResponse ? (
          <ListItem>
            {nftsList.map((nft) => {
              const nftPrice = getNftPrice(nft.orders);

              return (
                <CardNft
                  key={nft.id}
                  link={{ as: `/nfts/${nft.id}/${convertToSlug(nft.name)}`, href: '/nfts/[id]/[slug]' }}
                  image={nft.image}
                  title={nft.name}
                  subtitle="Game NFTs"
                  price={nftPrice ? nftPrice.price : null}
                  user={nft.created_by_info}
                />
              );
            })}
          </ListItem>
        ) : (
          <ListNftsSkeleton className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4" number={8} />
        )}

        <div className="flex justify-center">
          <ButtonLink variant="tertiary" label="View more" href={'/nfts'} />
        </div>
      </div>
    </Section>
  );
};
