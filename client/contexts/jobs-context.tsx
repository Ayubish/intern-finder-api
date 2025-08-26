"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { api } from "@/lib/api"


interface Job {
    id: string
    companyId: string
    title: string
    location: string
    type: string
    status: "Active" | "Draft" | "Closed" | "Paused"
    views: number
    deadline?: string
    duration?: string
    startDate?: string
    salary: string
    description: string
    requirements: string
    benefits: string
    responsibilities: string
    createdAt: string
    updatedAt: string

}

interface JobRes {
    jobs: Job[]
    totalViews: number
    totalJobs: number
}

interface JobsContextType {
    jobs: Job[]
    addJob: (job: Omit<Job, "id" | "applicants" | "views" | "posted">) => Promise<void>
    updateJob: (id: string, job: Partial<Job>) => Promise<void>
    deleteJob: (id: string) => Promise<void>
    getJob: (id: string) => Job | undefined
    loading: boolean
    refreshJobs: () => Promise<void>
}

const JobsContext = createContext<JobsContextType | undefined>(undefined)

// --- MOCK DATA ---
const MOCK_JOBS: JobRes = {
    "jobs": [
        {
            "id": "cmefewvrw0001n5z9hrjnn8g9",
            "companyId": "37f7345d-296a-4fc4-a438-47ea53937590",
            "title": "FUllStack Developer",
            "type": "On-site",
            "location": "Adama, Ethiopia",
            "salary": "20000 ETB/Month",
            "duration": "2 months",
            "startDate": "2025-03-04T00:00:00.000Z",
            "deadline": "2025-02-03T00:00:00.000Z",
            "description": "We need skilled fullstack beast to update and rewrite our entire web infrastructure.",
            "responsibilities": "-Develop and maintain web applications\r\n-Cooking food for staff\r\n-Suq melalak",
            "requirements": "-Strong communication skills\r\n-A degree in computer science or related field",
            "benefits": "-hefty money\r\n-certificate",
            "status": "Active",
            "views": 0,
            "createdAt": "2025-08-17T08:16:44.252Z",
            "updatedAt": "2025-08-17T08:16:44.252Z"
        }
    ],
    "totalViews": 0,
    "totalJobs": 1
}


export function JobsProvider({ children }: { children: React.ReactNode }) {
    // const [jobs, setJobs] = useState<JobRes>({
    //     jobs: [],
    //     totalViews: 0,
    //     totalJobs: 0
    // })
    const [jobs, setJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState(true)
    // const { user } = useAuth()

    useEffect(() => {
        refreshJobs()
    }, [])

    const refreshJobs = async () => {
        setLoading(true)
        const res = await api.get("/jobs")
        setJobs(res.data)
        setLoading(false)
    }

    const addJob = async (jobData: Omit<Job, "id" | "applicants" | "views" | "posted">) => {
        setLoading(true)
        // await new Promise((res) => setTimeout(res, 200))
        // setJobs((prev) => [
        //     {
        //         ...jobData,
        //         id: (Math.random() * 100000).toFixed(0),
        //         applicants: 0,
        //         views: 0,
        //         posted: new Date().toISOString().split("T")[0],
        //     },
        //     ...prev,
        // ])
        setLoading(false)
    }

    const updateJob = async (id: string, jobData: Partial<Job>) => {
        setLoading(true)
        // await new Promise((res) => setTimeout(res, 200))
        // setJobs((prev) =>
        //     prev.map((job) =>
        //         job.id === id ? { ...job, ...jobData } : job
        //     )
        // )
        setLoading(false)
    }

    const deleteJob = async (id: string) => {
        setLoading(true)
        // await new Promise((res) => setTimeout(res, 200))
        // setJobs((prev) => prev.filter((job) => job.id !== id))
        setLoading(false)
    }

    const getJob = (id: string) => {
        return jobs.find((job) => job.id === id)
    }

    return (
        <JobsContext.Provider value={{ jobs, addJob, updateJob, deleteJob, getJob, loading, refreshJobs }}>
            {children}
        </JobsContext.Provider>
    )
}

export function useJobs() {
    const context = useContext(JobsContext)
    if (context === undefined) {
        throw new Error("useJobs must be used within a JobsProvider")
    }
    return context
}
