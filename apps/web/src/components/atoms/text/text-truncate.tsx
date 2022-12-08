import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';
import { useTextTruncate } from 'hooks/use-text-truncate';
import { ArrowDownIcon } from 'components/icons/outline';

export interface TextTruncateProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  maxLength?: number;
}

export const TextTruncate: FC<TextTruncateProps> = ({ className, text, maxLength = 200, ...rest }) => {
  const { isTruncated, truncatedText, hasTruncated, toggleTruncated } = useTextTruncate(text, maxLength);

  return (
    <div className={clsx(className)} {...rest}>
      <p>{isTruncated ? truncatedText : text}</p>

      {hasTruncated && (
        <div className="mt-2">
          <button className="text-secondary flex items-center gap-2 text-sm font-semibold" onClick={toggleTruncated}>
            {isTruncated ? 'View more' : 'View less'}
            <ArrowDownIcon className={clsx({ 'rotate-180': !isTruncated }, 'text-base transition-transform')} />
          </button>
        </div>
      )}
    </div>
  );
};
