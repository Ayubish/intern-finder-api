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
    Bookmark,
    PenBox,
} from "lucide-react"
import Link from "next/link"
import { ApplicationDialog } from "@/components/application-dialog"
import Image from "next/image"
import { AuthDialog } from "@/components/auth-dialog"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"

export default function DashboardJobDetail() {
    const params = useParams()
    const { getInternship } = useInternships()
    const [internship, setInternship] = useState<Internship | null>(null)
    const [isApplicationOpen, setIsApplicationOpen] = useState(false)
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const { user } = useAuth();

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
        <div className="container mx-auto px-4 py-8">

            <div className="grid gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Header */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={internship.company.image || "/placeholder.svg"}
                                        alt={internship.company.name}
                                        width={100}
                                        height={100}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                    <div>
                                        <CardTitle className="text-2xl text-primary">{internship.title}</CardTitle>
                                        <CardDescription className="text-lg">{internship.company.name}</CardDescription>
                                        <div className="flex items-center gap-4 mt-2">
                                            <Badge variant="outline">{internship.company.industry}</Badge>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">

                                    <Badge variant={internship.status == "Active" ? "default" : "destructive"}>
                                        {internship.status}
                                    </Badge>
                                    {/* {isDeadlineSoon(internship.deadline) && <Badge variant="destructive">Deadline Soon</Badge>} */}
                                </div>
                                <Link href={`/c/dashboard/jobs/${internship.id}/edit`}>

                                    <Button>
                                        <PenBox />
                                        Edit Job
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-5">


                            {/* Key Details */}

                            <div className="grid gap-2 md:grid-cols-2">
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


                            {/* Description */}
                            <div>
                                <h3 className="font-semibold mb-2">About This Internship</h3>
                                <p className="text-gray-700 leading-relaxed">{internship.description}</p>
                            </div>

                            {/* Responsibilities */}
                            <div>
                                <h3 className="font-semibold mb-2">Role & Responsibilities</h3>
                                <ul className="space-y-2 list-disc list-inside">{formatList(internship.responsibilities)}</ul>
                            </div>

                            {/* Requirements */}
                            <div>
                                <h3 className="font-semibold mb-2">Requirements</h3>
                                <ul className="space-y-2 list-disc list-inside">{formatList(internship.requirements)}</ul>
                            </div>


                            {/* Benefits */}
                            <div>
                                <h3 className="font-semibold mb-2">What You'll Gain</h3>
                                <ul className="space-y-2 list-disc list-inside">{formatList(internship.benefits)}</ul>
                            </div>

                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>

    )
}
