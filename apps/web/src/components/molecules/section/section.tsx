import clsx from 'clsx';
import { FC, HTMLAttributes, ReactNode } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  heading?: ReactNode;
  headingClass?: string;
  subHeading?: ReactNode;
  subHeadingClass?: string;
  action?: ReactNode;
}
export const Section: FC<SectionProps> = ({
  heading,
  subHeading,
  action,
  headingClass = '',
  subHeadingClass = '',
  children
}) => {
  return (
    <div className="flex-column w-full items-center justify-center">
      <div className={clsx('pb-2 text-center text-lg font-medium', subHeadingClass)}>{subHeading}</div>
      <div className={clsx('text-center text-3xl font-bold', headingClass)}>{heading}</div>
      <div className="mt-4 mb-7">{action}</div>
      {children}
    </div>
  );
};

export default Section;
