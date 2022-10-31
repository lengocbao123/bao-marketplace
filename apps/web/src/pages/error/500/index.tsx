import { ReactElement } from 'react';
import { Error500Graphic } from '../../../components/icons/graphic';
import { ErrorLayout } from '../../../components/layouts';
import { Error } from '../../../components/organisms';
import { NextPageWithLayout } from '../../_app';

const Error500Page: NextPageWithLayout = () => {
  return (
    <Error
      title="Internal Server Error"
      description={`The server has been deserted for a while.\nTry to refesh this page or feel free to contact us if the problem persists.`}
      graphic={Error500Graphic}
    />
  );
};

Error500Page.getLayout = (page: ReactElement) => <ErrorLayout>{page}</ErrorLayout>;

export default Error500Page;
