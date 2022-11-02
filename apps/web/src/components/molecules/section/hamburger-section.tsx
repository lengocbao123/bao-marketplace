import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { FC, Fragment, HTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { Button, IconButton } from 'components/atoms';
import { CrossIcon, MenuIcon } from 'components/icons/outline';

export interface HamburgerSectionProps extends HTMLAttributes<HTMLDivElement> {
  openButtonIcon?: IconButton;
  heading?: string;
  openButton?: ReactNode;
}

export const HamburgerSection: FC<HamburgerSectionProps> = ({
  heading,
  openButtonIcon,
  children,
  className,
  openButton,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const OpenButtonIcon = openButtonIcon ? openButtonIcon : MenuIcon;
  useEffect(() => {
    if (open) {
      const handleRouteChange = () => {
        setOpen(false);
      };

      router.events.on('routeChangeComplete', handleRouteChange);

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [open, router.events]);

  useEffect(() => {
    if (open) {
      // handle window resize to close the menu
      const handleResize = () => {
        if (window.innerWidth < 640) {
          return;
        }
        setOpen(false);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [open]);

  return (
    <div className={clsx(className)} {...rest}>
      {!openButton ? (
        <Button size="lg" icon={OpenButtonIcon} variant={'tertiary'} onClick={() => setOpen(true)} />
      ) : (
        <div className="w-fit" onClick={() => setOpen(true)}>
          {openButton}
        </div>
      )}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-250"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-250"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="bg-neutral-70/60 fixed inset-0 backdrop-blur transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 left-0 flex w-full max-w-md">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-250"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-250"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen w-full ">
                    <div className="bg-neutral-0 flex h-full flex-col overflow-y-auto shadow-xl">
                      <div className="bg-neutral-0 sticky top-0 z-10 flex px-4 py-3">
                        <div className="relative z-10 flex w-full justify-between">
                          {heading && <p className="text-lg font-bold">{heading}</p>}
                          <Button icon={CrossIcon} variant={'tertiary'} onClick={() => setOpen(false)} />
                        </div>
                      </div>
                      <div className="relative mt-5 flex-1">{children}</div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
