import { useEffect, useState } from "react"

import type { IndexDBClient } from "api/indexdb"
import type { IndexDBContextType } from "libs/context/indexdb-client/indexdb-context"
import type React from "react"

import { getDB } from "api/indexdb"
import { seedDatabaseIfEmpty } from "api/utils/seed-data"
import { IndexDBContext } from "libs/context/indexdb-client/indexdb-context"

interface IndexDBProviderProps {
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
        const db = await getDB()

        await seedDatabaseIfEmpty()

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
