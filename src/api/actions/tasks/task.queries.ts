import type { IndexDBClient } from "api/indexdb"
import type { List, Task } from "api/types"
import type {
  TaskListResponse,
  TaskListsResponse,
  TaskResponse,
  TasksFilterOptions,
  TasksResponse
} from "./task.types"

import { getDB } from "api/indexdb"
import { createNotFoundError } from "api/utils/error-handler"
import { queryFactoryOptions } from "api/utils/query-factory-options"

const getAllTaskLists =
  (client: IndexDBClient) =>
  async (_filters?: TasksFilterOptions): Promise<TaskListsResponse> => {
    const db = client || (await getDB())
    const lists = await db.getAll("task_lists")

    lists.sort((a: List, b: List) => b.createdAt - a.createdAt)

    const listsWithTasksMeta = await Promise.all(
      lists.map(async (list) => {
        const allTasks = await db
          .transaction("tasks")
          .store.index("by-list")
          .getAll(list.id)

        const listTasksMeta = allTasks.reduce(
          (acc, task) => {
            acc[task.status] += 1
            acc.total += 1
            return acc
          },
          {
            total: 0,
            todo: 0,
            "in-progress": 0,
            done: 0
          }
        )

        return {
          ...list,
          tasksMeta: listTasksMeta
        }
      })
    )

    const totalTasksMeta = listsWithTasksMeta.reduce(
      (acc, list) => {
        acc.todo += list.tasksMeta.todo
        acc["in-progress"] += list.tasksMeta["in-progress"]
        acc.done += list.tasksMeta.done
        acc.total += list.tasksMeta.total
        return acc
      },
      {
        todo: 0,
        "in-progress": 0,
        done: 0,
        total: 0
      }
    )

    return {
      data: listsWithTasksMeta,
      meta: {
        total: lists.length,
        tasks: totalTasksMeta
      }
    }
  }

const getTaskList =
  (client: IndexDBClient) =>
  async (
    id: string,
    filters?: TasksFilterOptions
  ): Promise<TaskListResponse> => {
    const db = client || (await getDB())
    const list = await db.get("task_lists", id)

    if (!list) {
      throw createNotFoundError("Task List", id)
    }

    const tasks = await getAllTasks(client)({ listId: id, ...filters })

    const allTasks = await db
      .transaction("tasks")
      .store.index("by-list")
      .getAll(id)

    const tasksMeta = allTasks.reduce(
      (acc, task) => {
        acc[task.status] += 1
        acc.total += 1
        return acc
      },
      {
        total: 0,
        todo: 0,
        "in-progress": 0,
        done: 0
      }
    )

    return {
      ...list,
      tasksMeta,
      tasks
    }
  }

const getAllTasks =
  (client: IndexDBClient) =>
  async (filters?: TasksFilterOptions): Promise<TasksResponse> => {
    const db = client || (await getDB())
    let tasks: Task[] = []

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

    const tasksMeta = tasks.reduce(
      (acc, task) => {
        acc[task.status] += 1
        acc.total += 1
        return acc
      },
      {
        total: 0,
        todo: 0,
        "in-progress": 0,
        done: 0
      }
    )

    if (filters?.status && filters.status.length > 0) {
      tasks = tasks.filter((task) => filters.status?.includes(task.status))
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase()
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
      )
    }

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
      meta: tasksMeta
    }
  }

const getTask =
  (client: IndexDBClient) =>
  async (id: string): Promise<TaskResponse> => {
    const db = client || (await getDB())
    const task = await db.get("tasks", id)

    if (!task) {
      throw createNotFoundError("Task", id)
    }

    const taskList = await db.get("task_lists", task.listId)

    return {
      data: {
        ...task,
        listTitle: taskList?.title
      }
    }
  }

export const taskQueries = {
  all: () => ["tasks"],
  getAllTaskLists: (filters?: TasksFilterOptions) =>
    queryFactoryOptions({
      queryKey: [...taskQueries.all(), "lists", filters],
      queryFn: (client) => async () => getAllTaskLists(client)(filters)
    }),
  getTaskList: (id: string, filters?: TasksFilterOptions) =>
    queryFactoryOptions({
      queryKey: [...taskQueries.all(), "lists", id],
      queryFn: (client) => async () => getTaskList(client)(id, filters)
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
