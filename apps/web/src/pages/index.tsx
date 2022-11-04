import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { Layout } from 'components/layouts';
import { Community, Explorer, Hero, Instruction, PopularCollections, TopCollections } from 'components/organisms';
import { COLLECTIONS } from 'lib/dummy';
import { authOptions } from './api/auth/[...nextauth]';
import { NextPageWithLayout } from './_app';
import { getCategories, getNfts, getPopularCollections, getCollectionsRanking } from 'lib/services';
import { ENDPOINT_GET_COLLECTIONS_RANKING, ENDPOINT_GET_POPULAR_COLLECTIONS } from 'lib/constants/endpoint';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const categories = await getCategories();
  const nfts = await getNfts({ _limit: 8 });
  const popularCollections = await getPopularCollections();
  const collectionsRanking = await getCollectionsRanking('24h');

  return {
    props: {
      session,
      fallback: {
        '/categories': categories,
        '/nfts?_limit=8': nfts,
        [ENDPOINT_GET_POPULAR_COLLECTIONS]: popularCollections,
        [`${ENDPOINT_GET_COLLECTIONS_RANKING}-24h`]: collectionsRanking
      }
    }
  };
};

const Home: NextPageWithLayout = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className={'space-y-10 sm:space-y-20'}>
      <Hero />
      <Explorer />
      <PopularCollections />
      <TopCollections collections={COLLECTIONS} />
      <Instruction />
      <Community />
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
