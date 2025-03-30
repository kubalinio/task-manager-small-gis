import { createContext, useEffect, useState } from "react"

import type { IndexDBClient } from "api/indexdb"

import { getDB } from "api/indexdb"
import { seedDatabaseIfEmpty } from "api/utils/seed-data"

type IndexDBContextType = {
  client: IndexDBClient | null
  isLoading: boolean
  error: Error | null
}

export const IndexDBContext = createContext<IndexDBContextType | null>(null)

type IndexDBProviderProps = {
  children: React.ReactNode
}

export const IndexDBProvider = ({ children }: IndexDBProviderProps) => {
  const [client, setClient] = useState<IndexDBClient | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const initializeDB = async () => {
      try {
        setIsLoading(true)

        if (
          process.env.NODE_ENV === "test" ||
          typeof indexedDB === "undefined"
        ) {
          setClient(null)
          setError(null)
          setIsLoading(false)
          return
        }

        const db = await getDB()

        setClient(db)
        setError(null)
      } catch (err) {
        console.error("Failed to initialize IndexDB:", err)
        setError(
          err instanceof Error ? err : new Error("Failed to initialize IndexDB")
        )
      } finally {
        setIsLoading(false)
      }
    }

    initializeDB()
  }, [])

  const contextValue: IndexDBContextType = {
    client,
    isLoading,
    error
  }

  return (
    <IndexDBContext.Provider value={contextValue}>
      {children}
    </IndexDBContext.Provider>
  )
}
