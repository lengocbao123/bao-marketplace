import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

export type ListItemProps = HTMLAttributes<HTMLElement>;

export const ListItem: FC<ListItemProps> = (props) => {
  const { children, className, ...listItemProps } = props;

  return (
    <div
      className={clsx('grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4', className)}
      {...listItemProps}
    >
      {children}
    </div>
  );
};
