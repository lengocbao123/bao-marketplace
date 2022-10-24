import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

export type CollectionInfoProps = HTMLAttributes<HTMLDivElement>;

export const CollectionInfo: FC<CollectionInfoProps> = ({ className }) => {
  return (
    <div className={clsx(className)}>
      <div className="border-neutral-10 h-fit divide-y rounded-xl border p-4">
        <div className="flex flex-col gap-4 pb-2">
          <div className="flex justify-between">
            <span>Items</span>
            <span>3,3k</span>
          </div>
          <div className="flex justify-between">
            <span>Owners</span>
            <span>3,3k</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-2">
          <div className="flex justify-between">
            <span>Blockchain</span>
            <span>Ethereum</span>
          </div>
          <div className="flex justify-between">
            <span>Ethereum</span>
            <span>0xbf....0cee</span>
          </div>
        </div>
      </div>
    </div>
  );
};
