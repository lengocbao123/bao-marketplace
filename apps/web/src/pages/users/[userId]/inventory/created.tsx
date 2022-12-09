import { Layout } from 'components/layouts';
import { Error, ExploreSection, ListNftsSkeleton } from 'components/molecules';
import { NftsFilters, NftsList } from 'components/organisms/nfts';
import { InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { useRouter } from 'next/router';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { ContainerInventory } from 'components/organisms';
import { useFilter } from 'hooks/use-filter';
import { useNftsByCreatedUserId } from 'hooks/services';
import { getCollectionsByUserId, getNftsByCreatedUserId } from 'services';

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
  const [nfts, collections] = await Promise.all([
    getNftsByCreatedUserId(session, query.userId, nftsQueryString),
    getCollectionsByUserId(session, query.userId, ''),
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
        [`/nft/exchange/list?createdBy=${query.userId}&${nftsQueryString}`]: nfts,
        '/collection/exchange/list': collections,
      },
    },
  };
}

const UserCreateNftsPage: NextPageWithLayout = ({
  nftsQueryString,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { nfts, loading, error } = useNftsByCreatedUserId(router.query.userId as string, nftsQueryString);
  const { query, convertedQuery, handleChange, resetFilter } = useFilter(router.query);

  if (error) {
    return <Error />;
  }

  return (
    <ContainerInventory>
      <ExploreSection
        name={'nfts'}
        filtersComponent={
          <NftsFilters
            filter={convertedQuery}
            onChange={handleChange}
            collectionsQuery={new URLSearchParams({ createdBy: query.userId } as any).toString()}
          />
        }
        filter={convertedQuery}
        onChangeFilter={handleChange}
        onResetFilter={resetFilter}
      >
        {!loading ? <NftsList nfts={nfts.list} meta={nfts.meta} /> : <ListNftsSkeleton number={10} />}
      </ExploreSection>
    </ContainerInventory>
  );
};

UserCreateNftsPage.getLayout = (page) => <Layout>{page}</Layout>;

export default UserCreateNftsPage;
