import { Disclosure, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { CaretDownIcon } from 'components/icons/solid';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { ComponentType, FC, Fragment, SVGProps, useMemo } from 'react';

export interface MenuItemProps extends LinkProps {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  children?: MenuItemProps[];
}

export const MenuItem: FC<MenuItemProps> = ({ Icon, label, children, ...rest }) => {
  const router = useRouter();
  const isActive = useMemo(() => {
    if (rest.href === '/') {
      return false;
    }

    return router.pathname.startsWith(rest.href as string);
  }, [router.pathname, rest.href]);

  if (children) {
    return (
      <Disclosure as="div" className="grid gap-2" defaultOpen={isActive}>
        {({ open }) => (
          <Fragment>
            <Disclosure.Button
              className={clsx(
                'flex items-center gap-2 rounded-xl py-2.5 px-3 text-sm font-medium',
                isActive ? 'text-neutral' : 'hover:text-neutral text-neutral-50',
                open ? 'bg-neutral-50/10' : 'hover:bg-neutral-50/10',
              )}
            >
              <Icon className="text-2xl" />
              <span>{label}</span>
              <CaretDownIcon
                className={clsx('text-neutral ml-auto text-2xl transition-transform', { 'rotate-180': open })}
              />
            </Disclosure.Button>

            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform -translate-y-4 opacity-0"
              enterTo="transform translate-y-0 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform translate-y-0 opacity-100"
              leaveTo="transform -translate-y-4 opacity-0"
            >
              <Disclosure.Panel className="grid gap-2 pl-4">
                {children.map((child, index) => (
                  <MenuItem key={index} {...child} />
                ))}
              </Disclosure.Panel>
            </Transition>
          </Fragment>
        )}
      </Disclosure>
    );
  }

  return (
    <Link
      className={clsx(
        'flex items-center gap-2 rounded-xl py-2.5 px-3 text-sm font-medium',
        isActive
          ? 'text-neutral-0 bg-neutral'
          : 'hover:bg-neutral/20 hover:text-neutral focus:text-neutral focus:bg-neutral/50 text-neutral-50',
      )}
      {...rest}
      prefetch={false}
      shallow={false}
    >
      <Icon className="text-2xl" />
      <span>{label}</span>
    </Link>
  );
};
