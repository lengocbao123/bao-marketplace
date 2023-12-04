import clsx from 'clsx';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';
import { ChevronRightIcon } from 'components/icons/outline';
import { convertToSlug } from '../../../lib/utils/string';
import { Collection } from '@prisma/client';

export interface ProductSectionProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  collection?: Collection;
}

export const ProductSection: FC<ProductSectionProps> = ({ collection, className, title, children, ...rest }) => {
  return (
    <section className={clsx(className)} {...rest}>
      {title && (
        <div className="flex justify-between">
          <h2 className={'text-neutral mb-3 font-bold lg:text-2xl'}>{title}</h2>
          <div className="flex items-center gap-2 text-sm">
            <Link href={`/collections/${collection.id}/${convertToSlug(collection.name)}`}>View Collection</Link>
            <ChevronRightIcon />
          </div>
        </div>
      )}

      <div className="">{children}</div>
    </section>
  );
};
