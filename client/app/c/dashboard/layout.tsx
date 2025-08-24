import type React from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { CompanySidebar } from "@/components/company/sidebar"
import { JobsProvider } from "@/contexts/jobs-context"
import { ApplicationsProvider } from "@/contexts/applications-context"


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <SidebarProvider>
                <JobsProvider>
                    <ApplicationsProvider>
                        <CompanySidebar />
                        <SidebarInset>
                            <div className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                                <div className="flex items-center gap-2 px-4">
                                    <SidebarTrigger className="-ml-1" />
                                    <Separator orientation="vertical" className="mr-2 h-4" />
                                    <Breadcrumb>
                                        <BreadcrumbList>
                                            <BreadcrumbItem className="hidden md:block">
                                                <BreadcrumbLink href="/c/dashboard">Dashboard</BreadcrumbLink>
                                            </BreadcrumbItem>
                                        </BreadcrumbList>
                                    </Breadcrumb>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
                        </SidebarInset>
                    </ApplicationsProvider>
                </JobsProvider>
            </SidebarProvider>
        </div>
    )
}
