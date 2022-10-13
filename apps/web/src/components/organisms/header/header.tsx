import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import Link from 'next/link';
import { FC, Fragment, HTMLAttributes } from 'react';
import { Avatar, Button, ButtonIcon, Input } from '../../atoms';
import { PikassoColorIcon } from '../../icons/brand';
import { SearchIcon, WalletIcon } from '../../icons/outline';
import { CaretDownIcon } from '../../icons/solid';

/* ---------------------------------------------------------------------------------------------------------------------
 * User Menu
 * ------------------------------------------------------------------------------------------------------------------ */
export type HeaderUserMenuProps = HTMLAttributes<HTMLElement>;

const HeaderUserMenu: FC<HeaderUserMenuProps> = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <Fragment>
          <div className="">
            <Menu.Button className={clsx('flex items-center gap-2', open && 'bg-neutral-10 -m-1 rounded-full p-1')}>
              <Avatar
                name={'John Doe'}
                src={
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
            <Menu.Items className="shadow-box-hover absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={clsx(
                        'flex w-full items-center rounded-md px-2 py-2 text-sm',
                        active && 'bg-neutral-10'
                      )}
                      href="/"
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
                        active && 'bg-neutral-10'
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
                        active && 'bg-accent-error/10'
                      )}
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

  const isSignin = false;

  return (
    <header {...headerProps}>
      <div className={'container'}>
        <div className={'flex items-center justify-between gap-5 py-5'}>
          <Link href={'/'}>
            <span className={'sr-only'}>Pikasso</span>
            <PikassoColorIcon width="136" height="34" />
          </Link>

          <nav className="flex grow gap-5 font-medium">
            <Link className={'px-2.5'} href={'/'}>
              Explore
            </Link>
            <Link className={'px-2.5'} href={'/'}>
              Collection
            </Link>
            <Link className={'px-2.5'} href={'/'}>
              Collection
            </Link>
          </nav>

          <form className={'max-w-xs grow'}>
            <Input
              type={'search'}
              Icon={SearchIcon}
              iconOrientation={'right'}
              placeholder={'Search items, collections,....'}
            />
          </form>

          {isSignin ? (
            <div className="">
              <Button label={'Sign in'} />
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <Button label={'Create'} />

              <ButtonIcon variant={'tertiary'} icon={WalletIcon} />

              <HeaderUserMenu />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};