import { Layout } from 'components/layouts';
import { Community, Explorer, Hero, Instruction, PopularCollections, TopCollections } from 'components/organisms';
import { fetcher } from 'lib/utils/fetcher';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { NextPageWithLayout } from './_app';
import { authOptions } from './api/auth/[...nextauth]';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  const [categories, nfts, collections, topCollections, periods] = await Promise.all([
    fetcher('/categories'),
    fetcher('/nfts'),
    fetcher('/collections'),
    fetcher('/top-collections'),
    fetcher('/periods'),
  ]);

  return {
    props: {
      session,
      fallback: {
        '/categories': categories,
        '/nfts': nfts,
        '/collections': collections,
        '/top-collections': topCollections,
        '/periods': periods,
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
