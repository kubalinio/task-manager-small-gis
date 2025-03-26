import type { VariantProps } from "class-variance-authority"

import { cva } from "class-variance-authority"

// Define the badge variants with proper TypeScript types
export const badgeVariants = cva(
  "focus:ring-ring inline-flex items-center justify-center rounded-[6px] border text-xs font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none",
  {
    variants: {
      color: {
        default:
          "text-foreground border-gray-400/30 bg-gray-400/30 hover:bg-gray-400/40",
        primary:
          "border-primary bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/90",
        info: "border-info text-info hover:bg-info/10 bg-transparent font-bold"
      },
      variant: {
        filled: "border-transparent",
        outlined: "bg-transparent hover:bg-transparent"
      },
      size: {
        sm: "h-5 px-2 text-xs",
        md: "h-6 px-3 text-sm"
      }
    },
    defaultVariants: {
      variant: "filled",
      color: "default",
      size: "md"
    }
  }
)

// Export type for badge variants props
export type BadgeVariantsProps = VariantProps<typeof badgeVariants>
