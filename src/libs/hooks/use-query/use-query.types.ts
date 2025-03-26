import { UseQueryOptions as UseRQQueryOptions, QueryFunction, QueryKey } from '@tanstack/react-query';
import { IndexDBClient } from 'api/indexdb';
import { ExtendedQueryMeta } from 'api/types/types';
import { StandardizedApiError } from 'api/utils/error-handler';

export type UseQueryOptions<TQueryFnData, TError = StandardizedApiError> = Omit<
  UseRQQueryOptions<TQueryFnData, TError>,
  'queryFn'
> & {
  meta?: Partial<ExtendedQueryMeta>;
  queryFn: (client: IndexDBClient) => QueryFunction<TQueryFnData, QueryKey>;
};

export type GenericQueryOptions<TQueryFnData, TError = StandardizedApiError> = Omit<
  UseQueryOptions<TQueryFnData, TError>,
  'queryKey' | 'queryFn'
  >;
