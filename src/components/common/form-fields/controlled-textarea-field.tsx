"use client"

import React from "react"

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
  Textarea,
  TextareaAutosize
} from "components/ui"

type NTextareaFieldProps = {
  className?: string
  classNameInput?: string
  label?: string
  placeholder?: string
  description?: string
  showError?: boolean
  showUpdated?: boolean
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

type TextareaControllerType<T extends FieldValues> = {
  name: Path<T>
}

interface ControlledInputProps<T extends FieldValues>
  extends Omit<NTextareaFieldProps, "name">,
    TextareaControllerType<T> {}

const ControlledTextareaField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  className,
  classNameInput,
  showError = true,
  ...props
}: ControlledInputProps<T>) => {
  const { control } = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem
          className={cn("group relative flex w-full flex-col", className)}
        >
          {label && (
            <FormLabel className='bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50'>
              {label}
            </FormLabel>
          )}

          <FormControl>
            <TextareaAutosize
              className={cn("", classNameInput)}
              placeholder={placeholder}
              {...props}
              {...field}
            />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          {showError && <FormMessage />}
        </FormItem>
      )}
    />
  )
}

export { ControlledTextareaField }
