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
          className={
            'bg-gradient-2 mb-2 bg-clip-text text-center text-sm font-medium uppercase text-transparent sm:text-lg'
          }
        >
          {lead}
        </div>
      )}

      {heading && (
        <div data-component={'heading'} className={'mb-4 text-center text-2xl font-bold sm:text-3xl'}>
          {heading}
        </div>
      )}

      <div className="sm:mt-7.5 mt-5">{children}</div>
    </div>
  );
};

export default Section;
