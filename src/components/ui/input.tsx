import * as React from "react"

import { cn } from "libs/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        className={cn(
          "border-input focus-visible:ring-ring disabled:border-opacity-25 aria-[invalid=true]:border-error bg-background flex h-[2.875rem] w-full rounded-md border px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed",
          className
        )}
        ref={ref}
        type={type}
        autoComplete='on'
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
