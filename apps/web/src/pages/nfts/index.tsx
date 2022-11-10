import { Layout } from 'components/layouts';
import { ExploreSection, TabData } from 'components/molecules';
import { NftsFilters, NftsList } from 'components/organisms/nfts';
import { fetcher } from 'lib/utils/fetcher';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { NextPageWithLayout } from 'pages/_app';
import { Fragment } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { convertQueryParamsToArray } from '../../lib/utils/query';

export async function getServerSideProps({ query, resolvedUrl }) {
  const nftsQueryString = new URLSearchParams({
    ...query,
    page: query.page ? query.page : 1,
    filter: query.filter ? query.filter : 'all',
  }).toString();

  const [categories, nfts, collections] = await Promise.all([
    fetcher('/categories'),
    fetcher(`/nfts?${nftsQueryString}`),
    fetcher('/collections'),
  ]);

  if (!query.page || !query.filter) {
    return {
      redirect: {
        destination: `${resolvedUrl}?${nftsQueryString}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      nftsQueryString,
      fallback: {
        '/categories': categories,
        [`/nfts?${nftsQueryString}`]: nfts,
        '/collections?q=': collections,
      },
    },
  };
}

const ExplorePage: NextPageWithLayout = ({
  nftsQueryString,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { data: categories, error: errorCategories } = useSWR('/categories');
  const { data: nfts, error: errorNfts } = useSWR(`/nfts?${nftsQueryString}`);
  const { query } = router;
  if (errorCategories || errorNfts) {
    return <div>failed to load</div>;
  }

  if (!categories || !nfts) {
    return <div>loading...</div>;
  }

  const categoryTabs: TabData[] = [
    {
      id: 'all',
      name: 'All',
      code: 'all',
    },
    ...categories,
  ].map((item) => ({
    label: item.name,
    value: item.id,
    active: item.id === query.filter,
  }));

  const resetFilter = () => {
    router.push({
      pathname: router.pathname,
      query: { page: 1, filter: query.filter },
    });
  };

  const handlerFilterChange = (key: string, value: any) => {
    router.push({
      pathname: router.pathname,
      query: { ...query, [key]: value },
    });
  };

  const convertedQuery = convertQueryParamsToArray(query);

  return (
    <Fragment>
      <Image
        src={'/assets/images/banner/banner.png'}
        width={1440}
        height={144}
        alt="Explore Banner"
        className={'bg-neutral-10 aspect-[1440/144] w-full object-cover object-center'}
      />
      <ExploreSection
        filtersComponent={<NftsFilters filter={convertedQuery} onChange={handlerFilterChange} />}
        tabs={categoryTabs}
        tabsClassName="border-neutral-10 mb-7.5 bottom-1 flex justify-start border sm:justify-center"
        bodyClassName="container"
        filter={convertedQuery}
        onChangeFilter={handlerFilterChange}
        onResetFilter={resetFilter}
      >
        <NftsList
          nfts={nfts}
          meta={{ totalItems: 8, itemCount: 8, itemsPerPage: 10, totalPages: 3, currentPage: query.page }}
        />
      </ExploreSection>
    </Fragment>
  );
};

ExplorePage.getLayout = (page) => <Layout>{page}</Layout>;

export default ExplorePage;
