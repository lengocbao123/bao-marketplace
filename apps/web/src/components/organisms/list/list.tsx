import { pluralize } from 'lib/utils/plural-count';
import clsx from 'clsx';
import React, { FC, Fragment, HTMLAttributes } from 'react';
import { Pagination } from 'components/molecules';

export interface ListProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  hasData: boolean;
  gridClassName?: string;
  totalItems?: number;
  totalPages?: number;
  page: number;
}

export const List: FC<ListProps> = ({
  className,
  children,
  label,
  totalItems = 0,
  totalPages = 0,
  page,
  hasData,
  gridClassName,
}) => {
  const hasPagination = totalItems > 1;

  return (
    <div className={clsx('flex flex-col gap-3 lg:gap-3 xl:flex-row xl:gap-6', className)}>
      <div className="flex-1">
        {label && (
          <div className={clsx('mb-5 flex flex-col justify-between gap-4 md:mb-3 lg:flex-row', className)}>
            <div className="flex items-center justify-between lg:justify-start">
              <div className="font-medium">{label}</div>
              {totalItems && (
                <div className="py-1.25 bg-neutral-10 text-neutral ml-3 rounded-full px-2 text-center text-xs font-medium">
                  {pluralize(totalItems, 'item')}
                </div>
              )}
            </div>
          </div>
        )}

        {!hasData ? (
          <div>Empty</div>
        ) : (
          <Fragment>
            <div
              className={clsx(
                'grid grid-cols-2 gap-x-5 gap-y-6 pb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
                gridClassName,
              )}
            >
              {children}
            </div>
            {hasPagination && hasData && (
              <div className="-mx-4 mt-auto px-4 md:-mx-6 md:px-6">
                <div className="flex items-center justify-center">
                  <Pagination variant="icon" totalPages={totalPages} page={page} />
                </div>
              </div>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};
