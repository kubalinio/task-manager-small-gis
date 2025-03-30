import "./styles/globals.css"

import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClientProvider } from "@tanstack/react-query"
import {
  createRouter,
  ErrorComponent,
  RouterProvider
} from "@tanstack/react-router"

import { useIndexDB } from "libs/hooks"

import { IndexDBProvider } from "./libs/providers/indexdb-provider"
import { queryClient } from "./libs/providers/query-client"
import { routeTree } from "./routeTree.gen"

if (import.meta.env.DEV) {
  import.meta.glob("./wdyr.ts", { eager: true })
}

const router = createRouter({
  routeTree,
  context: {
    queryClient: queryClient,
    indexDBClient: null
  },
  defaultPreload: "intent",
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  defaultPreloadStaleTime: 0,
  scrollRestoration: true
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  const { client } = useIndexDB()

  return (
    <RouterProvider
      router={router}
      context={{
        indexDBClient: client
      }}
    />
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IndexDBProvider>
        <InnerApp />
      </IndexDBProvider>
    </QueryClientProvider>
  )
}

let root: ReactDOM.Root | null = null

const initApp = async () => {
  const rootElement = document.getElementById("root")
  if (!rootElement) throw new Error("Root element not found")

  if (!root) {
    root = ReactDOM.createRoot(rootElement)
  }

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

await initApp()
