"use client"

import type * as React from "react"
import { Building2, Users, FileText, UserCheck, BarChart3, Settings, Plus, Search, UserCog, LayoutDashboard } from "lucide-react"

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
        url: "/c/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Job Listings",
        url: "/c/dashboard/jobs",
        icon: FileText,
    },
    {
        title: "Applications",
        url: "/c/dashboard/applications",
        icon: Users,
    },
    {
        title: "Interns",
        url: "/c/dashboard/interns",
        icon: UserCheck,
    },
    {
        title: "Profile",
        url: "/c/dashboard/profile",
        icon: UserCog,
    },
    {
        title: "Settings",
        url: "/c/dashboard/settings",
        icon: Settings,
    },
]

export function CompanySidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                                if (item.url == "/c/dashboard") {
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
