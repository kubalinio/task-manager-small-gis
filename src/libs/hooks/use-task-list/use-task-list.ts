import { useQueryClient } from "@tanstack/react-query";
import { taskQueries } from "api/actions/tasks/task.queries";
import { TaskListResponse, TaskListsResponse, TasksFilterOptions } from "api/actions/tasks/task.validators";
import { useQuery } from "libs/hooks/use-query/use-query";
import { GenericQueryOptions } from "libs/hooks/use-query/use-query.types";

/**
 * Hook to get all task lists
 */
const useGetTaskLists = (filters?: TasksFilterOptions, options?: GenericQueryOptions<TaskListsResponse>) => {
const queryClient = useQueryClient();

  const query = useQuery({ ...taskQueries.getAllTaskLists(filters), ...options });
  const resetTaskLists = () => queryClient.invalidateQueries({ queryKey: ['task-list', filters] });

  return { ...query, resetTaskLists };
};

/**
 * Hook to get a single task list by ID
 */
const useGetTaskList = (id: string, options?: GenericQueryOptions<TaskListResponse>) => {
  const queryClient = useQueryClient();

  const query = useQuery({ ...taskQueries.getTaskList(id), ...options });
  const resetTaskList = () => queryClient.invalidateQueries({ queryKey: ['task-list', id] });

  return { ...query, resetTaskList };
};

export { useGetTaskLists, useGetTaskList };
