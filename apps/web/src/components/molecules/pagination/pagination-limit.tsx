import clsx from 'clsx';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, HTMLAttributes, useId } from 'react';

export interface ItemsPerPageProps extends HTMLAttributes<HTMLDivElement> {
  label: string;

  onLimitChange?: (limit: number) => void;
}

export const PaginationLimit: FC<ItemsPerPageProps> = ({ className, label, onLimitChange, ...rest }) => {
  const limits = [10, 25, 50, 100];

  const id = useId();
  const router = useRouter();
  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    // do something
    if (onLimitChange) {
      await onLimitChange(Number(event.target.value));
    } else {
      await router.replace({
        pathname: router.pathname,
        query: {
          ...router.query,
          limit: event.target.value
        }
      });
    }
  };

  return (
    <div className={clsx('flex items-baseline gap-3', className)} {...rest}>
      <label htmlFor={id} className="text-neutral-50">
        {label}
      </label>

      <select
        id={id}
        className="border-neutral-10 appearance-none rounded-full border py-1.5 pl-4 pr-6 text-sm font-semibold"
        onChange={handleChange}
      >
        {limits.map((limit, index) => (
          <option key={index} value={limit}>
            {limit}
          </option>
        ))}
      </select>
    </div>
  );
};
