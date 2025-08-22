"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
// import { supabase } from "@/lib/supabase"
// import { useAuth } from "./auth-context"

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
    jobs: JobRes
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
    const [jobs, setJobs] = useState<JobRes>({
        jobs: [],
        totalViews: 0,
        totalJobs: 0
    })
    const [loading, setLoading] = useState(true)
    // const { user } = useAuth()

    useEffect(() => {
        refreshJobs()
    }, [])

    const refreshJobs = async () => {
        setLoading(true)
        // Simulate async fetch
        await new Promise((res) => setTimeout(res, 300))
        setJobs(MOCK_JOBS)
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
        return jobs?.jobs.find((job) => job.id === id)
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


// "use client"

// import type React from "react"
// import { createContext, useContext, useState, useEffect } from "react"
// import { supabase } from "@/lib/supabase"
// import { useAuth } from "./auth-context"

// interface Job {
//     id: string
//     title: string
//     department: string
//     location: string
//     type: string
//     status: "Active" | "Draft" | "Closed" | "Paused"
//     applicants: number
//     views: number
//     posted: string
//     expires?: string
//     salary: string
//     description: string
//     requirements: string[]
//     benefits: string[]
//     remote: boolean
//     urgent: boolean
// }

// interface JobsContextType {
//     jobs: Job[]
//     addJob: (job: Omit<Job, "id" | "applicants" | "views" | "posted">) => Promise<void>
//     updateJob: (id: string, job: Partial<Job>) => Promise<void>
//     deleteJob: (id: string) => Promise<void>
//     getJob: (id: string) => Job | undefined
//     loading: boolean
//     refreshJobs: () => Promise<void>
// }

// const JobsContext = createContext<JobsContextType | undefined>(undefined)

// export function JobsProvider({ children }: { children: React.ReactNode }) {
//     const [jobs, setJobs] = useState<Job[]>([])
//     const [loading, setLoading] = useState(true)
//     const { user } = useAuth()

//     useEffect(() => {
//         if (user) {
//             refreshJobs()
//         }
//     }, [user])

//     const refreshJobs = async () => {
//         if (!user) return

//         try {
//             setLoading(true)
//             const { data, error } = await supabase
//                 .from("jobs")
//                 .select(`
//           *,
//           applications (count)
//         `)
//                 .eq("company_id", user.companyId)
//                 .order("created_at", { ascending: false })

//             if (error) throw error

//             const jobsWithCounts = data.map((job: any) => ({
//                 id: job.id,
//                 title: job.title,
//                 department: job.department,
//                 location: job.location,
//                 type: job.type,
//                 status: job.status,
//                 applicants: job.applications?.[0]?.count || 0,
//                 views: job.views,
//                 posted: new Date(job.created_at).toISOString().split("T")[0],
//                 expires: job.expires_at ? new Date(job.expires_at).toISOString().split("T")[0] : undefined,
//                 salary: job.salary || "",
//                 description: job.description,
//                 requirements: job.requirements || [],
//                 benefits: job.benefits || [],
//                 remote: job.remote,
//                 urgent: job.urgent,
//             }))

//             setJobs(jobsWithCounts)
//         } catch (error) {
//             console.error("Error fetching jobs:", error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     const addJob = async (jobData: Omit<Job, "id" | "applicants" | "views" | "posted">) => {
//         if (!user) return

//         try {
//             const { data, error } = await supabase
//                 .from("jobs")
//                 .insert({
//                     company_id: user.companyId,
//                     title: jobData.title,
//                     department: jobData.department,
//                     location: jobData.location,
//                     type: jobData.type,
//                     status: jobData.status.toLowerCase(),
//                     salary: jobData.salary,
//                     description: jobData.description,
//                     requirements: jobData.requirements,
//                     benefits: jobData.benefits,
//                     remote: jobData.remote,
//                     urgent: jobData.urgent,
//                     expires_at: jobData.expires ? new Date(jobData.expires).toISOString() : null,
//                 })
//                 .select()
//                 .single()

//             if (error) throw error

//             await refreshJobs()
//         } catch (error) {
//             console.error("Error adding job:", error)
//             throw error
//         }
//     }

//     const updateJob = async (id: string, jobData: Partial<Job>) => {
//         try {
//             const updateData: any = {}

//             if (jobData.title) updateData.title = jobData.title
//             if (jobData.department) updateData.department = jobData.department
//             if (jobData.location) updateData.location = jobData.location
//             if (jobData.type) updateData.type = jobData.type
//             if (jobData.status) updateData.status = jobData.status.toLowerCase()
//             if (jobData.salary !== undefined) updateData.salary = jobData.salary
//             if (jobData.description) updateData.description = jobData.description
//             if (jobData.requirements) updateData.requirements = jobData.requirements
//             if (jobData.benefits) updateData.benefits = jobData.benefits
//             if (jobData.remote !== undefined) updateData.remote = jobData.remote
//             if (jobData.urgent !== undefined) updateData.urgent = jobData.urgent
//             if (jobData.expires !== undefined) {
//                 updateData.expires_at = jobData.expires ? new Date(jobData.expires).toISOString() : null
//             }

//             updateData.updated_at = new Date().toISOString()

//             const { error } = await supabase.from("jobs").update(updateData).eq("id", id)

//             if (error) throw error

//             await refreshJobs()
//         } catch (error) {
//             console.error("Error updating job:", error)
//             throw error
//         }
//     }

//     const deleteJob = async (id: string) => {
//         try {
//             const { error } = await supabase.from("jobs").delete().eq("id", id)

//             if (error) throw error

//             await refreshJobs()
//         } catch (error) {
//             console.error("Error deleting job:", error)
//             throw error
//         }
//     }

//     const getJob = (id: string) => {
//         return jobs.find((job) => job.id === id)
//     }

//     return (
//         <JobsContext.Provider value={{ jobs, addJob, updateJob, deleteJob, getJob, loading, refreshJobs }}>
//             {children}
//         </JobsContext.Provider>
//     )
// }

// export function useJobs() {
//     const context = useContext(JobsContext)
//     if (context === undefined) {
//         throw new Error("useJobs must be used within a JobsProvider")
//     }
//     return context
// }
