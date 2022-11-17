import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

export type CopywriterProps = HTMLAttributes<HTMLDivElement>;

export const Copywriter: FC<CopywriterProps> = ({ className, ...rest }) => {
  const foundedYear = 2022;
  const currentYear: number = new Date().getFullYear();

  const copywriter: string = foundedYear < currentYear ? `${foundedYear} - ${currentYear}` : `${foundedYear}`;

  return (
    <div className={clsx('text-xs text-neutral-50', className)} {...rest}>
      <p>Copyright © {copywriter} Pikasso. All rights reserved.</p>
    </div>
  );
};
