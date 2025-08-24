"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useInternships, type Internship } from "@/contexts/internships-context"
import {
    MapPin,
    Clock,
    Calendar,
    Building,
    DollarSign,
    Users,
    Globe,
    Mail,
    Phone,
    ArrowLeft,
    ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { ApplicationDialog } from "@/components/application-dialog"

export default function InternshipDetailPage() {
    const params = useParams()
    const { getInternship } = useInternships()
    const [internship, setInternship] = useState<Internship | null>(null)
    const [isApplicationOpen, setIsApplicationOpen] = useState(false)

    useEffect(() => {
        if (params.id && typeof params.id === "string") {
            const foundInternship = getInternship(params.id)
            if (foundInternship) {
                setInternship(foundInternship)
            }
        }
    }, [params.id, getInternship])

    if (!internship) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Card className="text-center p-8">
                    <CardContent>
                        <h2 className="text-xl font-semibold mb-2">Internship not found</h2>
                        <p className="text-gray-600 mb-4">The internship you're looking for doesn't exist or has been removed.</p>
                        <Link href="/internships">
                            <Button>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Internships
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const isDeadlineSoon = (deadline: string) => {
        const deadlineDate = new Date(deadline)
        const today = new Date()
        const diffTime = deadlineDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays <= 7 && diffDays > 0
    }

    const formatList = (text: string) => {
        return text
            .split("\n")
            .filter((item) => item.trim())
            .map((item, index) => (
                <li key={index} className="text-gray-700">
                    {item.replace(/^-\s*/, "")}
                </li>
            ))
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <div className="mb-6">
                    <Link href="/internships">
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Internships
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Header */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={internship.company.image || "/placeholder.svg"}
                                            alt={internship.company.name}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div>
                                            <CardTitle className="text-2xl">{internship.title}</CardTitle>
                                            <CardDescription className="text-lg">{internship.company.name}</CardDescription>
                                            <div className="flex items-center gap-4 mt-2">
                                                <Badge variant="outline">{internship.company.industry}</Badge>
                                            </div>
                                        </div>
                                    </div>
                                    {isDeadlineSoon(internship.deadline) && <Badge variant="destructive">Deadline Soon</Badge>}
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Key Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Internship Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="font-medium">Location</p>
                                            <p className="text-gray-600">{internship.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge variant="outline" className="w-fit">
                                            {internship.type}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <DollarSign className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="font-medium">Salary</p>
                                            <p className="text-gray-600">{internship.salary}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="font-medium">Duration</p>
                                            <p className="text-gray-600">{internship.duration}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="font-medium">Start Date</p>
                                            <p className="text-gray-600">{formatDate(internship.startDate)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-red-500" />
                                        <div>
                                            <p className="font-medium">Application Deadline</p>
                                            <p className="text-red-600 font-medium">{formatDate(internship.deadline)}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle>About This Internship</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 leading-relaxed">{internship.description}</p>
                            </CardContent>
                        </Card>

                        {/* Responsibilities */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Responsibilities</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 list-disc list-inside">{formatList(internship.responsibilities)}</ul>
                            </CardContent>
                        </Card>

                        {/* Requirements */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Requirements</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 list-disc list-inside">{formatList(internship.requirements)}</ul>
                            </CardContent>
                        </Card>

                        {/* Benefits */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Benefits</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 list-disc list-inside">{formatList(internship.benefits)}</ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Apply Button */}
                        <Card>
                            <CardContent className="pt-6">
                                <Button className="w-full mb-4" size="lg" onClick={() => setIsApplicationOpen(true)}>
                                    Apply Now
                                </Button>
                                <p className="text-sm text-gray-600 text-center">
                                    Application deadline: {formatDate(internship.deadline)}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Company Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>About {internship.company.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-gray-700 text-sm">{internship.company.description}</p>

                                <Separator />

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Building className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-600">Industry:</span>
                                        <span>{internship.company.industry}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Users className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-600">Size:</span>
                                        <span>{internship.company.size}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-600">Founded:</span>
                                        <span>{internship.company.year}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-600">HQ:</span>
                                        <span>{internship.company.headQuarter}</span>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <h4 className="font-medium text-sm">Contact</h4>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Mail className="h-4 w-4 text-gray-500" />
                                            <a href={`mailto:${internship.company.contactEmail}`} className="text-blue-600 hover:underline">
                                                {internship.company.contactEmail}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone className="h-4 w-4 text-gray-500" />
                                            <span>{internship.company.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Globe className="h-4 w-4 text-gray-500" />
                                            <a
                                                href={internship.company.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline flex items-center gap-1"
                                            >
                                                Visit Website
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <ApplicationDialog
                isOpen={isApplicationOpen}
                onClose={() => setIsApplicationOpen(false)}
                internship={internship}
            />
        </div>
    )
}
