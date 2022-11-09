import clsx from 'clsx';
import { FC, Fragment, HTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { HamburgerSection, Tabs } from '..';
import { FilterType } from 'hooks/use-filters';
import { Button } from 'components/atoms';
import { FilterIcon } from 'components/icons/outline';
import { ExploreActions, ExploreFilterToggle } from 'components/organisms';
import { useRouter } from 'next/router';

export interface ExploreSectionProps extends HTMLAttributes<HTMLDivElement> {
  filtersComponent: ReactNode;
  tabs?: Array<any>;
  tabsClassName?: string;
  bodyClassName?: string;
  filter: FilterType;
  onChangeFilter: (key: string, value: any) => void;
  onResetFilter: () => void;
}
export const ExploreSection: FC<ExploreSectionProps> = ({
  filtersComponent,
  children,
  tabs,
  tabsClassName,
  bodyClassName,
  filter,
  onChangeFilter,
  onResetFilter,
}) => {
  const router = useRouter();
  const [isDisplayingFilter, setIsDisplayingFilter] = useState(true);
  const { category = '' } = router.query;
  const [numberOfFilters, setNumberOfFilters] = useState<number>(0);
  const handleSelectSort = async (sort) => {
    await onChangeFilter('sort', JSON.stringify(sort.value));
  };

  useEffect(() => {
    let count = 0;
    if (filter.status) {
      count = count + filter.status.length;
    }
    if (filter.blockchain) {
      count = count + filter.blockchain.length;
    }
    if (filter.price) {
      count = count + 1;
    }
    if (filter.collection) {
      count = count + filter.collection.length;
    }
    setNumberOfFilters(count);
  }, [filter]);

  return (
    <Fragment>
      <Tabs
        data={tabs.map((item) => ({
          ...item,
          active: item.value === category,
        }))}
        onChange={(value) => {
          onChangeFilter('category', value);
        }}
        className={clsx(tabsClassName)}
      />

      <div className={clsx(bodyClassName)}>
        <div className="flex justify-between">
          <HamburgerSection
            className="block sm:hidden"
            openButton={
              <ExploreFilterToggle
                numOfFilters={numberOfFilters}
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
            numOfFilters={numberOfFilters}
            className="mb-5"
            toggleFilter={() => setIsDisplayingFilter(!isDisplayingFilter)}
            selectedSortOption={filter.sort ? JSON.parse(filter.sort) : null}
            onClearFilter={onResetFilter}
            onSelectSort={handleSelectSort}
          />
        </div>

        <div className="flex space-x-0 sm:space-x-6">
          {isDisplayingFilter && (
            <div className="hidden w-full sm:block sm:w-[282px] sm:flex-none">{filtersComponent}</div>
          )}
          <div className="grow">{children}</div>
        </div>
      </div>
    </Fragment>
  );
};
