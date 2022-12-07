import { useRouter } from 'next/router';
import { Error, Tabs } from 'components/molecules';
import { USER_INVENTORY_TABS } from 'lib/constants';
import { UserResponse } from 'types/data';
import React, { FC, HTMLAttributes } from 'react';
import { ProfileInventory } from './profile-inventory';
import useSWR from 'swr';
import { isSuccess } from 'lib/utils/response';
import { format } from 'date-fns';

export type ContainerInventoryProps = HTMLAttributes<HTMLDivElement>;

export const ContainerInventory: FC<ContainerInventoryProps> = ({ children }) => {
  const router = useRouter();
  const { query } = router;
  const { data: userResponse, error: errorUser } = useSWR<UserResponse>(`/user/exchange/${query.userId}`);
  console.log({
    userResponse,
    errorUser,
  });
  if (!userResponse) {
    return <div>loading</div>;
  }
  if (errorUser || !isSuccess(userResponse.message)) {
    return <Error />;
  }

  const user = userResponse.data;

  return (
    <div className={'space-y-10 sm:space-y-20'}>
      {user && (
        <ProfileInventory
          banner={user.bannerUrl}
          avatar={user.avatarUrl}
          name={user.email}
          // bio={user.}
          joined={format(new Date(user.created_at), 'MM/dd/yyyy')}
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
