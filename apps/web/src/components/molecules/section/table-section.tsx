import clsx from 'clsx';
import { FC, HTMLAttributes, ReactNode } from 'react';
import { PaginationInput, PaginationLimit, Pagination } from '../pagination';

export interface TableSectionProps extends HTMLAttributes<HTMLDivElement> {
  page?: number;
  totalPages?: number;
  title?: string;
  description?: string;
  actions?: ReactNode;

  onPaginationChange?: (page: number) => void;

  onLimitChange?: (limit: number) => void;
}

export const TableSection: FC<TableSectionProps> = ({
  className,
  children,
  page = 1,
  title,
  description,
  actions,
  totalPages = 1,
  onPaginationChange,
  onLimitChange,
  ...rest
}) => {
  // Check if pagination is enabled, totalPages > 1
  const hasPagination = Boolean(page && totalPages);

  return (
    <div className={clsx(className)}>
      {(title || actions) && (
        <div className="mb-5 flex flex-col gap-4 md:mb-4 md:flex-row md:items-center md:justify-between">
          {title && (
            <div>
              <h3 className="text-base font-bold sm:text-2xl">{title}</h3>
              {description && <h4 className="text-neutral-70 mt-1 text-sm">{description}</h4>}
            </div>
          )}
          {actions && <div>{actions}</div>}
        </div>
      )}

      <div className={clsx('border-neutral-10 divide-neutral-10 divide-y overflow-auto rounded-xl border')} {...rest}>
        <div className={'min-h-[15.625rem] overflow-auto'}>{children}</div>

        {hasPagination && (
          <div className="px-3 py-3">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="hidden sm:block">
                <PaginationLimit label="Rows per page" onLimitChange={onLimitChange} />
              </div>

              <div className="hidden grow sm:block">
                <PaginationInput page={page} totalPages={totalPages} onPaginationChange={onPaginationChange} />
              </div>

              <div className="flex items-center justify-center">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  variant="icon"
                  onPaginationChange={onPaginationChange}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
