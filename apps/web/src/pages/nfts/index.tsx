import { Layout } from 'components/layouts';
import { Error, ExploreSection, ListNftsSkeleton, TabData } from 'components/molecules';
import { NftsFilters, NftsList } from 'components/organisms/nfts';
import { fetcher } from 'lib/utils/fetcher';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { NextPageWithLayout } from 'pages/_app';
import { Fragment } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { convertQueryParamsToArray } from 'lib/utils/query';
import { CategoriesResponse, NftsResponse } from 'types/data';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { isSuccess } from 'lib/utils/response';

export async function getServerSideProps({ req, res, query, resolvedUrl }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const nftsQueryString = new URLSearchParams({
    ...query,
    page: query.page ? query.page : 1,
    filter: query.filter ? query.filter : 'all',
  }).toString();
  const fetchApi = fetcher(session);
  const [categories, nfts, collections] = await Promise.all([
    fetchApi<CategoriesResponse>('/category/list'),
    fetchApi<NftsResponse>(`/nft/exchange/list?${nftsQueryString}`),
    fetchApi('/collection/exchange/list'),
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
        '/category/list': categories,
        [`/nft/exchange/list?${nftsQueryString}`]: nfts,
        '/collection/exchange/list?q=': collections,
      },
    },
  };
}

const ExplorePage: NextPageWithLayout = ({
  nftsQueryString,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { data: categoriesResponse, error: errorCategories } = useSWR<CategoriesResponse>('/category/list');
  const { data: nftsResponse, error: errorNfts } = useSWR<NftsResponse>(`/nft/exchange/list?${nftsQueryString}`);
  const { query } = router;
  if (errorCategories || errorNfts || !isSuccess(nftsResponse.message) || !isSuccess(categoriesResponse.message)) {
    return <Error />;
  }

  const categoryTabs: TabData[] = [
    {
      id: 'all',
      name: 'All',
      code: 'all',
    },
    ...categoriesResponse.data,
  ].map((item) => ({
    label: item.name,
    value: item.id,
    active: item.id === query.filter,
  }));

  const resetFilter = async () => {
    const resetQuery = { page: 1, filter: query.filter };
    if (query.sort) {
      resetQuery['sort'] = query.sort;
    }
    await router.push(
      {
        pathname: router.pathname,
        query: resetQuery,
      },
      undefined,
      {
        scroll: false,
      },
    );
  };

  const handlerFilterChange = async (key: string, value: any) => {
    await router.push(
      {
        pathname: router.pathname,
        query: { ...query, [key]: value },
      },
      undefined,
      {
        scroll: false,
      },
    );
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
        {nftsResponse ? (
          <NftsList nfts={nftsResponse.data.list} meta={nftsResponse.data.meta} />
        ) : (
          <ListNftsSkeleton number={10} />
        )}
      </ExploreSection>
    </Fragment>
  );
};

ExplorePage.getLayout = (page) => <Layout>{page}</Layout>;

export default ExplorePage;
