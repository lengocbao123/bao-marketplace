import { Layout } from '../components/layouts';
import { Community, Explorer, Hero, Instruction, TopCollections } from '../components/organisms';
import { COLLECTIONS } from '../lib/dummy';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return (
    <div className={'space-y-10 sm:space-y-20'}>
      <Hero />
      <Explorer />
      <TopCollections collections={COLLECTIONS} />
      <Instruction />
      <Community />
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
