import { CardNft, ProductSection } from 'components/molecules';
import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

export type ProductSimilarProps = HTMLAttributes<HTMLDivElement>;

export const ProductSimilar: FC<ProductSimilarProps> = ({ className, ...rest }) => {
  return (
    <ProductSection title={'More from this collection'} className={clsx(className)} {...rest}>
      <div className="grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <CardNft
            key={index}
            title={'Monkey 66'}
            subtitle={'Monkey collection 69'}
            price={2500}
            image={
              'https://images.unsplash.com/photo-1608178398319-48f814d0750c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1479&q=80'
            }
            link={{
              href: `/`,
              as: `/`
            }}
            user={{
              id: '',
              avatarUrl: null,
              username: 'John Doe',
              email: ''
            }}
          />
        ))}
      </div>
    </ProductSection>
  );
};
