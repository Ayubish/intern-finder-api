"use client"

import type * as React from "react"
import { Building2, Users, FileText, UserCheck, BarChart3, Settings, Plus, Search, UserCog, LayoutDashboard, BookmarkIcon, Briefcase } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
    {
        title: "Dashboard",
        url: "/i/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Applications",
        url: "/i/dashboard/applications",
        icon: Briefcase,
    },
    {
        title: "Saved Internships",
        url: "/i/dashboard/saved",
        icon: BookmarkIcon,
    },
    {
        title: "Profile",
        url: "/i/dashboard/profile",
        icon: UserCog,
    },
    {
        title: "Settings",
        url: "/c/dashboard/settings",
        icon: Settings,
    },
]

export function InternSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <Link href="/">
                    <Image src="/Interno.png" alt="Interno" width={140} height={140} className="object-contain" />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigation.map((item) => {
                                if (item.url == "/i/dashboard") {
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild className={`${pathname == item.url && 'bg-primary/10 hover:bg-primary/10 text-primary hover:text-primary'}`}>
                                                <Link href={item.url}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                }
                                const isActive = pathname.startsWith(item.url);

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild className={`${isActive && 'bg-primary/10 hover:bg-primary/10 text-primary hover:text-primary'}`}>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
