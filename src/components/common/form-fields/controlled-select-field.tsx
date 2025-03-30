"use client"

import type { FieldValues, Path } from "react-hook-form"

import { useFormContext } from "react-hook-form"

import { cn } from "libs/utils"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "components/ui"

type SelectFieldProps = {
  className?: string
  label?: string
  placeholder?: string
  description?: string
  showError?: boolean
  options: { value: string; label: string }[]
}

type SelectControllerType<T extends FieldValues> = {
  name: Path<T>
}

interface ControlledSelectProps<T extends FieldValues>
  extends Omit<SelectFieldProps, "name">,
    SelectControllerType<T> {}

const ControlledSelectField = <T extends FieldValues>({
  name,
  label,
  placeholder = "+ Set status",
  description,
  className,
  showError = true,
  options,
  ...props
}: ControlledSelectProps<T>) => {
  const { control } = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn("flex w-full flex-col", className)}>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              defaultValue={field.value}
              {...props}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          {showError && <FormMessage />}
        </FormItem>
      )}
    />
  )
}

export { ControlledSelectField }
