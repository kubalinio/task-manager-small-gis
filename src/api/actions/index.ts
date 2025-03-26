import type { taskQueries } from "./tasks/task.queries"

import { taskMutations } from "./tasks/task.mutations"

export const mutations = {
  ...taskMutations
} as const

export type IndexDBQueriesType = typeof taskQueries
export type IndexDBMutationsType = typeof taskMutations
