import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

export interface CardPropertyProps extends HTMLAttributes<HTMLDivElement> {
  type: string;
  value: string;
  rarity?: string;
}

export const CardProperty: FC<CardPropertyProps> = ({ className, type, value, rarity, ...rest }) => {
  return (
    <div
      className={clsx(
        'border-secondary bg-secondary/10 inline-block flex items-center justify-center space-y-1 rounded-xl border p-5 text-center',
        className,
      )}
      {...rest}
    >
      <div className="">
        <div className="text-secondary-70 text-xs">{type}</div>
        <div className="text-lg font-bold uppercase">{value}</div>
        {rarity && <div className="text-xs text-neutral-50">{rarity}</div>}
      </div>
    </div>
  );
};
