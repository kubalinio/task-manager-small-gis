import { useQueryClient } from "@tanstack/react-query"

import type {
  TaskResponse,
  TasksFilterOptions,
  TasksResponse
} from "api/actions/tasks/task.types"
import type { GenericQueryOptions } from "libs/hooks/use-query/use-query.types"

import { taskQueries } from "api/actions/tasks/task.queries"
import { useSuspenseQuery } from "libs/hooks"

/**
 * Hook to get all tasks
 */
const useGetAllTasks = (
  filters?: TasksFilterOptions,
  options?: GenericQueryOptions<TasksResponse>
) => {
  const queryClient = useQueryClient()

  const resetTasks = () =>
    queryClient.invalidateQueries({
      queryKey: taskQueries.getAllTasks(filters).queryKey
    })

  const query = useSuspenseQuery({
    ...taskQueries.getAllTasks(filters),
    ...options
  })

  return { ...query, resetTasks }
}

/**
 * Hook to get a single task by ID
 */
const useGetTask = (
  id: string,
  options?: GenericQueryOptions<TaskResponse>
) => {
  const queryClient = useQueryClient()

  const resetTask = () =>
    queryClient.invalidateQueries({
      queryKey: taskQueries.getTask(id).queryKey
    })
  const query = useSuspenseQuery({ ...taskQueries.getTask(id), ...options })

  return { ...query, resetTask }
}

export { useGetAllTasks, useGetTask }
