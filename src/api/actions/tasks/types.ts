import { z } from 'zod';
import { List, Task } from '../../indexdb';

// Re-export the types from indexdb for consistency
export type { List, Task };

// Define TaskManagerDB interface for IndexDB
export interface TaskManagerDB extends IDBDatabase {
  lists: IDBObjectStore;
  tasks: IDBObjectStore;
}

// Define DTOs
export interface ListDTO extends List {}
export interface TaskDTO extends Task {}

// List schemas and types
export const listSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export const createListSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
});

export const updateListSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
});

export type CreateListInput = z.infer<typeof createListSchema>;
export type UpdateListInput = z.infer<typeof updateListSchema>;

export interface TaskListsResponse {
  data: List[];
  meta: {
    total: number;
  };
}

export interface TaskListResponse {
  data: List;
}

// Task status and schemas
export const TaskStatus = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
} as const;

export type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus];

export const taskStatusSchema = z.enum([
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.DONE,
]);

export const taskSchema = z.object({
  id: z.string().uuid(),
  listId: z.string().uuid(),
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters'),
  status: taskStatusSchema,
  createdAt: z.number(),
  updatedAt: z.number(),
});

export const createTaskSchema = z.object({
  listId: z.string().uuid(),
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters'),
  status: taskStatusSchema.optional().default(TaskStatus.TODO),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters').optional(),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  status: taskStatusSchema.optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

export interface TasksResponse {
  data: Task[];
  meta: {
    total: number;
  };
}

export interface TaskResponse {
  data: Task;
}

export interface TasksFilterOptions {
  listId?: string;
  status?: TaskStatusType;
  search?: string;
  sortBy?: 'createdAt' | 'updatedAt';
  sortDirection?: 'asc' | 'desc';
}

// Parameters for IndexDB operations
export interface UpdateListParams {
  id: string;
  data: UpdateListInput;
}

export interface UpdateTaskParams {
  id: string;
  data: UpdateTaskInput;
}

