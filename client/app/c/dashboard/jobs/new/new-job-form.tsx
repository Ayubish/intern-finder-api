"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { useForm } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"

export function NewJobForm() {
    const { register, handleSubmit } = useForm();


    return (
        <div className="max-w-4xl mx-auto my-5">
            <form>
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>Essential details about the job position.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 grid grid-cols-2 gap-x-5">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g. Frontend Developer"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salary">Stipend</Label>
                            <div className="relative space-y-2">
                                <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="salary"
                                    placeholder="e.g. 20,000ETB - 50,000ETB or 200ETB / day"
                                    className="pl-8"
                                />
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="unpaidcheck" />
                                    <label htmlFor="unpaidcheck">This is unpaid internship</label>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="department">Type</Label>
                            <Select

                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="on-site">On-site</SelectItem>
                                    <SelectItem value="remote">Fully Remote</SelectItem>
                                    <SelectItem value="hybrid">Hybrid</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location *</Label>
                            <div className="relative">
                                <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="location"

                                    placeholder="e.g. San Francisco, CA"
                                    className="pl-8"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="type">Employment Type *</Label>
                            <Select>
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



                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="remote"

                                />
                                <Label htmlFor="remote">Remote work available</Label>
                            </div>

                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Job Description *</Label>
                            <Textarea
                                id="description"
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
            </form>

        </div>
    )
}