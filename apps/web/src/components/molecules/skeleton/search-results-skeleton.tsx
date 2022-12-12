import * as React from 'react';

export type CardPopularSkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const SearchResultsSkeleton: React.FC<CardPopularSkeletonProps> = () => {
  return (
    <div>
      {Array.from(Array(4).keys()).map((index) => (
        <div key={index} className="flex grow animate-pulse justify-between p-4">
          <div className="flex gap-3">
            <div className={'h-12 w-12 rounded-lg bg-gray-200'}></div>

            <div className={'grow'}>
              <div className="w-50 mb-4 h-2.5 rounded-full bg-gray-200"></div>
              <div className="w-50 mb-4 h-2.5 rounded-full bg-gray-200"></div>
              <div className="w-50 mb-4 h-2.5 rounded-full bg-gray-200"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
