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
      className={buttonVariants({
        variant,
        className: cn("h-fit py-0 pr-0", className)
      })}
      {...props}
    >
      {children}
    </RouterLink>
  )
}

export { Link }
