import { Layout } from 'components/layouts';
import { Error, ExploreSection, ListNftsSkeleton } from 'components/molecules';
import { NftsFilters, NftsList } from 'components/organisms/nfts';
import { InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { useRouter } from 'next/router';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { ContainerInventory } from 'components/organisms';
import { useNftsFilter } from 'hooks/use-nfts-filter';
import { useNftsByOwnerUserId } from 'hooks/services';
import { getCollections, getNftsByOwnerUserId } from 'services';

export async function getServerSideProps({ req, res, query, resolvedUrl }) {
  const session = await unstable_getServerSession(req, res, authOptions);

  const nftQuery = {
    ...query,
    page: query.page ? query.page : 1,
    filter: 'owner',
  };
  delete nftQuery.userId;
  nftQuery[nftQuery.filter] = query.userId;

  const nftsQueryString = new URLSearchParams(nftQuery).toString();
  const [nfts, collections] = await Promise.all([
    getNftsByOwnerUserId(session, query.userId, nftsQueryString),
    getCollections(session, query.userId),
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
        [`/nft/exchange/list?owner=${query.userId}&${nftsQueryString}`]: nfts,
        '/collection/exchange/list': collections,
      },
    },
  };
}

const UserOwnNftsPage: NextPageWithLayout = ({
  nftsQueryString,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { convertedQuery, handleChange, resetFilter } = useNftsFilter(router.query);
  const { nfts, loading, error } = useNftsByOwnerUserId(router.query.userId as string, nftsQueryString);

  if (error) {
    return <Error />;
  }

  return (
    <ContainerInventory>
      <ExploreSection
        name={'nfts'}
        filtersComponent={<NftsFilters filter={convertedQuery} onChange={handleChange} />}
        filter={convertedQuery}
        onChangeFilter={handleChange}
        onResetFilter={resetFilter}
      >
        {!loading ? <NftsList nfts={nfts.list} meta={nfts.meta} /> : <ListNftsSkeleton number={10} />}
      </ExploreSection>
    </ContainerInventory>
  );
};

UserOwnNftsPage.getLayout = (page) => <Layout>{page}</Layout>;

export default UserOwnNftsPage;
