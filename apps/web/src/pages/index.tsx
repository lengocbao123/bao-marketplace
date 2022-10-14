import { Layout } from '../components/layouts';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return <div></div>;
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
