import * as React from "react"

import type { VariantProps } from "class-variance-authority"

import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "libs/utils"

const buttonVariants = cva(
  "focus-visible:ring-primary-50 focus-visible:ring-offset-primary-50 inline-flex cursor-pointer items-center justify-center gap-2 rounded-md text-[0.9375rem] leading-6 font-semibold whitespace-nowrap transition-colors focus-visible:ring-offset-[-1px] focus-visible:outline-none focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground focus-visible:bg-primary-50 disabled:bg-black-25 hover:bg-primary/90 p-0 focus-visible:ring",
        secondary:
          "bg-accent text-accent-foreground hover:bg-accent-50 focus-visible:ring-accent-50 focus-visible:ring-offset-accent-50",
        destructive:
          "border-destructive bg-background text-destructive hover:border-destructive/90 hover:text-destructive/90 rounded-none border-b text-lg",
        outline: "hover:bg-white-50 hover:text-black-100",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        action:
          "bg-white-50 hover:bg-white-25 [&_svg]:text-black-75 size-full flex-col rounded-[0.625rem] focus-visible:ring-4 focus-visible:ring-inset disabled:opacity-25 [&_svg]:size-32"
      },
      size: {
        default: "px-8 py-2",
        sm: "rounded-md px-8 py-1",
        lg: "rounded-md px-8 py-2",
        icon: "size-10",
        link: "px-2 py-1"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ size, variant, className }))}
        ref={ref}
        {...props}
      >
        {loading && (
          <span
            className={cn("opacity-100", {
              "opacity-0": loading
            })}
          >
            {children}
          </span>
        )}

        {loading && (
          <span className='absolute inset-0 flex items-center justify-center'>
            <span className='size-4 animate-spin rounded-full border-2 border-t-transparent border-r-transparent border-b-transparent border-l-transparent' />
          </span>
        )}

        {!loading && children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
