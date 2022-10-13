import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {}
  };
};

const Index: NextPage = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <div>Index</div>;
};

export default Index;
