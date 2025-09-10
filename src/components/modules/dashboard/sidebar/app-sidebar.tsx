"use client"

import * as React from "react"
import { BotIcon, SquareTerminalIcon } from "lucide-react"

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

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
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <Link href="/">
              <div className="flex items-center justify-center">
                Logo
              </div>
              <div className="grid flex-1 text-left text-sm leading-1">
                <h2 className="font-bold text-xl">NextMart</h2>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
     </SidebarHeader>
    </Sidebar>
  )
}
