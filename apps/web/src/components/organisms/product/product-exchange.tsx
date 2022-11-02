import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';
import { formatCurrency } from 'lib/utils/number';
import { Button } from 'components/atoms';

export interface ProductExchangeProps extends HTMLAttributes<HTMLDivElement> {
  order: any;
}

export const ProductExchange: FC<ProductExchangeProps> = ({ className, order, ...rest }) => {
  return (
    <div className={clsx(className)} {...rest}>
      <div className="border-primary-30 bg-primary-5 flex flex-col justify-start gap-2 rounded-xl border p-4">
        <div className="text-sm text-neutral-50">Current Price</div>
        <div className="mb-7.5 mt-2 flex flex-wrap items-baseline gap-x-2">
          <span className="text-3xl font-medium">{formatCurrency(order.price)}</span>
          <span className="text-sm">(0.845 ETH)</span>
        </div>
        <Button className="w-fit" label="Buy with Credit Card" onClick={() => alert('Coming soon')} />
      </div>
    </div>
  );
};
