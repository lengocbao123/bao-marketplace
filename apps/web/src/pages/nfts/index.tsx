import { Layout } from 'components/layouts';
import { ExploreSection } from 'components/molecules';
import { NftsFilters, NftsList } from 'components/organisms/nfts';
import { fetcher } from 'lib/utils/fetcher';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { NextPageWithLayout } from 'pages/_app';
import { Fragment } from 'react';
import useSWR from 'swr';
import queryString from 'query-string';
import { useRouter } from 'next/router';

export async function getServerSideProps({ query, resolvedUrl }) {
  const nftsQuery = queryString.stringify({
    ...query,
    page: query.page ? query.page : 1,
    category: query.category ? query.category : 'all',
  });
  const [categories, nfts, collections] = await Promise.all([
    fetcher('/categories'),
    fetcher(`/nfts?${nftsQuery}`),
    fetcher('/collections'),
  ]);

  if (!query.page || !query.category) {
    return {
      redirect: {
        destination: `${resolvedUrl}?${nftsQuery}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      nftsQuery,
      fallback: {
        '/categories': categories,
        [`/nfts?${nftsQuery}`]: nfts,
        '/collections?q=': collections,
      },
    },
  };
}

const ExplorePage: NextPageWithLayout = ({ nftsQuery }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const query = queryString.parse(nftsQuery, { arrayFormat: 'bracket', parseNumbers: true, parseBooleans: true });
  const router = useRouter();
  const { data: categories, error: errorCategories } = useSWR('/categories');
  const { data: nfts, error: errorNfts } = useSWR(`/nfts?${nftsQuery}`);

  if (errorCategories || errorNfts) {
    return <div>failed to load</div>;
  }

  if (!categories || !nfts) {
    return <div>loading...</div>;
  }

  const categoryTabs = [
    {
      id: 'all',
      name: 'All',
      code: 'all',
    },
    ...categories,
  ].map((item) => ({
    label: item.name,
    value: item.id,
    active: item.id === query.category,
  }));

  const resetFilter = () => {
    const newQuery = { page: 1, category: query.category };
    router.push({
      pathname: router.pathname,
      query: queryString.stringify(newQuery, { arrayFormat: 'bracket' }),
    });
  };

  const handlerFilterChange = (key: string, value: any) => {
    router.push({
      pathname: router.pathname,
      query: queryString.stringify({ ...query, [key]: value }, { arrayFormat: 'bracket' }),
    });
  };

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
        filtersComponent={<NftsFilters filter={query} onChange={handlerFilterChange} />}
        tabs={categoryTabs}
        tabsClassName="border-neutral-10 mb-7.5 bottom-1 flex justify-start border sm:justify-center"
        bodyClassName="container"
        filter={query}
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
