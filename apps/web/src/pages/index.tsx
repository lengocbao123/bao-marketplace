import { Layout } from '../components/layouts';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8">
        <h1 className="text-secondary mx-auto block max-w-5xl text-center text-6xl font-extrabold leading-[1.1] tracking-tighter sm:text-7xl lg:text-8xl xl:text-8xl">
          Marketplace
        </h1>
      </div>
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
