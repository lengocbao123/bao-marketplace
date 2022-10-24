import { FC, HTMLAttributes } from 'react';
import { List } from '../list';
import { CardNft } from '../../molecules';
export interface NftsListProps extends HTMLAttributes<HTMLDivElement> {
  nfts: any[];
  meta?: any;
  links?: any;
}
export const NftsList: FC<NftsListProps> = ({ nfts, meta, className }) => {
  return (
    <List
      hasData={true}
      totalItems={meta.totalItems}
      totalPages={meta.totalPages}
      page={meta.page}
      className={className}
    >
      {nfts.map((nft) => (
        <CardNft
          key={nft.id}
          link={{ as: '/nfts/async-music-auctions-' + nft.id, href: '/nfts/[slug]' }}
          image={nft.image}
          title={nft.name}
          subtitle={'Monkey collection'}
          price={100}
          user={nft.user}
        />
      ))}
    </List>
  );
};
