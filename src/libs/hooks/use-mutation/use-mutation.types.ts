import { IndexDBMutationsType } from 'api/actions';
import { Unwrap } from 'api/types/types';

export type DataForMutation<TMutationKey extends keyof IndexDBMutationsType> = Unwrap<
  ReturnType<ReturnType<IndexDBMutationsType[TMutationKey]>>
>;

export type GetMutationParams<Key extends keyof IndexDBMutationsType> = ReturnType<IndexDBMutationsType[Key]> extends (
  value: infer Params,
) => any
  ? Params extends Parameters<ReturnType<IndexDBMutationsType[keyof IndexDBMutationsType]>>[0]
    ? Params
    : any
  : never;
