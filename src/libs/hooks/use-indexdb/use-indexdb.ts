import { useContext } from "react"

import { IndexDBContext } from "libs/context/indexdb-client/indexdb-context"

export const useIndexDB = () => {
  const context = useContext(IndexDBContext)

  if (!context) {
    throw new Error("useIndexDB must be used within an IndexDBProvider")
  }

  return context
}
