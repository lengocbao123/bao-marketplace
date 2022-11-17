import clsx from 'clsx';
import { DocsIcon, EditIcon, FireIcon, HeaderIcon, HeadsetIcon, LayoutIcon, UsersIcon } from 'components/icons/outline';
import { MenuItem, MenuItemProps } from 'components/molecules/menu/menu-item';
import { useSession } from 'next-auth/react';
import { FC, HTMLAttributes } from 'react';

const MENUS: (MenuItemProps & { needLogin?: boolean })[] = [
  {
    Icon: FireIcon,
    href: '/nfts',
    label: 'Explore',
  },
  {
    Icon: EditIcon,
    href: '/',
    label: 'Create',
    needLogin: true,
  },
  {
    Icon: LayoutIcon,
    href: '/collections',
    label: 'Collections',
  },
  {
    Icon: DocsIcon,
    href: '/',
    label: 'Resources',
    children: [
      {
        Icon: UsersIcon,
        href: '/',
        label: 'About Us',
      },
      {
        Icon: HeaderIcon,
        href: '/',
        label: 'Blog',
      },
      {
        Icon: HeadsetIcon,
        href: '/',
        label: 'Supports',
      },
    ],
  },
];

export type MenuDashboardProps = HTMLAttributes<HTMLElement>;

export const MenuDashboard: FC<MenuDashboardProps> = ({ className, ...rest }) => {
  const { data } = useSession();
  const isSignIn = !!data;
  const menus = MENUS.filter(({ needLogin }) => !needLogin || needLogin === isSignIn);

  return (
    <div className={clsx('grid gap-2', className)} {...rest}>
      {menus.map((menu, index) => (
        <MenuItem key={index} {...menu} />
      ))}
    </div>
  );
};
