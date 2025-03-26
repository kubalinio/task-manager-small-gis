import * as React from "react"

import type { VariantProps } from "class-variance-authority"

import { cva } from "class-variance-authority"

import { cn } from "libs/utils"

const containerVariants = cva("mx-auto", {
  variants: {
    variant: {
      default: "shadow-zCard rounded-md bg-white px-6 py-20",
      "without-style": "px-0 sm:px-0 lg:px-0",
      "full-mobile-constrained-padded": "max-w-7xl sm:px-6 lg:px-8",
      "full-mobile-breakpoint-padded": "container mx-auto sm:px-6 lg:px-8",
      "constrained-padded": "max-w-7xl px-4 sm:px-6 lg:px-8",
      "narrow-constrained-padded":
        "max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8",
      "breakpoint-padded": "container mx-auto px-4 sm:px-6 lg:px-10 lg:pt-6"
    }
  },
  defaultVariants: {
    variant: "breakpoint-padded"
  }
})

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean
  as?: React.ElementType
}

const Container: React.FC<ContainerProps> = ({
  asChild,
  as,
  className,
  children,
  variant,
  ...props
}) => {
  const Comp = asChild ? React.Fragment : as ? as : "div"

  const containerClasses = cn(containerVariants({ variant }), className)

  return (
    <Comp className={containerClasses} {...props}>
      {variant === "narrow-constrained-padded" ? (
        <div className='mx-auto max-w-3xl'>{children}</div>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Container, containerVariants }
