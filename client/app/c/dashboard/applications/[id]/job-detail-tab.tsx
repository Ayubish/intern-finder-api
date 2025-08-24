
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { Building, Clock, DollarSign, MapPin } from "lucide-react"

export const JobDetailTab = ({ job }: any) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{job?.title}</CardTitle>
                <CardDescription>
                    <div className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job?.location}
                        </div>
                        <div className="flex items-center gap-1">
                            <Building className="h-4 w-4" />
                            {job?.type}
                        </div>
                        <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {job?.salary}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job?.duration}
                        </div>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">{job?.description}</p>
                </div>

                {job?.responsibilities && (
                    <div>
                        <h4 className="font-medium mb-2">Responsibilities</h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{job.responsibilities}</p>
                    </div>
                )}

                {job?.requirements && (
                    <div>
                        <h4 className="font-medium mb-2">Requirements</h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{job.requirements}</p>
                    </div>
                )}

                {job?.benefits && (
                    <div>
                        <h4 className="font-medium mb-2">Benefits</h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{job.benefits}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Start Date</label>
                        <p className="text-sm">{formatDate(job?.startDate)}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Application Deadline</label>
                        <p className="text-sm">{formatDate(job?.deadline)}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}