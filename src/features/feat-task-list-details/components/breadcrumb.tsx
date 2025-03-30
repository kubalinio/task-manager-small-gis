import { Link } from "components/common/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "components/ui"

import { useListDetails } from "../hooks"

export const TaskListBreadcrumb = () => {
  const { taskList } = useListDetails()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>Task Lists</BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/task-lists/${taskList?.id}`}
            className='bg-accent rounded-md px-2 py-1'
            asChild
          >
            <Link
              to='/task-lists/$taskListId'
              params={{ taskListId: taskList?.id }}
              variant='secondary'
              className='text-sm'
            >
              {taskList?.title}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
