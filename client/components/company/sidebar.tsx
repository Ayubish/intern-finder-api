"use client"

import type * as React from "react"
import { Building2, Users, FileText, UserCheck, BarChart3, Settings, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
        title: "Overview",
        url: "/c/dashboard",
        icon: BarChart3,
    },
    {
        title: "Job Listings",
        url: "/c/dashboard/jobs",
        icon: FileText,
    },
    {
        title: "Applications",
        url: "/c/dashboard/applicants",
        icon: Users,
    },
    {
        title: "Interns",
        url: "/c/dashboard/interns",
        icon: UserCheck,
    },
    {
        title: "Analytics",
        url: "/c/dashboard/analytics",
        icon: BarChart3,
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
            <SidebarFooter>
                <div className="p-4">
                    <Button className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Quick Action
                    </Button>
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
