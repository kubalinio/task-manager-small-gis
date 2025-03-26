import {
  UseInfiniteQueryOptions as UseInfiniteRQQueryOptions,
  InfiniteData,
  QueryFunction,
  QueryKey,
} from '@tanstack/react-query';

import { ExtendedQueryMeta } from 'api/types/types';
import { StandardizedApiError } from 'api/utils/error-handler';
import { IndexDBClient } from 'api/indexdb';

export type UseInfiniteQueryOptions<TQueryFnData = unknown, TError = StandardizedApiError, TPageParam = unknown> = Omit<
  UseInfiniteRQQueryOptions<TQueryFnData, TError, InfiniteData<TQueryFnData>, TQueryFnData, QueryKey, TPageParam>,
  'queryFn'
> & {
  meta?: Partial<ExtendedQueryMeta>;
  queryFn: (client: IndexDBClient) => QueryFunction<TQueryFnData, QueryKey, TPageParam>;
};

export type GenericInfiniteQueryOptions<TQueryFnData, TError = StandardizedApiError> = Omit<
  UseInfiniteQueryOptions<TQueryFnData, TError>,
  'queryKey' | 'queryFn'
>;
