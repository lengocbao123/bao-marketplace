import { Avatar } from '../components/atoms';
import { Layout } from '../components/layouts';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => (
  <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <div className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8">
      <h1 className="text-secondary mx-auto max-w-5xl text-center text-6xl font-extrabold leading-[1.1] tracking-tighter sm:text-7xl lg:text-8xl xl:text-8xl">
        Marketplace
      </h1>

      <Avatar
        name={'Phan the vuong'}
        src={
          'https://images.unsplash.com/photo-1664574654589-8f6c9b94c02d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
        }
        onlyAvatar={true}
      />

      <Avatar name={'Phan vuong'} size={'sm'} label={'Creator:'} />
      <Avatar name={'Phan vuong'} />
      <Avatar name={'Phan vuong'} size={'lg'} />
    </div>
  </div>
);

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
