import { ReactElement } from 'react';
import { ComingSoonGraphic } from '../../../components/icons/graphic';
import { ErrorLayout } from '../../../components/layouts';
import { Error } from '../../../components/organisms';
import { NextPageWithLayout } from '../../_app';

const ComingSoonPage: NextPageWithLayout = () => {
  return (
    <Error
      title="Coming Soon"
      description={`We’re going to launch our Website very soon.\nStay tune.`}
      graphic={ComingSoonGraphic}
    />
  );
};

ComingSoonPage.getLayout = (page: ReactElement) => <ErrorLayout>{page}</ErrorLayout>;

export default ComingSoonPage;
