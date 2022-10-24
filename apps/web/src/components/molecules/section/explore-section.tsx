import clsx from 'clsx';
import { FC, Fragment, HTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { HamburgerSection, TabLinkData, TabsLink } from '..';
import { FilterType } from '../../../hooks/use-filters';
import { Button } from '../../atoms';
import { FilterIcon } from '../../icons/outline';
import { ExploreActions, ExploreFilterToggle } from '../../organisms';

export interface ExploreSectionProps extends HTMLAttributes<HTMLDivElement> {
  filtersComponent: ReactNode;
  tabs?: Array<TabLinkData>;
  tabsClassName?: string;
  bodyClassName?: string;
  filter: FilterType;
}
export const ExploreSection: FC<ExploreSectionProps> = ({
  filtersComponent,
  children,
  tabs,
  tabsClassName,
  bodyClassName,
  filter
}) => {
  const [isDisplayingFilter, setIsDisplayingFilter] = useState(true);
  const [numOfFilters, setNumOfFilters] = useState(0);

  useEffect(() => {
    let count = 0;
    Object.values(filter).forEach((filterValue) => {
      count += filterValue.length;
    });
    setNumOfFilters(count);
  }, [filter]);

  return (
    <Fragment>
      <TabsLink
        data={tabs.map((item) => ({
          ...item
        }))}
        className={clsx(tabsClassName)}
      />
      <div className={clsx(bodyClassName)}>
        <div className="flex justify-between">
          <HamburgerSection
            className="block sm:hidden"
            openButton={
              <ExploreFilterToggle
                numOfFilters={numOfFilters}
                onToggle={() => setIsDisplayingFilter(!isDisplayingFilter)}
              />
            }
            heading="Filters"
            openButtonIcon={FilterIcon}
          >
            {filtersComponent}
            <div className="border-neutral-10 bg-neutral-0 sticky bottom-0 z-10 grid grid-cols-2 gap-4 border-t p-5">
              <Button label="Clear all" variant="tertiary" />
              <Button label="Apply" variant="secondary" />
            </div>
          </HamburgerSection>
          <ExploreActions
            isDisplayingFilter={isDisplayingFilter}
            numOfFilters={numOfFilters}
            className="mb-5"
            toggleFilter={() => setIsDisplayingFilter(!isDisplayingFilter)}
            onClearFilter={() => {
              console.log('onClearFilter');
            }}
          />
        </div>

        <div className="grid grid-cols-4 gap-6">
          {isDisplayingFilter && <div className="col-span-1 hidden sm:block">{filtersComponent}</div>}
          <div className={clsx('col-span-4', isDisplayingFilter ? 'sm:col-span-3' : '')}>{children}</div>
        </div>
      </div>
    </Fragment>
  );
};
