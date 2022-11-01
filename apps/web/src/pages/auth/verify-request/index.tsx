import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { ButtonLink } from '../../../components/atoms';
import { CheckMailGraphic } from '../../../components/icons/graphic';
import { SimpleLayout } from '../../../components/layouts';
import { redirectIfAuthenticated } from '../../../lib/utils/server';
import { authOptions } from '../../api/auth/[...nextauth]';
import { NextPageWithLayout } from '../../_app';
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    return redirectIfAuthenticated();
  }
  return {
    props: {}
  };
};
const Index: NextPageWithLayout = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { email } = router.query as { email: string };

  return (
    <Fragment>
      <NextSeo title="Verification Code" />
      <div className="mx-auto my-auto flex max-w-md flex-col items-center justify-center text-center">
        <CheckMailGraphic width={420} height={210} className="h-auto w-full" />
        <h2 className="mt-4 text-2xl font-bold md:mt-5 md:text-3xl">Verification Code</h2>
        <p className="mt-3 text-sm md:mt-4 md:text-base">
          We sent a 6-character code to {email ? <strong>{email}</strong> : 'your email'}. To continue, please click the
          link we’ve just sent to your email.
        </p>
        <ButtonLink className="mt-4" label="Back to homepage" href="/" />
      </div>
    </Fragment>
  );
};

Index.getLayout = (page) => <SimpleLayout>{page}</SimpleLayout>;

export default Index;
