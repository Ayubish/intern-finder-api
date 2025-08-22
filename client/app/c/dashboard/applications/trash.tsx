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
    const { applications, updateApplication, scheduleInterview, addApplication, loading } = useApplications()
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedApplication, setSelectedApplication] = useState<any>(null)
    const [isInterviewDialogOpen, setIsInterviewDialogOpen] = useState(false)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [interviewData, setInterviewData] = useState({
        scheduledAt: "",
        duration: 60,
        type: "video",
        location: "",
        notes: "",
    })
    const [newApplicationData, setNewApplicationData] = useState({
        jobId: "1",
        jobTitle: "Senior Frontend Developer",
        name: "",
        email: "",
        phone: "",
        status: "new",
        experience: "",
        university: "",
    })

    const filteredApplications = applications.filter((application) => {
        const matchesSearch =
            application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.email.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || application.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const handleStatusChange = (applicationId: string, newStatus: string) => {
        updateApplication(applicationId, { status: newStatus })
    }

    const handleScheduleInterview = () => {
        if (!selectedApplication) return

        scheduleInterview({
            applicationId: selectedApplication.id,
            scheduledAt: new Date(interviewData.scheduledAt).toISOString(),
            duration: interviewData.duration,
            type: interviewData.type,
            location: interviewData.location,
            notes: interviewData.notes,
            status: "scheduled",
        })

        // Update application status to interview_scheduled
        updateApplication(selectedApplication.id, { status: "interview_scheduled" })

        setIsInterviewDialogOpen(false)
        setSelectedApplication(null)
        setInterviewData({
            scheduledAt: "",
            duration: 60,
            type: "video",
            location: "",
            notes: "",
        })
    }

    const handleAddApplication = () => {
        addApplication(newApplicationData)
        setIsAddDialogOpen(false)
        setNewApplicationData({
            jobId: "1",
            jobTitle: "Senior Frontend Developer",
            name: "",
            email: "",
            phone: "",
            status: "new",
            experience: "",
            university: "",
        })
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
            change: "This month",
            icon: CheckCircle,
        },
    ]

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
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export Data
                    </Button>
                    <Button onClick={() => setIsAddDialogOpen(true)}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Application
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
                                <SelectItem value="interview_scheduled">Interview Scheduled</SelectItem>
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
                                <TableHead>Position</TableHead>
                                <TableHead>Experience</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Applied Date</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredApplications.map((application) => (
                                <TableRow key={application.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={application.avatar || "/placeholder.svg"}
                                                alt={application.name}
                                                className="h-10 w-10 rounded-full"
                                            />
                                            <div>
                                                <div className="font-medium">{application.name}</div>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Mail className="mr-1 h-3 w-3" />
                                                    {application.email}
                                                </div>
                                                {application.phone && (
                                                    <div className="flex items-center text-sm text-muted-foreground">
                                                        <Phone className="mr-1 h-3 w-3" />
                                                        {application.phone}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{application.jobTitle}</TableCell>
                                    <TableCell>{application.experience || "Not specified"}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(application.status)}>
                                            <div className="flex items-center gap-1">
                                                {getStatusIcon(application.status)}
                                                {formatStatus(application.status)}
                                            </div>
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{application.appliedDate}</TableCell>
                                    <TableCell>
                                        {application.rating ? (
                                            <div className="flex items-center">
                                                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                {application.rating}
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground">Not rated</span>
                                        )}
                                    </TableCell>
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
                                                {application.resumeUrl && (
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

            {/* Add Application Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Add New Application</DialogTitle>
                        <DialogDescription>Add a new job application to the system.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                value={newApplicationData.name}
                                onChange={(e) => setNewApplicationData({ ...newApplicationData, name: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={newApplicationData.email}
                                onChange={(e) => setNewApplicationData({ ...newApplicationData, email: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">
                                Phone
                            </Label>
                            <Input
                                id="phone"
                                value={newApplicationData.phone}
                                onChange={(e) => setNewApplicationData({ ...newApplicationData, phone: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="jobTitle" className="text-right">
                                Position
                            </Label>
                            <Select
                                value={newApplicationData.jobTitle}
                                onValueChange={(value) => setNewApplicationData({ ...newApplicationData, jobTitle: value })}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Senior Frontend Developer">Senior Frontend Developer</SelectItem>
                                    <SelectItem value="UX Designer">UX Designer</SelectItem>
                                    <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                                    <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="experience" className="text-right">
                                Experience
                            </Label>
                            <Input
                                id="experience"
                                value={newApplicationData.experience}
                                onChange={(e) => setNewApplicationData({ ...newApplicationData, experience: e.target.value })}
                                placeholder="e.g. 3 years"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="university" className="text-right">
                                University
                            </Label>
                            <Input
                                id="university"
                                value={newApplicationData.university}
                                onChange={(e) => setNewApplicationData({ ...newApplicationData, university: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddApplication}>Add Application</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Schedule Interview Dialog */}
            <Dialog open={isInterviewDialogOpen} onOpenChange={setIsInterviewDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Schedule Interview</DialogTitle>
                        <DialogDescription>
                            Schedule an interview with {selectedApplication?.name} for {selectedApplication?.jobTitle}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="scheduledAt" className="text-right">
                                Date & Time
                            </Label>
                            <Input
                                id="scheduledAt"
                                type="datetime-local"
                                value={interviewData.scheduledAt}
                                onChange={(e) => setInterviewData({ ...interviewData, scheduledAt: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="duration" className="text-right">
                                Duration (min)
                            </Label>
                            <Input
                                id="duration"
                                type="number"
                                value={interviewData.duration}
                                onChange={(e) => setInterviewData({ ...interviewData, duration: Number.parseInt(e.target.value) })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                                Type
                            </Label>
                            <Select
                                value={interviewData.type}
                                onValueChange={(value) => setInterviewData({ ...interviewData, type: value })}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="video">Video Call</SelectItem>
                                    <SelectItem value="phone">Phone Call</SelectItem>
                                    <SelectItem value="in_person">In Person</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="location" className="text-right">
                                Location
                            </Label>
                            <Input
                                id="location"
                                value={interviewData.location}
                                onChange={(e) => setInterviewData({ ...interviewData, location: e.target.value })}
                                placeholder="Meeting room, Zoom link, etc."
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="notes" className="text-right">
                                Notes
                            </Label>
                            <Textarea
                                id="notes"
                                value={interviewData.notes}
                                onChange={(e) => setInterviewData({ ...interviewData, notes: e.target.value })}
                                placeholder="Additional notes for the interview..."
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsInterviewDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleScheduleInterview}>Schedule Interview</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
