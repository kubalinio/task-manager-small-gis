import React from "react"

import type { VariantProps } from "class-variance-authority"

import { cva } from "class-variance-authority"

import { cn } from "libs/utils"

const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      h1: "text-[3.2rem] leading-[4rem] font-bold",
      h2: "text-[2.8rem] leading-[3.5rem] font-bold",
      h3: "text-[2.4rem] leading-[3rem] font-bold",
      h4: "text-[2rem] leading-9 font-bold",
      h5: "text-[1.6rem] leading-[2.25rem] font-bold",
      h6: "text-[1.2rem] leading-7 font-bold",
      "subtitle-1": "text-base leading-6 font-semibold",
      "subtitle-2": "text-sm leading-[1.375rem] font-semibold",
      "body-1": "text-base leading-6 font-normal",
      "body-2": "text-sm leading-[1.375rem] font-normal",
      caption: "text-xs leading-[1.125rem] font-normal",
      overline: "text-xs leading-[1.125rem] font-bold"
    }
  },
  defaultVariants: {
    variant: "body-1"
  }
})

const getDefaultComponent = (
  variant: string | undefined | null
): keyof React.JSX.IntrinsicElements => {
  switch (variant) {
    case "h1":
      return "h1"
    case "h2":
      return "h2"
    case "h3":
      return "h3"
    case "h4":
      return "h4"
    case "h5":
      return "h5"
    case "h6":
      return "h6"
    case "subtitle-1":
      return "p"
    case "subtitle-2":
      return "p"
    case "body-1":
      return "p"
    case "body-2":
      return "p"
    case "caption":
      return "p"
    case "overline":
      return "p"

    default:
      return "p"
  }
}

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType
}

const Typography = React.forwardRef<
  React.HTMLAttributes<HTMLElement>,
  TypographyProps
>(({ variant, children, as, className, ...props }, ref) => {
  const Component = as ?? getDefaultComponent(variant)

  return (
    <Component
      ref={ref}
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Component>
  )
})

Typography.displayName = "Typography"

export { Typography, typographyVariants }
