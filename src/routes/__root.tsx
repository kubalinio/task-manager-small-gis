import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

import type { QueryClient } from "@tanstack/react-query"
import type { IndexDBClient } from "api/indexdb"

import { Link } from "components/common/link"
import { Container } from "components/ui"

const enableTanstackRouterDevtools = import.meta.env.DEV

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  indexDBClient: IndexDBClient | null
}>()({
  component: RootComponent,
  notFoundComponent: () => (
    <Container className='flex h-screen w-screen items-center justify-center'>
      <div className='text-2xl font-bold'>Not Found</div>

      <Link to='/'>Go to Home</Link>
    </Container>
  )
})

function RootComponent() {
  return (
    <>
      <Outlet />

      {enableTanstackRouterDevtools && (
        <TanStackRouterDevtools position='bottom-left' />
      )}
    </>
  )
}
