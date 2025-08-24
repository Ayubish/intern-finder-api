import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatStatus, getStatusColor } from "@/lib/helpers"
import { formatTimestamp } from "@/lib/utils"
import { Download, FileText } from "lucide-react"

export const ApplicationTab = ({ application, intern }: any) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Application Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">


                <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex gap-3 items-center">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={application.intern.image} alt={application.intern.name} />
                                <AvatarFallback>{application.intern.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-xl font-semibold">{intern?.name}</h3>
                                <p className="text-muted-foreground font-semibold">
                                    {intern?.degree !== "No Degree" ? intern?.degree : "Self Taught"} • {intern?.country}
                                </p>
                            </div>
                        </div>
                        <Badge className={getStatusColor(application.status)}>{formatStatus(application.status)}</Badge>
                    </div>

                    <div className="p-4 pt-0">
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">Applied Date</label>
                            <p className="text-sm">{formatTimestamp(application.createdAt)}</p>
                        </div>
                    </div>

                </div>

                <Separator />

                {application.coverLetter && (
                    <div>
                        <h3 className="font-semibold mb-2">Cover Letter</h3>

                        <p className="text-sm whitespace-pre-wrap">{application.coverLetter}</p>
                    </div>
                )}

                <div>
                    <h3 className="font-semibold mb-2">Documents</h3>
                    <div className="space-y-2">
                        {application.resume && (
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    <span className="text-sm">Application Resume</span>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <a href={application.resume} target="_blank" rel="noopener noreferrer">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                    </a>
                                </Button>
                            </div>
                        )}
                        {intern?.resume && (
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    <span className="text-sm">Profile Resume</span>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <a href={intern.resume} target="_blank" rel="noopener noreferrer">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                    </a>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>

        </Card>
    )
}