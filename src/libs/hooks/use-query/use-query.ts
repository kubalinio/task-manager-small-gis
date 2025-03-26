import { useQuery as useRQQuery } from "@tanstack/react-query"

import type { StandardizedApiError } from "api/utils/error-handler"
import type { UseQueryOptions } from "./use-query.types"

import { useIndexDB } from "libs/hooks"

export const useQuery = <TQueryFnData = unknown, TError = StandardizedApiError>(
  params: UseQueryOptions<TQueryFnData, TError>
) => {
  const { client } = useIndexDB()

  const { queryFn, ...options } = params

  const result = useRQQuery({
    queryFn: (args) => queryFn(client!)(args),
    ...options
  })

  return {
    ...result,
    isLoadingAndEnabled: result.isLoading && result.fetchStatus !== "idle"
  }
}

// ----- Example usage when using BE API -----

// export const useQuery = <TQueryFnData = unknown, TError = StandardizedApiError>(
//   params: UseQueryOptions<TQueryFnData, TError>,
// ) => {
//   const { client } = useApiClient();
//   const { queryFn, ...options } = params;

//   const result = useRQQuery({
//     queryFn: (args) => queryFn(client)(args),
//     ...options,
//   });

//   return { ...result, isLoadingAndEnabled: result.isPending && result.fetchStatus !== 'idle' };
// };
