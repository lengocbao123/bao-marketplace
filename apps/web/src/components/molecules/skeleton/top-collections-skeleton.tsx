import * as React from 'react';

export type TopCollectionsSkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const TopCollectionsSkeleton: React.FC<TopCollectionsSkeletonProps> = () => {
  return (
    <React.Fragment>
      {Array.from(Array(15).keys()).map((index) => (
        <div key={index} className="flex grow animate-pulse justify-between">
          <div className="flex gap-3">
            <div className={'h-12 w-12 rounded-full bg-gray-200'}></div>

            <div className="">
              <div className="mb-4 h-2.5 w-20 rounded-full bg-gray-200"></div>
              <div className="mb-4 h-2.5 w-10 rounded-full bg-gray-200"></div>
            </div>
          </div>
          <div>
            <div className="mb-4 h-2.5 w-10 rounded-full bg-gray-200"></div>
            <div className="mb-4 h-2.5 w-10 rounded-full bg-gray-200"></div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};
