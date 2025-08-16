"use client"

import { useState } from "react"
import { useJobs } from "@/contexts/jobs-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Plus,
    Search,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    MapPin,
    Calendar,
    DollarSign,
    Users,
    Clock,
    CheckCircle,
    XCircle,
    Copy,
    BarChart3,
} from "lucide-react"
import Link from "next/link"

const getStatusColor = (status: string) => {
    switch (status) {
        case "Active":
            return "bg-green-100 text-green-800"
        case "Draft":
            return "bg-yellow-100 text-yellow-800"
        case "Closed":
            return "bg-red-100 text-red-800"
        case "Paused":
            return "bg-orange-100 text-orange-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case "Active":
            return <CheckCircle className="h-4 w-4" />
        case "Closed":
            return <XCircle className="h-4 w-4" />
        case "Paused":
            return <Clock className="h-4 w-4" />
        default:
            return <Clock className="h-4 w-4" />
    }
}

export default function JobListings() {
    const { jobs, updateJob, deleteJob } = useJobs()
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [departmentFilter, setDepartmentFilter] = useState("all")
    const [selectedJob, setSelectedJob] = useState<any>(null)

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || job.status === statusFilter
        const matchesDepartment = departmentFilter === "all" || job.department === departmentFilter

        return matchesSearch && matchesStatus && matchesDepartment
    })

    const activeJobs = jobs.filter((job) => job.status === "Active").length
    const totalApplicants = jobs.reduce((sum, job) => sum + job.applicants, 0)
    const totalViews = jobs.reduce((sum, job) => sum + job.views, 0)
    const draftJobs = jobs.filter((job) => job.status === "Draft").length

    const handleStatusChange = (jobId: string, newStatus: string) => {
        updateJob(jobId, { status: newStatus as any })
    }

    const handleDeleteJob = (jobId: string) => {
        if (confirm("Are you sure you want to delete this job listing?")) {
            deleteJob(jobId)
        }
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Job Listings</h1>
                    <p className="text-muted-foreground">Manage your company's job postings and track applications.</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/c/dashboard/jobs/new">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Job Listing
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeJobs}</div>
                        <p className="text-xs text-muted-foreground">Currently accepting applications</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalApplicants}</div>
                        <p className="text-xs text-muted-foreground">Across all job listings</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                        <Eye className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Job listing page views</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Draft Jobs</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{draftJobs}</div>
                        <p className="text-xs text-muted-foreground">Pending publication</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="all-jobs" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all-jobs">All Jobs</TabsTrigger>
                    <TabsTrigger value="active">Active ({activeJobs})</TabsTrigger>
                    <TabsTrigger value="draft">Draft ({draftJobs})</TabsTrigger>
                </TabsList>

                <TabsContent value="all-jobs" className="space-y-4">

                    {/* Job Listings Table */}
                    <Card>
                        <CardHeader>
                            {/* <CardTitle>Job Listings</CardTitle>
                            <CardDescription>{filteredJobs.length} jobs found</CardDescription> */}
                            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                <div className="relative flex-1">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search job listings..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-8"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Draft">Draft</SelectItem>
                                            <SelectItem value="Paused">Paused</SelectItem>
                                            <SelectItem value="Closed">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Types</SelectItem>
                                            <SelectItem value="Engineering">On-site</SelectItem>
                                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                                            <SelectItem value="Remote">Remote</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <CardDescription>{filteredJobs.length} jobs found</CardDescription>

                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Applications</TableHead>
                                        <TableHead>Views</TableHead>
                                        <TableHead>Posted</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredJobs.map((job) => (
                                        <TableRow key={job.id} className="cursor-pointer hover:bg-muted/50">
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <div className="font-medium">{job.title}</div>
                                                    </div>
                                                    <div className="flex items-center text-sm text-muted-foreground">
                                                        <DollarSign className="mr-1 h-3 w-3" />
                                                        {job.salary}
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex items-center">
                                                    <MapPin className="mr-1 h-3 w-3" />
                                                    <span className="text-sm">{job.location}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(job.status)}>
                                                    <div className="flex items-center gap-1">
                                                        {getStatusIcon(job.status)}
                                                        {job.status}
                                                    </div>
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <Users className="mr-1 h-3 w-3" />
                                                    <span className="font-medium">{job.applicants}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <Eye className="mr-1 h-3 w-3" />
                                                    <span>{job.views.toLocaleString()}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center text-sm">
                                                    <Calendar className="mr-1 h-3 w-3" />
                                                    {job.posted}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => setSelectedJob(job)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <Link href={`/c/dashboard/jobs/${job.id}/edit`}>
                                                            <DropdownMenuItem>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit Job
                                                            </DropdownMenuItem>
                                                        </Link>
                                                        <DropdownMenuItem>
                                                            <Copy className="mr-2 h-4 w-4" />
                                                            Duplicate
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Users className="mr-2 h-4 w-4" />
                                                            View Applications
                                                        </DropdownMenuItem>
                                                        {job.status === "Active" && (
                                                            <DropdownMenuItem onClick={() => handleStatusChange(job.id, "Paused")}>
                                                                <Clock className="mr-2 h-4 w-4" />
                                                                Pause Job
                                                            </DropdownMenuItem>
                                                        )}
                                                        {job.status === "Draft" && (
                                                            <DropdownMenuItem
                                                                className="text-green-600"
                                                                onClick={() => handleStatusChange(job.id, "Active")}
                                                            >
                                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                                Publish Job
                                                            </DropdownMenuItem>
                                                        )}
                                                        {job.status === "Paused" && (
                                                            <DropdownMenuItem
                                                                className="text-green-600"
                                                                onClick={() => handleStatusChange(job.id, "Active")}
                                                            >
                                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                                Resume Job
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteJob(job.id)}>
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
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
                </TabsContent>

                <TabsContent value="active">
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Job Listings</CardTitle>
                            <CardDescription>Jobs currently accepting applications</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {jobs
                                    .filter((job) => job.status === "Active")
                                    .map((job) => (
                                        <Card key={job.id} className="cursor-pointer hover:shadow-md transition-shadow">
                                            <CardHeader className="pb-3">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <CardTitle className="text-lg">{job.title}</CardTitle>
                                                        <CardDescription>{job.department}</CardDescription>
                                                    </div>
                                                    {job.urgent && (
                                                        <Badge variant="destructive" className="text-xs">
                                                            Urgent
                                                        </Badge>
                                                    )}
                                                </div>
                                            </CardHeader>
                                            <CardContent className="space-y-3">
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <MapPin className="mr-1 h-3 w-3" />
                                                    {job.location}
                                                    {job.remote && (
                                                        <Badge variant="secondary" className="ml-2 text-xs">
                                                            Remote
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <DollarSign className="mr-1 h-3 w-3" />
                                                    {job.salary}
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center text-muted-foreground">
                                                        <Users className="mr-1 h-3 w-3" />
                                                        {job.applicants} applicants
                                                    </div>
                                                    <div className="flex items-center text-muted-foreground">
                                                        <Eye className="mr-1 h-3 w-3" />
                                                        {job.views} views
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 pt-2">
                                                    <Button size="sm" className="flex-1">
                                                        <Users className="mr-1 h-3 w-3" />
                                                        View Applications
                                                    </Button>
                                                    <Link href={`/c/dashboard/jobs/${job.id}/edit`}>
                                                        <Button size="sm" variant="outline">
                                                            <Edit className="h-3 w-3" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="draft">
                    <Card>
                        <CardHeader>
                            <CardTitle>Draft Job Listings</CardTitle>
                            <CardDescription>Jobs pending publication</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {jobs
                                    .filter((job) => job.status === "Draft")
                                    .map((job) => (
                                        <Card key={job.id}>
                                            <CardContent className="pt-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-1">
                                                        <h3 className="font-medium">{job.title}</h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {job.department} • {job.location}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">Created on {job.posted}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Link href={`/c/dashboard/jobs/${job.id}/edit`}>
                                                            <Button size="sm" variant="outline">
                                                                <Edit className="mr-1 h-3 w-3" />
                                                                Edit
                                                            </Button>
                                                        </Link>
                                                        <Button size="sm" onClick={() => handleStatusChange(job.id, "Active")}>
                                                            <CheckCircle className="mr-1 h-3 w-3" />
                                                            Publish
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Job Details Modal */}
            {selectedJob && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-xl">{selectedJob.title}</CardTitle>
                                    <CardDescription>
                                        {selectedJob.department} • {selectedJob.location}
                                    </CardDescription>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => setSelectedJob(null)}>
                                    <XCircle className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-medium mb-2">Job Details</h4>
                                    <div className="space-y-2 text-sm">
                                        <div>Type: {selectedJob.type}</div>
                                        <div>Salary: {selectedJob.salary}</div>
                                        <div>Posted: {selectedJob.posted}</div>
                                        <div>Status: {selectedJob.status}</div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Statistics</h4>
                                    <div className="space-y-2 text-sm">
                                        <div>Applications: {selectedJob.applicants}</div>
                                        <div>Views: {selectedJob.views}</div>
                                        <div>Remote: {selectedJob.remote ? "Yes" : "No"}</div>
                                        <div>Urgent: {selectedJob.urgent ? "Yes" : "No"}</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">Description</h4>
                                <p className="text-sm text-muted-foreground">{selectedJob.description}</p>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">Requirements</h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                    {selectedJob.requirements.map((req: string, index: number) => (
                                        <li key={index}>• {req}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">Benefits</h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                    {selectedJob.benefits.map((benefit: string, index: number) => (
                                        <li key={index}>• {benefit}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex gap-2 pt-4">
                                <Button className="flex-1">
                                    <Users className="mr-2 h-4 w-4" />
                                    View Applications ({selectedJob.applicants})
                                </Button>
                                <Link href={`/c/dashboard/jobs/${selectedJob.id}/edit`}>
                                    <Button variant="outline">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Job
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
