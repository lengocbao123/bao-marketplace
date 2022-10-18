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
    <List hasData={true} totalItems={meta.totalItems} className={className}>
      {nfts.map((nft) => (
        <CardNft
          key={nft.id}
          link={{
            href: '/'
          }}
          image={nft.image}
          title={nft.name}
          subtitle={'Monkey collection'}
          price={100}
          user={{
            email: 'baole@gmail.com'
          }}
        />
      ))}
    </List>
  );
};
