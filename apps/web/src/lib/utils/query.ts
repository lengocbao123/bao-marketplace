import { ParsedUrlQuery } from 'querystring';

export const convertQueryParamsToArray = (query: ParsedUrlQuery) => {
  const queryParams = {};
  Object.keys(query).forEach((key) => {
    queryParams[key] = Array.isArray(query[key]) ? query[key] : [query[key]];
  });

  return queryParams;
};
