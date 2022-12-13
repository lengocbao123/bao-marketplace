import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';
import { CardProperty } from 'components/molecules';
import { AccordionSection } from 'components/molecules';
import { Property } from 'types/data';

export interface ProductPropertiesProps extends HTMLAttributes<HTMLDivElement> {
  properties?: Property[];
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
            <CardProperty key={index} type={property.trait_type} value={property.value} />
          ))}
        </div>
      </AccordionSection>
    </div>
  );
};
