import { z } from "zod";

const TaskStatus = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
} as const;

const taskStatusSchema = z.enum([
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.DONE,
]);

const listSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  createdAt: z.number(),
  updatedAt: z.number(),
});

const createListSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
});

const updateListSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
});

const taskSchema = z.object({
  id: z.string().uuid(),
  listId: z.string().uuid(),
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters'),
  status: taskStatusSchema,
  createdAt: z.number(),
  updatedAt: z.number(),
});

const createTaskSchema = z.object({
  listId: z.string().uuid(),
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters'),
  status: taskStatusSchema.optional().default(TaskStatus.TODO),
});

const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters').optional(),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  status: taskStatusSchema.optional(),
});

export type { TaskStatus };
export {
  taskSchema,
  taskStatusSchema,
  createTaskSchema,
  updateTaskSchema,
  listSchema,
  createListSchema,
  updateListSchema,
};
