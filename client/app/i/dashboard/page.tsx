"use client"
import { useIntern } from "@/contexts/intern-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Briefcase, BookmarkIcon, TrendingUp, Calendar, MapPin, DollarSign, Bell, Search } from "lucide-react"
import Link from "next/link"

const getStatusColor = (status: string) => {
    switch (status) {
        case "accepted":
            return "bg-green-100 text-green-800"
        case "interview":
            return "bg-blue-100 text-blue-800"
        case "reviewing":
            return "bg-yellow-100 text-yellow-800"
        case "pending":
            return "bg-gray-100 text-gray-800"
        case "rejected":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

const getStatusText = (status: string) => {
    switch (status) {
        case "accepted":
            return "Accepted"
        case "interview":
            return "Interview Scheduled"
        case "reviewing":
            return "Under Review"
        case "pending":
            return "Pending"
        case "rejected":
            return "Rejected"
        default:
            return status
    }
}

export default function InternDashboard() {
    const { user, applications, savedInternships, loading } = useIntern()

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Loading your dashboard...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Access Denied</CardTitle>
                        <CardDescription>Please log in to access your dashboard.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/internships">
                            <Button className="w-full">Browse Internships</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const recentApplications = applications.slice(0, 3)
    const recentSaved = savedInternships.slice(0, 3)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                <AvatarFallback>
                                    {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-2xl font-bold">Welcome back, {user.name.split(" ")[0]}!</h1>
                                <p className="text-muted-foreground">
                                    {user.university} • {user.major}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <Bell className="h-4 w-4 mr-2" />
                                Notifications
                            </Button>
                            <Link href="/intern-dashboard/profile">
                                <Button size="sm">
                                    <User className="h-4 w-4 mr-2" />
                                    Profile
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Profile Completion Alert */}
                {user.profileCompletion < 100 && (
                    <Card className="mb-6 border-orange-200 bg-orange-50">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                                        <User className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-orange-900">Complete Your Profile</h3>
                                        <p className="text-orange-700">
                                            Your profile is {user.profileCompletion}% complete. Complete it to increase your chances of
                                            getting hired!
                                        </p>
                                    </div>
                                </div>
                                <Link href="/intern-dashboard/profile">
                                    <Button
                                        variant="outline"
                                        className="border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
                                    >
                                        Complete Profile
                                    </Button>
                                </Link>
                            </div>
                            <Progress value={user.profileCompletion} className="mt-4 h-2" />
                        </CardContent>
                    </Card>
                )}

                {/* Stats Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{applications.length}</div>
                            <p className="text-xs text-muted-foreground">+2 this week</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {applications.filter((app) => app.status === "interview").length}
                            </div>
                            <p className="text-xs text-muted-foreground">Scheduled</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Saved Internships</CardTitle>
                            <BookmarkIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{savedInternships.length}</div>
                            <p className="text-xs text-muted-foreground">For later</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Profile Score</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{user.profileCompletion}%</div>
                            <p className="text-xs text-muted-foreground">Completion rate</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Recent Applications */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Recent Applications</CardTitle>
                                    <CardDescription>Your latest internship applications</CardDescription>
                                </div>
                                <Link href="/intern-dashboard/applications">
                                    <Button variant="outline" size="sm">
                                        View All
                                    </Button>
                                </Link>
                            </CardHeader>
                            <CardContent>
                                {recentApplications.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentApplications.map((application) => (
                                            <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={application.companyLogo || "/placeholder.svg"}
                                                        alt={application.companyName}
                                                        className="h-12 w-12 rounded-lg"
                                                    />
                                                    <div>
                                                        <h4 className="font-semibold">{application.internshipTitle}</h4>
                                                        <p className="text-sm text-muted-foreground">{application.companyName}</p>
                                                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                                                            <div className="flex items-center gap-1">
                                                                <MapPin className="h-3 w-3" />
                                                                {application.location}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <DollarSign className="h-3 w-3" />
                                                                {application.salary}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <Badge className={getStatusColor(application.status)}>
                                                        {getStatusText(application.status)}
                                                    </Badge>
                                                    <p className="text-xs text-muted-foreground mt-1">Applied {application.appliedDate}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                        <h3 className="text-lg font-semibold mb-2">No applications yet</h3>
                                        <p className="text-muted-foreground mb-4">Start applying to internships to see them here</p>
                                        <Link href="/internships">
                                            <Button>
                                                <Search className="mr-2 h-4 w-4" />
                                                Browse Internships
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href="/internships">
                                    <Button className="w-full justify-start">
                                        <Search className="mr-2 h-4 w-4" />
                                        Browse Internships
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Saved Internships */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Saved Internships</CardTitle>
                                    <CardDescription>Your bookmarked opportunities</CardDescription>
                                </div>
                                <Link href="/intern-dashboard/saved">
                                    <Button variant="outline" size="sm">
                                        View All
                                    </Button>
                                </Link>
                            </CardHeader>
                            <CardContent>
                                {recentSaved.length > 0 ? (
                                    <div className="space-y-3">
                                        {recentSaved.map((saved) => (
                                            <div key={saved.id} className="flex items-center gap-3 p-3 border rounded-lg">
                                                <img
                                                    src={saved.companyLogo || "/placeholder.svg"}
                                                    alt={saved.companyName}
                                                    className="h-8 w-8 rounded"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium text-sm truncate">{saved.internshipTitle}</h4>
                                                    <p className="text-xs text-muted-foreground">{saved.companyName}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge variant="secondary" className="text-xs">
                                                            {saved.type}
                                                        </Badge>
                                                        <span className="text-xs text-muted-foreground">{saved.location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-4">
                                        <BookmarkIcon className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                                        <p className="text-sm text-muted-foreground">No saved internships yet</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Profile Completion */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Strength</CardTitle>
                                <CardDescription>Complete your profile to stand out</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span>Profile Completion</span>
                                        <span className="font-medium">{user.profileCompletion}%</span>
                                    </div>
                                    <Progress value={user.profileCompletion} className="h-2" />
                                    <div className="space-y-2 text-sm">
                                        {user.profileCompletion < 100 && (
                                            <div className="text-muted-foreground">
                                                {!user.resume && "• Add your resume"}
                                                {!user.portfolio && "• Add portfolio link"}
                                                {!user.linkedin && "• Add LinkedIn profile"}
                                                {user.skills.length === 0 && "• Add your skills"}
                                            </div>
                                        )}
                                    </div>
                                    <Link href="/intern-dashboard/profile">
                                        <Button size="sm" className="w-full">
                                            Improve Profile
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
