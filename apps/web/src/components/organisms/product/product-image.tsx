import clsx from 'clsx';
import Image from 'next/image';
import { FC, HTMLAttributes } from 'react';

export interface ProductImageProps extends HTMLAttributes<HTMLDivElement> {
  image: string;
  alt: string;
}

export const ProductImage: FC<ProductImageProps> = ({ className, image, alt, ...rest }) => {
  return (
    <div className={clsx(className)} {...rest}>
      <Image
        src={image}
        width={486}
        height={486}
        alt={alt}
        className="bg-neutral-10 aspect-square w-full rounded-xl object-cover object-center"
      />
    </div>
  );
};
