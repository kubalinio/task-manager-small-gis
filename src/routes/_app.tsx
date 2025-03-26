import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_app")({
  component: () => <AppLayout />
})

const AppLayout = () => {
  return (
    <main className='container grid grid-cols-2 items-center justify-center gap-x-8 py-8 xl:py-12 3xl:h-screen 3xl:py-16'>
      <Outlet />
    </main>
  )
}
