import type { IndexDBClient } from "api/indexdb"
import type {
  CreateTaskInput,
  CreateTaskListInput,
  UpdateTaskInput,
  UpdateTaskListInput
} from "./task.types"

import { taskActions } from "./task.actions"

export const taskMutations = {
  createTaskList: (client: IndexDBClient) => (data: CreateTaskListInput) => {
    return taskActions.createTaskList(client)(data)
  },

  updateTaskList:
    (client: IndexDBClient) =>
    (params: { id: string; data: UpdateTaskListInput }) => {
      return taskActions.updateTaskList(client)(params.id, params.data)
    },

  deleteTaskList: (client: IndexDBClient) => (id: string) => {
    return taskActions.deleteTaskList(client)(id)
  },

  createTask: (client: IndexDBClient) => (data: CreateTaskInput) => {
    return taskActions.createTask(client)(data)
  },

  updateTask:
    (client: IndexDBClient) =>
    (params: { id: string; data: UpdateTaskInput }) => {
      return taskActions.updateTask(client)(params.id, params.data)
    },

  deleteTask: (client: IndexDBClient) => (id: string) => {
    return taskActions.deleteTask(client)(id)
  },

  deleteSelectedTasks:
    (client: IndexDBClient) => (listId: string, taskIds: string[]) => {
      return taskActions.deleteSelectedTasks(client)(listId, taskIds)
    }
}

export type UpdateTaskParams = { id: string; data: UpdateTaskInput }
