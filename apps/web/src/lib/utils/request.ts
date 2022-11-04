import { getSession } from 'next-auth/react';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const request = async <T>(endpoint: string, options): Promise<T> => {
  const session = await getSession();

  return fetch(publicRuntimeConfig.apiBaseUrl + endpoint, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      Authorization: session ? `Bearer ${session.accessToken}` : ''
    }
  }).then((response) => {
    return response.json() as T;
  });
};

export const fetcher = <T>(endpoint) =>
  request<T>(endpoint, {}).then((data) => {
    return { status: true, statusCode: 200, message: 'success', data } as T;
  });
