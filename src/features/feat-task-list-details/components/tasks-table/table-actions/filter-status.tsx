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
  const { handleStatusChange, selectedStatuses, statusMeta } = useTasksTable()

  const statusValues = Object.keys(statusMeta ?? {})
  const MapedStatusValues = statusValues
    .map((value) => ({
      label: value.replace(/-/g, " "),
      value: value,
      numbers: statusMeta?.[value as keyof typeof statusMeta]
    }))
    .slice(1, 4)

  const selectedItems = selectedStatuses.reduce((acc, status) => {
    return acc + (statusMeta?.[status as keyof typeof statusMeta] ?? 0)
  }, 0)

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
            <span className='border-border bg-background text-muted-foreground/70 -mr-1 ml-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-sm font-medium'>
              {selectedItems}
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
            {MapedStatusValues.map((value, i) => (
              <div key={value.value} className='flex items-center gap-2'>
                <Checkbox
                  id={`${value.value}-${i}`}
                  checked={selectedStatuses.includes(value.value)}
                  onCheckedChange={(checked: boolean) => {
                    handleStatusChange(checked, value.value)
                  }}
                />
                <label
                  htmlFor={`${value.value}-${i}`}
                  className='flex grow justify-between gap-2 text-xs font-normal uppercase'
                >
                  {value.label}{" "}
                  <span className='text-muted-foreground ms-2 text-xs'>
                    {value.numbers}
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
