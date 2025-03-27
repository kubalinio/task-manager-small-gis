import type { List, Task } from "api/types"
import type { z } from "zod"
import type {
  createListSchema,
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

interface TaskListResponse extends List {
  tasks: TasksResponse
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
  data: UpdateListInput
}

interface UpdateTaskParams {
  id: string
  data: UpdateTaskInput
}

type CreateListInput = z.infer<typeof createListSchema>
type UpdateListInput = z.infer<typeof updateListSchema>
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
  TasksFilterOptions,
  UpdateListParams,
  UpdateTaskParams,
  CreateListInput,
  UpdateListInput,
  CreateTaskInput,
  UpdateTaskInput
}
