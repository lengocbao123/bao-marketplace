import { FC, HTMLAttributes } from 'react';
import { SVG } from '../../../types/index';
import { Button, ButtonLink } from '../../atoms';

export interface ErrorProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  graphic: SVG;
  description: string;
  onRetry?: () => void;
}

export const Error: FC<ErrorProps> = ({ graphic: Graphic, title, description, onRetry }) => {
  return (
    <div className="mx-auto my-auto h-full max-w-xl place-items-center px-4 text-center md:px-0">
      <div className="flex flex-col items-center">
        <Graphic className="h-[9.375rem] w-[18.75rem] md:h-[13.125rem] md:w-[26.25rem]" />
        <h1 className="text-neutral mt-4 text-2xl font-bold md:mt-5 md:text-3xl">{title}</h1>
        <p className="text-neutral-70 mt-3 whitespace-pre-line text-sm md:mt-4 md:text-base">{description}</p>
        {onRetry ? (
          <Button
            label={'Retry'}
            className="mt-7.5 w-full sm:text-base md:mt-10 md:py-3 md:text-lg"
            onClick={onRetry}
          />
        ) : (
          <ButtonLink
            label={'Back to Homepage'}
            className="mt-7.5 w-full sm:text-base md:mt-10 md:py-3 md:text-lg"
            href="/"
          />
        )}
      </div>
    </div>
  );
};
