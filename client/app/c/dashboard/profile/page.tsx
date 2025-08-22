"use client"

import { useState } from "react"
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
    logo: string
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
    const [newLocation, setNewLocation] = useState("")
    const [newValue, setNewValue] = useState("")

    // Mock company profile data - in real app this would come from API
    const [profile, setProfile] = useState<CompanyProfile>({
        name: user?.company || "TechCorp Inc.",
        industry: "Technology",
        description:
            "We are a leading technology company focused on innovation and excellence. Our team is dedicated to creating cutting-edge solutions that make a difference in the world.",
        size: "51-200 employees",
        year: 2020,
        contactEmail: user?.email || "hr@techcorp.com",
        phone: "+1 (555) 123-4567",
        website: "https://techcorp.com",
        headQuarter: "San Francisco, CA",
        additionalLocations: ["New York, NY", "Austin, TX"],
        values: ["Innovation", "Collaboration", "Integrity", "Excellence"],
        logo: "/placeholder.svg?height=100&width=100&text=TC",
    })

    // Calculate profile completion percentage
    const calculateCompletion = () => {
        const fields = [
            profile.name,
            profile.industry,
            profile.description,
            profile.size,
            profile.year,
            profile.contactEmail,
            profile.phone,
            profile.website,
            profile.headQuarter,
            profile.logo,
        ]

        const filledFields = fields.filter((field) => field && field.toString().trim() !== "").length
        const additionalPoints = (profile.additionalLocations.length > 0 ? 1 : 0) + (profile.values.length > 0 ? 1 : 0)

        return Math.round(((filledFields + additionalPoints) / (fields.length + 2)) * 100)
    }

    const completionPercentage = calculateCompletion()

    const handleSave = async () => {
        setIsSaving(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsEditing(false)
        setIsSaving(false)
        toast.success(
            <div>
                <h3 className="font-semibold">Profile Updated</h3>
                <p>Your company profile has been successfully updated.</p>
            </div>
        )
    }

    const addLocation = () => {
        if (newLocation.trim() && !profile.additionalLocations.includes(newLocation.trim())) {
            setProfile((prev) => ({
                ...prev,
                additionalLocations: [...prev.additionalLocations, newLocation.trim()],
            }))
            setNewLocation("")
        }
    }

    const removeLocation = (location: string) => {
        setProfile((prev) => ({
            ...prev,
            additionalLocations: prev.additionalLocations.filter((loc) => loc !== location),
        }))
    }

    const addValue = () => {
        if (newValue.trim() && !profile.values.includes(newValue.trim())) {
            setProfile((prev) => ({
                ...prev,
                values: [...prev.values, newValue.trim()],
            }))
            setNewValue("")
        }
    }

    const removeValue = (value: string) => {
        setProfile((prev) => ({
            ...prev,
            values: prev.values.filter((val) => val !== value),
        }))
    }

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

    // if (!user) {
    //     return (
    //         <div className="flex items-center justify-center min-h-screen">
    //             <Card className="w-full max-w-md">
    //                 <CardHeader>
    //                     <CardTitle>Access Denied</CardTitle>
    //                     <CardDescription>Please log in to access your profile.</CardDescription>
    //                 </CardHeader>
    //             </Card>
    //         </div>
    //     )
    // }

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
                            <Button variant="outline" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave} disabled={isSaving}>
                                <Save className="mr-2 h-4 w-4" />
                                {isSaving ? "Saving..." : "Save Changes"}
                            </Button>
                        </>
                    ) : (
                        <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
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
                                    src={profile.logo || "/placeholder.svg"}
                                    alt="Company Logo"
                                    className="h-16 w-16 rounded-lg border object-cover"
                                />
                                {isEditing && (
                                    <Button variant="outline" size="sm">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload Logo
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Company Name</Label>
                            <Input
                                id="name"
                                value={profile.name}
                                onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="industry">Industry</Label>
                            <Select
                                value={profile.industry}
                                onValueChange={(value) => setProfile((prev) => ({ ...prev, industry: value }))}
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
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="size">Company Size</Label>
                            <Select
                                value={profile.size}
                                onValueChange={(value) => setProfile((prev) => ({ ...prev, size: value }))}
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
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="year">Founded Year</Label>
                            <Input
                                id="year"
                                type="number"
                                value={profile.year || ""}
                                onChange={(e) => setProfile((prev) => ({ ...prev, year: Number.parseInt(e.target.value) || null }))}
                                disabled={!isEditing}
                                placeholder="e.g., 2020"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Company Description</Label>
                            <Textarea
                                id="description"
                                value={profile.description}
                                onChange={(e) => setProfile((prev) => ({ ...prev, description: e.target.value }))}
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
                                value={profile.contactEmail}
                                onChange={(e) => setProfile((prev) => ({ ...prev, contactEmail: e.target.value }))}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                value={profile.phone}
                                onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                                id="website"
                                value={profile.website}
                                onChange={(e) => setProfile((prev) => ({ ...prev, website: e.target.value }))}
                                disabled={!isEditing}
                                placeholder="https://yourcompany.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="headquarters">Headquarters</Label>
                            <Input
                                id="headquarters"
                                value={profile.headQuarter}
                                onChange={(e) => setProfile((prev) => ({ ...prev, headQuarter: e.target.value }))}
                                disabled={!isEditing}
                                placeholder="City, State/Country"
                            />
                        </div>

                        {/* Additional Locations */}
                        <div className="space-y-2">
                            <Label>Additional Locations</Label>
                            <div className="space-y-2">
                                {profile.additionalLocations.map((location) => (
                                    <div key={location} className="flex items-center gap-2">
                                        <Badge variant="secondary" className="flex items-center gap-1">
                                            <MapPin className="h-3 w-3" />
                                            {location}
                                            {isEditing && (
                                                <button onClick={() => removeLocation(location)} className="ml-1 hover:text-red-500">
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
                                            onKeyPress={(e) => e.key === "Enter" && addLocation()}
                                        />
                                        <Button size="sm" onClick={addLocation}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

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
                            {profile.values.map((value) => (
                                <Badge key={value} variant="outline" className="flex items-center gap-1">
                                    {value}
                                    {isEditing && (
                                        <button onClick={() => removeValue(value)} className="ml-1 hover:text-red-500">
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
                                    onKeyPress={(e) => e.key === "Enter" && addValue()}
                                />
                                <Button size="sm" onClick={addValue}>
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
                                src={profile.logo || "/placeholder.svg"}
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
                            {profile.values.map((value) => (
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
