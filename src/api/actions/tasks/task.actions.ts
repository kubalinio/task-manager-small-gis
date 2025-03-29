import type { IndexDBClient } from "api/indexdb"
import type { List, Task } from "api/types"
import type {
  CreateTaskInput,
  CreateTaskListInput,
  MutationTaskListResponse,
  TaskResponse,
  UpdateTaskInput,
  UpdateTaskListInput
} from "./task.types"

import { v4 as uuidv4 } from "uuid"

import { getDB } from "api/indexdb"
import {
  createNotFoundError,
  createValidationError
} from "api/utils/error-handler"

import { TaskStatus } from "./task.types"
import {
  CreateTaskListSchema,
  CreateTaskSchema,
  updateListSchema,
  updateTaskSchema
} from "./task.validators"

const createTaskList =
  (client: IndexDBClient) =>
  async (data: CreateTaskListInput): Promise<MutationTaskListResponse> => {
    const db = client || (await getDB())

    // Validate input data
    const validationResult = CreateTaskListSchema.safeParse(data)

    if (!validationResult.success) {
      throw createValidationError("Invalid list data", {
        errors: validationResult.error.format()
      })
    }

    const timestamp = Date.now()
    const newList: List = {
      id: uuidv4(),
      title: data.title,
      createdAt: timestamp,
      updatedAt: timestamp
    }

    await db.add("task_lists", newList)

    return newList
  }

const updateTaskList =
  (client: IndexDBClient) =>
  async (
    id: string,
    data: UpdateTaskListInput
  ): Promise<MutationTaskListResponse> => {
    const db = client || (await getDB())

    // Check if list exists
    const existingList = await db.get("task_lists", id)

    if (!existingList) {
      throw createNotFoundError("List", id)
    }

    // Validate input data
    const validationResult = updateListSchema.safeParse(data)

    if (!validationResult.success) {
      throw createValidationError("Invalid list data", {
        errors: validationResult.error.format()
      })
    }

    const updatedList: List = {
      ...existingList,
      title: data.title,
      updatedAt: Date.now()
    }

    await db.put("task_lists", updatedList)

    return updatedList
  }

const deleteTaskList =
  (client: IndexDBClient) =>
  async (id: string): Promise<void> => {
    const db = client || (await getDB())

    // Check if list exists
    const existingList = await db.get("task_lists", id)

    if (!existingList) {
      throw createNotFoundError("List", id)
    }

    // Begin transaction to delete list and all its tasks
    const tx = db.transaction(["task_lists", "tasks"], "readwrite")

    // Delete all tasks with the listId
    const taskStore = tx.objectStore("tasks")
    const taskIndex = taskStore.index("by-list")
    let cursor = await taskIndex.openCursor(id)

    while (cursor) {
      await cursor.delete()
      cursor = await cursor.continue()
    }

    // Delete the list
    await tx.objectStore("task_lists").delete(id)

    // Commit the transaction
    await tx.done
  }

const createTask =
  (client: IndexDBClient) =>
  async (data: CreateTaskInput): Promise<TaskResponse> => {
    const db = client || (await getDB())

    const validationResult = CreateTaskSchema.safeParse(data)

    if (!validationResult.success) {
      throw createValidationError("Invalid task data", {
        errors: validationResult.error.format()
      })
    }

    const list = await db.get("task_lists", data.listId)

    if (!list) {
      throw createNotFoundError("List", data.listId)
    }

    const timestamp = Date.now()
    const newTask: Task = {
      id: uuidv4(),
      listId: data.listId,
      title: data.title,
      description: data.description ?? "",
      status: data.status || TaskStatus.TODO,
      createdAt: timestamp,
      updatedAt: timestamp
    }

    await db.add("tasks", newTask)

    return {
      data: newTask
    }
  }

const updateTask =
  (client: IndexDBClient) =>
  async (id: string, data: UpdateTaskInput): Promise<TaskResponse> => {
    const db = client || (await getDB())

    const existingTask = await db.get("tasks", id)

    if (!existingTask) {
      throw createNotFoundError("Task", id)
    }

    const validationResult = updateTaskSchema.safeParse(data)

    if (!validationResult.success) {
      throw createValidationError("Invalid task data", {
        errors: validationResult.error.format()
      })
    }

    const updatedTask: Task = {
      ...existingTask,
      ...data,
      updatedAt: Date.now()
    }

    await db.put("tasks", updatedTask)

    return {
      data: updatedTask
    }
  }

const deleteTask =
  (client: IndexDBClient) =>
  async (id: string): Promise<void> => {
    const db = client || (await getDB())

    const existingTask = await db.get("tasks", id)

    if (!existingTask) {
      throw createNotFoundError("Task", id)
    }

    await db.delete("tasks", id)
  }

const deleteSelectedTasks =
  (client: IndexDBClient) =>
  async (
    listId: string,
    taskIds: string[]
  ): Promise<{ details: { message: string } }> => {
    const db = client || (await getDB())

    const tx = db.transaction(["tasks"], "readwrite")

    const taskStore = tx.objectStore("tasks")
    const taskIndex = taskStore.index("by-list")
    let cursor = await taskIndex.openCursor(listId)

    while (cursor) {
      if (taskIds.includes(cursor.value.id)) {
        await cursor.delete()
      }
      cursor = await cursor.continue()
    }

    await tx.done

    return {
      details: {
        message: "Tasks deleted successfully"
      }
    }
  }

export const taskActions = {
  createTaskList,
  updateTaskList,
  deleteTaskList,
  createTask,
  updateTask,
  deleteTask,
  deleteSelectedTasks
}
