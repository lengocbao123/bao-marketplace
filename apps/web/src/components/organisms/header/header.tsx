import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Avatar, Button, ButtonIcon, ButtonLink } from 'components/atoms';
import { PikassoColorIcon } from 'components/icons/brand';
import { EditIcon, PersonIcon, WalletIcon } from 'components/icons/outline';
import { CaretDownIcon } from 'components/icons/solid';
import { HamburgerDashboard } from 'components/organisms';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FC, Fragment, HTMLAttributes } from 'react';
import { UserData } from 'types/data';
import { SearchInput } from 'components/molecules/search';

/* ---------------------------------------------------------------------------------------------------------------------
 * User Menu
 * ------------------------------------------------------------------------------------------------------------------ */
export interface HeaderUserMenuProps extends HTMLAttributes<HTMLElement> {
  user: UserData;
}

const HeaderUserMenu: FC<HeaderUserMenuProps> = ({ user }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <Fragment>
          <div className="">
            <Menu.Button className={clsx('flex items-center gap-2', open && 'bg-neutral-10 -m-1 rounded-full p-1')}>
              <Avatar
                name={user.username}
                src={
                  user.avatarUrl ||
                  'https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80'
                }
                onlyAvatar
              />

              <CaretDownIcon className={clsx('text-2xl transition', open && '-rotate-180')} />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="shadow-box-hover absolute right-0 z-20 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={clsx(
                        'flex w-full items-center rounded-md px-2 py-2 text-sm',
                        active && 'bg-neutral-10',
                      )}
                      href="/settings/profile"
                    >
                      My Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={clsx(
                        'flex w-full items-center rounded-md px-2 py-2.5 text-sm',
                        active && 'bg-neutral-10',
                      )}
                      href="/"
                    >
                      Account Settings
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type={'button'}
                      className={clsx(
                        'text-accent-error active:bg-accent-error/20 flex w-full items-center rounded-md px-2 py-2.5 text-sm',
                        active && 'bg-accent-error/10',
                      )}
                      onClick={() => signOut()}
                    >
                      Log Out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Fragment>
      )}
    </Menu>
  );
};

/* ---------------------------------------------------------------------------------------------------------------------
 * Header
 * ------------------------------------------------------------------------------------------------------------------ */
export type HeaderProps = HTMLAttributes<HTMLElement>;

export const Header: FC<HeaderProps> = (props) => {
  const { ...headerProps } = props;

  const { data } = useSession();
  const isSignIn = !!data;

  return (
    <header {...headerProps}>
      <div className={'container'}>
        <div className={'flex items-center justify-between gap-5 py-5'}>
          <div className="flex grow items-center gap-5">
            <div className={'lg:hidden'}>
              <HamburgerDashboard />
            </div>

            <Link href={'/'} className={'-mt-2.5'}>
              <span className={'sr-only'}>Pikasso</span>
              <PikassoColorIcon width="136" height="34" />
            </Link>

            <nav className="hidden grow gap-5 font-medium lg:flex">
              <Link className={'px-2.5'} href={'/nfts'}>
                Explore
              </Link>
              <Link className={'px-2.5'} href={'/collections'}>
                Collection
              </Link>
              <Link className={'px-2.5'} href={'/'}>
                Resources
              </Link>
            </nav>
            <SearchInput />
          </div>

          {!isSignIn ? (
            <div className="">
              <div className={'sm:hidden'}>
                <ButtonIcon variant={'tertiary'} icon={PersonIcon} title={'Sign in'} />
              </div>

              <div className={'hidden sm:block'}>
                <ButtonLink href={'/auth/sign-in'} label={'Sign in'} />
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="sm:mr-5">
                <div className={'hidden lg:block xl:hidden'}>
                  <ButtonIcon variant={'tertiary'} icon={EditIcon} title={'Create'} />
                </div>

                <div className={'hidden sm:block lg:hidden xl:block'}>
                  <Button label={'Create'} />
                </div>
              </div>

              <div className={'hidden sm:mr-5 sm:block'}>
                <ButtonIcon variant={'tertiary'} icon={WalletIcon} title={'Wallet'} />
              </div>

              <HeaderUserMenu user={data.user} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
