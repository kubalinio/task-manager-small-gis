import { Link as RouterLink } from "@tanstack/react-router"

import type { LinkProps as RouterLinkProps } from "@tanstack/react-router"
import type { ButtonProps } from "components/ui"

import { cn } from "libs/utils"
import { buttonVariants } from "components/ui"

type LinkProps = {
  className?: string
  variant?: ButtonProps["variant"]
} & RouterLinkProps

const Link = ({
  children,
  className,
  variant = "link",
  ...props
}: LinkProps) => {
  return (
    <RouterLink
      className={cn(
        buttonVariants({
          variant,
          size: "link"
        }),
        "text-foreground h-fit justify-start",
        className
      )}
      {...props}
    >
      {children}
    </RouterLink>
  )
}

export { Link }
