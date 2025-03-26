import * as React from "react"

import { cn } from "libs/utils/cn"

interface FormItemContextValue {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

// Prevent context from being recreated on HMR
FormItemContext.displayName = "FormItemContext"

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("space-y-2", className)} ref={ref} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

export { FormItemContext, FormItem }
