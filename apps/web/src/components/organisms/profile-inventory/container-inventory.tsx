import { useRouter } from 'next/router';
import { Tabs } from 'components/molecules';
import { USER_INVENTORY_TABS } from 'lib/constants';
import React, { FC, HTMLAttributes } from 'react';
import { ProfileInventory } from './profile-inventory';
import { User } from '@prisma/client';

export type ContainerInventoryProps = HTMLAttributes<HTMLDivElement> & {
  user: User;
};

export const ContainerInventory: FC<ContainerInventoryProps> = ({ children, user }) => {
  const router = useRouter();
  const { query } = router;

  return (
    <div className={'space-y-10 sm:space-y-20'}>
      {user && (
        <ProfileInventory
          banner={user.bannerUrl}
          avatar={user.avatar}
          name={user.username}
          joined={''}
          address={''}
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
