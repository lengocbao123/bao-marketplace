import getConfig from 'next/config';
import { Session } from 'next-auth';
const { publicRuntimeConfig } = getConfig();

export const fetcher =
  (session: Session) =>
  <T>(endpoint: RequestInfo | URL, options?: RequestInit): Promise<T> => {
    return fetch(publicRuntimeConfig.apiBaseUrl + endpoint, {
      ...options,
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
        Authorization: session?.accessToken ? `Bearer ${session.accessToken}` : '',
      },
    }).then((response) => response.json() as T);
  };
