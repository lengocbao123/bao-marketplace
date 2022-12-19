import useSWR from 'swr';
import { Highlight, SearchData, SearchResponse, Source } from 'types/data';
import { isSuccess } from 'lib/utils/response';

export const useSearch = (startSearching: boolean, searchText: string) => {
  const { data, error } = useSWR<SearchResponse>(startSearching ? `/nft/exchange/search?search=${searchText}` : null);

  return {
    data:
      data && isSuccess(data.message)
        ? (parseData(data.data) as {
            [key: string]: ResultData[];
          })
        : null,
    loading: !error && !data,
    error: error || (data && !isSuccess(data.message)),
  };
};

export interface ResultData {
  type?: string;
  id?: string;
  data?: Source;
  highlight?: Highlight;
}

const parseData = (results: SearchData[]) => {
  const mappedData = results.map((result) => ({
    type: result._index,
    id: result._id,
    data: result._source,
    highlight: result.highlight,
  }));

  return mappedData.reduce((previousValue, currentValue) => {
    const key = currentValue['type'];
    const currentGroup = previousValue[key] ?? [];

    return { ...previousValue, [key]: [...currentGroup, currentValue] };
  }, {});
};
