"use client"

import { useState } from "react"
import { useApplications } from "@/contexts/applications-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Search,
    MoreHorizontal,
    Eye,
    Calendar,
    Mail,
    Phone,
    Download,
    CheckCircle,
    XCircle,
    Clock,
    Star,
    Users,
    UserPlus,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScheduleDialog } from "./schedule-dialog"
import Link from "next/link"
import { formatTimestamp } from "@/lib/utils"
import { ApplicationDetailDialog } from "./application-dialog"

const getStatusColor = (status: string) => {
    switch (status) {
        case "new":
            return "bg-blue-100 text-blue-800"
        case "under_review":
            return "bg-yellow-100 text-yellow-800"
        case "interview_scheduled":
            return "bg-purple-100 text-purple-800"
        case "accepted":
            return "bg-green-100 text-green-800"
        case "rejected":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case "accepted":
            return <CheckCircle className="h-4 w-4" />
        case "rejected":
            return <XCircle className="h-4 w-4" />
        case "interview_scheduled":
            return <Calendar className="h-4 w-4" />
        default:
            return <Clock className="h-4 w-4" />
    }
}

const formatStatus = (status: string) => {
    return status
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
}

export default function Applicants() {
    const { applications, updateApplication, loading } = useApplications()
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedApplication, setSelectedApplication] = useState<any>(null)
    const [isInterviewDialogOpen, setIsInterviewDialogOpen] = useState(false)

    const [selectedDetailedApplication, setSelectedDetailedApplication] = useState<any>(null)
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

    const filteredApplications = applications.filter((application) => {
        const matchesSearch =
            application.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.intern.name.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || application.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const handleStatusChange = (applicationId: string, newStatus: string) => {
        updateApplication(applicationId, { status: newStatus })
    }



    const stats = [
        {
            title: "Total Applicants",
            value: applications.length,
            change: "+12% from last month",
            icon: Users,
        },
        {
            title: "Under Review",
            value: applications.filter((a) => a.status === "under_review").length,
            change: "Pending review",
            icon: Eye,
        },
        {
            title: "Interviews",
            value: applications.filter((a) => a.status === "interview_scheduled").length,
            change: "Scheduled this week",
            icon: Calendar,
        },
        {
            title: "Accepted",
            value: applications.filter((a) => a.status === "accepted").length,
            change: "Total accepted applications",
            icon: CheckCircle,
        },
    ]

    const colors = [
        "bg-red-500",
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-indigo-500",
    ];

    const getAvatarColor = (name: string) => colors[name.charCodeAt(0) % colors.length];

    const handleViewDetails = (application: any) => {
        // const detailedApp = getDetailedApplication(application.id) || detailedApplications[0] 
        setSelectedDetailedApplication(application)
        setIsDetailDialogOpen(true)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Loading applications...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Applicants</h1>
                    <p className="text-muted-foreground">Manage and review job applications from candidates.</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.change}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Search and Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center space-x-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search applicants..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="new">New Application</SelectItem>
                                <SelectItem value="under_review">Under Review</SelectItem>
                                <SelectItem value="interview">Interview Scheduled</SelectItem>
                                <SelectItem value="accepted">Accepted</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Applicants Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Applicants</CardTitle>
                    <CardDescription>{filteredApplications.length} applicants found</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Applicant</TableHead>
                                <TableHead>Internsip</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Applied Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredApplications.map((application) => (
                                <TableRow key={application.id} onClick={() => handleViewDetails(application)} className="cursor-pointer hover:bg-muted/50">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className={`${getAvatarColor(application.intern.name)}`} >
                                                <AvatarImage src={application.intern.image} />
                                                <AvatarFallback className="bg-transparent">{application.intern.name[1]}</AvatarFallback>
                                            </Avatar>

                                            <div className="font-medium">{application.intern.name}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{application.job.title}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(application.status)}>
                                            <div className="flex items-center gap-1">
                                                {getStatusIcon(application.status)}
                                                {formatStatus(application.status)}
                                            </div>
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{formatTimestamp(application.createdAt)}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View Profile
                                                </DropdownMenuItem>
                                                {application.resume && (
                                                    <DropdownMenuItem>
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Download Resume
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setSelectedApplication(application)
                                                        setIsInterviewDialogOpen(true)
                                                    }}
                                                >
                                                    <Calendar className="mr-2 h-4 w-4" />
                                                    Schedule Interview
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Mail className="mr-2 h-4 w-4" />
                                                    Send Email
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleStatusChange(application.id, "under_review")}>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Move to Review
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-green-600"
                                                    onClick={() => handleStatusChange(application.id, "accepted")}
                                                >
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Accept
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-red-600"
                                                    onClick={() => handleStatusChange(application.id, "rejected")}
                                                >
                                                    <XCircle className="mr-2 h-4 w-4" />
                                                    Reject
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <ApplicationDetailDialog
                isOpen={isDetailDialogOpen}
                onClose={() => {
                    setIsDetailDialogOpen(false)
                    setSelectedDetailedApplication(null)
                }}
                application={selectedDetailedApplication}
                onStatusChange={handleStatusChange}
            />

            {/* Schedule Interview Dialog */}
            <ScheduleDialog application={selectedApplication} isOpen={isInterviewDialogOpen} onClose={() => setIsInterviewDialogOpen(false)} setApplication={setSelectedApplication} />
        </div>
    )
}
