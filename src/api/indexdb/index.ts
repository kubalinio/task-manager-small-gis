import type { IDBPDatabase } from "idb"
import type { IndexDBClient, TaskManagerDB } from "./types"

import { openDB } from "idb"

const DB_NAME = "task-manager-db"
const DB_VERSION = 1

const initDB = async (): Promise<IDBPDatabase<TaskManagerDB>> => {
  return openDB<TaskManagerDB>(DB_NAME, DB_VERSION, {
    upgrade(db: IDBPDatabase<TaskManagerDB>) {
      const listStore = db.createObjectStore("task_lists", { keyPath: "id" })
      listStore.createIndex("by-created", "createdAt")

      const taskStore = db.createObjectStore("tasks", { keyPath: "id" })
      taskStore.createIndex("by-list", "listId")
      taskStore.createIndex("by-status", "status")
      taskStore.createIndex("by-created", "createdAt")
    }
  })
}

let dbPromise: Promise<IDBPDatabase<TaskManagerDB>> | null = null

const getDB = (): Promise<IDBPDatabase<TaskManagerDB>> => {
  if (!dbPromise) {
    dbPromise = initDB()
  }

  return dbPromise
}

const clearDB = async (): Promise<void> => {
  const db = await getDB()
  const tx = db.transaction(["task_lists", "tasks"], "readwrite")

  await Promise.all([
    tx.objectStore("task_lists").clear(),
    tx.objectStore("tasks").clear(),
    tx.done
  ])
}

export type { IndexDBClient }
export { getDB, clearDB }
