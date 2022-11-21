import * as React from 'react';

export type CardNftSkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const CardNftSkeleton: React.FC<CardNftSkeletonProps> = ({}) => {
  return (
    <div className={'border-neutral-10 hover:shadow-box-hover animate-pulse space-y-2 rounded-xl border p-2 sm:p-4'}>
      <div className={'aspect-[148/128] w-full rounded-xl bg-gray-200'}></div>
      <div className="overflow-hidden">
        <div className="space-y-1">
          <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
          <div className="mb-2.5 h-2 w-1/2 rounded-full bg-gray-200"></div>
        </div>

        <div className="border-neutral-10 mt-2 border-t pt-2 sm:mt-3 sm:pt-3">
          <div className="flex justify-between">
            <div className="mb-2.5 h-2 w-12 rounded-full bg-gray-200"></div>
            <svg
              className="h-10 w-10 text-gray-200 dark:text-gray-700"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
