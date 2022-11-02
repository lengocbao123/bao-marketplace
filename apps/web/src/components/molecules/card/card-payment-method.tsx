import clsx from 'clsx';
import React, { FC, FormHTMLAttributes, Fragment } from 'react';
import { getCreditCardIcon } from 'lib/utils/credit-card-icon';
import { getShortCardNumber } from 'lib/utils/string';
import { CrossIcon } from 'components/icons/outline';

export interface CardPaymentProps extends FormHTMLAttributes<HTMLFormElement> {
  title: string;
  cardNumber: string;
  onClose?: () => void;
}

export const CardPaymentMethod: FC<CardPaymentProps> = ({ title, cardNumber, onClose, className }) => {
  const CreditCardIcon = getCreditCardIcon(title);

  return (
    <Fragment>
      <div className={clsx(className, 'border-neutral-10 relative flex gap-3 rounded-xl border py-3 px-4')}>
        <div className={'bg-neutral-10 flex h-12 w-12 items-center justify-center rounded-lg'}>
          <CreditCardIcon className={'text-3xl'} />
        </div>
        <div>
          <p className={'text-neutral text-base text-lg font-bold uppercase'}>{title}</p>
          <div className={'text-neutral mt-1 flex items-center text-sm'}>{getShortCardNumber(cardNumber)}</div>
        </div>
        {onClose && (
          <button
            className={'p-0.2 text-neutral absolute top-2 right-2 rounded-full border-none active:border-none'}
            onClick={onClose}
          >
            <CrossIcon className={'text-xl'} />
          </button>
        )}
      </div>
    </Fragment>
  );
};
