import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';
import { PikassoPayButton } from '@pikasso-sdk/react';
import { formatCurrency } from 'lib/utils/number';
import { PriceData } from 'types/data/orders';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export interface ProductExchangeProps extends HTMLAttributes<HTMLDivElement> {
  data: PriceData;
  nftId: string;
}

export const ProductExchange: FC<ProductExchangeProps> = ({ className, nftId, data, ...rest }) => {
  const getEnvironment = () => {
    if (publicRuntimeConfig.apiBaseUrl === 'https://exchange-staging-api.pikasso.xyz/v0') {
      return 'staging';
    } else if (publicRuntimeConfig.apiBaseUrl === 'https://exchange-dev-api.pikasso.xyz/v0') {
      return 'dev';
    }

    return 'local';
  };

  return (
    <div className={clsx(className)} {...rest}>
      <div className="border-primary-30 bg-primary-5 flex flex-col justify-start gap-2 rounded-xl border p-4">
        <div className="text-sm text-neutral-50">Current Price</div>
        <div className="mb-7.5 mt-2 flex flex-wrap items-baseline gap-x-2">
          <span className="text-3xl font-medium">{formatCurrency(data.price)}</span>
        </div>
        <PikassoPayButton
          className={'!w-fit !rounded-full !text-sm !font-semibold'}
          exchangeId={data.campaign_or_exchange}
          nftId={nftId}
          environment={getEnvironment()}
        />
      </div>
    </div>
  );
};
