import { useEffect, useId, useState } from "react"

import { MoonIcon, SunIcon } from "lucide-react"

import { Box } from "components/ui"
import { Switch } from "components/ui/switch"

type Theme = "light" | "dark" | "system"

const ThemeToggle = () => {
  const id = useId()
  const [theme, setTheme] = useState<Theme>("dark")
  const [isSystemPrefersDark, setIsSystemPrefersDark] = useState(false)

  const isDarkMode =
    theme === "dark" || (theme === "system" && isSystemPrefersDark)

  useEffect(() => {
    // Check system preference
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
    setIsSystemPrefersDark(prefersDarkScheme)

    const savedTheme = localStorage.getItem("theme") as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      setTheme("dark")
      localStorage.setItem("theme", "dark")
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = (e: MediaQueryListEvent) => {
      setIsSystemPrefersDark(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement

    if (theme === "system") {
      const systemTheme = isSystemPrefersDark ? "dark" : "light"
      root.classList.remove("light", "dark")
      root.classList.add(systemTheme)
    } else {
      root.classList.remove("light", "dark")
      root.classList.add(theme)
    }

    localStorage.setItem("theme", theme)
  }, [theme, isSystemPrefersDark])

  const handleCheckedChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
  }

  return (
    <>
      <Box className='relative ml-auto inline-grid h-9 w-29 grid-cols-[1fr_1fr] items-center text-sm font-medium'>
        <Switch
          id={id}
          checked={isDarkMode}
          onCheckedChange={handleCheckedChange}
          className='peer data-[state=checked]:bg-accent data-[state=unchecked]:bg-accent/50 dark:data-[state=checked]:bg-accent/50 dark:data-[state=unchecked]:bg-accent/50 absolute inset-0 h-[inherit] w-auto [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full'
        />
        <span className='peer-data-[state=checked]:text-muted-foreground/70 pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center text-white'>
          <SunIcon size={16} aria-hidden='true' />
        </span>

        <span className='peer-data-[state=unchecked]:text-muted-foreground/70 pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center'>
          <MoonIcon size={16} aria-hidden='true' />
        </span>
      </Box>

      <label htmlFor={id} className='sr-only'>
        Theme switch
      </label>
    </>
  )
}

export { ThemeToggle }
