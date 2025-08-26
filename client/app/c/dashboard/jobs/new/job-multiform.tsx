"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X, MapPin, DollarSign, FileText, Building, Users } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { api } from "@/lib/api"
import { toast } from "sonner"


const jobSchema = z.object({
    title: z.string().min(2, "Title required"),
    location: z.string().min(2, "Location required"),
    type: z.enum(["onsite", "hybrid", "remote"]),
    salary: z.string().optional(),
    duration: z.string().optional(),
    deadline: z.string().optional(),
    startDate: z.string().optional(),
    description: z.string().min(10, "Description required"),
    responsibilities: z.string().min(10, "Responsibilities required"),
    requirements: z.string().min(1, "Requirements required"),
    benefits: z.string().min(1, "Benefits required"),
    unpaid: z.boolean().optional(),
})
type JobForm = z.infer<typeof jobSchema>

export default function NewJobPage() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState(1)

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        setValue,
        watch,
        trigger,
        getValues,
    } = useForm<JobForm>({
        resolver: zodResolver(jobSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            location: "",
            type: "onsite",
            salary: "",
            duration: "",
            deadline: "",
            startDate: "",
            description: "",
            responsibilities: "",
            requirements: "",
            benefits: "",
            unpaid: false,
        },
    })


    // Fields to validate per step
    const stepFields: Array<Array<keyof JobForm>> = [
        ["title", "location", "type", "salary", "duration", "deadline", "startDate"], // Step 1
        ["description", "responsibilities"], // Step 2
        ["requirements", "benefits"], // Step 3
    ]

    const handleNext = async () => {
        const valid = await trigger(stepFields[activeTab - 1])
        if (valid) setActiveTab((curr) => Math.min(3, curr + 1))
    }

    const handlePrev = () => setActiveTab((curr) => Math.max(1, curr - 1))

    const onSubmit = async (data: JobForm) => {
        const formData = new FormData()

        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== "") {
                formData.append(key, value.toString())
            }
        })

        try {
            await api.post("/jobs/create", formData)
            toast.success("Internship listing created successfully!")
            router.push("/c/dashboard/jobs")
        } catch (error) {
            toast.error(`Failed to create a job post: ${error}`)
        }
    }

    const tabs = [
        { id: 1, label: "Basic Info", icon: FileText },
        { id: 2, label: "Job Details", icon: Building },
        { id: 3, label: "Requirements", icon: Users },
    ]

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-4xl p-6">
                <div className="grid grid-cols-1 gap-6">
                    {/* Navigation Tabs */}
                    <div>
                        <nav className="space-y-1 flex gap-3">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                        activeTab === tab.id
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted",
                                    )}
                                    disabled={activeTab !== tab.id}
                                >
                                    <tab.icon className="h-4 w-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Form Content */}
                    <div>
                        <Card>
                            {activeTab === 1 && (
                                <>
                                    <CardHeader>
                                        <CardTitle>Basic Information</CardTitle>
                                        <CardDescription>Essential details about the job position.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Title</Label>
                                            <Input id="title" {...register("title")} placeholder="e.g. Frontend Developer" />
                                            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="type">Type</Label>
                                            <Select
                                                value={watch("type")}
                                                onValueChange={val => {
                                                    setValue("type", val as JobForm["type"])
                                                    if (val === "remote") setValue("location", "remote")
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="remote" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="onsite">On-site</SelectItem>
                                                    <SelectItem value="hybrid">Hybrid</SelectItem>
                                                    <SelectItem value="remote">Remote</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.type && <p className="text-xs text-red-500">{errors.type.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="location">Location</Label>
                                            <div className="relative">
                                                <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="location"
                                                    {...register("location")}
                                                    placeholder="e.g. San Francisco, CA"
                                                    className="pl-8"
                                                    disabled={watch("type") === "remote"}
                                                    value={watch("type") === "remote" ? "remote" : watch("location")}
                                                    onChange={e => setValue("location", e.target.value)}
                                                />
                                            </div>
                                            {errors.location && <p className="text-xs text-red-500">{errors.location.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="salary">Stipend</Label>
                                            <div className="relative space-y-2">
                                                <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="salary"
                                                    {...register("salary")}
                                                    placeholder="e.g. 20,000ETB - 50,000ETB or 200ETB/day"
                                                    className="pl-8"
                                                    disabled={watch("unpaid")}
                                                    value={watch("unpaid") ? "unpaid" : watch("salary")}
                                                    onChange={e => setValue("salary", e.target.value)}
                                                />
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="unpaidcheck"
                                                        checked={watch("unpaid")}
                                                        onCheckedChange={val => {
                                                            setValue("unpaid", !!val)
                                                            if (val) setValue("salary", "unpaid")
                                                        }}
                                                    />
                                                    <label htmlFor="unpaidcheck">This is unpaid internship</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Duration</Label>
                                            <Input id="duration" {...register("duration")} type="text" placeholder="e.g. 2 Months" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Application Deadline</Label>
                                            <Input id="deadline" {...register("deadline")} type="date" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Start Date</Label>
                                            <Input id="startDate" {...register("startDate")} type="date" />
                                        </div>
                                    </CardContent>
                                </>
                            )}

                            {activeTab === 2 && (
                                <>
                                    <CardHeader>
                                        <CardTitle>Job Details</CardTitle>
                                        <CardDescription>Detailed description of the role and responsibilities.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="description">Job Description</Label>
                                            <Textarea
                                                id="description"
                                                {...register("description")}
                                                rows={6}
                                                placeholder={`E.g. We need a passionate graphic designer with personal PC and experience in Adobe, Figma, etc ... \n \n`}
                                            />
                                            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="responsibilities">Roles and Responsibilities</Label>
                                            <Textarea
                                                id="responsibilities"
                                                {...register("responsibilities")}
                                                rows={6}
                                                placeholder={`E.g.\n- Develop and maintain web applications\n- Collaborate with cross-functional teams\n- Write clean, scalable code`}
                                            />
                                            {errors.responsibilities && <p className="text-xs text-red-500">{errors.responsibilities.message}</p>}
                                        </div>
                                    </CardContent>
                                </>
                            )}

                            {activeTab === 3 && (
                                <>
                                    <CardHeader>
                                        <CardTitle>Requirements</CardTitle>
                                        <CardDescription>Skills, experience, and qualifications needed for this role.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Textarea
                                                {...register("requirements")}
                                                placeholder={`e.g.\n- Strong communication skills\n- Experience with TypeScript\n- Team player`}
                                                className="w-full"
                                                rows={8}
                                            />
                                            {errors.requirements && <p className="text-xs text-red-500">{errors.requirements.message as string}</p>}
                                        </div>
                                    </CardContent>
                                    <CardHeader>
                                        <CardTitle>Benefits & Perks</CardTitle>
                                        <CardDescription>What your company offers to employees.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Textarea
                                                {...register("benefits")}
                                                placeholder={`e.g.\n- Certificate of Completion\n- Flexible working hours\n- Networking opportunities`}
                                                className="w-full"
                                                rows={8}
                                            />
                                            {errors.benefits && <p className="text-xs text-red-500">{errors.benefits.message as string}</p>}
                                        </div>
                                    </CardContent>
                                </>
                            )}
                            <div className="flex justify-between px-8 py-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className={`${activeTab === 1 && "opacity-0"}`}
                                    onClick={handlePrev}
                                >
                                    Previous
                                </Button>
                                {activeTab < 3 ? (
                                    <Button type="button" onClick={handleNext}>
                                        Next
                                    </Button>
                                ) : (
                                    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting" : "Submit"}</Button>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </form>
    )
}
