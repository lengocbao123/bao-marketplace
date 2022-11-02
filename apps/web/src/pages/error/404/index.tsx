import { ReactElement } from 'react';
import { Error404Graphic } from 'components/icons/graphic';
import { ErrorLayout } from 'components/layouts';
import { Error } from 'components/organisms';
import { NextPageWithLayout } from 'pages/_app';

const Error404Page: NextPageWithLayout = () => {
  return (
    <Error
      title="Oop! Page Not Found"
      description="This page doesn't exist or was removed."
      graphic={Error404Graphic}
    />
  );
};

Error404Page.getLayout = (page: ReactElement) => <ErrorLayout>{page}</ErrorLayout>;

export default Error404Page;
