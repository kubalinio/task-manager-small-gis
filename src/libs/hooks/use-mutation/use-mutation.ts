import { useMutation as useRQMutation } from "@tanstack/react-query"

import type { MutationKey, UseMutationOptions } from "@tanstack/react-query"
import type { IndexDBMutationsType } from "api/actions"
import type { ExtendedQueryMeta } from "api/types/types"
import type { StandardizedApiError } from "api/utils/error-handler"
import type { DataForMutation, GetMutationParams } from "./use-mutation.types"

import { mutations } from "api/actions"
import { useIndexDB } from "libs/hooks"

/**
 * Mutating data using this hook doesn't require specifying mutation function like it is required in react-query
 * This hook uses proper mutating strategy provided via IndexDBContext
 */
export const useMutation = <
  Key extends keyof IndexDBMutationsType,
  TError = StandardizedApiError
>(
  mutation: Key,
  options?: Omit<
    UseMutationOptions<DataForMutation<Key>, TError, GetMutationParams<Key>>,
    "mutationKey" | "mutationFn"
  > & {
    meta?: Partial<ExtendedQueryMeta>
  }
) => {
  const { client } = useIndexDB()

  const mutationFn = mutations[mutation](client!)
  const mutationKey: MutationKey = [mutation]

  return useRQMutation({
    mutationKey,
    mutationFn: async (args) =>
      (await mutationFn(args)) as DataForMutation<Key>,
    ...options
  })
}

// ----- Example usage when using BE API -----
// export const useMutation = <Key extends keyof AxiosMutationsType, TError = StandardizedApiError>(
//   mutation: Key,
//   options?: Omit<
//     UseMutationOptions<DataForMutation<Key>, TError, GetMutationParams<Key>>,
//     'mutationKey' | 'mutationFn'
//   > & {
//     meta?: Partial<ExtendedQueryMeta>;
//   },
// ) => {
//   const { client } = useApiClient();
//   const mutationFn = mutations[mutation](client);
//   const mutationKey: MutationKey = [mutation];

//   return useRQMutation({
//     mutationKey,
//     mutationFn: async (args) => (await mutationFn(args)) as DataForMutation<Key>,
//     ...options,
//   });
// };
