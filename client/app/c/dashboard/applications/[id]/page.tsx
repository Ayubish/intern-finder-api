"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Calendar,
    Check,
    X
} from "lucide-react"
import { useParams } from "next/navigation"
import { api } from "@/lib/api"
import { formatDate } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { formatStatus, getStatusColor } from "@/lib/helpers"
import { ApplicantProfileDetail } from "./profile-tab"
import { JobDetailTab } from "./job-detail-tab"
import { ApplicationTab } from "./application-tab"
import { ScheduleDialog } from "../schedule-dialog"

const completedInternships = [
    {
        id: "completed-1",
        internshipTitle: "Frontend Developer Intern",
        companyName: "TechStart Solutions",
        companyLogo: "/placeholder.svg?height=40&width=40&text=TS",
        duration: "3 months",
        startDate: "2023-06-01",
        endDate: "2023-08-31",
        location: "San Francisco, CA",
        type: "On-site",
        rating: 5.0,
        feedback:
            "Sarah was an exceptional intern who exceeded all expectations. Her technical skills in React and JavaScript were outstanding, and she quickly adapted to our codebase. She took initiative on several projects and delivered high-quality code consistently. Her communication skills and ability to work in a team made her a valuable asset. We would definitely consider her for a full-time position.",
        skills: ["React", "JavaScript", "CSS", "Git", "Agile"],
        achievements: [
            "Developed a customer dashboard that increased user engagement by 25%",
            "Optimized application performance, reducing load times by 40%",
            "Mentored 2 junior interns and helped them onboard successfully",
        ],
        supervisor: {
            name: "Michael Chen",
            position: "Senior Frontend Engineer",
            avatar: "/placeholder.svg?height=40&width=40&text=MC",
        },
    },
    {
        id: "completed-2",
        internshipTitle: "Full Stack Developer Intern",
        companyName: "DataFlow Inc",
        companyLogo: "/placeholder.svg?height=40&width=40&text=DF",
        duration: "4 months",
        startDate: "2023-09-01",
        endDate: "2023-12-31",
        location: "Remote",
        type: "Remote",
        rating: 4.8,
        feedback:
            "Sarah demonstrated excellent problem-solving skills and was able to work independently on complex features. She built several API endpoints and integrated them seamlessly with the frontend. Her code quality was consistently high and she followed best practices. She was proactive in asking questions and seeking feedback, which helped her grow quickly during the internship.",
        skills: ["Node.js", "Express", "MongoDB", "React", "TypeScript"],
        achievements: [
            "Built a complete user authentication system",
            "Implemented real-time notifications using WebSockets",
            "Created comprehensive API documentation",
        ],
        supervisor: {
            name: "Emily Rodriguez",
            position: "Lead Backend Developer",
            avatar: "/placeholder.svg?height=40&width=40&text=ER",
        },
    },
    {
        id: "completed-3",
        internshipTitle: "Software Engineering Intern",
        companyName: "InnovateTech",
        companyLogo: "/placeholder.svg?height=40&width=40&text=IT",
        duration: "6 months",
        startDate: "2024-01-01",
        endDate: "2024-06-30",
        location: "Austin, TX",
        type: "Hybrid",
        rating: 4.5,
        feedback:
            "Sarah was a dedicated and hardworking intern who contributed significantly to our mobile application project. She learned Swift quickly and was able to implement several key features. Her attention to detail and commitment to writing clean, maintainable code was impressive. She collaborated well with the design team and provided valuable input on user experience improvements.",
        skills: ["Swift", "iOS Development", "UIKit", "Core Data", "Git"],
        achievements: [
            "Developed 3 major features for the iOS app",
            "Improved app performance by 30%",
            "Contributed to the app's 4.8-star rating on the App Store",
        ],
        supervisor: {
            name: "David Park",
            position: "iOS Team Lead",
            avatar: "/placeholder.svg?height=40&width=40&text=DP",
        },
    },
]


export default function ApplicationDetailPage() {
    const [activeTab, setActiveTab] = useState("application")
    const params = useParams()
    const [application, setApplication] = useState<any>({})
    const [loading, setLoading] = useState(true)
    const [isInterviewDialogOpen, setIsInterviewDialogOpen] = useState(false)


    useEffect(() => {
        const fetchApplication = async () => {
            setLoading(true)
            try {
                const response = await api.get(`/applications/${params.id}`)
                setApplication(response.data)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        fetchApplication()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Loading application details...</p>
                </div>
            </div>
        )
    }

    if (!application) return null



    return (
        <div>
            <div className="min-w-[70vw] p-0">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Application Details</h1>
                        <p className="text-muted-foreground">Application for {application.job?.title} • Applied {formatDate(application.createdAt)}</p>
                    </div>
                    <Badge className={getStatusColor(application.status)}>{formatStatus(application.status)}</Badge>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} >
                    <TabsList className="flex gap-3 mt-3">
                        <TabsTrigger value="application">Application</TabsTrigger>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="job">Job Details</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="space-y-6 mt-6">
                        <ApplicantProfileDetail intern={application.intern} completedInternships={completedInternships} />
                    </TabsContent>

                    <TabsContent value="job" className="space-y-6 mt-6">
                        <JobDetailTab job={application.job} />
                    </TabsContent>

                    <TabsContent value="application" className="space-y-6 mt-6">
                        <ApplicationTab application={application} intern={application.intern} />
                    </TabsContent>
                </Tabs>
                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" className="text-green-500 hover:text-green-600" onClick={() => setIsInterviewDialogOpen(true)}>
                                    <Calendar className="mr-2 h-4 w-4" /> Schedule Interview
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Schedule an interview with the applicant.</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className="b bg-green-500 hover:bg-green-600 text-black" onClick={() => alert("accept")}>
                                    <Check className="mr-2 h-4 w-4" /> Accept
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Accept this application.</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="destructive" onClick={() => alert("reject")}>
                                    <X className="mr-2 h-4 w-4" /> Reject
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Reject this application.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            <ScheduleDialog application={application} isOpen={isInterviewDialogOpen} onClose={() => setIsInterviewDialogOpen(false)} setApplication={setApplication} />

        </div>
    )
}
