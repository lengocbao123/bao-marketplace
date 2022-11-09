import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const fetcher = <T>(endpoint: RequestInfo | URL, options?: RequestInit): Promise<T> => {
  return fetch(publicRuntimeConfig.apiBaseUrl + endpoint, {
    ...options,
    headers: {
      ...options?.headers,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json() as T);
};
