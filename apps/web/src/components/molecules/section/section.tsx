import clsx from 'clsx';
import { FC, HTMLAttributes, ReactNode } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  lead?: ReactNode;
  heading?: ReactNode;
}
export const Section: FC<SectionProps> = ({ lead, heading, className, children }) => {
  return (
    <div className={clsx('container', className)}>
      {lead && (
        <div
          data-component={'lead'}
          className={'bg-gradient-2 mb-2 bg-clip-text text-center text-lg font-medium uppercase text-transparent'}
        >
          {lead}
        </div>
      )}

      {heading && (
        <div data-component={'heading'} className={'mb-4 text-center text-3xl font-bold'}>
          {heading}
        </div>
      )}

      <div className="mt-7.5">{children}</div>
    </div>
  );
};

export default Section;
