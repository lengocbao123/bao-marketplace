import { CardNft, ProductSection } from 'components/molecules';
import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';
import { NftData } from 'types';
import { convertToSlug } from 'lib/utils/string';

export interface ProductSimilarProps extends HTMLAttributes<HTMLDivElement> {
  products?: NftData[];
}

export const ProductSimilar: FC<ProductSimilarProps> = ({ products, className, ...rest }) => {
  return (
    <ProductSection title={'More from this collection'} className={clsx(className)} {...rest}>
      <div className="grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4">
        {products &&
          products.map((product, index) => (
            <CardNft
              key={index}
              title={product.name}
              subtitle={product.collection.name}
              price={2500}
              image={product.image}
              link={{ as: `/nfts/${product.id}/${convertToSlug(product.name)}`, href: '/nfts/[id]/[slug]' }}
              user={product.owner}
            />
          ))}
      </div>
    </ProductSection>
  );
};
