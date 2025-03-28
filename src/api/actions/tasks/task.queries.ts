import type { IndexDBClient } from "api/indexdb"
import type { List, Task } from "api/types"
import type { TaskListsResponse, TasksFilterOptions } from "./task.types"

import { getDB } from "api/indexdb"
import { createNotFoundError } from "api/utils/error-handler"
import { queryFactoryOptions } from "api/utils/query-factory-options"

const getAllTaskLists =
  (client: IndexDBClient) =>
  async (_filters?: TasksFilterOptions): Promise<TaskListsResponse> => {
    const db = client || (await getDB())
    const lists = await db.getAll("task_lists")

    lists.sort((a: List, b: List) => b.createdAt - a.createdAt)

    // const tasks = await getAllTasks(client)()

    return {
      data: lists.map((list) => ({
        ...list,
        tasksMeta: {
          todo: 0,
          in_progress: 0,
          done: 0,
          total: 0
        }
      })),
      meta: {
        total: lists.length,
        tasks: {
          todo: 0,
          in_progress: 0,
          done: 0,
          total: 0
        }
      }
    }
  }

const getTaskList = (client: IndexDBClient) => async (id: string) => {
  const db = client || (await getDB())
  const list = await db.get("task_lists", id)

  if (!list) {
    throw createNotFoundError("Task List", id)
  }

  const tasks = await getAllTasks(client)({ listId: id })

  return {
    ...list,
    tasks
  }
}

const getAllTasks =
  (client: IndexDBClient) => async (filters?: TasksFilterOptions) => {
    const db = client || (await getDB())
    let tasks: Task[] = []

    // If listId is provided, get tasks by listId
    if (filters?.listId) {
      const index = db.transaction("tasks").store.index("by-list")

      try {
        tasks = await index.getAll(filters.listId)
      } catch (error) {
        console.error(error)
        tasks = []
      }
    } else {
      tasks = []
    }

    // Apply status filter if provided
    if (filters?.status) {
      tasks = tasks.filter((task) => task.status === filters.status)
    }

    // Apply text search if provided
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase()
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
      )
    }

    // Apply sorting
    const sortBy = filters?.sortBy || "createdAt"
    const sortDirection = filters?.sortDirection || "desc"

    tasks.sort((a: Task, b: Task) => {
      return sortDirection === "asc"
        ? (a[sortBy as keyof Task] as number) -
            (b[sortBy as keyof Task] as number)
        : (b[sortBy as keyof Task] as number) -
            (a[sortBy as keyof Task] as number)
    })

    return {
      data: tasks,
      meta: {
        total: tasks.length
      }
    }
  }

const getTask = (client: IndexDBClient) => async (id: string) => {
  const db = client || (await getDB())
  const task = await db.get("tasks", id)

  if (!task) {
    throw createNotFoundError("Task", id)
  }

  return {
    data: task
  }
}

export const taskQueries = {
  all: () => ["tasks"],
  getAllTaskLists: (filters?: TasksFilterOptions) =>
    queryFactoryOptions({
      queryKey: [...taskQueries.all(), "lists", filters],
      queryFn: (client) => async () => getAllTaskLists(client)(filters)
    }),
  getTaskList: (id: string) =>
    queryFactoryOptions({
      queryKey: [...taskQueries.all(), "lists", id],
      queryFn: (client) => async () => getTaskList(client)(id)
    }),
  getAllTasks: (filters?: TasksFilterOptions) =>
    queryFactoryOptions({
      queryKey: [...taskQueries.all(), "all", filters],
      queryFn: (client) => async () => getAllTasks(client)(filters)
    }),
  getTask: (id: string) =>
    queryFactoryOptions({
      queryKey: [...taskQueries.all(), "item", id],
      queryFn: (client) => async () => getTask(client)(id)
    })
}
