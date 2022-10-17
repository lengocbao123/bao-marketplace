import { Layout } from '../components/layouts';
import { Hero } from '../components/molecules';
import { Community, Explorer, Instruction, TopCollections } from '../components/organisms';
import { COLLECTIONS } from '../lib/dummy';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return (
    <div className={'space-y-20'}>
      <Hero />
      <Explorer viewMorePageUrl="/explore" />
      <TopCollections collections={COLLECTIONS} viewMorePageUrl="/collections" />
      <Instruction />
      <Community />
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
