import { StandardizedApiError } from 'api/utils/error-handler';
import type {UseQueryOptions, UseInfiniteQueryOptions } from 'libs/hooks';


export const queryFactoryOptions = <TQueryFnData = unknown, TError = StandardizedApiError>(
  options: UseQueryOptions<TQueryFnData, TError>,
) => options;

export const infiniteQueryFactoryOptions = <
  TQueryFnData = unknown,
  TPageParam = unknown,
  TError = StandardizedApiError,
>(
  options: UseInfiniteQueryOptions<TQueryFnData, TError, TPageParam>,
) => options;
