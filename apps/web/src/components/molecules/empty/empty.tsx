import * as React from 'react';
import clsx from 'clsx';
import { EmptyGraphic } from 'components/icons/graphic';

export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  description: string;
  title?: string;
}

export const Empty: React.FC<EmptyProps> = ({ title, description, className, ...rest }) => {
  return (
    <div className={clsx('my-auto grid place-items-center text-center', className)} {...rest}>
      <EmptyGraphic width={420} height={210} className={'max-w-full'} />
      <h1 className="mt-4 text-2xl font-bold md:mt-5 md:text-3xl">{title}</h1>
      <div className="mt-3 text-sm md:mt-4 md:text-base">{description}</div>
    </div>
  );
};
