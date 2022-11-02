import clsx from 'clsx';
import { FC, HTMLAttributes, Key } from 'react';
import { CardProperty } from 'components/molecules';
import { AccordionSection } from 'components/molecules';

export type Property = { name: Key | null | undefined; type: string; value: string };

export interface ProductPropertiesProps extends HTMLAttributes<HTMLDivElement> {
  properties?: any;
}

export const ProductProperties: FC<ProductPropertiesProps> = ({ className, properties, ...rest }) => {
  return (
    <div className={clsx(className)} {...rest}>
      <AccordionSection
        heading={'Properties'}
        className="overflow-hidden rounded-xl border"
        headingClassName="bg-neutral-10 text-neutral font-bold text-md"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {properties?.map((property: Property, index: number) => (
            <CardProperty key={index} type={property.type} value={property.value} />
          ))}
        </div>
      </AccordionSection>
    </div>
  );
};
