import * as React from 'react';
import { CrossIcon, FilterIcon, SearchIcon } from 'components/icons/outline';
import { ButtonIcon, Input } from 'components/atoms';
import { useSearchInput } from 'hooks/use-search-input';
import { Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useSearch } from 'hooks/services/search';
import { SearchResultsSkeleton } from '../skeleton/search-results-skeleton';
import { SearchResults } from './search-results';
import { HamburgerSection } from '../section';

export type SearchInputProps = React.HTMLAttributes<HTMLDivElement>;

export const SearchInput: React.FC<SearchInputProps> = (props) => {
  const [isShowingResults, setIsShowingResults] = useState(false);
  const { inputKey, searchKey, setInputKey } = useSearchInput();
  const { data, loading } = useSearch(!!setInputKey, `q=${searchKey}`);
  const handleChange = (event) => {
    const { value } = event.target;
    setInputKey(value);
    setIsShowingResults(!!value ? true : false);
  };
  const closeResults = () => {
    setIsShowingResults(false);
    setInputKey('');
  };
  const results = (
    <Fragment>
      {loading ? (
        <SearchResultsSkeleton />
      ) : (
        <div>
          <SearchResults title={'Collections'} />
          <SearchResults title={'Nfts'} />
          <SearchResults title={'Accounts'} />
        </div>
      )}
    </Fragment>
  );
  const input = (
    <Input
      block
      type={'search'}
      value={inputKey}
      trailingAction={!isShowingResults ? <SearchIcon /> : <CrossIcon onClick={closeResults} />}
      placeholder={'Search items, collections,....'}
      onChange={handleChange}
    />
  );

  return (
    <div className={'w-max-sm relative flex grow justify-end'}>
      <HamburgerSection
        className="block sm:hidden"
        openButton={<ButtonIcon className={'lg:hidden'} icon={SearchIcon} />}
        openButtonIcon={FilterIcon}
        heading={'Search'}
      >
        <div className={'px-2'}>{input}</div>
        <div className="w-max-sm w-full overflow-y-auto rounded-lg bg-white drop-shadow-2xl">{results}</div>
      </HamburgerSection>
      <div className={'hidden sm:block'}>
        {input}
        <Transition
          show={isShowingResults}
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="w-max-sm absolute z-10 mt-1 h-96 w-full overflow-y-auto rounded-lg bg-white drop-shadow-2xl">
            {results}
          </div>
        </Transition>
      </div>
    </div>
  );
};
