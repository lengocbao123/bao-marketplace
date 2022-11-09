import { CardNft } from 'components/molecules';
import { List } from 'components/organisms/list';
import { convertToSlug } from 'lib/utils/string';
import { FC, HTMLAttributes } from 'react';

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
          link={{ as: `/nfts/${nft.id}/${convertToSlug(nft.name)}`, href: '/nfts/[id]/[slug]' }}
          image={nft.image}
          title={nft.name}
          subtitle={'Monkey collection'}
          price={100}
          user={nft.owner}
        />
      ))}
    </List>
  );
};
