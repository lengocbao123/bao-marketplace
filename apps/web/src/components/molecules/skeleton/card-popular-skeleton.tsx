import * as React from 'react';

export type CardPopularSkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const CardPopularSkeleton: React.FC<CardPopularSkeletonProps> = () => {
  return (
    <div className="flex h-auto w-full animate-pulse select-none flex-col gap-2 rounded-lg p-4">
      <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200"></div>
      <div className="mb-4 h-2.5 w-1/2 rounded-full bg-gray-200"></div>
      <div className="mb-4 h-2.5 w-2/3 rounded-full bg-gray-200"></div>
    </div>
  );
};
