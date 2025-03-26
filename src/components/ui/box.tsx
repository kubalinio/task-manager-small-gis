/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

import * as React from "react"

import type { VariantProps } from "class-variance-authority"

import { cva } from "class-variance-authority"
import { cn } from "libs/utils/cn"

const boxVariants = cva("", {
  variants: {
    variant: {
      default: "",
      card: "border-border rounded-[1.25rem] border-2"
    },
    padding: {
      sm: "p-4",
      md: "p-5",
      lg: "p-6",
      xl: "p-8",
      "2xl": "p-10"
    },
    mx: {
      sm: "mx-4",
      md: "mx-5",
      lg: "mx-6",
      xl: "mx-8",
      "2xl": "mx-10"
    },
    my: {
      sm: "my-4",
      md: "my-5",
      lg: "my-6",
      xl: "my-8",
      "2xl": "my-10"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  asChild?: boolean
  as?: React.ElementType
}

const Box: React.FC<BoxProps> = ({
  asChild,
  as,
  className,
  children,
  variant,
  padding,
  mx,
  my,
  ...props
}) => {
  const Comp = asChild ? React.Fragment : as ? as : "div"

  const boxClasses = cn(boxVariants({ variant, padding, mx, my }), className)

  return (
    <Comp className={boxClasses} {...props}>
      {children}
    </Comp>
  )
}

export { Box, boxVariants }
