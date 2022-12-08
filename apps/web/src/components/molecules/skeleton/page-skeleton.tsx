import * as React from 'react';

export type PageSkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const PageSkeleton: React.FC<PageSkeletonProps> = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="gap-y-7.5 container grid grid-cols-5 gap-x-6">
        <div className="gap-y-7.5 col-span-5 flex flex-col sm:col-span-2">
          <div className={'aspect-[1/1] w-full rounded-xl bg-gray-200'}></div>
          <div>
            <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
            <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
            <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
          </div>
        </div>
        <div className="col-span-3 flex flex-col gap-y-5">
          <div className="h-2.5 w-20 rounded-full bg-gray-200"></div>
          <div>
            <div className="w-25 mb-4 h-2.5 rounded-full bg-gray-200"></div>
            <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
            <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
            <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
          </div>
          <div>
            <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
            <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
            <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
          </div>
          <div>
            <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
            <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
            <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
          </div>
        </div>
        <div className={'col-span-5'}>
          <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
          <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
          <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
        </div>
        <div className={'col-span-5'}>
          <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
          <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
          <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
        </div>
        <div className={'col-span-5'}>
          <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
          <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
          <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};
