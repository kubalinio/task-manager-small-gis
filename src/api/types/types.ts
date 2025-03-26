/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryMeta } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

type MutationHTTPMethod = 'DELETE' | 'POST' | 'PUT' | 'PATCH';

type Unwrap<T> = T extends Promise<infer U> ? U : T;

type ExtendedQueryMeta = QueryMeta & {
  error: { excludedCodes: number[]; showGlobalError: boolean };
};

type ExtendedAxiosRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ApiResponseMeta {
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

interface ApiListResponse<T> {
  data: T[];
  meta: ApiResponseMeta;
}

interface ApiItemResponse<T> {
  data: T;
}

interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export type { MutationHTTPMethod, Unwrap, ExtendedQueryMeta, ExtendedAxiosRequestConfig, PaginationMeta, ApiResponseMeta, ApiListResponse, ApiItemResponse, SortOptions };
