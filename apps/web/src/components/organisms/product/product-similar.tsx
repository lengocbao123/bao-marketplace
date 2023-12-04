import { CardNft, ProductSection, ListNftsSkeleton } from 'components/molecules';
import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';
import { convertToSlug } from 'lib/utils/string';
import { Collection, Nft, User } from '@prisma/client';

export interface ProductSimilarProps extends HTMLAttributes<HTMLDivElement> {
  products?: Array<Nft & { collection: Collection; user: User }>;
  collection?: Collection;
  loading?: boolean;
  isError?: boolean;
}

export const ProductSimilar: FC<ProductSimilarProps> = ({
  collection,
  products,
  loading,
  isError,
  className,
  ...rest
}) => {
  return (
    <ProductSection title={'More from this collection'} collection={collection} className={clsx(className)} {...rest}>
      <div className="grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4">
        {isError ? (
          <div>Oops! Something went wrong</div>
        ) : loading ? (
          <ListNftsSkeleton className="grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4" number={4} />
        ) : products.length > 0 ? (
          products.map((product, index) => {
            return (
              <CardNft
                key={index}
                title={product.name}
                subtitle={product.collection.name}
                price={null}
                image={product.image}
                link={{ as: `/nfts/${product.id}/${convertToSlug(product.name)}`, href: '/nfts/[id]/[slug]' }}
                user={product.user}
              />
            );
          })
        ) : (
          <div>There is no available NFTs!</div>
        )}
      </div>
    </ProductSection>
  );
};
