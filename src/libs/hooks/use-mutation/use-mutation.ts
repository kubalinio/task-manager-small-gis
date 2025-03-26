import { useMutation as useRQMutation, UseMutationOptions, MutationKey } from '@tanstack/react-query';
import { useIndexDB } from 'libs/hooks';
import { IndexDBMutationsType, mutations } from 'api/actions';
import { StandardizedApiError } from 'api/utils/error-handler';
import { ExtendedQueryMeta } from 'api/types/types';
import { DataForMutation, GetMutationParams } from './use-mutation.types';

/**
 * Mutating data using this hook doesn't require specifying mutation function like it is required in react-query
 * This hook uses proper mutating strategy provided via IndexDBContext
 */
export const useMutation = <Key extends keyof IndexDBMutationsType, TError = StandardizedApiError>(
  mutation: Key,
  options?: Omit<
    UseMutationOptions<DataForMutation<Key>, TError, GetMutationParams<Key>>,
    'mutationKey' | 'mutationFn'
  > & {
    meta?: Partial<ExtendedQueryMeta>;
  },
) => {
  const { client } = useIndexDB();

  const mutationFn = mutations[mutation](client!);
  const mutationKey: MutationKey = [mutation];

  return useRQMutation({
    mutationKey,
    mutationFn: async (args) => (await mutationFn(args)) as DataForMutation<Key>,
    ...options,
  });
};

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