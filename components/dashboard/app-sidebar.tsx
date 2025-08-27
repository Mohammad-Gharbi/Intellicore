"use client"

import { Calendar, Home, Inbox, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import Link from "next/link"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard/home",
    icon: Home,
  },
  {
    title: "Posts",
    url: "/dashboard/posts",
    icon: Inbox,
  },
  {
    title: "Tags",
    url: "/dashboard/tags",
    icon: Calendar,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <Button className="cursor-pointer" variant="outline" asChild>
          <Link href="/profile"> Mohammed Gharbi</Link>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname.startsWith(item.url)

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/80 hover:bg-primary/70 text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/80 hover:text-accent-foreground"
                  )}
                  asChild
                >
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton asChild>
          <a href="">
            <Settings />
            <span>Settings</span>
          </a>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}
