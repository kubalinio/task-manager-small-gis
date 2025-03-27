import { useId } from "react"

import { Search, X } from "lucide-react"

import { useTasksTable } from "features/feat-dashboard/components/tasks-table/hooks"
import { cn } from "libs/utils"
import { Input } from "components/ui"

const FilterSearch = () => {
  const id = useId()
  const { table, inputRef } = useTasksTable()

  return (
    <div className='relative'>
      <Input
        id={`${id}-input`}
        ref={inputRef}
        className={cn(
          "peer bg-background from-accent/60 to-accent min-w-60 bg-gradient-to-br ps-9",
          Boolean(table.getColumn("title")?.getFilterValue()) && "pe-9"
        )}
        value={(table.getColumn("title")?.getFilterValue() ?? "") as string}
        onChange={(e) =>
          table.getColumn("title")?.setFilterValue(e.target.value)
        }
        placeholder='Search by title'
        type='text'
        aria-label='Search by title'
      />

      <div className='text-muted-foreground/60 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50'>
        <Search size={20} aria-hidden='true' />
      </div>

      {Boolean(table.getColumn("title")?.getFilterValue()) && (
        <button
          className='text-muted-foreground/60 hover:text-foreground focus-visible:outline-ring/70 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg outline-offset-2 transition-colors focus:z-10 focus-visible:outline-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
          aria-label='Clear filter'
          onClick={() => {
            table.getColumn("title")?.setFilterValue("")
            if (inputRef.current) {
              inputRef.current.focus()
            }
          }}
        >
          <X size={16} aria-hidden='true' />
        </button>
      )}
    </div>
  )
}

export { FilterSearch }
