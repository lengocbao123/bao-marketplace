import { ReactElement } from 'react';
import { NoInternetGraphic } from 'components/icons/graphic';
import { ErrorLayout } from 'components/layouts';
import { Error } from 'components/organisms';
import { NextPageWithLayout } from 'pages/_app';

const ErrorNoInternetPage: NextPageWithLayout = () => {
  return (
    <Error
      title="No Internet"
      description={`Couldn’t connect to internet.\nPlease check your network settings.`}
      onRetry={() => {
        console.log('Retry action');
      }}
      graphic={NoInternetGraphic}
    />
  );
};

ErrorNoInternetPage.getLayout = (page: ReactElement) => <ErrorLayout>{page}</ErrorLayout>;

export default ErrorNoInternetPage;
