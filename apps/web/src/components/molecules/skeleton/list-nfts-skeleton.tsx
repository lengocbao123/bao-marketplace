import * as React from 'react';
import { CardNftSkeleton } from './card-nft-skeleton';

export interface ListNftsSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  number: number;
}

export const ListNftsSkeleton: React.FC<ListNftsSkeletonProps> = ({ number }) => {
  return (
    <React.Fragment>
      {Array.from(Array(number).keys()).map((index) => (
        <CardNftSkeleton key={index} />
      ))}
    </React.Fragment>
  );
};
