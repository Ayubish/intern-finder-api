"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { User, GraduationCap, Briefcase, CheckCircle, Github, Linkedin, Globe, Twitter } from "lucide-react"
import { internOnboardingSchema, type InternOnboardingData } from "@/lib/validations"

import { FileUpload } from "@/components/file-upload"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Australia",
    "Japan",
    "South Korea",
    "Singapore",
    "Netherlands",
    "Sweden",
    "Switzerland",
    "India",
    "China",
    "Brazil",
    "Mexico",
    "Spain",
    "Italy",
    "Poland",
    "Czech Republic",
    "Denmark",
    "Norway",
    "Finland",
    "Belgium",
    "Austria",
    "Ireland",
    "New Zealand",
    "South Africa",
    "Israel",
    "United Arab Emirates",
    "Other",
]

const degrees = [
    "No Degree",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "PhD/Doctorate",
    "Professional Degree",
    "Certificate Program",
    "Diploma",
    "Other",
]

const genders = ["Male", "Female"]

export default function InternOnboarding() {
    const [currentStep, setCurrentStep] = useState(1)
    const [image, setimage] = useState<File | null>(null)
    const [resumeFile, setResumeFile] = useState<File | null>(null)
    const router = useRouter()

    const totalSteps = 4
    const progress = (currentStep / totalSteps) * 100

    const form = useForm<InternOnboardingData>({
        resolver: zodResolver(internOnboardingSchema),
        defaultValues: {
            name: "",
            dateOfBirth: "",
            gender: "",
            country: "",
            degree: "",
            university: "",
            major: "",
            yearOfGraduation: "",
            gpa: "",
            about: "",
            linkedin: "",
            github: "",
            portfolio: "",
        },
    })

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        setValue,
        trigger,
    } = form

    const watchedValues = watch()

    const validateCurrentStep = async (): Promise<boolean> => {
        let fieldsToValidate: (keyof InternOnboardingData)[] = []

        switch (currentStep) {
            case 1:
                fieldsToValidate = ["name", "dateOfBirth", "gender", "country"]
                break
            case 2:
                fieldsToValidate = ["degree"]
                // Only validate education fields if degree is not "No Degree"
                if (watchedValues.degree && watchedValues.degree !== "No Degree") {
                    fieldsToValidate.push("university", "major", "yearOfGraduation")
                }
                break
            case 3:
                fieldsToValidate = ["about"]
                break
            case 4:
                return true
        }

        const result = await trigger(fieldsToValidate)
        return result
    }

    const nextStep = async () => {
        const isValid = await validateCurrentStep()
        if (isValid) {
            setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
        }
    }

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
    }

    const onSubmit = async (data: InternOnboardingData) => {
        const formData = new FormData()

        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== "") {
                formData.append(key, value.toString())
            }
        })

        if (image) {
            formData.append("image", image)
        }

        if (resumeFile) {
            formData.append("resume", resumeFile)
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/intern/register`, {
            method: "POST",
            body: formData,
            credentials: "include",
        })

        if (!res.ok) {
            const error = await res.text()
            toast.error(`Failed to create company profile: ${error}`)
            return
        }

        toast.success("Company profile created successfully!")
        router.push("/c")

        toast.success("Intern profile created successfully!")
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-6">
                            <User className="h-5 w-5 text-blue-600" />
                            <h2 className="text-xl font-semibold">Personal Information</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Profile Image</Label>
                                <FileUpload onFileChange={setimage} currentFile={image} accept="image/*" maxSize={5} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                    id="name"
                                    {...register("name")}
                                    placeholder="John Doe"
                                    className={errors.name ? "border-red-500" : ""}
                                />
                                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                                <Input
                                    id="dateOfBirth"
                                    type="date"
                                    {...register("dateOfBirth")}
                                    className={errors.dateOfBirth ? "border-red-500" : ""}
                                />
                                {errors.dateOfBirth && <p className="text-sm text-red-500 mt-1">{errors.dateOfBirth.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender *</Label>
                                <Select value={watchedValues.gender} onValueChange={(value) => setValue("gender", value)}>
                                    <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {genders.map((gender) => (
                                            <SelectItem key={gender} value={gender}>
                                                {gender}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="country">Country *</Label>
                                <Select value={watchedValues.country} onValueChange={(value) => setValue("country", value)}>
                                    <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                                        <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-60">
                                        {countries.map((country) => (
                                            <SelectItem key={country} value={country}>
                                                {country}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.country && <p className="text-sm text-red-500 mt-1">{errors.country.message}</p>}
                            </div>
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-6">
                            <GraduationCap className="h-5 w-5 text-blue-600" />
                            <h2 className="text-xl font-semibold">Education</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="degree">Degree *</Label>
                                <Select value={watchedValues.degree} onValueChange={(value) => setValue("degree", value)}>
                                    <SelectTrigger className={errors.degree ? "border-red-500" : ""}>
                                        <SelectValue placeholder="Select degree" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {degrees.map((degree) => (
                                            <SelectItem key={degree} value={degree}>
                                                {degree}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.degree && <p className="text-sm text-red-500 mt-1">{errors.degree.message}</p>}
                            </div>

                            {watchedValues.degree && watchedValues.degree !== "No Degree" && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="university">University/College *</Label>
                                        <Input
                                            id="university"
                                            {...register("university")}
                                            placeholder="University of California, Berkeley"
                                            className={errors.university ? "border-red-500" : ""}
                                        />
                                        {errors.university && <p className="text-sm text-red-500 mt-1">{errors.university.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="major">Major *</Label>
                                        <Input
                                            id="major"
                                            {...register("major")}
                                            placeholder="Computer Science"
                                            className={errors.major ? "border-red-500" : ""}
                                        />
                                        {errors.major && <p className="text-sm text-red-500 mt-1">{errors.major.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="yearOfGraduation">Graduation Year *</Label>
                                        <Input
                                            id="yearOfGraduation"
                                            type="date"
                                            {...register("yearOfGraduation")}
                                            className={errors.yearOfGraduation ? "border-red-500" : ""}
                                        />
                                        {errors.yearOfGraduation && (
                                            <p className="text-sm text-red-500 mt-1">{errors.yearOfGraduation.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="gpa">GPA (Optional)</Label>
                                        <Input id="gpa" type="number" step="0.01" min="0" max="4" {...register("gpa")} placeholder="3.75" />
                                        <p className="text-sm text-gray-500 mt-1">On a 4.0 scale</p>
                                    </div>
                                </>
                            )}

                            {watchedValues.degree === "No Degree" && (
                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                        <strong>No worries!</strong> Many successful professionals started without a formal degree. Focus on
                                        showcasing your skills, experience, and passion in the next steps.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Briefcase className="h-5 w-5 text-blue-600" />
                            <h2 className="text-xl font-semibold">Experience</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="about">About Me *</Label>
                                <Textarea
                                    id="about"
                                    {...register("about")}
                                    placeholder="Tell us about yourself, your interests, goals, and what makes you unique. Include any relevant experience, projects, or achievements..."
                                    rows={6}
                                    className={errors.about ? "border-red-500" : ""}
                                />
                                {errors.about && <p className="text-sm text-red-500 mt-1">{errors.about.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Resume/CV</Label>
                                <FileUpload
                                    onFileChange={setResumeFile}
                                    currentFile={resumeFile}
                                    accept=".pdf,.doc,.docx"
                                    maxSize={10}
                                />
                            </div>

                            <div className="space-y-4">
                                <Label className="text-base font-medium">Social Links</Label>

                                <div className="space-y-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="linkedin" className="flex items-center gap-2">
                                            <Linkedin className="h-4 w-4 text-blue-600" />
                                            LinkedIn Profile
                                        </Label>
                                        <Input
                                            id="linkedin"
                                            type="url"
                                            {...register("linkedin")}
                                            placeholder="https://linkedin.com/in/johndoe"
                                            className={errors.linkedin ? "border-red-500" : ""}
                                        />
                                        {errors.linkedin && <p className="text-sm text-red-500 mt-1">{errors.linkedin.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="github" className="flex items-center gap-2">
                                            <Github className="h-4 w-4" />
                                            GitHub Profile
                                        </Label>
                                        <Input
                                            id="github"
                                            type="url"
                                            {...register("github")}
                                            placeholder="https://github.com/johndoe"
                                            className={errors.github ? "border-red-500" : ""}
                                        />
                                        {errors.github && <p className="text-sm text-red-500 mt-1">{errors.github.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="portfolio" className="flex items-center gap-2">
                                            <Globe className="h-4 w-4 text-green-600" />
                                            Portfolio/Website
                                        </Label>
                                        <Input
                                            id="portfolio"
                                            type="url"
                                            {...register("portfolio")}
                                            placeholder="https://johndoe.dev"
                                            className={errors.portfolio ? "border-red-500" : ""}
                                        />
                                        {errors.portfolio && <p className="text-sm text-red-500 mt-1">{errors.portfolio.message}</p>}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 4:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-6">
                            <CheckCircle className="h-5 w-5 text-blue-600" />
                            <h2 className="text-xl font-semibold">Review & Submit</h2>
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <h3 className="font-semibold text-lg">Personal Information</h3>

                                    {image && (
                                        <div className="flex items-center gap-3">
                                            <strong>Profile Image:</strong>
                                            <img
                                                src={URL.createObjectURL(image) || "/placeholder.svg"}
                                                alt="Profile"
                                                className="w-16 h-16 object-cover rounded-full"
                                            />
                                            <span className="text-sm text-gray-600">{image.name}</span>
                                        </div>
                                    )}

                                    <div>
                                        <strong>Full Name:</strong> {watchedValues.name}
                                    </div>
                                    <div>
                                        <strong>Date of Birth:</strong> {watchedValues.dateOfBirth}
                                    </div>
                                    <div>
                                        <strong>Gender:</strong> {watchedValues.gender}
                                    </div>
                                    <div>
                                        <strong>Country:</strong> {watchedValues.country}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <h3 className="font-semibold text-lg">Education</h3>
                                    <div>
                                        <strong>Degree:</strong> {watchedValues.degree}
                                    </div>
                                    {watchedValues.degree !== "No Degree" && (
                                        <>
                                            {watchedValues.university && (
                                                <div>
                                                    <strong>University:</strong> {watchedValues.university}
                                                </div>
                                            )}
                                            {watchedValues.major && (
                                                <div>
                                                    <strong>Major:</strong> {watchedValues.major}
                                                </div>
                                            )}
                                            {watchedValues.yearOfGraduation && (
                                                <div>
                                                    <strong>Graduation Year:</strong> {new Date(watchedValues.yearOfGraduation).getFullYear()}
                                                </div>
                                            )}
                                            {watchedValues.gpa && (
                                                <div>
                                                    <strong>GPA:</strong> {watchedValues.gpa}/4.0
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {watchedValues.degree === "No Degree" && (
                                        <div className="text-gray-600 italic">Self-taught and experience-focused candidate</div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <h3 className="font-semibold text-lg">Experience</h3>

                                    <div>
                                        <strong>About Me:</strong>
                                        <p className="mt-1 text-gray-700">{watchedValues.about}</p>
                                    </div>

                                    {resumeFile && (
                                        <div className="flex items-center gap-3">
                                            <strong>Resume:</strong>
                                            <span className="text-sm text-gray-600">{resumeFile.name}</span>
                                        </div>
                                    )}

                                    <div>
                                        <strong>Social Links:</strong>
                                        <div className="mt-2 space-y-1">
                                            {watchedValues.linkedin && (
                                                <div className="flex items-center gap-2">
                                                    <Linkedin className="h-4 w-4 text-blue-600" />
                                                    <a
                                                        href={watchedValues.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline text-sm"
                                                    >
                                                        LinkedIn Profile
                                                    </a>
                                                </div>
                                            )}
                                            {watchedValues.github && (
                                                <div className="flex items-center gap-2">
                                                    <Github className="h-4 w-4" />
                                                    <a
                                                        href={watchedValues.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline text-sm"
                                                    >
                                                        GitHub Profile
                                                    </a>
                                                </div>
                                            )}
                                            {watchedValues.portfolio && (
                                                <div className="flex items-center gap-2">
                                                    <Globe className="h-4 w-4 text-green-600" />
                                                    <a
                                                        href={watchedValues.portfolio}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline text-sm"
                                                    >
                                                        Portfolio Website
                                                    </a>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-center mb-2">Complete Your Intern Profile</h1>
                    <p className="text-gray-600 text-center">
                        Help companies discover your potential and find the perfect internship match
                    </p>
                </div>

                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">
                            Step {currentStep} of {totalSteps}
                        </span>
                        <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardContent className="p-8">{renderStep()}</CardContent>
                    </Card>

                    <div className="flex justify-between mt-8">
                        <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                            Previous
                        </Button>

                        {currentStep === totalSteps ? (
                            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
                                {isSubmitting ? "Submitting..." : "Complete Profile"}
                            </Button>
                        ) : (
                            <Button type="button" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                                Next
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}
