import { Fragment } from 'react';
import { Layout } from '../components/layouts';
import { Hero } from '../components/molecules/hero';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return (
    <Fragment>
      <Hero />
    </Fragment>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
