import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useApplications } from "@/contexts/applications-context";
import { Application } from "@/contexts/intern-context";
import { useState } from "react";

interface InterviewDialogProps {
    isOpen: boolean
    onClose: () => void
    application: any
    setApplication: any

}
export function ScheduleDialog({ isOpen, onClose, application, setApplication }: InterviewDialogProps) {
    const { scheduleInterview, updateApplication, loading } = useApplications()

    const [interviewData, setInterviewData] = useState({
        scheduledAt: "",
        duration: 60,
        type: "video",
        location: "",
        notes: "",
    })

    const handleScheduleInterview = () => {
        if (!application) return

        scheduleInterview({
            applicationId: application.id,
            scheduledAt: new Date(interviewData.scheduledAt).toISOString(),
            duration: interviewData.duration,
            type: interviewData.type,
            location: interviewData.location,
            notes: interviewData.notes,
            status: "scheduled",
        })

        // Update application status to interview_scheduled
        updateApplication(application.id, { status: "interview_scheduled" })

        onClose()
        setApplication(null)
        setInterviewData({
            scheduledAt: "",
            duration: 60,
            type: "video",
            location: "",
            notes: "",
        })
    }
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Schedule Interview</DialogTitle>
                    <DialogDescription>
                        Schedule an interview with {application?.name} for {application?.jobTitle}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="scheduledAt" className="text-right">
                            Date & Time
                        </Label>
                        <Input
                            id="scheduledAt"
                            type="datetime-local"
                            value={interviewData.scheduledAt}
                            onChange={(e) => setInterviewData({ ...interviewData, scheduledAt: e.target.value })}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="duration" className="text-right">
                            Duration (min)
                        </Label>
                        <Input
                            id="duration"
                            type="number"
                            value={interviewData.duration}
                            onChange={(e) => setInterviewData({ ...interviewData, duration: Number.parseInt(e.target.value) })}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                            Type
                        </Label>
                        <Select
                            value={interviewData.type}
                            onValueChange={(value) => setInterviewData({ ...interviewData, type: value })}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="video">Video Call</SelectItem>
                                <SelectItem value="phone">Phone Call</SelectItem>
                                <SelectItem value="in_person">In Person</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">
                            Location
                        </Label>
                        <Input
                            id="location"
                            value={interviewData.location}
                            onChange={(e) => setInterviewData({ ...interviewData, location: e.target.value })}
                            placeholder="Meeting room, Zoom link, etc."
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="notes" className="text-right">
                            Notes
                        </Label>
                        <Textarea
                            id="notes"
                            value={interviewData.notes}
                            onChange={(e) => setInterviewData({ ...interviewData, notes: e.target.value })}
                            placeholder="Additional notes for the interview..."
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleScheduleInterview}>Schedule Interview</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}