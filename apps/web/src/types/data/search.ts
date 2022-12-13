import { BaseResponse } from './response';

export interface SearchData {
  _index?: string;
  _id?: string;
  _source: Source;
  highlight?: Highlight;
}

export interface Source {
  image?: string;
  name?: string;
}

export interface Highlight {
  [key: string]: string[];
}

export interface SearchResponse extends BaseResponse {
  data?: SearchData[];
}
