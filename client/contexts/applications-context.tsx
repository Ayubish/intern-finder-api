"use client"

import { api } from "@/lib/api"
import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Intern {
    id: string
    userId: string
    name: string
    dateOfBirth: string
    image: string
    gender: string
    country: string
    degree: string
    university: string | null
    major: string | null
    yearOfGraduation: string | null
    GPA: string | null
    companyId: string | null
    jobId: string | null
    startDate: string | null
    endDate: string | null
    status: string
    about: string
    resume: string
    linkdin: string | null
    github: string | null
    portfolio: string | null
    createdAt: string
    updatedAt: string
}

interface Job {
    id: string
    companyId: string
    title: string
    type: string
    location: string
    salary: string
    duration: string
    startDate: string
    deadline: string
    description: string
    responsibilities: string
    requirements: string
    benefits: string
    status: string
    views: number
    createdAt: string
    updatedAt: string
}

interface Application {
    id: string
    createdAt: string
    updatedAt: string
    resume: string
    coverLetter: string
    jobId: string
    companyId: string
    internId: string
    status: string
    intern: Intern
    job: Job
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
    updateApplication: (id: string, application: Partial<Application>) => void
    deleteApplication: (id: string) => void
    scheduleInterview: (interview: Omit<Interview, "id">) => void
    updateInterview: (id: string, interview: Partial<Interview>) => void
    getApplication: (id: string) => Application | undefined
    loading: boolean
}

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined)

export function ApplicationsProvider({ children }: { children: React.ReactNode }) {
    const [applications, setApplications] = useState<Application[]>([])
    const [interviews, setInterviews] = useState<Interview[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getApplications() {
            setLoading(true)
            try {
                const response = await api.get("/applications/company")
                setApplications(response.data)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        getApplications()
    }, [])



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