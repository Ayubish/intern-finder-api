"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Application {
    id: string
    jobId: string
    jobTitle: string
    name: string
    email: string
    phone?: string
    resumeUrl?: string
    coverLetter?: string
    status: string
    experience?: string
    university?: string
    rating?: number
    notes?: string
    appliedDate: string
    avatar?: string
}

interface Interview {
    id: string
    applicationId: string
    interviewerId?: string
    scheduledAt: string
    duration: number
    type: string
    location?: string
    notes?: string
    status: string
}

interface ApplicationsContextType {
    applications: Application[]
    interviews: Interview[]
    addApplication: (application: Omit<Application, "id" | "appliedDate">) => void
    updateApplication: (id: string, application: Partial<Application>) => void
    deleteApplication: (id: string) => void
    scheduleInterview: (interview: Omit<Interview, "id">) => void
    updateInterview: (id: string, interview: Partial<Interview>) => void
    getApplication: (id: string) => Application | undefined
    loading: boolean
}

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined)

const mockApplications: Application[] = [
    {
        id: "1",
        jobId: "1",
        jobTitle: "Senior Frontend Developer",
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        status: "interview_scheduled",
        experience: "5 years",
        university: "Stanford University",
        rating: 4.5,
        appliedDate: "2024-01-15",
        avatar: "/placeholder.svg?height=40&width=40&text=SJ",
        resumeUrl: "sarah_johnson_resume.pdf",
    },
    {
        id: "2",
        jobId: "2",
        jobTitle: "Data Analyst",
        name: "Michael Chen",
        email: "michael.chen@email.com",
        phone: "+1 (555) 234-5678",
        status: "under_review",
        experience: "3 years",
        university: "MIT",
        rating: 4.2,
        appliedDate: "2024-01-14",
        avatar: "/placeholder.svg?height=40&width=40&text=MC",
        resumeUrl: "michael_chen_resume.pdf",
    },
    {
        id: "3",
        jobId: "1",
        jobTitle: "UX Designer",
        name: "Emily Davis",
        email: "emily.davis@email.com",
        phone: "+1 (555) 345-6789",
        status: "accepted",
        experience: "4 years",
        university: "UC Berkeley",
        rating: 4.8,
        appliedDate: "2024-01-13",
        avatar: "/placeholder.svg?height=40&width=40&text=ED",
        resumeUrl: "emily_davis_resume.pdf",
    },
    {
        id: "4",
        jobId: "1",
        jobTitle: "Backend Developer",
        name: "James Wilson",
        email: "james.wilson@email.com",
        phone: "+1 (555) 456-7890",
        status: "rejected",
        experience: "2 years",
        university: "UCLA",
        rating: 3.5,
        appliedDate: "2024-01-12",
        avatar: "/placeholder.svg?height=40&width=40&text=JW",
        resumeUrl: "james_wilson_resume.pdf",
    },
    {
        id: "5",
        jobId: "3",
        jobTitle: "Data Analyst Intern",
        name: "Lisa Rodriguez",
        email: "lisa.rodriguez@email.com",
        phone: "+1 (555) 567-8901",
        status: "new",
        experience: "Student",
        university: "Harvard University",
        appliedDate: "2024-01-16",
        avatar: "/placeholder.svg?height=40&width=40&text=LR",
        resumeUrl: "lisa_rodriguez_resume.pdf",
    },
    {
        id: "6",
        jobId: "1",
        jobTitle: "Senior Frontend Developer",
        name: "Alex Thompson",
        email: "alex.thompson@email.com",
        phone: "+1 (555) 678-9012",
        status: "under_review",
        experience: "6 years",
        university: "Carnegie Mellon",
        rating: 4.3,
        appliedDate: "2024-01-17",
        avatar: "/placeholder.svg?height=40&width=40&text=AT",
        resumeUrl: "alex_thompson_resume.pdf",
    },
    {
        id: "7",
        jobId: "2",
        jobTitle: "UX Designer",
        name: "Maya Patel",
        email: "maya.patel@email.com",
        phone: "+1 (555) 789-0123",
        status: "new",
        experience: "3 years",
        university: "RISD",
        appliedDate: "2024-01-18",
        avatar: "/placeholder.svg?height=40&width=40&text=MP",
        resumeUrl: "maya_patel_resume.pdf",
    },
]

const mockInterviews: Interview[] = [
    {
        id: "1",
        applicationId: "1",
        interviewerId: "interviewer-1",
        scheduledAt: "2024-02-15T14:00:00Z",
        duration: 60,
        type: "video",
        location: "https://zoom.us/j/123456789",
        status: "scheduled",
        notes: "Technical interview focusing on React and TypeScript",
    },
    {
        id: "2",
        applicationId: "3",
        interviewerId: "interviewer-2",
        scheduledAt: "2024-02-10T10:00:00Z",
        duration: 45,
        type: "video",
        location: "https://meet.google.com/abc-defg-hij",
        status: "completed",
        notes: "Design portfolio review and culture fit discussion",
    },
]

export function ApplicationsProvider({ children }: { children: React.ReactNode }) {
    const [applications, setApplications] = useState<Application[]>([])
    const [interviews, setInterviews] = useState<Interview[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setApplications(mockApplications)
            setInterviews(mockInterviews)
            setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    const addApplication = (applicationData: Omit<Application, "id" | "appliedDate">) => {
        const newApplication: Application = {
            ...applicationData,
            id: Date.now().toString(),
            appliedDate: new Date().toISOString().split("T")[0],
            avatar: `/placeholder.svg?height=40&width=40&text=${applicationData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}`,
        }
        setApplications((prev) => [newApplication, ...prev])
    }

    const updateApplication = (id: string, applicationData: Partial<Application>) => {
        setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, ...applicationData } : app)))
    }

    const deleteApplication = (id: string) => {
        setApplications((prev) => prev.filter((app) => app.id !== id))
        setInterviews((prev) => prev.filter((interview) => interview.applicationId !== id))
    }

    const scheduleInterview = (interviewData: Omit<Interview, "id">) => {
        const newInterview: Interview = {
            ...interviewData,
            id: Date.now().toString(),
        }
        setInterviews((prev) => [...prev, newInterview])
    }

    const updateInterview = (id: string, interviewData: Partial<Interview>) => {
        setInterviews((prev) =>
            prev.map((interview) => (interview.id === id ? { ...interview, ...interviewData } : interview)),
        )
    }

    const getApplication = (id: string) => {
        return applications.find((app) => app.id === id)
    }

    return (
        <ApplicationsContext.Provider
            value={{
                applications,
                interviews,
                addApplication,
                updateApplication,
                deleteApplication,
                scheduleInterview,
                updateInterview,
                getApplication,
                loading,
            }}
        >
            {children}
        </ApplicationsContext.Provider>
    )
}

export function useApplications() {
    const context = useContext(ApplicationsContext)
    if (context === undefined) {
        throw new Error("useApplications must be used within an ApplicationsProvider")
    }
    return context
}
