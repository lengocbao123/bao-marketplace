import { CollectionResponse, CollectionsResponse } from 'types/data';
import { fetcher } from 'lib/utils/fetcher';
import { Session } from 'next-auth';

export const getCollections = (session: Session, query: string) => {
  return fetcher(session)<CollectionsResponse>(`/collection/exchange/list?${query}`);
};

export const getCollectionsByUserId = (session: Session, userId: string, query: string) => {
  return fetcher(session)<CollectionsResponse>(`/collection/exchange/list?createdBy=${userId}&${query}`);
};

export const getCollectionById = (session: Session, id: string) => {
  return fetcher(session)<CollectionResponse>(`/collection/${id}`);
};
export const getPopularCollections = (session: Session) => {
  return fetcher(session)<CollectionsResponse>(`/collection/exchange/list`);
};

export const getTopCollections = (session: Session, query: string) => {
  return fetcher(session)<CollectionsResponse>(`/collection/exchange/list?${query}`);
};
