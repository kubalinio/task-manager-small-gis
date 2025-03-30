import * as React from "react"

import type * as LabelPrimitive from "@radix-ui/react-label"

import { Slot } from "@radix-ui/react-slot"
import { FormProvider } from "react-hook-form"

import { cn } from "libs/utils"

import { Typography } from "../typography"
import { FormLabel as FormLabelUI } from "./form-label"
import { useFormField } from "./use-form-field"

const Form = FormProvider

const FormLabel = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { formItemId, error } = useFormField()

  return (
    <FormLabelUI
      className={cn("text-xs", className, {
        "": Boolean(error)
      })}
      htmlFor={formItemId}
      ref={ref}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ComponentRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      aria-describedby={
        !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={Boolean(error)}
      id={formItemId}
      ref={ref}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      className={cn("text-muted-foreground text-sm", className)}
      id={formDescriptionId}
      ref={ref}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    t?: (arg: { id: string }) => string
  }
>(({ className, children, t = undefined, ...props }, ref) => {
  const { error, formMessageId } = useFormField()

  const body = error
    ? typeof t === "function"
      ? t({ id: `errors.${error.message}` })
      : error.message
    : children

  if (!body) {
    return null
  }

  return (
    <p
      className={cn("text-sm font-medium text-red-600", className)}
      id={formMessageId}
      ref={ref}
      {...props}
    >
      {body}
    </p>
  )
})

FormMessage.displayName = "FormMessage"

const FormTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <Typography
      as='h3'
      variant='overline'
      className={cn("text-gray-600", className)}
      {...props}
    >
      {children}
    </Typography>
  )
}

export {
  Form,
  FormLabelUI,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
  FormTitle
}
