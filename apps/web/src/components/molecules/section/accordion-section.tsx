import { FC, Fragment, HTMLAttributes, ReactNode } from 'react';
import { Disclosure } from '@headlessui/react';
import { CaretDownIcon } from 'components/icons/solid';
import clsx from 'clsx';

export interface AccordionSectionProps extends HTMLAttributes<HTMLDivElement> {
  heading?: ReactNode;
  hasArrowIcon?: boolean;
  headingClassName?: string;
  contentClassName?: string;
  defaultOpen?: boolean;
}

export const AccordionSection: FC<AccordionSectionProps> = ({
  heading,
  children,
  hasArrowIcon = true,
  className,
  headingClassName = '',
  contentClassName = '',
  defaultOpen = true,
}) => {
  return (
    <div className={clsx('w-full', className)}>
      <Disclosure defaultOpen={defaultOpen}>
        {({ open }) => (
          <Fragment>
            <Disclosure.Button className={clsx('flex w-full items-center justify-between p-2', headingClassName)}>
              {heading}
              {hasArrowIcon && (
                <CaretDownIcon
                  className={clsx({
                    'rotate-180 transform': open,
                  })}
                />
              )}
            </Disclosure.Button>
            <Disclosure.Panel className={clsx('py-4 px-2', contentClassName)}>{children}</Disclosure.Panel>
          </Fragment>
        )}
      </Disclosure>
    </div>
  );
};
