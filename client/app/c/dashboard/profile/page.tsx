"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Building2, MapPin, Phone, Mail, Globe, Users, Calendar, Award, Plus, X, Save, Upload } from "lucide-react"
import { toast } from "sonner"
import { useForm, Controller } from "react-hook-form"
import { api } from "@/lib/api"

interface CompanyProfile {
    name: string
    industry: string
    description: string
    size: string
    year: number | null
    contactEmail: string
    phone: string
    website: string
    headQuarter: string
    additionalLocations: string[]
    values: string[]
    image: string
}

const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Consulting",
    "Media",
    "Real Estate",
    "Other",
]

const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees",
]

export default function ProfilePage() {
    const { user } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [fetchError, setFetchError] = useState<string | null>(null)
    const [apiError, setApiError] = useState<string | null>(null)
    const [newLocation, setNewLocation] = useState("")
    const [newValue, setNewValue] = useState("")
    const [profile, setProfile] = useState<CompanyProfile | null>(null)
    const [imagePreview, setImagePreview] = useState<string>("")
    const imageFileRef = useRef<File | null>(null)

    const { register, handleSubmit, control, reset, watch, setValue } = useForm<CompanyProfile>({
        defaultValues: undefined,
    })

    // Fetch company profile from API
    useEffect(() => {
        const fetchCompanyInfo = async () => {
            setIsLoading(true)
            setFetchError(null)
            try {
                const res = await api.get("/company")
                let data = res.data
                // Parse additionalLocations and values as arrays
                data.additionalLocations = parseStringOrArray(data.additionalLocations)
                data.values = parseStringOrArray(data.values)
                setProfile(data)
                setImagePreview(data.image || "")
                reset(data)
            } catch {
                setFetchError("Failed to load company profile.")
            } finally {
                setIsLoading(false)
            }
        }
        fetchCompanyInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Keep form in sync with profile when not editing
    useEffect(() => {
        if (profile && !isEditing) {
            reset(profile)
            setImagePreview(profile.image || "")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile, isEditing])

    // Helper: parse stringified array or array or fallback
    function parseStringOrArray(val: any): string[] {
        if (Array.isArray(val)) return val
        if (typeof val === "string") {
            try {
                const parsed = JSON.parse(val)
                if (Array.isArray(parsed)) return parsed
            } catch {
                // fallback to comma split
                return val.split(",").map((s: string) => s.trim()).filter(Boolean)
            }
        }
        return []
    }

    // Profile completion
    const calculateCompletion = () => {
        if (!profile) return 0
        const fields = [
            watch("name"),
            watch("industry"),
            watch("description"),
            watch("size"),
            watch("year"),
            watch("contactEmail"),
            watch("phone"),
            watch("website"),
            watch("headQuarter"),
            imagePreview,
        ]
        const filledFields = fields.filter((field) => field && field.toString().trim() !== "").length
        return Math.round(((filledFields) / (fields.length + 2)) * 100)
    }
    const completionPercentage = calculateCompletion()
    const getCompletionColor = () => {
        if (completionPercentage >= 80) return "text-green-600"
        if (completionPercentage >= 60) return "text-yellow-600"
        return "text-red-600"
    }
    const getCompletionMessage = () => {
        if (completionPercentage >= 80) return "Great! Your profile is almost complete."
        if (completionPercentage >= 60) return "Good progress! Add more details to improve your profile."
        return "Your profile needs more information to attract top talent."
    }

    // Add/Remove locations and values
    const addLocation = () => {
        if (!profile) return
        const loc = newLocation.trim()
        if (loc && !profile.additionalLocations.includes(loc)) {
            const updated = { ...profile, additionalLocations: [...profile.additionalLocations, loc] }
            setProfile(updated)
            setNewLocation("")
            if (isEditing) reset(updated)
        }
    }
    const removeLocation = (location: string) => {
        if (!profile) return
        const updated = { ...profile, additionalLocations: profile.additionalLocations.filter((loc) => loc !== location) }
        setProfile(updated)
        if (isEditing) reset(updated)
    }
    const addValue = () => {
        if (!profile) return
        const val = newValue.trim()
        if (val && !profile.values.includes(val)) {
            const updated = { ...profile, values: [...profile.values, val] }
            setProfile(updated)
            setNewValue("")
            if (isEditing) reset(updated)
        }
    }
    const removeValue = (value: string) => {
        if (!profile) return
        const updated = { ...profile, values: profile.values.filter((val) => val !== value) }
        setProfile(updated)
        if (isEditing) reset(updated)
    }

    // Handle image preview and file selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            imageFileRef.current = file
            const url = URL.createObjectURL(file)
            setImagePreview(url)
            setValue("image", url)
        }
    }

    // Form submit handler
    const onSubmit = async (data: CompanyProfile) => {
        setIsSaving(true)
        setApiError(null)
        try {
            const formData = new FormData()
            // Append all fields to FormData
            Object.entries(data).forEach(([key, value]) => {
                if (key === "additionalLocations" || key === "values") {
                    formData.append(key, JSON.stringify(profile?.[key] || []))
                } else if (key !== "image") {
                    formData.append(key, value == null ? "" : value as any)
                }
            })
            // Append image file if selected, otherwise append image URL if present
            if (imageFileRef.current) {
                formData.append("image", imageFileRef.current)
            } else if (profile?.image) {
                formData.append("image", profile.image)
            }
            await api.post("/company/update", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            setProfile({
                ...data,
                image: imageFileRef.current
                    ? imagePreview
                    : profile?.image || "",
                additionalLocations: profile?.additionalLocations || [],
                values: profile?.values || [],
            })
            setIsEditing(false)
            imageFileRef.current = null
            toast.success(
                <div>
                    <h3 className="font-semibold">Profile Updated</h3>
                    <p>Your company profile has been successfully updated.</p>
                </div>
            )
        } catch (err: any) {
            setApiError("Failed to update profile. Please try again.")
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span>Loading company profile...</span>
            </div>
        )
    }
    if (fetchError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Error</CardTitle>
                        <CardDescription>{fetchError}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }
    if (!profile) return null

    // ...existing code for rendering...
    return (
        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Company Profile</h1>
                    <p className="text-muted-foreground">Manage your company information and settings</p>
                </div>
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <Button variant="outline" type="button" onClick={() => { setIsEditing(false); reset(profile); setImagePreview(profile.image || "") }} disabled={isSaving}>
                                Cancel
                            </Button>
                            <Button type="submit" onClick={handleSubmit(onSubmit)} disabled={isSaving}>
                                <Save className="mr-2 h-4 w-4" />
                                {isSaving ? "Saving..." : "Save Changes"}
                            </Button>
                        </>
                    ) : (
                        <Button type="button" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                    )}
                </div>
            </div>

            {/* Profile Completion */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Profile Completion
                    </CardTitle>
                    <CardDescription>Complete your profile to attract more candidates</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Progress</span>
                            <span className={`text-sm font-bold ${getCompletionColor()}`}>{completionPercentage}%</span>
                        </div>
                        <Progress value={completionPercentage} className="h-2" />
                        <p className={`text-sm ${getCompletionColor()}`}>{getCompletionMessage()}</p>
                    </div>
                </CardContent>
            </Card>

            <form onSubmit={handleSubmit(onSubmit)} className="contents">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="h-5 w-5" />
                                Basic Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Company Logo */}
                            <div className="space-y-2">
                                <Label>Company Logo</Label>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={imagePreview || "/placeholder.svg"}
                                        alt="Company Logo"
                                        className="h-16 w-16 rounded-lg border object-cover"
                                    />
                                    {isEditing && (
                                        <Button variant="outline" size="sm" className="relative" type="button">
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload image
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={handleImageChange}
                                            />
                                        </Button>
                                    )}
                                </div>
                            </div>
                            {/* ...existing code for other fields... */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Company Name</Label>
                                <Input
                                    id="name"
                                    {...register("name")}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="industry">Industry</Label>
                                <Controller
                                    control={control}
                                    name="industry"
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            disabled={!isEditing}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {industries.map((industry) => (
                                                    <SelectItem key={industry} value={industry}>
                                                        {industry}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="size">Company Size</Label>
                                <Controller
                                    control={control}
                                    name="size"
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            disabled={!isEditing}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {companySizes.map((size) => (
                                                    <SelectItem key={size} value={size}>
                                                        {size}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="year">Founded Year</Label>
                                <Input
                                    id="year"
                                    type="number"
                                    {...register("year", {
                                        setValueAs: v => v === "" ? null : Number.parseInt(v)
                                    })}
                                    disabled={!isEditing}
                                    placeholder="e.g., 2020"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Company Description</Label>
                                <Textarea
                                    id="description"
                                    {...register("description")}
                                    disabled={!isEditing}
                                    rows={4}
                                    placeholder="Tell us about your company..."
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Phone className="h-5 w-5" />
                                Contact Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Contact Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    {...register("contactEmail")}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    {...register("phone")}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="website">Website</Label>
                                <Input
                                    id="website"
                                    {...register("website")}
                                    disabled={!isEditing}
                                    placeholder="https://yourcompany.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="headquarters">Headquarters</Label>
                                <Input
                                    id="headquarters"
                                    {...register("headQuarter")}
                                    disabled={!isEditing}
                                    placeholder="City, State/Country"
                                />
                            </div>
                            {/* Additional Locations */}
                            <div className="space-y-2">
                                <Label>Additional Locations</Label>
                                <div className="space-y-2">
                                    {profile.additionalLocations?.map((location) => (
                                        <div key={location} className="flex items-center gap-2">
                                            <Badge variant="secondary" className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3" />
                                                {location}
                                                {isEditing && (
                                                    <button type="button" onClick={() => removeLocation(location)} className="ml-1 hover:text-red-500">
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                )}
                                            </Badge>
                                        </div>
                                    ))}
                                    {isEditing && (
                                        <div className="flex gap-2">
                                            <Input
                                                value={newLocation}
                                                onChange={(e) => setNewLocation(e.target.value)}
                                                placeholder="Add location..."
                                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLocation())}
                                            />
                                            <Button size="sm" type="button" onClick={addLocation}>
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {apiError && (
                    <div className="text-red-600 text-sm mt-2">{apiError}</div>
                )}
            </form>

            {/* Company Values */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Company Values
                    </CardTitle>
                    <CardDescription>Share the core values that drive your company culture</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {profile.values?.map((value) => (
                                <Badge key={value} variant="outline" className="flex items-center gap-1">
                                    {value}
                                    {isEditing && (
                                        <button type="button" onClick={() => removeValue(value)} className="ml-1 hover:text-red-500">
                                            <X className="h-3 w-3" />
                                        </button>
                                    )}
                                </Badge>
                            ))}
                        </div>
                        {isEditing && (
                            <div className="flex gap-2">
                                <Input
                                    value={newValue}
                                    onChange={(e) => setNewValue(e.target.value)}
                                    placeholder="Add company value..."
                                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addValue())}
                                />
                                <Button size="sm" type="button" onClick={addValue}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Profile Preview */}
            <Card>
                <CardHeader>
                    <CardTitle>Profile Preview</CardTitle>
                    <CardDescription>This is how your company profile appears to job seekers</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <img
                                src={profile.image || "/placeholder.svg"}
                                alt={profile.name}
                                className="h-16 w-16 rounded-lg border object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold">{profile.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                    <span className="flex items-center gap-1">
                                        <Building2 className="h-4 w-4" />
                                        {profile.industry}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        {profile.size}
                                    </span>
                                    {profile.year && (
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            Founded {profile.year}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground">{profile.description}</p>

                        <div className="flex flex-wrap gap-2">
                            {profile.values?.map((value) => (
                                <Badge key={value} variant="secondary">
                                    {value}
                                </Badge>
                            ))}
                        </div>

                        <Separator />

                        <div className="grid gap-2 text-sm">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{profile.headQuarter}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{profile.contactEmail}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                <a href={profile.website} className="text-blue-600 hover:underline">
                                    {profile.website}
                                </a>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
