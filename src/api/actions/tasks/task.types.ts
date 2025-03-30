import type { List, Task } from "api/types"
import type { z } from "zod"
import type {
  CreateTaskListSchema,
  CreateTaskSchema,
  CreateTaskSchemaForm,
  updateListSchema,
  UpdateTaskSchema
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

interface TaskListWithTasksMeta extends List {
  tasksMeta: {
    total: number
    todo: number
    "in-progress": number
    done: number
  }
}

type TaskListsResponse = {
  data: TaskListWithTasksMeta[]
  meta: {
    total: number
    tasks: {
      total: number
      todo: number
      "in-progress": number
      done: number
    }
  }
}

interface TaskListResponse {
  id: string
  title: string
  createdAt: number
  updatedAt: number
  tasks: TasksResponse
  tasksMeta: {
    total: number
    todo: number
    "in-progress": number
    done: number
  }
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
  status?: TaskStatusType[]
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
type CreateTaskInput = z.infer<typeof CreateTaskSchema>
type CreateTaskInputForm = z.infer<typeof CreateTaskSchemaForm>
type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>

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
  CreateTaskInputForm,
  UpdateTaskListInput,
  CreateTaskInput,
  UpdateTaskInput
}
