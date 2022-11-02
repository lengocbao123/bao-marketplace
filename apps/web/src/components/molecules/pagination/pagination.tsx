import { usePagination } from 'hooks/use-pagination';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, HTMLAttributes } from 'react';
import { AlignCenterHorizontalIcon, ChevronLeftIcon, ChevronRightIcon } from 'components/icons/outline';

export interface PaginationProps extends HTMLAttributes<HTMLUListElement> {
  page: number;
  totalPages: number;
  /**
   * The variant to use.
   * @default 'text'
   */
  variant?: 'text' | 'icon';

  onPaginationChange?: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  className,
  page,
  totalPages,
  variant = 'text',
  onPaginationChange,
  ...rest
}) => {
  const router = useRouter();
  const { items } = usePagination({
    page,
    count: totalPages,
    disabled: totalPages === 1
  });

  const Icons = {
    previous: <ChevronLeftIcon className="inline" />,
    next: <ChevronRightIcon className="inline" />
  };

  return (
    <ul className={clsx('space-x-2 whitespace-nowrap', className)} {...rest}>
      {items.map((item, index) => (
        <li key={index} className="inline-block align-middle">
          {['start-ellipsis', 'end-ellipsis'].includes(item.type) ? (
            <AlignCenterHorizontalIcon className="text-neutral-50" />
          ) : (
            <Link
              className={clsx(
                'inline-flex min-w-[32px] items-center justify-center rounded-full font-medium',
                item.type === 'page'
                  ? 'py-1.75 px-1.75 text-xs'
                  : variant === 'icon'
                  ? 'py-1.75 px-1.75 min-w-[32px] border'
                  : 'py-1.25 border px-4 text-sm capitalize',
                item.disabled ? 'pointer-events-none select-none opacity-50' : '',
                item.selected
                  ? 'text-neutral-0 bg-secondary border-secondary border'
                  : 'hover:bg-secondary/20 hover:border-secondary/50 hover:text-neutral text-neutral-50'
              )}
              href={{
                pathname: router.pathname,
                query: {
                  ...router.query,
                  page: item.page
                }
              }}
              onClick={async (e) => {
                item.onClick(e);

                if (onPaginationChange) {
                  e.preventDefault();
                  await onPaginationChange(item.page);
                }
              }}
            >
              {item.type === 'page'
                ? item.page
                : variant === 'text'
                ? item.type
                : item.type === 'previous'
                ? Icons.previous
                : Icons.next}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};
