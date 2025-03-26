import * as React from "react"

import type { VariantProps } from "class-variance-authority"

import { cva } from "class-variance-authority"
import { cn } from "libs/utils/cn"

const labelVariants = cva("flex items-center rounded-md text-xs font-bold", {
  variants: {
    color: {
      default: "text-foreground border-gray-300 bg-gray-300",
      primary: "border-primary-main bg-primary-main text-white",
      info: "border-info-main bg-info-main text-white",
      success: "border-success-main bg-success-main text-foreground",
      warning: "border-warning-main bg-warning-main text-foreground",
      error: "border-error-main bg-error-main text-white"
    },
    variant: {
      filled: "border-none",
      outlined: "border bg-transparent",
      ghost: "bg-opacity-15"
    },
    size: {
      sm: "px-2 py-px",
      md: "px-2 py-[2px]"
    }
  },
  defaultVariants: {
    variant: "filled",
    color: "default",
    size: "sm"
  }
})
export interface LabelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof labelVariants> {
  selected?: boolean
}

const textColorsOutlined = {
  default: "text-foreground",
  primary: "text-primary",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-error"
}
const textColorsGhost = {
  default: "text-foreground",
  primary: "text-primary-dark",
  info: "text-warning-dark",
  success: "text-success-dark",
  warning: "text-warning-dark",
  error: "text-error-dark"
}

const Label: React.FC<LabelProps> = ({
  className,
  variant,
  color,
  size,
  ...restProps
}) => {
  const textColor =
    variant === "ghost"
      ? textColorsGhost[color!]
      : variant === "outlined"
        ? textColorsOutlined[color!]
        : undefined

  return (
    <div
      className={cn(
        labelVariants({ color, variant, size }),
        textColor,
        className
      )}
      {...restProps}
    />
  )
}

export { Label, labelVariants }
