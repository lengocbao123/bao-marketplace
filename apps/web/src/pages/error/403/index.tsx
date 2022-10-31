import { ReactElement } from 'react';
import { Error403Graphic } from '../../../components/icons/graphic';
import { ErrorLayout } from '../../../components/layouts';
import { Error } from '../../../components/organisms';
import { NextPageWithLayout } from '../../_app';

const Error403Page: NextPageWithLayout = () => {
  return (
    <Error
      title="Access Denied"
      description="Sorry, but you don’t have permission to access this page."
      graphic={Error403Graphic}
    />
  );
};

Error403Page.getLayout = (page: ReactElement) => <ErrorLayout>{page}</ErrorLayout>;

export default Error403Page;
