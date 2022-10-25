import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, HTMLAttributes } from 'react';

export type TabLinkData = {
  url: string;
  label: string;
};

export interface TabLinkProps extends HTMLAttributes<HTMLDivElement> {
  data: TabLinkData[];
}
export const generateTabLinkData = (items: Array<TabLinkData>, prefixUrl?: string) => {
  return prefixUrl
    ? items.map((item) => ({
        ...item,
        url: prefixUrl + item.url
      }))
    : items;
};

export const TabsLink: FC<TabLinkProps> = ({ className, data }) => {
  const router = useRouter();

  return (
    <ul className={clsx('scrollbar-hide gap-5 overflow-x-auto px-2', className)}>
      {data.map(({ url, label }) => (
        <li
          key={url}
          className={clsx(
            'flex items-center border-b py-4',
            router.asPath.includes(url)
              ? 'text-secondary border-secondary font-bold'
              : 'hover:text-secondary/80 focus:text-secondary/80 border-transparent font-medium text-neutral-50'
          )}
        >
          <Link href={url}>{label}</Link>
        </li>
      ))}
    </ul>
  );
};
