import { Layout } from 'components/layouts';
import { Community, Explorer, Hero, Instruction, PopularCollections, TopCollections } from 'components/organisms';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { NextPageWithLayout } from './_app';
import { authOptions } from './api/auth/[...nextauth]';
import prisma from 'lib/prismadb';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const [collections, topCollections] = await Promise.all([
    prisma.collection.findMany({ take: 10 }),
    prisma.collection.findMany({ take: 10 }),
  ]);

  return {
    props: {
      session,
      collections: JSON.stringify(collections),
      topCollections: JSON.stringify(topCollections),
    },
  };
};

const Home: NextPageWithLayout = ({
  collections,
  topCollections,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="space-y-10 sm:space-y-20">
      <Hero />
      <Explorer />
      <PopularCollections collections={JSON.parse(collections)} />
      <TopCollections collections={JSON.parse(topCollections)} />
      <Instruction />
      <Community />
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
