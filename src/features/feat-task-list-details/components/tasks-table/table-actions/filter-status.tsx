import { Filter } from "lucide-react"

import {
  Button,
  Checkbox,
  Popover,
  PopoverContent,
  PopoverTrigger
} from "components/ui"

import { useTasksTable } from "../../../hooks"

const FilterStatus = () => {
  const {
    handleStatusChange,
    selectedStatuses,
    uniqueStatusValues,
    statusCounts
  } = useTasksTable()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='ml-auto lg:ml-0'>
          <Filter
            className='text-muted-foreground/60 -ms-1.5 size-5'
            size={20}
            aria-hidden='true'
          />
          Filter
          {selectedStatuses.length > 0 && (
            <span className='border-border bg-background text-muted-foreground/70 ms-3 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium'>
              {selectedStatuses.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-auto min-w-36 p-3' align='end'>
        <div className='space-y-3'>
          <div className='text-muted-foreground/60 text-xs font-medium uppercase'>
            Status
          </div>
          <div className='space-y-3'>
            {uniqueStatusValues.map((value, i) => (
              <div key={value} className='flex items-center gap-2'>
                <Checkbox
                  id={`${value}-${i}`}
                  checked={selectedStatuses.includes(value)}
                  onCheckedChange={(checked: boolean) => {
                    handleStatusChange(checked, value)
                  }}
                />
                <label
                  htmlFor={`${value}-${i}`}
                  className='flex grow justify-between gap-2 text-xs font-normal uppercase'
                >
                  {value.replace(/-/g, " ")}{" "}
                  <span className='text-muted-foreground ms-2 text-xs'>
                    {statusCounts.get(value)}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { FilterStatus }
