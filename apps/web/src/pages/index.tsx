import { Layout } from 'components/layouts';
import { Community, Explorer, Hero, Instruction, PopularCollections, TopCollections } from 'components/organisms';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { NextPageWithLayout } from './_app';
import { authOptions } from './api/auth/[...nextauth]';
import { getCategories, getFeatureNfts, getPopularCollections, getTopCollections } from 'services';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const [categories, nfts, collections, topCollections] = await Promise.all([
    getCategories(session),
    getFeatureNfts(session, 'limit=8'),
    getPopularCollections(session),
    getTopCollections(session, 'period=24h'),
  ]);

  return {
    props: {
      session,
      fallback: {
        '/category/list': categories,
        '/nft/exchange/list?limit=8': nfts,
        '/collection/exchange/list': collections,
        '/collection/exchange/list?period=24h': topCollections,
      },
    },
  };
};

const Home: NextPageWithLayout = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className={'space-y-10 sm:space-y-20'}>
      <Hero />
      <Explorer />
      <PopularCollections />
      <TopCollections />
      <Instruction />
      <Community />
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
