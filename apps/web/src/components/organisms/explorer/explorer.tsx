import { ButtonLink, ListItem } from 'components/atoms';
import { CardNft, ChipFilter, ChipOption, ListNftsSkeleton, Section } from 'components/molecules';
import { FC, HTMLAttributes, useMemo, useState } from 'react';
import { convertToSlug } from 'lib/utils/string';
import { Category, Collection, Nft, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from 'lib/utils/fetcher';
export type ExplorerProps = HTMLAttributes<HTMLElement> & {};

export const Explorer: FC<ExplorerProps> = ({}) => {
  const [category, setCategory] = useState('');
  const { data: nfts, isLoading: isLoadingNfts } = useQuery({
    queryKey: [`/nft?category=${category}`],
    queryFn: () => {
      return fetcher<{ data: Array<Nft & { user: User; collection: Collection }>; page: number; totalPages: number }>(
        `/nft?category=${category}`,
      );
    },
  });
  const { data: categories } = useQuery({
    queryKey: [`/category`],
    queryFn: () => {
      return fetcher<Array<Category>>(`/category`);
    },
  });
  const options = useMemo<ChipOption[]>(() => {
    if (!categories) {
      return [];
    }

    return [
      {
        label: 'All',
        value: '',
      },
      ...categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    ];
  }, [categories]);

  const onChangeCategory = (value: string) => {
    setCategory(value);
  };

  return (
    <Section heading="Explore The Marketplace" lead="Discover NFTs">
      <div className="sm:space-y-7.5 space-y-5">
        <ChipFilter value={category} options={options} onChange={onChangeCategory} />
        <ListItem>
          {isLoadingNfts && <ListNftsSkeleton number={8} />}
          {nfts &&
            nfts.data.map((nft) => {
              return (
                <CardNft
                  key={nft.id}
                  link={{ as: `/nfts/${nft.id}/${convertToSlug(nft.name)}`, href: '/nfts/[id]/[slug]' }}
                  image={nft.image}
                  title={nft.name}
                  subtitle={nft.collection.name}
                  price={null}
                  user={nft.user}
                />
              );
            })}
        </ListItem>

        <div className="flex justify-center">
          <ButtonLink variant="tertiary" label="View more" href={'/nfts'} />
        </div>
      </div>
    </Section>
  );
};
