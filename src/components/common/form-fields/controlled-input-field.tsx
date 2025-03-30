"use client"

import React, { forwardRef } from "react"

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
  Input
} from "components/ui"

type NInputFieldProps = {
  className?: string
  label?: string
  placeholder?: string
  description?: string
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"]
  showError?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

type InputControllerType<T extends FieldValues> = {
  name: Path<T>
  requiredStar?: boolean
}

interface ControlledInputProps<T extends FieldValues>
  extends Omit<NInputFieldProps, "name">,
    InputControllerType<T> {}

const ControlledInputField = forwardRef(
  <T extends FieldValues>(
    {
      name,
      label,
      placeholder,
      description,
      type,
      className,
      showError = true,
      requiredStar = false,
      ...props
    }: ControlledInputProps<T>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const { control } = useFormContext()

    return (
      <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <FormItem
            className={cn("group relative w-full space-y-1.5", className)}
          >
            {label && (
              <FormLabel className='origin-start text-muted-foreground/70 group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium'>
                <span className='bg-background inline-flex px-2'>
                  {label}{" "}
                  {requiredStar && (
                    <span className='text-error-600 -ml-px'>*</span>
                  )}
                </span>
              </FormLabel>
            )}

            <FormControl>
              <Input
                placeholder={placeholder}
                type={type ? type : "text"}
                {...props}
                {...field}
                value={field.value ?? ""}
                ref={ref}
              />
            </FormControl>

            {description && <FormDescription>{description}</FormDescription>}

            {showError && <FormMessage />}
          </FormItem>
        )}
      />
    )
  }
)

ControlledInputField.displayName = "ControlledInputField"

const ControlledNumberInputField = forwardRef(
  <T extends FieldValues>(
    {
      name,
      label,
      placeholder,
      description,
      type,
      className,
      showError = true,
      ...props
    }: ControlledInputProps<T>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const { control } = useFormContext()

    return (
      <FormField
        name={name}
        control={control}
        render={({ field }) => {
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value) {
              if (/^\d*$/.test(e.target.value)) {
                field.onChange(e.target.value)
              }
            } else if (e.target.value === "") {
              field.onChange("")
            }
          }

          return (
            <FormItem className={cn("w-full space-y-1.5", className)}>
              {label && <FormLabel>{label}</FormLabel>}

              <FormControl>
                <Input
                  className='h-11'
                  maxLength={32}
                  inputMode='numeric'
                  placeholder={placeholder}
                  type={type ? type : "text"}
                  {...field}
                  {...props}
                  onChange={handleChange}
                  value={field.value ?? ""}
                  ref={ref}
                />
              </FormControl>

              {description && <FormDescription>{description}</FormDescription>}

              {showError && <FormMessage />}
            </FormItem>
          )
        }}
      />
    )
  }
)

ControlledNumberInputField.displayName = "ControlledNumberInputField"

const ControlledPostalCodeInputField = forwardRef(
  <T extends FieldValues>(
    {
      name,
      label,
      placeholder,
      description,
      type,
      className,
      showError = true,
      ...props
    }: ControlledInputProps<T>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const { control } = useFormContext()

    return (
      <FormField
        name={name}
        control={control}
        render={({ field }) => {
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target

            if (value === "") {
              field.onChange("")
              return
            }

            if (!/^\d{0,2}-?\d{0,3}$/.test(value) || value === "-") return

            const newValue =
              value.length === 3 && !value.includes("-")
                ? `${value.substring(0, 2)}-${value.substring(2)}`
                : value.length === 3 && value.charAt(2) === "-"
                  ? value.slice(0, 2)
                  : value

            field.onChange(newValue)
          }

          return (
            <FormItem className={cn("w-full space-y-1.5", className)}>
              {label && <FormLabel>{label}</FormLabel>}

              <FormControl>
                <Input
                  className='h-11'
                  maxLength={8}
                  {...props}
                  inputMode='numeric'
                  placeholder={placeholder}
                  type={type ? type : "text"}
                  {...field}
                  value={field.value ?? ""}
                  onChange={handleChange}
                  ref={ref}
                />
              </FormControl>

              {description && <FormDescription>{description}</FormDescription>}

              {showError && <FormMessage />}
            </FormItem>
          )
        }}
      />
    )
  }
)

ControlledPostalCodeInputField.displayName = "ControlledPostalCodeInputField"

export {
  ControlledInputField,
  ControlledNumberInputField,
  ControlledPostalCodeInputField
}
