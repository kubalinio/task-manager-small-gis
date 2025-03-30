import { z } from "zod"

import { TaskStatus } from "./task.types"

const taskStatusSchema = z.enum([
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.DONE
])

const listSchema = z.object({
  id: z.string().uuid(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  createdAt: z.number(),
  updatedAt: z.number()
})

const CreateTaskListSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters")
})

const UpdateTaskListSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters")
})

const taskSchema = z.object({
  id: z.string().uuid(),
  listId: z.string().uuid(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters"),
  status: taskStatusSchema,
  createdAt: z.number(),
  updatedAt: z.number()
})

const CreateTaskSchema = z.object({
  listId: z.string().uuid(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters"),
  status: taskStatusSchema.optional().default(TaskStatus.TODO)
})

const CreateTaskSchemaForm = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  status: taskStatusSchema.optional().default(TaskStatus.TODO)
})

const UpdateTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  status: taskStatusSchema
})

export type { TaskStatus }
export {
  taskSchema,
  taskStatusSchema,
  UpdateTaskSchema,
  listSchema,
  CreateTaskListSchema,
  CreateTaskSchema,
  UpdateTaskListSchema,
  CreateTaskSchemaForm
}
