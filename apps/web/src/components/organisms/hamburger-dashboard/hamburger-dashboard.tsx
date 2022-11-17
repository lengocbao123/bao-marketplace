import clsx from 'clsx';
import { Copywriter } from 'components/atoms';
import { HamburgerSection } from 'components/molecules';
import { MenuDashboard } from 'components/molecules/menu/menu-dashboard';
import { FC, HTMLAttributes } from 'react';

export type HamburgerBuyerProps = HTMLAttributes<HTMLDivElement>;

export const HamburgerDashboard: FC<HamburgerBuyerProps> = ({ className, ...rest }) => {
  return (
    <div className={clsx(className)} {...rest}>
      <HamburgerSection dialogClassName={'!z-10'}>
        <div className="relative h-full flex-1 px-4 pt-5">
          <div className="flex h-full flex-col">
            <div className="grow py-2">
              <MenuDashboard />
            </div>
            <div className="border-neutral-10 bg-neutral-0 sticky bottom-0 z-10 border-t pt-4 pb-5">
              <Copywriter />
            </div>
          </div>
        </div>
      </HamburgerSection>
    </div>
  );
};
