"use client"

import { useState } from "react"
import { useIntern } from "@/contexts/intern-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    ArrowLeft,
    Search,
    MapPin,
    DollarSign,
    Calendar,
    Clock,
    Eye,
    Briefcase,
    CheckCircle,
    XCircle,
    AlertCircle,
    Users,
} from "lucide-react"
import Link from "next/link"

const getStatusColor = (status: string) => {
    switch (status) {
        case "accepted":
            return "bg-green-100 text-green-800"
        case "interview":
            return "bg-blue-100 text-blue-800"
        case "reviewing":
            return "bg-yellow-100 text-yellow-800"
        case "pending":
            return "bg-gray-100 text-gray-800"
        case "rejected":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case "accepted":
            return <CheckCircle className="h-4 w-4 text-green-600" />
        case "interview":
            return <Users className="h-4 w-4 text-blue-600" />
        case "reviewing":
            return <AlertCircle className="h-4 w-4 text-yellow-600" />
        case "pending":
            return <Clock className="h-4 w-4 text-gray-600" />
        case "rejected":
            return <XCircle className="h-4 w-4 text-red-600" />
        default:
            return <Clock className="h-4 w-4 text-gray-600" />
    }
}

const getStatusText = (status: string) => {
    switch (status) {
        case "accepted":
            return "Accepted"
        case "interview":
            return "Interview Scheduled"
        case "reviewing":
            return "Under Review"
        case "pending":
            return "Pending"
        case "rejected":
            return "Rejected"
        default:
            return status
    }
}

export default function Applications() {
    const { applications, loading } = useIntern()
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [activeTab, setActiveTab] = useState("all")

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Loading your applications...</p>
                </div>
            </div>
        )
    }

    const filteredApplications = applications.filter((app) => {
        const matchesSearch =
            app.internshipTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.companyName.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || app.status === statusFilter
        const matchesTab = activeTab === "all" || app.status === activeTab

        return matchesSearch && matchesStatus && matchesTab
    })

    const statusCounts = {
        all: applications.length,
        pending: applications.filter((app) => app.status === "pending").length,
        reviewing: applications.filter((app) => app.status === "reviewing").length,
        interview: applications.filter((app) => app.status === "interview").length,
        accepted: applications.filter((app) => app.status === "accepted").length,
        rejected: applications.filter((app) => app.status === "rejected").length,
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div>
                                <h1 className="text-2xl font-bold">My Applications</h1>
                                <p className="text-muted-foreground">Track your internship applications</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link href="/internships">
                                <Button>
                                    <Search className="h-4 w-4 mr-2" />
                                    Browse More Internships
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statusCounts.all}</div>
                            <p className="text-xs text-muted-foreground">All time</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statusCounts.reviewing}</div>
                            <p className="text-xs text-muted-foreground">Being reviewed</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
                            <Users className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statusCounts.interview}</div>
                            <p className="text-xs text-muted-foreground">Scheduled</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statusCounts.accepted}</div>
                            <p className="text-xs text-muted-foreground">Offers received</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="flex flex-col gap-4 md:flex-row">
                            <div className="relative flex-1">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search applications..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8"
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="reviewing">Under Review</SelectItem>
                                    <SelectItem value="interview">Interview</SelectItem>
                                    <SelectItem value="accepted">Accepted</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Applications Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList className="grid w-full grid-cols-6">
                        <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
                        <TabsTrigger value="pending">Pending ({statusCounts.pending})</TabsTrigger>
                        <TabsTrigger value="reviewing">Review ({statusCounts.reviewing})</TabsTrigger>
                        <TabsTrigger value="interview">Interview ({statusCounts.interview})</TabsTrigger>
                        <TabsTrigger value="accepted">Accepted ({statusCounts.accepted})</TabsTrigger>
                        <TabsTrigger value="rejected">Rejected ({statusCounts.rejected})</TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab}>
                        {filteredApplications.length > 0 ? (
                            <div className="space-y-4">
                                {filteredApplications.map((application) => (
                                    <Card key={application.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start gap-4 flex-1">
                                                    <img
                                                        src={application.companyLogo || "/placeholder.svg"}
                                                        alt={application.companyName}
                                                        className="h-16 w-16 rounded-lg object-cover"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div>
                                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                                    {application.internshipTitle}
                                                                </h3>
                                                                <p className="text-gray-600 font-medium">{application.companyName}</p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {getStatusIcon(application.status)}
                                                                <Badge className={getStatusColor(application.status)}>
                                                                    {getStatusText(application.status)}
                                                                </Badge>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                                                            <div className="flex items-center gap-1">
                                                                <MapPin className="h-4 w-4" />
                                                                {application.location}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Briefcase className="h-4 w-4" />
                                                                {application.type}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <DollarSign className="h-4 w-4" />
                                                                {application.salary}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="h-4 w-4" />
                                                                Applied {application.appliedDate}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="h-4 w-4" />
                                                                Deadline {application.deadline}
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <Link href={`/internships/${application.internshipId}`}>
                                                                <Button variant="outline" size="sm">
                                                                    <Eye className="h-4 w-4 mr-2" />
                                                                    View Details
                                                                </Button>
                                                            </Link>
                                                            {application.status === "interview" && (
                                                                <Button size="sm">
                                                                    <Calendar className="h-4 w-4 mr-2" />
                                                                    Schedule Interview
                                                                </Button>
                                                            )}
                                                            {application.status === "accepted" && (
                                                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                                                    <CheckCircle className="h-4 w-4 mr-2" />
                                                                    Accept Offer
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="text-center py-12">
                                    <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications found</h3>
                                    <p className="text-gray-600 mb-6">
                                        {searchTerm || statusFilter !== "all"
                                            ? "Try adjusting your search or filters"
                                            : "You haven't applied to any internships yet"}
                                    </p>
                                    <Link href="/internships">
                                        <Button>
                                            <Search className="h-4 w-4 mr-2" />
                                            Browse Internships
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
