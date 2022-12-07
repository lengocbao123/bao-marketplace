import { useRouter } from 'next/router';
import { Tabs } from 'components/molecules';
import { USER_INVENTORY_TABS } from 'lib/constants';
import { UserData } from 'types/data';
import React, { FC, HTMLAttributes } from 'react';
import { ProfileInventory } from './profile-inventory';

export interface ContainerInventoryProps extends HTMLAttributes<HTMLDivElement> {
  user?: UserData;
}

export const ContainerInventory: FC<ContainerInventoryProps> = ({ user, children }) => {
  const router = useRouter();
  const { query } = router;

  return (
    <div className={'space-y-10 sm:space-y-20'}>
      {user && (
        <ProfileInventory
          banner={user.bannerUrl}
          avatar={user.avatarUrl}
          name={user.email}
          // bio={user.}
          // joined={format(new Date(user.createdAt), 'MM/dd/yyyy')}
          address={'0xbf....0cee'}
          socialLinks={[
            { link: '/', type: 'twitter' },
            { link: '/', type: 'discord' },
            { link: '/', type: 'website' },
          ]}
        />
      )}

      <div className="container">
        <Tabs
          data={USER_INVENTORY_TABS.map((tab) => ({
            ...tab,
            active: router.pathname.includes(`/${tab.value}`),
          }))}
          onChangeTab={(value) => {
            router.push(`/users/${query.userId}/inventory/${value}`);
          }}
          className="border-neutral-10 mb-7.5 bottom-1 flex justify-start border-b"
        />
        {children}
      </div>
    </div>
  );
};
