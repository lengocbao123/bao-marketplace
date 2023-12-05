export const fetcher = <T>(endpoint: RequestInfo | URL, options?: RequestInit): Promise<T> => {
  return fetch(process.env.OPENAPI_BASE_URL + endpoint, {
    ...options,
    headers: {
      ...options?.headers,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json() as T);
};
