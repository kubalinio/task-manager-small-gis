import * as React from "react"

import { cn } from "libs/utils"

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "text-black-100 placeholder:text-black-100 border-border disabled:border-opacity-25 aria-[invalid=true]:border-error flex min-h-[80px] w-full rounded-md border bg-transparent px-6 py-3 text-sm font-bold focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

const TextareaAutosize = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    React.useImperativeHandle(ref, () => textareaRef.current!, [])

    React.useEffect(() => {
      const textarea = textareaRef.current
      if (!textarea) return

      const adjustHeight = () => {
        textarea.style.height = "auto"
        textarea.style.height = `${Math.min(textarea.scrollHeight, 320)}px`
      }

      textarea.addEventListener("input", adjustHeight)
      adjustHeight()

      return () => {
        textarea.removeEventListener("input", adjustHeight)
      }
    }, [])

    return (
      <Textarea
        ref={textareaRef}
        className={cn("resize-none overflow-y-auto", className)}
        {...props}
      />
    )
  }
)

TextareaAutosize.displayName = "TextareaAutosize"

export { Textarea, TextareaAutosize }
