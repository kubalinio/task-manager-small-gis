"use client"

import { type LucideIcon } from "lucide-react"

import { Link } from "components/common/link"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "components/ui"

export function NavMain({
  items
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
  }[]
}) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link
              to='/'
              activeProps={{ className: "bg-accent" }}
              variant='ghost'
              className='justify-start pl-2'
            >
              <item.icon />

              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
