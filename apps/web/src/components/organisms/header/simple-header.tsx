import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';
import { PikassoColorIcon } from 'components/icons/brand';

/* ---------------------------------------------------------------------------------------------------------------------
 * SimpleHeader
 * ------------------------------------------------------------------------------------------------------------------ */
export type HeaderSimpleProps = HTMLAttributes<HTMLElement>;

export const SimpleHeader: FC<HeaderSimpleProps> = (props) => {
  const { ...headerProps } = props;

  return (
    <header {...headerProps}>
      <div className={'container'}>
        <div className={'flex items-center justify-between gap-5 py-5'}>
          <div className="flex grow items-center gap-5">
            <Link href={'/'} className={'-mt-2.5'}>
              <span className={'sr-only'}>Pikasso</span>
              <PikassoColorIcon width="136" height="34" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
