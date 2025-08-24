"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import {
    Star,
    GraduationCap,
    Calendar,
    Mail,
    Phone,
    ExternalLink,
    Github,
    Linkedin,
    Download,
    Award,
    Target,
    Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useIntern, type CompletedInternship } from "@/contexts/intern-context"

const mockInternUser = {
    id: "intern-1",
    name: "Sarah Johnson",
    email: "sarah.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    university: "Stanford University",
    major: "Computer Science",
    gpa: "3.8",
    graduationYear: "2025",
    skills: ["React", "JavaScript", "Python", "Node.js", "SQL", "Git", "TypeScript", "MongoDB"],
    bio: "Passionate computer science student with experience in full-stack development. Looking for opportunities to apply my skills in a real-world environment and contribute to innovative projects. I have completed multiple internships and consistently received excellent feedback for my technical skills and work ethic.",
    resume: "sarah_johnson_resume.pdf",
    portfolio: "https://sarahjohnson.dev",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    github: "https://github.com/sarahjohnson",
    avatar: "/placeholder.svg?height=100&width=100&text=SJ",
    profileCompletion: 95,
    overallRating: 4.7,
    totalReviews: 8,
    completedInternships: 3,
}
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
export default function InternProfileDetail() {
    //   const params = useParams()
    //   const { user, completedInternships, loading } = useIntern()
    const [profileData, setProfileData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        // In a real app, you would fetch the profile data based on the ID
        // For now, we'll use the mock data from the context
        // if (user && params.id === user.id) {
        setProfileData(mockInternUser)
        // }
        setLoading(false)
    }, [])

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`h-5 w-5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                ))}
                <span className="text-lg font-medium ml-2">{rating.toFixed(1)}</span>
            </div>
        )
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
        })
    }

    if (loading || !profileData) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse space-y-6">
                    <div className="h-64 bg-gray-200 rounded-lg"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="h-48 bg-gray-200 rounded-lg"></div>
                            <div className="h-64 bg-gray-200 rounded-lg"></div>
                        </div>
                        <div className="space-y-6">
                            <div className="h-32 bg-gray-200 rounded-lg"></div>
                            <div className="h-48 bg-gray-200 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Profile Header */}


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* About */}
                    <Card>
                        <CardHeader>
                            <CardTitle>About</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
                        </CardContent>
                    </Card>

                    {/* Skills */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Technical Skills</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {profileData.skills.map((skill: string) => (
                                    <Badge key={skill} variant="secondary" className="text-sm py-1 px-3">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Internship Reviews */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Internship Reviews & Feedback
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {completedInternships.map((internship: CompletedInternship) => (
                                <div key={internship.id} className="border rounded-lg p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={internship.companyLogo || "/placeholder.svg"} alt={internship.companyName} />
                                            <AvatarFallback>
                                                {internship.companyName
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h4 className="font-semibold text-lg">{internship.internshipTitle}</h4>
                                                    <p className="text-gray-600">{internship.companyName}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {formatDate(internship.startDate)} - {formatDate(internship.endDate)} •{" "}
                                                        {internship.duration}
                                                    </p>
                                                </div>
                                                <div className="text-right">{renderStars(internship.rating)}</div>
                                            </div>

                                            <div className="mb-4">
                                                <p className="text-gray-700 leading-relaxed">{internship.feedback}</p>
                                            </div>

                                            {internship.achievements.length > 0 && (
                                                <div className="mb-4">
                                                    <h5 className="font-medium mb-2 flex items-center gap-2">
                                                        <Target className="h-4 w-4" />
                                                        Key Achievements
                                                    </h5>
                                                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                                        {internship.achievements.map((achievement, index) => (
                                                            <li key={index}>{achievement}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-wrap gap-1">
                                                    {internship.skills.map((skill) => (
                                                        <Badge key={skill} variant="outline" className="text-xs">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarImage
                                                            src={internship.supervisor.avatar || "/placeholder.svg"}
                                                            alt={internship.supervisor.name}
                                                        />
                                                        <AvatarFallback className="text-xs">
                                                            {internship.supervisor.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span>{internship.supervisor.name}</span>
                                                    <span className="text-gray-400">•</span>
                                                    <span>{internship.supervisor.position}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">{profileData.email}</span>
                            </div>
                            {profileData.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{profileData.phone}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Profile Strength */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Strength</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-medium">Profile Completion</span>
                                        <span className="text-sm text-gray-600">{profileData.profileCompletion}%</span>
                                    </div>
                                    <Progress value={profileData.profileCompletion} className="h-2" />
                                </div>
                                <Separator />
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Overall Rating</span>
                                        <span className="font-medium">{profileData.overallRating}/5.0</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Total Reviews</span>
                                        <span className="font-medium">{profileData.totalReviews}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Completed Internships</span>
                                        <span className="font-medium">{profileData.completedInternships}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Rating Breakdown */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Rating Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {[5, 4, 3, 2, 1].map((rating) => {
                                    const count = completedInternships.filter((i) => Math.floor(i.rating) === rating).length
                                    const percentage = completedInternships.length > 0 ? (count / completedInternships.length) * 100 : 0

                                    return (
                                        <div key={rating} className="flex items-center gap-3">
                                            <span className="text-sm w-8">{rating}★</span>
                                            <Progress value={percentage} className="flex-1 h-2" />
                                            <span className="text-sm text-gray-600 w-8">{count}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
