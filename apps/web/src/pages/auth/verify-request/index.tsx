import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '../../../components/atoms';
import { CheckMailGraphic } from '../../../components/icons/graphic';
import { SimpleLayout } from '../../../components/layouts';
import { resendVerifyEmail } from '../../../lib/services';
import { isSuccess } from '../../../lib/utils/response';
import { redirectIfAuthenticated } from '../../../lib/utils/server';
import { authOptions } from '../../api/auth/[...nextauth]';
import { NextPageWithLayout } from '../../_app';
export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const { email } = query as { email: string };

  if (session && session.user.status !== 'verify_email') {
    return redirectIfAuthenticated();
  }

  if (!email && !session) {
    return {
      redirect: {
        destination: '/auth/sign-in',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};
const Index: NextPageWithLayout = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { email } = router.query as { email: string };
  const { data } = useSession();
  const [loading, setLoading] = useState(false);

  const handleResendVerifyEmail = async () => {
    try {
      const receivedEmail = email ? email : data.user.email;
      setLoading(true);
      const response = await resendVerifyEmail(receivedEmail, data.accessToken);
      setLoading(false);
      if (isSuccess(response.message)) {
        toast.success('Verify email was sent');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Error occurs');
    }
  };
  return (
    <Fragment>
      <NextSeo title="Verification Code" />
      <div className="mx-auto my-auto flex max-w-md flex-col items-center justify-center text-center">
        <CheckMailGraphic width={420} height={210} className="h-auto w-full" />
        <h2 className="mt-4 text-2xl font-bold md:mt-5 md:text-3xl">Verification Code</h2>
        <p className="mt-3 text-sm md:mt-4 md:text-base">
          We sent a mail to {email ? <strong>{email}</strong> : 'your email'}. To continue, please click the link we’ve
          just sent to your email.
        </p>
        {data && (
          <Button loading={loading} onClick={handleResendVerifyEmail} className="mt-4" label="Request verify email" />
        )}
      </div>
    </Fragment>
  );
};

Index.getLayout = (page) => <SimpleLayout>{page}</SimpleLayout>;

export default Index;
