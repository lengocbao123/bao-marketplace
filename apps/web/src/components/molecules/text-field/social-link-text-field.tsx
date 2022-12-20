import * as React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

export interface SocialLinkTextFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  url: string;
  icon?: any;
  error?: boolean;
  message?: string;
  inputProps?: any;
}

export const SocialLinkTextField: React.FC<SocialLinkTextFieldProps> = (props) => {
  const { url, icon, error = false, inputProps, className } = props;
  const Icon = icon;

  return (
    <div className={className}>
      <div className={'border-neutral-10 flex w-12 items-center justify-center border-r'}>
        <Link target={'_blank'} className={'hover:text-accent-info'} href={url || ''}>
          <Icon height={20} width={20} />
        </Link>
      </div>

      <div className={'h-full w-full'}>
        <input
          placeholder={'yoursite.io'}
          className={clsx(
            error && 'text-accent-error bg-accent-error/10',
            'h-full w-full px-3 text-sm font-medium outline-none',
          )}
          {...inputProps}
        />
      </div>
    </div>
  );
};
