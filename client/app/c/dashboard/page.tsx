"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, FileText, UserCheck, TrendingUp, Clock } from "lucide-react"

const stats = [
    {
        title: "Active Job Listings",
        value: "12",
        change: "+2 from last month",
        icon: FileText,
        color: "text-blue-600",
    },
    {
        title: "Total Applicants",
        value: "248",
        change: "+18% from last month",
        icon: Users,
        color: "text-green-600",
    },
    {
        title: "Active Interns",
        value: "8",
        change: "+1 from last month",
        icon: UserCheck,
        color: "text-purple-600",
    },
    {
        title: "Interviews Scheduled",
        value: "15",
        change: "+5 this week",
        icon: Clock,
        color: "text-orange-600",
    },
]

const recentApplications = [
    {
        name: "Sarah Johnson",
        position: "Frontend Developer",
        status: "Interview Scheduled",
        date: "2024-01-15",
        avatar: "/placeholder.svg?height=32&width=32&text=SJ",
    },
    {
        name: "Michael Chen",
        position: "Data Analyst",
        status: "Under Review",
        date: "2024-01-14",
        avatar: "/placeholder.svg?height=32&width=32&text=MC",
    },
    {
        name: "Emily Davis",
        position: "UX Designer",
        status: "Accepted",
        date: "2024-01-13",
        avatar: "/placeholder.svg?height=32&width=32&text=ED",
    },
    {
        name: "James Wilson",
        position: "Backend Developer",
        status: "Rejected",
        date: "2024-01-12",
        avatar: "/placeholder.svg?height=32&width=32&text=JW",
    },
]

const getStatusColor = (status: string) => {
    switch (status) {
        case "Interview Scheduled":
            return "bg-blue-100 text-blue-800"
        case "Under Review":
            return "bg-yellow-100 text-yellow-800"
        case "Accepted":
            return "bg-green-100 text-green-800"
        case "Rejected":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

export default function Dashboard() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back! Here's what's happening at your company.</p>
                </div>
                <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    Create Job Listing
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.change}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Recent Applications */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Applications</CardTitle>
                        <CardDescription>Latest job applications received this week</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Applicant</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentApplications.map((application) => (
                                    <TableRow key={application.name}>
                                        <TableCell className="flex items-center gap-2">
                                            <img
                                                src={application.avatar || "/placeholder.svg"}
                                                alt={application.name}
                                                className="h-8 w-8 rounded-full"
                                            />
                                            <span className="font-medium">{application.name}</span>
                                        </TableCell>
                                        <TableCell>{application.position}</TableCell>
                                        <TableCell>
                                            <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                                        </TableCell>
                                        <TableCell>{application.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Hiring Pipeline</CardTitle>
                        <CardDescription>Current status of your hiring process</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span>Applications Received</span>
                                <span>248</span>
                            </div>
                            <Progress value={100} className="h-2" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span>Under Review</span>
                                <span>89</span>
                            </div>
                            <Progress value={36} className="h-2" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span>Interviews Scheduled</span>
                                <span>15</span>
                            </div>
                            <Progress value={6} className="h-2" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span>Offers Extended</span>
                                <span>5</span>
                            </div>
                            <Progress value={2} className="h-2" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Button variant="outline" className="h-20 flex-col bg-transparent">
                            <FileText className="h-6 w-6 mb-2" />
                            Post New Job
                        </Button>
                        <Button variant="outline" className="h-20 flex-col bg-transparent">
                            <Users className="h-6 w-6 mb-2" />
                            Review Applications
                        </Button>
                        <Button variant="outline" className="h-20 flex-col bg-transparent">
                            <Clock className="h-6 w-6 mb-2" />
                            Schedule Interview
                        </Button>
                        <Button variant="outline" className="h-20 flex-col bg-transparent">
                            <TrendingUp className="h-6 w-6 mb-2" />
                            View Analytics
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
