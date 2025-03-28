import type { List, Task } from "api/types"
import type { z } from "zod"
import type {
  CreateTaskListSchema,
  createTaskSchema,
  updateListSchema,
  updateTaskSchema
} from "./task.validators"

const TaskStatus = {
  TODO: "todo",
  IN_PROGRESS: "in-progress",
  DONE: "done"
} as const

type TaskStatusType = (typeof TaskStatus)[keyof typeof TaskStatus]

interface TaskManagerDB extends IDBDatabase {
  lists: IDBObjectStore
  tasks: IDBObjectStore
}

type ListDTO = List
type TaskDTO = Task

type TaskListsResponse = {
  data: List[]
  meta: {
    total: number
  }
}

interface TaskListResponse {
  id: string
  title: string
  createdAt: number
  updatedAt: number
  tasks: TasksResponse
}

interface MutationTaskListResponse {
  id: string
  title: string
  createdAt: number
  updatedAt: number
}

interface TasksResponse {
  data: Task[]
  meta: {
    total: number
  }
}

interface TaskResponse {
  data: Task
}

interface TasksFilterOptions {
  listId?: string
  status?: TaskStatusType
  search?: string
  sortBy?: "createdAt" | "updatedAt"
  sortDirection?: "asc" | "desc"
}

interface UpdateListParams {
  id: string
  data: UpdateTaskListInput
}

interface UpdateTaskParams {
  id: string
  data: UpdateTaskInput
}

type CreateTaskListInput = z.infer<typeof CreateTaskListSchema>
type UpdateTaskListInput = z.infer<typeof updateListSchema>
type CreateTaskInput = z.infer<typeof createTaskSchema>
type UpdateTaskInput = z.infer<typeof updateTaskSchema>

export { TaskStatus }
export type {
  TaskStatusType,
  TaskManagerDB,
  ListDTO,
  TaskDTO,
  TaskListsResponse,
  TaskListResponse,
  TasksResponse,
  TaskResponse,
  MutationTaskListResponse,
  TasksFilterOptions,
  UpdateListParams,
  UpdateTaskParams,
  CreateTaskListInput,
  UpdateTaskListInput,
  CreateTaskInput,
  UpdateTaskInput
}
