import { CardNft } from 'components/molecules';
import { List } from 'components/organisms/list';
import { convertToSlug } from 'lib/utils/string';
import { FC, HTMLAttributes } from 'react';
import { NftData, PaginationData } from 'types/data';
import { getNftPrice } from '../../../lib/utils/nft';

export interface NftsListProps extends HTMLAttributes<HTMLDivElement> {
  nfts?: NftData[];
  meta?: PaginationData;
}

export const NftsList: FC<NftsListProps> = ({ nfts, meta, className }) => {
  return (
    <List
      hasData={nfts.length > 0}
      totalItems={meta.totalItems}
      totalPages={meta.totalPages}
      page={meta.currentPage}
      className={className}
    >
      {nfts.length > 0 ? (
        nfts.map((nft) => {
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
        })
      ) : (
        <div>There is no available nft!</div>
      )}
    </List>
  );
};
