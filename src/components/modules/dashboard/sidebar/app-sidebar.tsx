"use client"

import * as React from "react"
import { BotIcon, SquareTerminalIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"

// This is sample data.
const data = {
  navMain:[
    {
      title:"Dashboard",
      url:"/user/dashboard",
      icon:SquareTerminalIcon,
      isActive:true,
    },
    {
      title:'Shop',
      url:"/user/shop/all-products",
      icon:BotIcon,
      items:[
        {
          title:"Manage Products",
          url:"/user/shop/all-products"
        },
        {
          title:"Manage Categories",
          url:"/user/shop/category"
        },
        {
          title:"Manage Brands",
          url:"/user/shop/brand"
        }
      ]
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
