// see https://testing-library.com/docs/react-testing-library/setup#custom-render

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider
} from "@tanstack/react-router"

import type { Queries } from "@testing-library/dom"
import type { RenderOptions, RenderResult } from "@testing-library/react"
import type { ExtraRenderOptions, WrapperProps } from "./types"

import { render } from "@testing-library/react"

import { IndexDBProvider } from "libs/providers/indexdb-provider"
import { SidebarProvider } from "components/ui/sidebar"

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0
    }
  }
})

// @TODO: https://bitbucket.org/thesoftwarehouse/react-starter-boilerplate/pull-requests/5/rss-9-add-login-page/diff#comment-132626297
const _Wrapper = ({ children, routerConfig = {} }: WrapperProps) => {
  const { routerPath = "/", currentPath = routerPath } = routerConfig

  const rootRoute = createRootRoute({ component: () => <Outlet /> })

  const componentRoute = createRoute({
    path: routerPath,
    getParentRoute: () => rootRoute,
    component: () => children
  })
  const router = createRouter({
    history: createMemoryHistory({
      initialEntries: [currentPath]
    }),
    routeTree: rootRoute.addChildren([componentRoute])
  })

  return (
    <QueryClientProvider client={queryClient}>
      <IndexDBProvider>
        <SidebarProvider>
          <RouterProvider router={router} />
        </SidebarProvider>
      </IndexDBProvider>
    </QueryClientProvider>
  )
}

function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries"> & ExtraRenderOptions
): RenderResult
function customRender<Q extends Queries>(
  ui: React.ReactElement,
  options: RenderOptions<Q> & ExtraRenderOptions
): RenderResult<Q>
function customRender<Q extends Queries>(
  ui: React.ReactElement,
  options?: (RenderOptions<Q> | Omit<RenderOptions, "queries">) &
    ExtraRenderOptions
): RenderResult<Q> | RenderResult {
  const Wrapper = ({ children }: Pick<WrapperProps, "children">) => (
    <_Wrapper routerConfig={options?.routerConfig}>{children}</_Wrapper>
  )

  return render<Q>(ui, { wrapper: options?.wrapper ?? Wrapper, ...options })
}

// re-export everything
export * from "@testing-library/react"
// override render method
export { customRender as render }
