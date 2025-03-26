import { z } from 'zod';
import { List, Task } from 'api/types';

import {
TaskStatus,
createListSchema,
createTaskSchema,
updateListSchema,
updateTaskSchema
} from './task.validators'

type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus];

interface TaskManagerDB extends IDBDatabase {
  lists: IDBObjectStore;
  tasks: IDBObjectStore;
}

interface ListDTO extends List {}
interface TaskDTO extends Task {}

interface TaskListsResponse {
  data: List[];
  meta: {
    total: number;
  };
}

interface TaskListResponse {
  data: List;
}

interface TasksResponse {
  data: Task[];
  meta: {
    total: number;
  };
}

interface TaskResponse {
  data: Task;
}

interface TasksFilterOptions {
  listId?: string;
  status?: TaskStatusType;
  search?: string;
  sortBy?: 'createdAt' | 'updatedAt';
  sortDirection?: 'asc' | 'desc';
}

interface UpdateListParams {
  id: string;
  data: UpdateListInput;
}

interface UpdateTaskParams {
  id: string;
  data: UpdateTaskInput;
}

type CreateListInput = z.infer<typeof createListSchema>
type UpdateListInput = z.infer<typeof updateListSchema>
type CreateTaskInput = z.infer<typeof createTaskSchema>
type UpdateTaskInput = z.infer<typeof updateTaskSchema>

export type {
  TaskStatusType,
  TaskManagerDB,
  ListDTO,
  TaskDTO,
  TaskListsResponse,
  TaskListResponse,
  TasksResponse,
  TaskResponse,
  TasksFilterOptions,
  UpdateListParams,
  UpdateTaskParams,
  CreateListInput,
  UpdateListInput,
  CreateTaskInput,
  UpdateTaskInput,
}