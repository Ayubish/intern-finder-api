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
    overallRating: number
    totalReviews: number
    completedInternships: number
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

export interface CompletedInternship {
    id: string
    internshipTitle: string
    companyName: string
    companyLogo: string
    duration: string
    startDate: string
    endDate: string
    location: string
    type: string
    rating: number
    feedback: string
    skills: string[]
    achievements: string[]
    supervisor: {
        name: string
        position: string
        avatar?: string
    }
}

interface InternContextType {
    user: InternUser | null
    applications: Application[]
    savedInternships: SavedInternship[]
    completedInternships: CompletedInternship[]
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

const mockCompletedInternships: CompletedInternship[] = [
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

export function InternProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<InternUser | null>(null)
    const [applications, setApplications] = useState<Application[]>([])
    const [savedInternships, setSavedInternships] = useState<SavedInternship[]>([])
    const [completedInternships, setCompletedInternships] = useState<CompletedInternship[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate loading user data
        const loadData = async () => {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setUser(mockInternUser)
            setApplications(mockApplications)
            setSavedInternships(mockSavedInternships)
            setCompletedInternships(mockCompletedInternships)
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
                completedInternships,
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
