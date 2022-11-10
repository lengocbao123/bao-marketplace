import { useRouter } from 'next/router';
import { Layout } from 'components/layouts';
import { ExploreSection } from 'components/molecules';
import { ProfileInventory } from 'components/organisms';
import { NftsFilters, NftsList } from 'components/organisms/nfts';
import { NextPageWithLayout } from 'pages/_app';
import { fetcher } from 'lib/utils/fetcher';
import { InferGetServerSidePropsType } from 'next';
import useSWR from 'swr';
import { convertQueryParamsToArray } from 'lib/utils/query';
import { USER_INVENTORY_TABS } from 'lib/constants';
import { useEffect } from 'react';

export async function getServerSideProps({ query, resolvedUrl }) {
  const queryParams = {};
  Object.keys(query).forEach((key) => {
    if (key !== 'userId') {
      queryParams[key] = query[key];
    }
  });
  const nftsQueryString = new URLSearchParams({
    ...queryParams,
    page: query.page ? query.page : 1,
    filter: query.filter ? query.filter : 'on-sale',
  }).toString();

  const [nfts, collections] = await Promise.all([
    fetcher(`/nfts?user.id=${query.userId}&${nftsQueryString}`),
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
        [`/nfts?user.id=${query.userId}&${nftsQueryString}`]: nfts,
        '/collections?q=': collections,
      },
    },
  };
}

const UserNftsPage: NextPageWithLayout = ({
  nftsQueryString,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { query } = router;
  const { data: nfts, error: errorNfts } = useSWR(`/nfts?user.id=${query.userId}&${nftsQueryString}`);

  useEffect(() => {
    if (query.filter === 'collections') {
      router.push({ pathname: `/users/[userId]/collections`, query: router.query });
    } else {
      router.push({ pathname: `/users/[userId]/nfts`, query: router.query });
    }
  }, [query.filter]);

  if (errorNfts) {
    return <div>failed to load</div>;
  }

  if (!nfts) {
    return <div>loading...</div>;
  }

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
    <div className={'space-y-10 sm:space-y-20'}>
      <ProfileInventory
        banner="https://ik.imagekit.io/gsozk5bngn/Rectangle_287_DpMLXUW9H.png"
        avatar={'https://ik.imagekit.io/gsozk5bngn/product/image-3_suhW2eBcF.jpg'}
        name={'Shushio'}
        bio={
          'I really like this one. I was playing around with some Illustrator tutorials when I decided I wanted to make a pixel styled wallpaper. It started with the idea if having well known pixel game characters and the text I <3 Pixel'
        }
        joined={'July 2022'}
        address={'0xbf....0cee'}
        socialLinks={[
          { link: '/', type: 'twitter' },
          { link: '/', type: 'discord' },
          { link: '/', type: 'website' },
        ]}
      />
      <div className="container">
        <ExploreSection
          filtersComponent={<NftsFilters filter={convertedQuery} onChange={handlerFilterChange} />}
          tabs={USER_INVENTORY_TABS.map((tab) => ({
            ...tab,
            active: tab.value === query.filter,
          }))}
          tabsClassName="border-neutral-10 mb-7.5 bottom-1 flex justify-start border-b"
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
      </div>
    </div>
  );
};

UserNftsPage.getLayout = (page) => <Layout>{page}</Layout>;

export default UserNftsPage;
