"use client"

import * as React from "react"

import type { VariantProps } from "class-variance-authority"

import * as LabelPrimitive from "@radix-ui/react-label"
import { cva } from "class-variance-authority"

import { cn } from "libs/utils"

const labelVariants = cva(
  "peer-disabled:text-opacity-70 text-sm leading-none font-medium peer-disabled:cursor-not-allowed"
)

const FormLabel = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    className={cn(labelVariants(), className)}
    ref={ref}
    {...props}
  />
))
FormLabel.displayName = LabelPrimitive.Root.displayName

export { FormLabel }
