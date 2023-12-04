import { CardNft } from 'components/molecules';
import { List } from 'components/organisms/list';
import { convertToSlug } from 'lib/utils/string';
import { FC, HTMLAttributes } from 'react';
import { PaginationData } from 'types/data';
import { Collection, Nft, User } from '@prisma/client';

export interface NftsListProps extends HTMLAttributes<HTMLDivElement> {
  nfts?: Array<Nft & { collection: Collection; user: User }>;
  meta?: PaginationData;
}

export const NftsList: FC<NftsListProps> = ({ nfts, meta, className }) => {
  return (
    <List
      hasData={nfts.length > 0}
      totalItems={meta.total_items || 1}
      totalPages={meta.total_pages || 1}
      page={meta.current_page || 1}
      className={className}
    >
      {nfts.length > 0 ? (
        nfts.map((nft) => {
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
        })
      ) : (
        <div>There is no available nft!</div>
      )}
    </List>
  );
};
