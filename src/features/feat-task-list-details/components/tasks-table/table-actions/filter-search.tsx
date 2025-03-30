import { useEffect, useRef, useState } from "react"

import { Loader2, Search, X } from "lucide-react"

import { useDebounce } from "libs/hooks"
import { cn } from "libs/utils"
import { Input } from "components/ui"

import { useTasksTable } from "../../../hooks"

const FilterSearch = () => {
  const { table, uniqueStatusValues, handleSearchFilter } = useTasksTable()

  const inputRef = useRef<HTMLInputElement>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 1000)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    table.getColumn("title")?.setFilterValue(e.target.value)
    setIsLoading(true)
    setSearchTerm(e.target.value)
  }

  const handleOnClear = () => {
    table.getColumn("title")?.setFilterValue("")
    setSearchTerm("")
    setIsLoading(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  useEffect(() => {
    setIsLoading(false)
    handleSearchFilter(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  return (
    <div className='relative'>
      <Input
        ref={inputRef}
        className={cn(
          "peer bg-background from-accent/60 to-accent min-w-60 bg-gradient-to-br ps-9",
          Boolean(table.getColumn("title")?.getFilterValue()) && "pe-9"
        )}
        value={(table.getColumn("title")?.getFilterValue() ?? "") as string}
        onChange={handleOnChange}
        placeholder='Search by title'
        type='text'
        aria-label='Search by title'
      />

      <div className='text-muted-foreground/60 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50'>
        {!isLoading && <Search size={20} aria-hidden='true' />}

        {isLoading && (
          <Loader2 className='animate-spin' size={16} aria-hidden='true' />
        )}
      </div>

      {Boolean(table.getColumn("title")?.getFilterValue()) && (
        <button
          className='text-muted-foreground/60 hover:text-foreground focus-visible:outline-ring/70 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg outline-offset-2 transition-colors focus:z-10 focus-visible:outline-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
          aria-label='Clear filter'
          onClick={handleOnClear}
        >
          <X size={16} aria-hidden='true' />
        </button>
      )}
    </div>
  )
}

export { FilterSearch }
