import { useInfiniteQuery as useRQInfiniteQuery } from "@tanstack/react-query"

import type { StandardizedApiError } from "api/utils/error-handler"
import type { UseInfiniteQueryOptions } from "./use-infinite-query.types"

import { useIndexDB } from "libs/hooks"

/**
 * Fetching data using this hook doesn't require specifying query function like it's required in react-query
 * @see https://react-query.tanstack.com/guides/query-functions
 * This hook uses proper querying strategy provided via ApiClientContext
 * @see ApiClientContextController.ts
 * */
export const useInfiniteQuery = <
  TQueryFnData = unknown,
  TError = StandardizedApiError,
  TPageParam = unknown
>(
  params: UseInfiniteQueryOptions<TQueryFnData, TError, TPageParam>
) => {
  const { client } = useIndexDB()
  const { queryFn, ...options } = params

  return useRQInfiniteQuery({
    ...options,
    queryFn: queryFn(client!)
  })
}
