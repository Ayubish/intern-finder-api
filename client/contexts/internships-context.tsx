"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Company {
    id: string
    name: string
    industry: string
    image: string
    description: string
    size: string
    year: number
    contactEmail: string
    phone: string
    website: string
    headQuarter: string
    additionalLocations: string
    values: string
}

export interface Internship {
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
    status: "Active" | "Closed" | "Draft"
    createdAt: string
    updatedAt: string
    company: Company
}

interface InternshipsContextType {
    internships: Internship[]
    loading: boolean
    searchInternships: (query: string) => Internship[]
    getInternship: (id: string) => Internship | undefined
    applyToInternship: (internshipId: string, applicationData: any) => Promise<void>
}

const InternshipsContext = createContext<InternshipsContextType | undefined>(undefined)

// Sample internships data based on your API structure
const sampleInternships: Internship[] = [
    {
        id: "cmefewvrw0001n5z9hrjnn8g9",
        companyId: "37f7345d-296a-4fc4-a438-47ea53937590",
        title: "FullStack Developer",
        type: "On-site",
        location: "Adama, Ethiopia",
        salary: "20000 ETB/Month",
        duration: "2 months",
        startDate: "2025-03-04T00:00:00.000Z",
        deadline: "2025-08-24T00:00:00.000Z",
        description: "We need skilled fullstack beast to update and rewrite our entire web infrastructure.",
        responsibilities: "-Develop and maintain web applications\n-Cooking food for staff\n-Suq melalak",
        requirements: "-Strong communication skills\n-A degree in computer science or related field",
        benefits: "-hefty money\n-certificate",
        status: "Active",
        createdAt: "2025-08-17T08:16:44.252Z",
        updatedAt: "2025-08-17T08:16:44.252Z",
        company: {
            id: "37f7345d-296a-4fc4-a438-47ea53937590",
            name: "Hira Incorporated",
            industry: "Technology",
            image: "http://localhost:5000/logo/coming_soon-1755398396428.jpeg",
            description: "We are a team of dedicated developers that can potentially hire you!",
            size: "1-10 employees",
            year: 2023,
            contactEmail: "hr@hira.com",
            phone: "0947991300",
            website: "https://hira.com",
            headQuarter: "Addis Ababa",
            additionalLocations: '["Adama,Werabe"]',
            values: '["Innovation","Collaboration","Integrity"]',
        },
    },
    {
        id: "intern-2",
        companyId: "company-2",
        title: "Frontend Developer Intern",
        type: "Remote",
        location: "Remote",
        salary: "15000 ETB/Month",
        duration: "3 months",
        startDate: "2025-02-15T00:00:00.000Z",
        deadline: "2025-01-30T00:00:00.000Z",
        description: "Join our frontend team to build amazing user interfaces using React and modern web technologies.",
        responsibilities:
            "-Build responsive web interfaces\n-Collaborate with design team\n-Write clean, maintainable code\n-Participate in code reviews",
        requirements:
            "-Knowledge of React and JavaScript\n-Understanding of HTML/CSS\n-Good problem-solving skills\n-Ability to work in a team",
        benefits:
            "-Mentorship from senior developers\n-Flexible working hours\n-Certificate of completion\n-Potential for full-time offer",
        status: "Active",
        createdAt: "2025-08-15T10:30:00.000Z",
        updatedAt: "2025-08-15T10:30:00.000Z",
        company: {
            id: "company-2",
            name: "TechFlow Solutions",
            industry: "Software Development",
            image: "/placeholder.svg?height=80&width=80&text=TF",
            description: "A leading software development company specializing in web and mobile applications.",
            size: "50-100 employees",
            year: 2020,
            contactEmail: "careers@techflow.com",
            phone: "0911234567",
            website: "https://techflow.com",
            headQuarter: "Addis Ababa",
            additionalLocations: '["Bahir Dar","Hawassa"]',
            values: '["Innovation","Quality","Growth"]',
        },
    },
    {
        id: "intern-3",
        companyId: "company-3",
        title: "Data Science Intern",
        type: "Hybrid",
        location: "Addis Ababa, Ethiopia",
        salary: "18000 ETB/Month",
        duration: "4 months",
        startDate: "2025-02-01T00:00:00.000Z",
        deadline: "2025-01-25T00:00:00.000Z",
        description: "Work with our data science team to analyze large datasets and build predictive models.",
        responsibilities:
            "-Analyze and visualize data\n-Build machine learning models\n-Create reports and presentations\n-Support data-driven decision making",
        requirements:
            "-Knowledge of Python and SQL\n-Understanding of statistics\n-Experience with data visualization tools\n-Strong analytical skills",
        benefits:
            "-Access to real-world datasets\n-Training in advanced ML techniques\n-Networking opportunities\n-Performance-based bonus",
        status: "Active",
        createdAt: "2025-08-14T14:20:00.000Z",
        updatedAt: "2025-08-14T14:20:00.000Z",
        company: {
            id: "company-3",
            name: "DataVision Analytics",
            industry: "Data Analytics",
            image: "/placeholder.svg?height=80&width=80&text=DV",
            description: "Transforming businesses through data-driven insights and advanced analytics solutions.",
            size: "20-50 employees",
            year: 2019,
            contactEmail: "hr@datavision.com",
            phone: "0922345678",
            website: "https://datavision.com",
            headQuarter: "Addis Ababa",
            additionalLocations: '["Mekelle"]',
            values: '["Accuracy","Innovation","Impact"]',
        },
    },
]

export function InternshipsProvider({ children }: { children: React.ReactNode }) {
    const [internships, setInternships] = useState<Internship[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadInternships = async () => {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 500))
            setInternships(sampleInternships)
            setLoading(false)
        }

        loadInternships()
    }, [])

    const searchInternships = (query: string) => {
        if (!query.trim()) return internships

        return internships.filter(
            (internship) =>
                internship.title.toLowerCase().includes(query.toLowerCase()) ||
                internship.company.name.toLowerCase().includes(query.toLowerCase()) ||
                internship.location.toLowerCase().includes(query.toLowerCase()) ||
                internship.type.toLowerCase().includes(query.toLowerCase()),
        )
    }

    const getInternship = (id: string) => {
        return internships.find((internship) => internship.id === id)
    }

    const applyToInternship = async (internshipId: string, applicationData: any) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log("Application submitted:", { internshipId, applicationData })
    }

    return (
        <InternshipsContext.Provider
            value={{
                internships,
                loading,
                searchInternships,
                getInternship,
                applyToInternship,
            }}
        >
            {children}
        </InternshipsContext.Provider>
    )
}

export function useInternships() {
    const context = useContext(InternshipsContext)
    if (context === undefined) {
        throw new Error("useInternships must be used within an InternshipsProvider")
    }
    return context
}
