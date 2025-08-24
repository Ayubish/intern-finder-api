"use client"

import { useState } from "react"
import { useIntern } from "@/contexts/intern-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, GraduationCap, ExternalLink, Plus, X, Save, ArrowLeft, Upload, Github, Linkedin } from "lucide-react"
import Link from "next/link"

export default function InternProfile() {
    const { user, updateProfile, loading } = useIntern()
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState(user || {})
    const [newSkill, setNewSkill] = useState("")

    if (loading || !user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Loading your profile...</p>
                </div>
            </div>
        )
    }

    const handleSave = () => {
        updateProfile(formData)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setFormData(user)
        setIsEditing(false)
    }

    const addSkill = () => {
        if (newSkill.trim() && !formData.skills?.includes(newSkill.trim())) {
            setFormData({
                ...formData,
                skills: [...(formData.skills || []), newSkill.trim()],
            })
            setNewSkill("")
        }
    }

    const removeSkill = (skillToRemove: string) => {
        setFormData({
            ...formData,
            skills: formData.skills?.filter((skill) => skill !== skillToRemove) || [],
        })
    }

    const getCompletionColor = (percentage: number) => {
        if (percentage >= 80) return "text-green-600"
        if (percentage >= 60) return "text-yellow-600"
        return "text-red-600"
    }

    const getCompletionMessage = (percentage: number) => {
        if (percentage >= 90) return "Excellent! Your profile is very strong."
        if (percentage >= 80) return "Great! Your profile looks good."
        if (percentage >= 60) return "Good progress! Add more details to improve."
        return "Your profile needs more information to attract employers."
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/intern-dashboard">
                                <Button variant="ghost" size="sm">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Dashboard
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold">My Profile</h1>
                                <p className="text-muted-foreground">Manage your profile information</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {isEditing ? (
                                <>
                                    <Button variant="outline" onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSave}>
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Changes
                                    </Button>
                                </>
                            ) : (
                                <Button onClick={() => setIsEditing(true)}>
                                    <User className="h-4 w-4 mr-2" />
                                    Edit Profile
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Profile Completion */}
                    <div className="lg:col-span-1">
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Profile Strength</CardTitle>
                                <CardDescription>Complete your profile to increase visibility</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <div className={`text-3xl font-bold ${getCompletionColor(user.profileCompletion)}`}>
                                            {user.profileCompletion}%
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">{getCompletionMessage(user.profileCompletion)}</p>
                                    </div>
                                    <Progress value={user.profileCompletion} className="h-3" />
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center justify-between">
                                            <span>Basic Information</span>
                                            <span className="text-green-600">✓</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Resume</span>
                                            <span className={user.resume ? "text-green-600" : "text-red-600"}>{user.resume ? "✓" : "✗"}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Portfolio</span>
                                            <span className={user.portfolio ? "text-green-600" : "text-red-600"}>
                                                {user.portfolio ? "✓" : "✗"}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>LinkedIn Profile</span>
                                            <span className={user.linkedin ? "text-green-600" : "text-red-600"}>
                                                {user.linkedin ? "✓" : "✗"}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Skills ({user.skills.length})</span>
                                            <span className={user.skills.length > 0 ? "text-green-600" : "text-red-600"}>
                                                {user.skills.length > 0 ? "✓" : "✗"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Profile Preview */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Preview</CardTitle>
                                <CardDescription>How employers see your profile</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center space-y-4">
                                    <Avatar className="h-20 w-20 mx-auto">
                                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                        <AvatarFallback className="text-lg">
                                            {user.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold text-lg">{user.name}</h3>
                                        <p className="text-muted-foreground">
                                            {user.major} Student at {user.university}
                                        </p>
                                        <p className="text-sm text-muted-foreground">Class of {user.graduationYear}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-1 justify-center">
                                        {user.skills.slice(0, 3).map((skill, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                        {user.skills.length > 3 && (
                                            <Badge variant="secondary" className="text-xs">
                                                +{user.skills.length - 3} more
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Profile Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Basic Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={formData.name || ""}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email || ""}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            value={formData.phone || ""}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="graduationYear">Graduation Year</Label>
                                        <Input
                                            id="graduationYear"
                                            value={formData.graduationYear || ""}
                                            onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Education */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5" />
                                    Education
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="university">University</Label>
                                        <Input
                                            id="university"
                                            value={formData.university || ""}
                                            onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="major">Major</Label>
                                        <Input
                                            id="major"
                                            value={formData.major || ""}
                                            onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="gpa">GPA</Label>
                                        <Input
                                            id="gpa"
                                            value={formData.gpa || ""}
                                            onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Bio */}
                        <Card>
                            <CardHeader>
                                <CardTitle>About Me</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    rows={4}
                                    value={formData.bio || ""}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    disabled={!isEditing}
                                    placeholder="Tell employers about yourself, your interests, and career goals..."
                                />
                            </CardContent>
                        </Card>

                        {/* Skills */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Skills</CardTitle>
                                <CardDescription>Add your technical and soft skills</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {formData.skills?.map((skill, index) => (
                                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                                {skill}
                                                {isEditing && (
                                                    <button onClick={() => removeSkill(skill)} className="ml-1 hover:text-red-600">
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                )}
                                            </Badge>
                                        ))}
                                    </div>
                                    {isEditing && (
                                        <div className="flex gap-2">
                                            <Input
                                                value={newSkill}
                                                onChange={(e) => setNewSkill(e.target.value)}
                                                placeholder="Add a skill"
                                                onKeyPress={(e) => e.key === "Enter" && addSkill()}
                                            />
                                            <Button onClick={addSkill} size="sm">
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Links & Documents */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Links & Documents</CardTitle>
                                <CardDescription>Add your resume, portfolio, and social profiles</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="resume">Resume</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="resume"
                                            value={formData.resume || ""}
                                            onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="Resume filename or URL"
                                        />
                                        {isEditing && (
                                            <Button variant="outline" size="sm">
                                                <Upload className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="portfolio">Portfolio</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="portfolio"
                                            value={formData.portfolio || ""}
                                            onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="https://your-portfolio.com"
                                        />
                                        {formData.portfolio && !isEditing && (
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={formData.portfolio} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="h-4 w-4" />
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="linkedin">LinkedIn</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="linkedin"
                                            value={formData.linkedin || ""}
                                            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="https://linkedin.com/in/yourprofile"
                                        />
                                        {formData.linkedin && !isEditing && (
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={formData.linkedin} target="_blank" rel="noopener noreferrer">
                                                    <Linkedin className="h-4 w-4" />
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="github">GitHub</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="github"
                                            value={formData.github || ""}
                                            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="https://github.com/yourusername"
                                        />
                                        {formData.github && !isEditing && (
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={formData.github} target="_blank" rel="noopener noreferrer">
                                                    <Github className="h-4 w-4" />
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
