"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    User,
    MapPin,
    Calendar,
    GraduationCap,
    Building,
    DollarSign,
    Clock,
    FileText,
    Download,
    Github,
    Linkedin,
    Globe,
    CheckCircle,
    XCircle,
    Eye,
    MoreHorizontal,
} from "lucide-react"
import { useParams } from "next/navigation"
import { api } from "@/lib/api"

interface ApplicationDetailProps {
    isOpen: boolean
    onClose: () => void
    application: any
    onStatusChange?: (applicationId: string, newStatus: string) => void
}

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

const formatStatus = (status: string) => {
    return status
        // .split("_")
        // .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        // .join(" ")
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}

const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
}

export default function ApplicationDetailPage() {
    const [activeTab, setActiveTab] = useState("overview")
    const params = useParams()
    const [application, setApplication] = useState<any>({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const fetchApplication = async () => {

            if (params.id && typeof params.id === "string") {
                const foundApplication = await api.get(`application/${params.id}`)
                if (foundApplication) {
                    setApplication(foundApplication)
                }
            }
        }
        fetchApplication()
        setLoading(false)
    }, [params.id])

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

    if (!application) return null

    const { intern, job } = application

    const handleStatusChange = (newStatus: string) => {
        // if (onStatusChange) {
        //     onStatusChange(application.id, newStatus)
        // }
        alert("status changed")
    }

    return (
        <div>
            <div className="max-h-[90vh] min-w-[70vw] p-0">
                <div className="p-6 pb-0">
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <h2 className="text-2xl">Application Details</h2>
                            <p>
                                Application for {job?.title} • Applied {formatDate(application.createdAt)}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(application.status)}>{formatStatus(application.status)}</Badge>
                            {/* <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleStatusChange("under_review")}>
                                        <Eye className="mr-2 h-4 w-4" />
                                        Move to Review
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleStatusChange("interview_scheduled")}>
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Schedule Interview
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-green-600" onClick={() => handleStatusChange("accepted")}>
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Accept
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600" onClick={() => handleStatusChange("rejected")}>
                                        <XCircle className="mr-2 h-4 w-4" />
                                        Reject
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu> */}
                        </div>
                    </div>
                </div>

                {/* <ScrollArea className="flex-1 px-6 max-h-30"> */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="job">Job Details</TabsTrigger>
                        <TabsTrigger value="application">Application</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6 mt-6">
                        {/* Applicant Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <img
                                        src={intern?.image || "/placeholder.svg?height=60&width=60"}
                                        alt={intern?.name}
                                        className="h-16 w-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="text-xl font-semibold">{intern?.name}</h3>
                                        <p className="text-muted-foreground">
                                            {intern?.degree !== "No Degree" ? intern?.degree : "Student"} • {intern?.country}
                                        </p>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{calculateAge(intern?.dateOfBirth)} years old</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{intern?.gender}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{intern?.country}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{intern?.degree}</span>
                                    </div>
                                </div>

                                {intern?.about && (
                                    <div>
                                        <h4 className="font-medium mb-2">About</h4>
                                        <p className="text-sm text-muted-foreground">{intern.about}</p>
                                    </div>
                                )}

                                <div className="flex gap-2">
                                    {intern?.portfolio && (
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={intern.portfolio} target="_blank" rel="noopener noreferrer">
                                                <Globe className="mr-2 h-4 w-4" />
                                                Portfolio
                                            </a>
                                        </Button>
                                    )}
                                    {intern?.linkdin && (
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={intern.linkdin} target="_blank" rel="noopener noreferrer">
                                                <Linkedin className="mr-2 h-4 w-4" />
                                                LinkedIn
                                            </a>
                                        </Button>
                                    )}
                                    {intern?.github && (
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={intern.github} target="_blank" rel="noopener noreferrer">
                                                <Github className="mr-2 h-4 w-4" />
                                                GitHub
                                            </a>
                                        </Button>
                                    )}
                                    {intern?.resume && (
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={intern.resume} target="_blank" rel="noopener noreferrer">
                                                <Download className="mr-2 h-4 w-4" />
                                                Resume
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Job Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building className="h-5 w-5" />
                                    Position Applied For
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold">{job?.title}</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">{job?.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Building className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm capitalize">{job?.type}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">{job?.salary}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">{job?.duration}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{job?.description}</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="profile" className="space-y-6 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                                        <p className="text-sm">{intern?.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                                        <p className="text-sm">{formatDate(intern?.dateOfBirth)}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Gender</label>
                                        <p className="text-sm">{intern?.gender}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Country</label>
                                        <p className="text-sm">{intern?.country}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Education</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Degree</label>
                                        <p className="text-sm">{intern?.degree || "Not specified"}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">University</label>
                                        <p className="text-sm">{intern?.university || "Not specified"}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Major</label>
                                        <p className="text-sm">{intern?.major || "Not specified"}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Graduation Year</label>
                                        <p className="text-sm">{intern?.yearOfGraduation || "Not specified"}</p>
                                    </div>
                                    {intern?.GPA && (
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">GPA</label>
                                            <p className="text-sm">{intern.GPA}</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {intern?.about && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>About</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm whitespace-pre-wrap">{intern.about}</p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="job" className="space-y-6 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>{job?.title}</CardTitle>
                                <CardDescription>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            {job?.location}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Building className="h-4 w-4" />
                                            {job?.type}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <DollarSign className="h-4 w-4" />
                                            {job?.salary}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {job?.duration}
                                        </div>
                                    </div>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="font-medium mb-2">Description</h4>
                                    <p className="text-sm text-muted-foreground">{job?.description}</p>
                                </div>

                                {job?.responsibilities && (
                                    <div>
                                        <h4 className="font-medium mb-2">Responsibilities</h4>
                                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{job.responsibilities}</p>
                                    </div>
                                )}

                                {job?.requirements && (
                                    <div>
                                        <h4 className="font-medium mb-2">Requirements</h4>
                                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{job.requirements}</p>
                                    </div>
                                )}

                                {job?.benefits && (
                                    <div>
                                        <h4 className="font-medium mb-2">Benefits</h4>
                                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{job.benefits}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Start Date</label>
                                        <p className="text-sm">{formatDate(job?.startDate)}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Application Deadline</label>
                                        <p className="text-sm">{formatDate(job?.deadline)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="application" className="space-y-6 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Application Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Application ID</label>
                                        <p className="text-sm font-mono">{application.id}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Status</label>
                                        <Badge className={getStatusColor(application.status)}>{formatStatus(application.status)}</Badge>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Applied Date</label>
                                        <p className="text-sm">{formatDate(application.createdAt)}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                                        <p className="text-sm">{formatDate(application.updatedAt)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {application.coverLetter && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Cover Letter</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm whitespace-pre-wrap">{application.coverLetter}</p>
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle>Documents</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {application.resume && (
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4" />
                                            <span className="text-sm">Application Resume</span>
                                        </div>
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={application.resume} target="_blank" rel="noopener noreferrer">
                                                <Download className="mr-2 h-4 w-4" />
                                                Download
                                            </a>
                                        </Button>
                                    </div>
                                )}
                                {intern?.resume && (
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4" />
                                            <span className="text-sm">Profile Resume</span>
                                        </div>
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={intern.resume} target="_blank" rel="noopener noreferrer">
                                                <Download className="mr-2 h-4 w-4" />
                                                Download
                                            </a>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
                {/* </ScrollArea> */}

                <div className="flex justify-end gap-2 p-6 pt-0 border-t">
                    <Button variant="outline" >
                        Close
                    </Button>
                    <Button onClick={() => handleStatusChange("interview_scheduled")}>Schedule Interview</Button>
                </div>
            </div>
        </div>
    )
}
