import { FC, Fragment, HTMLAttributes, ReactNode } from 'react';
import { Disclosure } from '@headlessui/react';
import { CaretDownIcon } from '../../icons/solid';
import clsx from 'clsx';

export interface AccordionSectionProps extends HTMLAttributes<HTMLDivElement> {
  heading?: ReactNode;
  hasArrowIcon?: boolean;
  headingClassName?: string;
  contentClassName?: string;
}

export const AccordionSection: FC<AccordionSectionProps> = ({
  heading,
  children,
  hasArrowIcon = true,
  className,
  headingClassName = '',
  contentClassName = ''
}) => {
  return (
    <div className={clsx('w-full bg-transparent p-2', className)}>
      <Disclosure>
        {({ open }) => (
          <Fragment>
            <Disclosure.Button className={clsx('flex w-full items-center justify-between', headingClassName)}>
              {heading}
              {hasArrowIcon && (
                <CaretDownIcon
                  className={clsx({
                    'rotate-180 transform': open
                  })}
                />
              )}
            </Disclosure.Button>
            <Disclosure.Panel className={clsx('py-4', contentClassName)}>{children}</Disclosure.Panel>
          </Fragment>
        )}
      </Disclosure>
    </div>
  );
};
