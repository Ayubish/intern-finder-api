import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { renderStars } from "@/lib/helpers"
import { calculateAge, formatDate } from "@/lib/utils"
import { Calendar, Download, Github, Globe, GraduationCap, Linkedin, MapPin, User, Users } from "lucide-react"

export const ApplicantProfileDetail = ({ intern, completedInternships }: any) => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <img
                            src={intern?.image || "/placeholder.svg?height=60&width=60"}
                            alt={intern?.name}
                            className="h-16 w-16 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="text-xl font-semibold">{intern?.name}</h3>
                            <p className="text-muted-foreground">
                                {intern?.degree !== "No Degree" ? intern?.degree : "Student"} • {intern?.country}
                            </p>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{calculateAge(intern?.dateOfBirth)} years old</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{intern?.gender}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{intern?.country}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{intern?.degree}</span>
                        </div>
                    </div>

                    {intern?.about && (
                        <div>
                            <h4 className="font-medium mb-2">About</h4>
                            <p className="text-gray-700 leading-relaxed">{intern.about}</p>
                        </div>
                    )}

                    <div className="flex gap-2">
                        {intern?.portfolio && (
                            <Button variant="outline" size="sm" asChild>
                                <a href={intern.portfolio} target="_blank" rel="noopener noreferrer">
                                    <Globe className="mr-2 h-4 w-4" />
                                    Portfolio
                                </a>
                            </Button>
                        )}
                        {intern?.linkdin && (
                            <Button variant="outline" size="sm" asChild>
                                <a href={intern.linkdin} target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="mr-2 h-4 w-4" />
                                    LinkedIn
                                </a>
                            </Button>
                        )}
                        {intern?.github && (
                            <Button variant="outline" size="sm" asChild>
                                <a href={intern.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="mr-2 h-4 w-4" />
                                    GitHub
                                </a>
                            </Button>
                        )}
                        {intern?.resume && (
                            <Button variant="outline" size="sm" asChild>
                                <a href={intern.resume} target="_blank" rel="noopener noreferrer">
                                    <Download className="mr-2 h-4 w-4" />
                                    Resume
                                </a>
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
            {/* Internship Reviews */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Internship Reviews & Feedback
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {completedInternships.map((internship: any) => (
                        <div key={internship.id} className="border rounded-lg p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={internship.companyLogo || "/placeholder.svg"} alt={internship.companyName} />
                                    <AvatarFallback>
                                        {internship.companyName
                                            .split(" ")
                                            .map((n: any) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h4 className="font-semibold text-lg">{internship.internshipTitle}</h4>
                                            <p className="text-gray-600">{internship.companyName}</p>
                                            <p className="text-sm text-gray-500">
                                                {formatDate(internship.startDate)} - {formatDate(internship.endDate)} •{" "}
                                                {internship.duration}
                                            </p>
                                        </div>
                                        <div className="text-right">{renderStars(internship.rating)}</div>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-gray-700 leading-relaxed">{internship.feedback}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </>
    )
}