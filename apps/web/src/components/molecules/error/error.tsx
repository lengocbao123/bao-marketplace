import clsx from 'clsx';
import { ErrorGraphic } from 'components/icons/graphic';
import React, { FC, HTMLAttributes } from 'react';

export type ErrorPageProps = HTMLAttributes<HTMLDivElement>;

export const Error: FC<ErrorPageProps> = ({ className, ...rest }) => {
  return (
    <div className={clsx('grid h-full w-full grow place-items-center', className)} {...rest}>
      <div className="flex flex-col items-center justify-center">
        <ErrorGraphic width="248" height="124" />
        <h1 className="mt-8 text-3xl font-bold">Oops! Something went wrong</h1>
      </div>
    </div>
  );
};
