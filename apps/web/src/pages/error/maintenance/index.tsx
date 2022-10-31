import { ReactElement } from 'react';
import { MaintenanceSystemGraphic } from '../../../components/icons/graphic';
import { ErrorLayout } from '../../../components/layouts';
import { Error } from '../../../components/organisms';
import { NextPageWithLayout } from '../../_app';

const ErrorMaintenancePage: NextPageWithLayout = () => {
  return (
    <Error
      title="Maintenance System"
      description={`Sorry, we are down for maintenance but will be back in no time.`}
      graphic={MaintenanceSystemGraphic}
    />
  );
};

ErrorMaintenancePage.getLayout = (page: ReactElement) => <ErrorLayout>{page}</ErrorLayout>;

export default ErrorMaintenancePage;
