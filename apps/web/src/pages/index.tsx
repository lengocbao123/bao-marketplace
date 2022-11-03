import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { Layout } from 'components/layouts';
import { Community, Explorer, Hero, Instruction, PopularCollections, TopCollections } from 'components/organisms';
import { COLLECTIONS } from 'lib/dummy';
import { authOptions } from './api/auth/[...nextauth]';
import { NextPageWithLayout } from './_app';
import { getCategories, getNfts } from 'lib/services';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const categories = await getCategories();
  const nfts = await getNfts({ _limit: 8 });

  return {
    props: {
      session,
      fallback: {
        '/categories': categories,
        '/nfts?_limit=8': nfts
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
