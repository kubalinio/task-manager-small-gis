import {  useQueryClient } from '@tanstack/react-query';
import { taskQueries } from 'api/actions/tasks/task.queries';
import { TasksFilterOptions, TasksResponse, TaskResponse } from 'api/actions/tasks/types';
import { useQuery } from 'libs/hooks';
import { GenericQueryOptions } from 'libs/hooks/use-query/use-query.types';

/**
 * Hook to get all tasks
 */
const useGetAllTasks = (filters?: TasksFilterOptions, options?: GenericQueryOptions<TasksResponse>) => {
  const queryClient = useQueryClient();

  const resetTasks = () => queryClient.invalidateQueries({ queryKey: ['tasks'] });
  const query = useQuery({ ...taskQueries.getAllTasks(filters), ...options });

  return { ...query, resetTasks };
};

/**
 * Hook to get a single task by ID
 */
const useGetTask = (id: string, options?: GenericQueryOptions<TaskResponse>) => {
  const queryClient = useQueryClient();

  const resetTask = () => queryClient.invalidateQueries({ queryKey: ['task', id] });
  const query = useQuery({ ...taskQueries.getTask(id), ...options });

  return { ...query, resetTask };
};

export { useGetAllTasks, useGetTask };
