import { useQueryClient } from "@tanstack/react-query"

import type {
  TaskListResponse,
  TaskListsResponse,
  TasksFilterOptions
} from "api/actions/tasks/task.types"
import type { GenericQueryOptions } from "libs/hooks/use-query/use-query.types"

import { taskQueries } from "api/actions/tasks/task.queries"
import { useIndexDB, useSuspenseQuery } from "libs/hooks"

/**
 * Hook to get all task lists
 */
const useGetTaskLists = (
  filters?: TasksFilterOptions,
  options?: GenericQueryOptions<TaskListsResponse>
) => {
  const queryClient = useQueryClient()

  const query = useSuspenseQuery({
    ...taskQueries.getAllTaskLists(filters),
    ...options
  })

  const resetTaskLists = (filters?: TasksFilterOptions) =>
    queryClient.invalidateQueries({ queryKey: ["task-list", filters] })

  return { ...query, resetTaskLists }
}

/**
 * Hook to get a single task list by ID
 */
const useGetTaskList = (
  id: string,
  options?: GenericQueryOptions<TaskListResponse>
) => {
  const queryClient = useQueryClient()
  const { client } = useIndexDB()

  const query = useSuspenseQuery({ ...taskQueries.getTaskList(id), ...options })

  const resetTaskList = () =>
    queryClient.invalidateQueries({
      queryKey: taskQueries.getTaskList(id).queryKey
    })

  const refetchTaskList = (filters?: TasksFilterOptions) =>
    queryClient
      .fetchQuery({
        queryKey: [...taskQueries.getTaskList(id).queryKey, filters],
        queryFn: taskQueries.getTaskList(id, filters).queryFn(client!)
      })
      .then((res) => {
        queryClient.setQueryData(taskQueries.getTaskList(id).queryKey, res)

        return res
      })

  return { ...query, resetTaskList, refetchTaskList }
}

export { useGetTaskLists, useGetTaskList }
