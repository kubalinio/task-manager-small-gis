import type {
  InfiniteData,
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions as UseInfiniteRQQueryOptions
} from "@tanstack/react-query"
import type { IndexDBClient } from "api/indexdb"
import type { ExtendedQueryMeta } from "api/types/types"
import type { StandardizedApiError } from "api/utils/error-handler"

export type UseInfiniteQueryOptions<
  TQueryFnData = unknown,
  TError = StandardizedApiError,
  TPageParam = unknown
> = Omit<
  UseInfiniteRQQueryOptions<
    TQueryFnData,
    TError,
    InfiniteData<TQueryFnData>,
    TQueryFnData,
    QueryKey,
    TPageParam
  >,
  "queryFn"
> & {
  meta?: Partial<ExtendedQueryMeta>
  queryFn: (
    client: IndexDBClient
  ) => QueryFunction<TQueryFnData, QueryKey, TPageParam>
}

export type GenericInfiniteQueryOptions<
  TQueryFnData,
  TError = StandardizedApiError
> = Omit<UseInfiniteQueryOptions<TQueryFnData, TError>, "queryKey" | "queryFn">
