import { Layout } from 'components/layouts';
import { Error, ExploreSection, ListNftsSkeleton } from 'components/molecules';
import { NftsFilters, NftsList } from 'components/organisms/nfts';
import { fetcher } from 'lib/utils/fetcher';
import { InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { convertQueryParamsToArray } from 'lib/utils/query';
import { NftsResponse } from 'types/data';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { isSuccess } from 'lib/utils/response';
import { ContainerInventory } from 'components/organisms';

export async function getServerSideProps({ req, res, query, resolvedUrl }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const nftQuery = {
    ...query,
    page: query.page ? query.page : 1,
    filter: 'createdBy',
  };
  delete nftQuery.userId;
  nftQuery[nftQuery.filter] = query.userId;
  const nftsQueryString = new URLSearchParams(nftQuery).toString();
  const fetchApi = fetcher(session);
  const [nfts, collections] = await Promise.all([
    fetchApi<NftsResponse>(`/nft/exchange/list?${nftsQueryString}`),
    fetchApi('/collection/exchange/list'),
  ]);

  if (!query.page) {
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
        [`/nft/exchange/list?${nftsQueryString}`]: nfts,
        '/collection/exchange/list': collections,
      },
    },
  };
}

const UserCreateNftsPage: NextPageWithLayout = ({
  nftsQueryString,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { query } = router;
  const { data: nftsResponse, error: errorNfts } = useSWR<NftsResponse>(`/nft/exchange/list?${nftsQueryString}`);

  if (errorNfts || !isSuccess(nftsResponse.message)) {
    return <Error />;
  }

  const resetFilter = async () => {
    const resetQuery = { page: 1 };
    if (query.sort) {
      resetQuery['sort'] = query.sort;
    }
    await router.push({
      pathname: router.pathname,
      query: resetQuery,
    });
  };

  const handlerFilterChange = async (key: string, value: any) => {
    let newQuery = query;
    if (key === 'price') {
      newQuery = { ...newQuery, priceMin: value[0], priceMax: value[1] };
    } else {
      newQuery = { ...query, [key]: value };
    }
    await router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  const convertedQuery = convertQueryParamsToArray(query);

  return (
    <ContainerInventory>
      <ExploreSection
        name={'nfts'}
        filtersComponent={
          <NftsFilters
            filter={convertedQuery}
            onChange={handlerFilterChange}
            collectionsQuery={new URLSearchParams({ createdBy: query.userId } as any).toString()}
          />
        }
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
    </ContainerInventory>
  );
};

UserCreateNftsPage.getLayout = (page) => <Layout>{page}</Layout>;

export default UserCreateNftsPage;
