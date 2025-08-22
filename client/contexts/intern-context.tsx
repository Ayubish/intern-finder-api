"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface InternUser {
    id: string
    name: string
    email: string
    phone?: string
    university: string
    major: string
    gpa: string
    graduationYear: string
    skills: string[]
    bio: string
    resume?: string
    portfolio?: string
    linkedin?: string
    github?: string
    avatar?: string
    profileCompletion: number
}

export interface Application {
    id: string
    internshipId: string
    internshipTitle: string
    companyName: string
    companyLogo: string
    appliedDate: string
    status: "pending" | "reviewing" | "interview" | "accepted" | "rejected"
    deadline: string
    location: string
    type: string
    salary: string
}

export interface SavedInternship {
    id: string
    internshipId: string
    internshipTitle: string
    companyName: string
    companyLogo: string
    location: string
    type: string
    salary: string
    deadline: string
    savedDate: string
}

interface InternContextType {
    user: InternUser | null
    applications: Application[]
    savedInternships: SavedInternship[]
    updateProfile: (data: Partial<InternUser>) => void
    addApplication: (application: Omit<Application, "id" | "appliedDate">) => void
    saveInternship: (internship: Omit<SavedInternship, "id" | "savedDate">) => void
    removeSavedInternship: (id: string) => void
    loading: boolean
}

const InternContext = createContext<InternContextType | undefined>(undefined)

// Mock data for intern user
const mockInternUser: InternUser = {
    id: "intern-1",
    name: "Naruto Uzumaki",
    email: "naruto@university.edu",
    phone: "+1 (555) 123-4567",
    university: "Adama University",
    major: "Computer Science",
    gpa: "3.8",
    graduationYear: "2025",
    skills: ["React", "JavaScript", "Python", "Node.js", "SQL", "Git"],
    bio: "Passionate computer science student with experience in full-stack development. Looking for opportunities to apply my skills in a real-world environment and contribute to innovative projects.",
    resume: "sarah_johnson_resume.pdf",
    portfolio: "https://sarahjohnson.dev",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    github: "https://github.com/sarahjohnson",
    avatar: "/placeholder.svg?height=100&width=100&text=SJ",
    profileCompletion: 85,
}

const mockApplications: Application[] = [
    {
        id: "app-1",
        internshipId: "cmefewvrw0001n5z9hrjnn8g9",
        internshipTitle: "FullStack Developer Intern",
        companyName: "Hira Incorporated",
        companyLogo: "/placeholder.svg?height=40&width=40&text=HI",
        appliedDate: "2024-01-15",
        status: "interview",
        deadline: "2025-02-03",
        location: "Adama, Ethiopia",
        type: "On-site",
        salary: "20000 ETB/Month",
    },
    {
        id: "app-2",
        internshipId: "intern-2",
        internshipTitle: "Frontend Developer Intern",
        companyName: "TechFlow Solutions",
        companyLogo: "/placeholder.svg?height=40&width=40&text=TF",
        appliedDate: "2024-01-12",
        status: "reviewing",
        deadline: "2025-01-30",
        location: "Remote",
        type: "Remote",
        salary: "15000 ETB/Month",
    },
    {
        id: "app-3",
        internshipId: "intern-3",
        internshipTitle: "Data Science Intern",
        companyName: "DataVision Analytics",
        companyLogo: "/placeholder.svg?height=40&width=40&text=DV",
        appliedDate: "2024-01-10",
        status: "accepted",
        deadline: "2025-01-25",
        location: "Addis Ababa, Ethiopia",
        type: "Hybrid",
        salary: "18000 ETB/Month",
    },
    {
        id: "app-4",
        internshipId: "intern-4",
        internshipTitle: "UI/UX Design Intern",
        companyName: "Creative Studio",
        companyLogo: "/placeholder.svg?height=40&width=40&text=CS",
        appliedDate: "2024-01-08",
        status: "rejected",
        deadline: "2025-01-20",
        location: "Addis Ababa, Ethiopia",
        type: "On-site",
        salary: "12000 ETB/Month",
    },
]

const mockSavedInternships: SavedInternship[] = [
    {
        id: "saved-1",
        internshipId: "intern-5",
        internshipTitle: "Backend Developer Intern",
        companyName: "Tech Innovations",
        companyLogo: "/placeholder.svg?height=40&width=40&text=TI",
        location: "Addis Ababa, Ethiopia",
        type: "On-site",
        salary: "22000 ETB/Month",
        deadline: "2025-02-15",
        savedDate: "2024-01-18",
    },
    {
        id: "saved-2",
        internshipId: "intern-6",
        internshipTitle: "Mobile App Developer Intern",
        companyName: "AppCraft",
        companyLogo: "/placeholder.svg?height=40&width=40&text=AC",
        location: "Remote",
        type: "Remote",
        salary: "18000 ETB/Month",
        deadline: "2025-02-10",
        savedDate: "2024-01-17",
    },
]

export function InternProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<InternUser | null>(null)
    const [applications, setApplications] = useState<Application[]>([])
    const [savedInternships, setSavedInternships] = useState<SavedInternship[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate loading user data
        const loadData = async () => {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setUser(mockInternUser)
            setApplications(mockApplications)
            setSavedInternships(mockSavedInternships)
            setLoading(false)
        }

        loadData()
    }, [])

    const updateProfile = (data: Partial<InternUser>) => {
        if (user) {
            const updatedUser = { ...user, ...data }
            // Recalculate profile completion
            const fields = [
                updatedUser.name,
                updatedUser.email,
                updatedUser.phone,
                updatedUser.university,
                updatedUser.major,
                updatedUser.gpa,
                updatedUser.graduationYear,
                updatedUser.bio,
                updatedUser.resume,
                updatedUser.portfolio,
                updatedUser.linkedin,
                updatedUser.github,
            ]
            const filledFields = fields.filter((field) => field && field.trim() !== "").length
            const skillsPoints = updatedUser.skills.length > 0 ? 1 : 0
            updatedUser.profileCompletion = Math.round(((filledFields + skillsPoints) / 13) * 100)

            setUser(updatedUser)
        }
    }

    const addApplication = (applicationData: Omit<Application, "id" | "appliedDate">) => {
        const newApplication: Application = {
            ...applicationData,
            id: Date.now().toString(),
            appliedDate: new Date().toISOString().split("T")[0],
        }
        setApplications((prev) => [newApplication, ...prev])
    }

    const saveInternship = (internshipData: Omit<SavedInternship, "id" | "savedDate">) => {
        const newSaved: SavedInternship = {
            ...internshipData,
            id: Date.now().toString(),
            savedDate: new Date().toISOString().split("T")[0],
        }
        setSavedInternships((prev) => [newSaved, ...prev])
    }

    const removeSavedInternship = (id: string) => {
        setSavedInternships((prev) => prev.filter((item) => item.id !== id))
    }

    return (
        <InternContext.Provider
            value={{
                user,
                applications,
                savedInternships,
                updateProfile,
                addApplication,
                saveInternship,
                removeSavedInternship,
                loading,
            }}
        >
            {children}
        </InternContext.Provider>
    )
}

export function useIntern() {
    const context = useContext(InternContext)
    if (context === undefined) {
        throw new Error("useIntern must be used within an InternProvider")
    }
    return context
}
