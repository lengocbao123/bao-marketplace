import { NftResponse, NftsResponse } from 'types/data';
import { fetcher } from '../lib/utils/fetcher';
import { Session } from 'next-auth';

export const getNfts = (session: Session, query: string) => {
  return fetcher(session)<NftsResponse>(`/nft/exchange/list?${query}`);
};

export const getFeatureNfts = (session: Session, query: string) => {
  return fetcher(session)<NftsResponse>(`/nft/exchange/list?limit=8&${query}`);
};

export const getNftsByCollectionId = (session: Session, collectionId: string, query: string) => {
  return fetcher(session)<NftsResponse>(`/nft/exchange/list?collection=${collectionId}&${query}`);
};

export const getNftById = (session: Session, id: string) => {
  return fetcher(session)<NftResponse>(`/nft/${id}`);
};
export const getRelativeNfts = (session: Session) => {
  return fetcher(session)<NftsResponse>(`/nft/exchange/list?limit=4`);
};

export const getNftsByCreatedUserId = (session: Session, userId: string, query: string) => {
  return fetcher(session)<NftsResponse>(`/nft/exchange/list?createdBy=${userId}&${query}`);
};

export const getNftsByOwnerUserId = (session: Session, userId: string, query: string) => {
  return fetcher(session)<NftsResponse>(`/nft/exchange/list?owner=${userId}&${query}`);
};
