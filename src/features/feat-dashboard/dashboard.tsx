import { SidebarTrigger } from "components/layouts/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  Container,
  Separator,
  Typography
} from "components/ui"

const Dashboard = () => {
  return (
    <>
      <header className='bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4'>
        <SidebarTrigger className='-ml-1' />

        <Separator orientation='vertical' className='mr-2 h-4' />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className='hidden md:block'>
              <BreadcrumbLink href='/'>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <Container>
        <div className='flex flex-1 flex-col gap-4 p-4'>
          <Typography as='h1' variant='h2'>
            Dashboard
          </Typography>
          {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className='bg-muted/50 aspect-video h-12 w-full rounded-lg'
            />
          ))}
        </div>
      </Container>
    </>
  )
}

export { Dashboard }
