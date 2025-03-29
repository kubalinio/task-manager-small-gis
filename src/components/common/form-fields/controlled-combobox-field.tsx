"use client"

import React, { useState } from "react"

import type { FieldValues, Path } from "react-hook-form"

import { useFormContext } from "react-hook-form"

import { cn } from "libs/utils"
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger
} from "components/ui"

type Status = {
  value: string
  label: string
}

const statuses: Status[] = [
  {
    value: "backlog",
    label: "Backlog"
  },
  {
    value: "todo",
    label: "Todo"
  },
  {
    value: "in progress",
    label: "In Progress"
  },
  {
    value: "done",
    label: "Done"
  },
  {
    value: "canceled",
    label: "Canceled"
  }
]

type NComboboxFieldProps = {
  className?: string
  label?: string
  placeholder?: string
  description?: string
  showError?: boolean
  options: Status[]
  emptyMessage?: string
  searchPlaceholder?: string
  buttonText?: string
}

type ComboboxControllerType<T extends FieldValues> = {
  name: Path<T>
}

interface ControlledComboboxProps<T extends FieldValues>
  extends Omit<NComboboxFieldProps, "name">,
    ComboboxControllerType<T> {}

const ControlledComboboxField = <T extends FieldValues>({
  name,
  label,
  placeholder = "+ Set status",
  description,
  className,
  showError = true,
  options = statuses,
  emptyMessage = "No results found.",
  searchPlaceholder = "Search...",
  ...props
}: ControlledComboboxProps<T>) => {
  const { control } = useFormContext()
  const [open, setOpen] = useState(false)

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn("flex w-full flex-col", className)}>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant='secondary' className='w-[150px] justify-start'>
                  {field.value ? (
                    <>
                      {
                        options.find((option) => option.value === field.value)
                          ?.label
                      }
                    </>
                  ) : (
                    <>{placeholder}</>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='p-0' side='right' align='start'>
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={(value: string) => {
                            field.onChange(value)
                            setOpen(false)
                          }}
                          className='bg-primary mt-4'
                        >
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          {showError && <FormMessage />}
        </FormItem>
      )}
    />
  )
}

export { ControlledComboboxField }
