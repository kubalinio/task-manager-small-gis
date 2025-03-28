import { useSuspenseQuery as useRQQuery } from "@tanstack/react-query"

import type { StandardizedApiError } from "api/utils/error-handler"

import { useIndexDB } from "libs/hooks"

import { type UseQueryOptions } from "./use-suspense-query.types"

export const useSuspenseQuery = <
  TQueryFnData = unknown,
  TError = StandardizedApiError
>(
  params: UseQueryOptions<TQueryFnData, TError>
) => {
  const { client } = useIndexDB()

  const { queryFn, ...options } = params

  const result = useRQQuery({
    queryFn: queryFn && ((args) => queryFn(client!)(args)),
    ...options
  })

  return {
    ...result,
    isLoadingAndEnabled: result.isPending && result.fetchStatus !== "idle"
  }
}
