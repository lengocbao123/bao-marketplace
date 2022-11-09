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
    fetcher('/nfts?_limit=8&category=b1527454-385d-4c9e-b91d-f84c6a1b6e12'),
    fetcher('/collections'),
    fetcher('/top-collections'),
    fetcher('/periods'),
  ]);

  return {
    props: {
      session,
      fallback: {
        '/categories': categories,
        '/nfts?_limit=8&category=b1527454-385d-4c9e-b91d-f84c6a1b6e12': nfts,
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
