import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { FC, FormEvent, HTMLAttributes } from 'react';

export interface PaginationInputProps extends HTMLAttributes<HTMLDivElement> {
  page: number;
  totalPages: number;

  onPaginationChange?: (page: number) => void;
}

export const PaginationInput: FC<PaginationInputProps> = ({
  className,
  page,
  totalPages,
  onPaginationChange,
  ...rest
}) => {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Get the value of the input field
    const page = parseInt((event.currentTarget.elements.namedItem('page') as HTMLInputElement).value, 10);

    if (onPaginationChange) {
      await onPaginationChange(page);
    } else {
      await router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          page,
        },
      });
    }
  };

  return (
    <div className={clsx('text-neutral-50', className)} {...rest}>
      Page{' '}
      <form className={'inline-block'} onSubmit={handleSubmit}>
        <input
          key={page}
          type="number"
          name={'page'}
          defaultValue={page}
          max={totalPages}
          min={1}
          className="border-neutral-10 text-neutral-70 min-w-[4.375rem] appearance-none rounded-full border py-1.5 px-4 text-center text-sm font-semibold"
          disabled={totalPages === 1}
        />
      </form>{' '}
      of {totalPages}
    </div>
  );
};
