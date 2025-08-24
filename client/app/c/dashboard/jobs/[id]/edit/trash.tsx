"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useJobs } from "@/contexts/jobs-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Plus, X, MapPin, DollarSign, FileText, Building, Users, Settings, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditJobPage() {
    const router = useRouter()
    const { jobs, updateJob, getJob } = useJobs()
    const [activeTab, setActiveTab] = useState("basic")
    const [job, setJob] = useState<any>(null)
    const [formData, setFormData] = useState({
        title: "",
        department: "",
        location: "",
        type: "Full-time",
        salary: "",
        description: "",
        requirements: [""],
        benefits: [""],
        remote: false,
        urgent: false,
        status: "Draft" as const,
    })

    const params = useParams()
    useEffect(() => {
        if (params.id) {
            const foundJob = getJob(params.id as string)
            if (foundJob) {
                setJob(foundJob)
                setFormData({
                    title: foundJob.title,
                    department: foundJob.department,
                    location: foundJob.location,
                    type: foundJob.type,
                    salary: foundJob.salary,
                    description: foundJob.description,
                    requirements: foundJob.requirements.length > 0 ? foundJob.requirements : [""],
                    benefits: foundJob.benefits.length > 0 ? foundJob.benefits : [""],
                    remote: foundJob.remote,
                    urgent: foundJob.urgent,
                    status: foundJob.status,
                })
            }
        }
    }, [params.id, getJob])

    const addRequirement = () => {
        setFormData({
            ...formData,
            requirements: [...formData.requirements, ""],
        })
    }

    const removeRequirement = (index: number) => {
        setFormData({
            ...formData,
            requirements: formData.requirements.filter((_, i) => i !== index),
        })
    }

    const updateRequirement = (index: number, value: string) => {
        const newRequirements = [...formData.requirements]
        newRequirements[index] = valuegfdnfdjjtgrrg
        setFormData({
            ...formData,
            requirements: newRequirements,
        })
    }

    const addBenefit = () => {
        setFormData({
            ...formData,
            benefits: [...formData.benefits, ""],
        })
    }

    const removeBenefit = (index: number) => {
        setFormData({
            ...formData,
            benefits: formData.benefits.filter((_, i) => i !== index),
        })
    }

    const updateBenefit = (index: number, value: string) => {
        const newBenefits = [...formData.benefits]
        newBenefits[index] = value
        setFormData({
            ...formData,
            benefits: newBenefits,
        })
    }

    const handleSubmit = (status?: "Draft" | "Active") => {
        if (!job) return

        const jobData = {
            ...formData,
            status: status || formData.status,
            requirements: formData.requirements.filter((req) => req.trim() !== ""),
            benefits: formData.benefits.filter((benefit) => benefit.trim() !== ""),
        }

        updateJob(job.id, jobData)
        router.push("/dashboard/jobs")
    }

    const tabs = [
        { id: "basic", label: "Basic Info", icon: FileText },
        { id: "details", label: "Job Details", icon: Building },
        { id: "requirements", label: "Requirements", icon: Users },
        { id: "settings", label: "Settings", icon: Settings },
    ]

    if (!job) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Job Not Found</CardTitle>
                        <CardDescription>The job listing you're looking for doesn't exist.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/dashboard/jobs">
                            <Button className="w-full">Back to Jobs</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/jobs">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Jobs
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Edit Job Listing</h1>
                        <p className="text-muted-foreground">Update the details for "{job.title}"</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleSubmit("Draft")}>
                        Save as Draft
                    </Button>
                    <Button onClick={() => handleSubmit("Active")}>
                        {job.status === "Active" ? "Update Job" : "Publish Job"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Navigation Tabs */}
                <div className="lg:col-span-1">
                    <nav className="space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                    activeTab === tab.id
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                                )}
                            >
                                <tab.icon className="h-4 w-4" />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Form Content - Same as create form but with pre-filled data */}
                <div className="lg:col-span-3">
                    {activeTab === "basic" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                                <CardDescription>Essential details about the job position.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Job Title *</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="e.g. Senior Frontend Developer"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Department *</Label>
                                        <Select
                                            value={formData.department}
                                            onValueChange={(value) => setFormData({ ...formData, department: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select department" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Engineering">Engineering</SelectItem>
                                                <SelectItem value="Design">Design</SelectItem>
                                                <SelectItem value="Product">Product</SelectItem>
                                                <SelectItem value="Marketing">Marketing</SelectItem>
                                                <SelectItem value="Sales">Sales</SelectItem>
                                                <SelectItem value="Analytics">Analytics</SelectItem>
                                                <SelectItem value="HR">Human Resources</SelectItem>
                                                <SelectItem value="Finance">Finance</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="location">Location *</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="location"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                placeholder="e.g. San Francisco, CA"
                                                className="pl-8"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="type">Employment Type *</Label>
                                        <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Full-time">Full-time</SelectItem>
                                                <SelectItem value="Part-time">Part-time</SelectItem>
                                                <SelectItem value="Contract">Contract</SelectItem>
                                                <SelectItem value="Internship">Internship</SelectItem>
                                                <SelectItem value="Freelance">Freelance</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="salary">Salary Range</Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="salary"
                                            value={formData.salary}
                                            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                            placeholder="e.g. $120,000 - $150,000 or $25/hour"
                                            className="pl-8"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="remote"
                                            checked={formData.remote}
                                            onCheckedChange={(checked) => setFormData({ ...formData, remote: checked })}
                                        />
                                        <Label htmlFor="remote">Remote work available</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="urgent"
                                            checked={formData.urgent}
                                            onCheckedChange={(checked) => setFormData({ ...formData, urgent: checked })}
                                        />
                                        <Label htmlFor="urgent">Urgent hiring</Label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "details" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Job Details</CardTitle>
                                <CardDescription>Detailed description of the role and responsibilities.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="description">Job Description *</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                                        rows={8}
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Tip: Include information about the team, projects, and growth opportunities.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "requirements" && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Requirements</CardTitle>
                                    <CardDescription>Skills, experience, and qualifications needed for this role.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {formData.requirements.map((requirement, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                value={requirement}
                                                onChange={(e) => updateRequirement(index, e.target.value)}
                                                placeholder="e.g. 5+ years of React experience"
                                                className="flex-1"
                                            />
                                            {formData.requirements.length > 1 && (
                                                <Button type="button" variant="outline" size="icon" onClick={() => removeRequirement(index)}>
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" onClick={addRequirement} className="w-full bg-transparent">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Requirement
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Benefits & Perks</CardTitle>
                                    <CardDescription>What your company offers to employees.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {formData.benefits.map((benefit, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                value={benefit}
                                                onChange={(e) => updateBenefit(index, e.target.value)}
                                                placeholder="e.g. Health insurance, 401k matching"
                                                className="flex-1"
                                            />
                                            {formData.benefits.length > 1 && (
                                                <Button type="button" variant="outline" size="icon" onClick={() => removeBenefit(index)}>
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" onClick={addBenefit} className="w-full bg-transparent">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Benefit
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === "settings" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Job Settings</CardTitle>
                                <CardDescription>Configure how and when this job listing is displayed.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h4 className="font-medium">Visibility Settings</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label>Show salary range</Label>
                                                <p className="text-sm text-muted-foreground">Display salary information to candidates</p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label>Allow external applications</Label>
                                                <p className="text-sm text-muted-foreground">Accept applications from job boards</p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h4 className="font-medium">Notification Settings</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label>Email on new applications</Label>
                                                <p className="text-sm text-muted-foreground">Get notified when someone applies</p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label>Weekly application summary</Label>
                                                <p className="text-sm text-muted-foreground">Receive weekly reports</p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
