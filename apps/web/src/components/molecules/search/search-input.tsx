import * as React from 'react';
import { CrossIcon, FilterIcon, SearchIcon } from 'components/icons/outline';
import { ButtonIcon, Input } from 'components/atoms';
import { useSearchInput } from 'hooks/use-search-input';
import { Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { HamburgerSection, SearchResultsSkeleton } from 'components/molecules';
import Image from 'next/image';
import { fetcher } from 'lib/utils/fetcher';
import { useQuery } from '@tanstack/react-query';
import { Collection, Nft, User } from '@prisma/client';
import Link from 'next/link';
import { convertToSlug } from 'lib/utils/string';

export type SearchInputProps = React.HTMLAttributes<HTMLDivElement>;

export const SearchInput: React.FC<SearchInputProps> = () => {
  const [isShowingResults, setIsShowingResults] = useState(false);
  const { inputKey, searchKey, setInputKey } = useSearchInput();
  const {
    data: nfts,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [`/nft?category=${searchKey}`],
    queryFn: () => {
      return fetcher<{ data: Array<Nft & { user: User; collection: Collection }>; page: number; totalPages: number }>(
        `/nft?search=${searchKey}`,
      );
    },
    enabled: isShowingResults,
  });
  const handleChange = (event) => {
    const { value } = event.target;
    setInputKey(value);
    setIsShowingResults(!!value ? true : false);
  };
  const closeResults = () => {
    setIsShowingResults(false);
    setInputKey('');
  };

  const results = isError ? (
    <div className={'py-3 text-center'}>Oops! Something went wrong</div>
  ) : (
    <Fragment>
      {isLoading ? (
        <SearchResultsSkeleton />
      ) : (
        <div className={'divide-y'}>
          <div className={'p-3 font-medium capitalize'}>NFTs</div>
          <div className={'divide-y p-3'}>
            {nfts && nfts.data && nfts.data.length !== 0 ? (
              nfts.data.map((nft) => {
                return (
                  <Link
                    key={nft.id}
                    href={`/nfts/${nft.id}/${convertToSlug(nft.name)}`}
                    className={'flex items-start gap-3 py-3'}
                  >
                    {nft.image && (
                      <Image
                        src={nft.image}
                        className={'bg-neutral-10 inline-block aspect-square rounded-md object-cover object-center'}
                        width={60}
                        height={60}
                        alt={nft.name}
                      />
                    )}
                    <div className={'truncate'}>
                      <div>{nft.name}</div>
                      <small>{nft.description}</small>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className={'py-3 text-center'}>There is no available data!</div>
            )}
          </div>
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
        {searchKey && (
          <div className="w-max-sm w-full overflow-y-auto rounded-lg bg-white drop-shadow-2xl">{results}</div>
        )}
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
