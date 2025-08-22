"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useInternships, type Internship } from "@/contexts/internships-context"
import { Upload, FileText, CheckCircle, X } from "lucide-react"
import { toast } from "sonner"

interface ApplicationDialogProps {
    isOpen: boolean
    onClose: () => void
    internship: Internship
}

export function ApplicationDialog({ isOpen, onClose, internship }: ApplicationDialogProps) {
    const { applyToInternship } = useInternships()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        coverLetter: "",
        resume: null as File | null,
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && file.size <= 5 * 1024 * 1024) {
            // 5MB limit
            setFormData((prev) => ({ ...prev, resume: file }))
        } else if (file) {
            alert("File size must be less than 5MB")
        }
    }

    const removeFile = () => {
        setFormData((prev) => ({ ...prev, resume: null }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            await applyToInternship(internship.id, formData)
            setIsSubmitted(true)
        } catch {
            toast.error("Failed to submit application. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleClose = () => {
        setIsSubmitted(false)
        setFormData({
            coverLetter: "",
            resume: null,
        })
        onClose()
    }

    if (isSubmitted) {
        return (
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <DialogTitle>Application Submitted Successfully!</DialogTitle>
                        <DialogDescription className="space-y-2">

                            Your application for <strong>{internship.title}</strong> at <strong>{internship.company.name}</strong>{" "}
                            has been successfully submitted.
                            <br />
                            You should hear back from them within 1-2 weeks. Good luck!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center pt-4">
                        <Button onClick={handleClose} className="w-full">
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Apply for {internship.title}</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to apply for this internship at {internship.company.name}.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Resume Upload */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Resume/CV</h3>
                        <div>
                            <Label htmlFor="resume">Upload Resume *</Label>
                            <div className="mt-2">
                                {formData.resume ? (
                                    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-6 w-6 text-blue-600" />
                                            <div>
                                                <p className="text-sm font-medium">{formData.resume.name}</p>
                                                <p className="text-xs text-gray-500">{(formData.resume.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        </div>
                                        <Button type="button" variant="ghost" size="sm" onClick={removeFile}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <label
                                        htmlFor="resume"
                                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                                    >
                                        <div className="text-center">
                                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600">Click to upload your resume</p>
                                            <p className="text-xs text-gray-400">PDF, DOC, or DOCX (max 5MB)</p>
                                        </div>
                                    </label>
                                )}
                                <input
                                    id="resume"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    required={!formData.resume}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Cover Letter */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Cover Letter</h3>
                        <div className="space-y-2">
                            <Label htmlFor="coverLetter">Why are you interested in this internship? *</Label>
                            <Textarea
                                id="coverLetter"
                                rows={10}
                                placeholder="Tell us why you're the perfect fit for this internship..."
                                value={formData.coverLetter}
                                onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit Application"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
