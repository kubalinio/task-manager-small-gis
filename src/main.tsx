import "./styles/globals.css"

import React from "react"
import ReactDOM from "react-dom/client"
import {
  createRouter,
  ErrorComponent,
  RouterProvider
} from "@tanstack/react-router"

import { routeTree } from "./routeTree.gen"

if (import.meta.env.DEV) {
  import.meta.glob("./wdyr.ts", { eager: true })
}

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  scrollRestoration: true
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  return <RouterProvider router={router} defaultPreload='intent' />
}

function App() {
  return (
    <>
      <InnerApp />
    </>
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
