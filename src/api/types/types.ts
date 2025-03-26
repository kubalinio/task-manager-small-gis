/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryMeta } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

export type MutationHTTPMethod = 'DELETE' | 'POST' | 'PUT' | 'PATCH';

export type Unwrap<T> = T extends Promise<infer U> ? U : T;

export type ExtendedQueryMeta = QueryMeta & {
  error: { excludedCodes: number[]; showGlobalError: boolean };
};

export type ExtendedAxiosRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponseMeta {
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export interface ApiListResponse<T> {
  data: T[];
  meta: ApiResponseMeta;
}

export interface ApiItemResponse<T> {
  data: T;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}
