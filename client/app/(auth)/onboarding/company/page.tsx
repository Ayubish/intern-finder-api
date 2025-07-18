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
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Building2, Globe, Mail, Heart, CheckCircle } from "lucide-react"
import { FileUpload } from "@/components/file-upload"
import { companyOnboardingSchema, type CompanyOnboardingData } from "@/lib/validations"

const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Consulting",
    "Media & Entertainment",
    "Non-profit",
    "Government",
    "Real Estate",
    "Transportation",
    "Energy",
    "Food & Beverage",
    "Other",
]

const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees",
]

const valueOptions = [
    "Innovation",
    "Collaboration",
    "Integrity",
    "Excellence",
    "Diversity",
    "Sustainability",
    "Customer Focus",
    "Continuous Learning",
    "Work-Life Balance",
]

export default function CompanyOnboarding() {
    const [currentStep, setCurrentStep] = useState(1)
    const [logoFile, setLogoFile] = useState<File | null>(null)

    const totalSteps = 5
    const progress = (currentStep / totalSteps) * 100

    const form = useForm<CompanyOnboardingData>({
        resolver: zodResolver(companyOnboardingSchema),
        defaultValues: {
            companyName: "",
            industry: "",
            companySize: "",
            foundedYear: "",
            description: "",
            website: "",
            headquarters: "",
            locations: [],
            contactEmail: "",
            contactPhone: "",
            companyValues: [],
        },
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        trigger,
    } = form

    const watchedValues = watch()

    const validateCurrentStep = async (): Promise<boolean> => {
        let fieldsToValidate: (keyof CompanyOnboardingData)[] = []

        switch (currentStep) {
            case 1:
                fieldsToValidate = ["companyName", "industry"]
                break
            case 2:
                fieldsToValidate = ["description", "companySize"]
                break
            case 3:
                fieldsToValidate = ["contactEmail", "headquarters"]
                break
            case 4:
                return true
            case 5:
                // Review step, no validation needed
                return true
        }

        const result = await trigger(fieldsToValidate)
        return result
    }

    const nextStep = async () => {
        const isValid = await validateCurrentStep()
        if (isValid) {
            setCurrentStep((prev) => Math.min(prev + 1, 5))
        }
    }

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
    }

    const onSubmit = (data: CompanyOnboardingData) => {
        const formData = new FormData()

        // Append all form data
        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                formData.append(key, JSON.stringify(value))
            } else if (value !== undefined && value !== "") {
                formData.append(key, value.toString())
            }
        })

        // Append logo file if exists
        if (logoFile) {
            formData.append("companyLogo", logoFile)
        }

        console.log("Form submitted:", data)
        console.log("Logo file:", logoFile)

        // Here you would typically send the formData to your backend
        alert("Company profile created successfully!")
    }

    const toggleValue = (value: string) => {
        const currentValues = watchedValues.companyValues || []
        const newValues = currentValues.includes(value)
            ? currentValues.filter((v) => v !== value)
            : [...currentValues, value]
        setValue("companyValues", newValues)
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Building2 className="h-5 w-5" />
                            <h2 className="text-xl font-semibold">Company Information</h2>
                        </div>

                        <div className="space-y-6">

                            <div className="space-y-2">
                                <Label htmlFor="companyName">Company Name *</Label>
                                <Input
                                    id="companyName"
                                    {...register("companyName")}
                                    placeholder="Enter your company name"
                                    className={errors.companyName ? "border-red-500" : ""}
                                />
                                {errors.companyName && <p className="text-sm text-red-500 mt-1">{errors.companyName.message}</p>}
                            </div>

                            <FileUpload onFileChange={setLogoFile} currentFile={logoFile} accept="image/*" maxSize={5} />
                            <div className="space-y-2">
                                <Label htmlFor="industry">Industry *</Label>
                                <Select value={watchedValues.industry} onValueChange={(value) => setValue("industry", value)}>
                                    <SelectTrigger className={errors.industry ? "border-red-500" : ""}>
                                        <SelectValue placeholder="Select your industry" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {industries.map((industry) => (
                                            <SelectItem key={industry} value={industry}>
                                                {industry}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.industry && <p className="text-sm text-red-500 mt-1">{errors.industry.message}</p>}
                            </div>

                        </div>
                    </div>
                )

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Globe className="h-5 w-5 text-blue-600" />
                            <h2 className="text-xl font-semibold">Company Details</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="description">Company Description *</Label>
                                <Textarea
                                    id="description"
                                    {...register("description")}
                                    placeholder="Tell us about your company, mission, and what makes you unique..."
                                    rows={4}
                                    className={errors.description ? "border-red-500" : ""}
                                />
                                {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="companySize">Company Size *</Label>
                                <Select value={watchedValues.companySize} onValueChange={(value) => setValue("companySize", value)}>
                                    <SelectTrigger className={errors.companySize ? "border-red-500" : ""}>
                                        <SelectValue placeholder="Select company size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {companySizes.map((size) => (
                                            <SelectItem key={size} value={size}>
                                                {size}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.companySize && <p className="text-sm text-red-500 mt-1">{errors.companySize.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="foundedYear">Founded Year</Label>
                                <Input
                                    id="foundedYear"
                                    type="number"
                                    {...register("foundedYear")}
                                    placeholder="2020"
                                    min="1800"
                                    max={new Date().getFullYear()}
                                />
                            </div>

                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Mail className="h-5 w-5 text-blue-600" />
                            <h2 className="text-xl font-semibold">Contact Information</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="contactEmail">Contact Email *</Label>
                                <Input
                                    id="contactEmail"
                                    type="email"
                                    {...register("contactEmail")}
                                    placeholder="hr@company.com"
                                    className={errors.contactEmail ? "border-red-500" : ""}
                                />
                                {errors.contactEmail && <p className="text-sm text-red-500 mt-1">{errors.contactEmail.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="contactPhone">Contact Phone (Optional)</Label>
                                <Input id="contactPhone" type="tel" {...register("contactPhone")} placeholder="+1 (555) 123-4567" />
                            </div>
                            <div>
                                <Label htmlFor="website">Company Website</Label>
                                <Input
                                    id="website"
                                    type="url"
                                    {...register("website")}
                                    placeholder="https://www.yourcompany.com"
                                    className={errors.website ? "border-red-500" : ""}
                                />
                                {errors.website && <p className="text-sm text-red-500 mt-1">{errors.website.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="headquarters">Headquarters *</Label>
                                <Input
                                    id="headquarters"
                                    {...register("headquarters")}
                                    placeholder="City, State, Country"
                                    className={errors.headquarters ? "border-red-500" : ""}
                                />
                                {errors.headquarters && <p className="text-sm text-red-500 mt-1">{errors.headquarters.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="locations">Additional Locations</Label>
                                <Input
                                    id="locations"
                                    value={(watchedValues.locations || []).join(", ")}
                                    onChange={(e) => setValue("locations", e.target.value.split(", ").filter(Boolean))}
                                    placeholder="Other office locations (comma separated)"
                                />
                                <p className="text-sm text-gray-500 mt-1">Separate multiple locations with commas</p>
                            </div>
                        </div>
                    </div>
                )

            case 4:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Heart className="h-5 w-5 text-blue-600" />
                            <h2 className="text-xl font-semibold">Company Values</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label>Select your company values (optional)</Label>
                                <div className="grid grid-cols-2 gap-3 mt-3">
                                    {valueOptions.map((value) => (
                                        <div key={value} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={value}
                                                checked={(watchedValues.companyValues || []).includes(value)}
                                                onCheckedChange={() => toggleValue(value)}
                                            />
                                            <Label htmlFor={value} className="text-sm font-normal">
                                                {value}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 5:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-6">
                            <CheckCircle className="h-5 w-5" />
                            <h2 className="text-xl font-semibold">Review & Submit</h2>
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <h3 className="font-semibold text-lg">Company Information</h3>

                                    {logoFile && (
                                        <div className="flex items-center gap-3">
                                            <strong>Logo:</strong>
                                            <img
                                                src={URL.createObjectURL(logoFile) || "/placeholder.svg"}
                                                alt="Company logo"
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                            <span className="text-sm text-gray-600">{logoFile.name}</span>
                                        </div>
                                    )}

                                    <div>
                                        <strong>Company:</strong> {watchedValues.companyName}
                                    </div>
                                    <div>
                                        <strong>Industry:</strong> {watchedValues.industry}
                                    </div>
                                    <div>
                                        <strong>Size:</strong> {watchedValues.companySize}
                                    </div>
                                    {watchedValues.foundedYear && (
                                        <div>
                                            <strong>Founded:</strong> {watchedValues.foundedYear}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <h3 className="font-semibold text-lg">Company Details</h3>
                                    <div>
                                        <strong>Description:</strong> {watchedValues.description}
                                    </div>
                                    {watchedValues.website && (
                                        <div>
                                            <strong>Website:</strong> {watchedValues.website}
                                        </div>
                                    )}
                                    <div>
                                        <strong>Headquarters:</strong> {watchedValues.headquarters}
                                    </div>
                                    {watchedValues.locations && watchedValues.locations.length > 0 && (
                                        <div>
                                            <strong>Other Locations:</strong> {watchedValues.locations.join(", ")}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <h3 className="font-semibold text-lg">Contact Information</h3>
                                    <div>
                                        <strong>Email:</strong> {watchedValues.contactEmail}
                                    </div>
                                    {watchedValues.contactPhone && (
                                        <div>
                                            <strong>Phone:</strong> {watchedValues.contactPhone}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {watchedValues.companyValues && watchedValues.companyValues.length > 0 && (
                                <Card>
                                    <CardContent className="p-6 space-y-4">
                                        <h3 className="font-semibold text-lg">Company Values</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {watchedValues.companyValues.map((value) => (
                                                <Badge key={value} variant="secondary">
                                                    {value}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-2xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-center mb-2">Complete Your Company Profile</h1>
                    <p className="text-gray-600 text-center">
                        Help us understand your company better to attract the right interns
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

                        {currentStep === totalSteps && (
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                Complete Profile
                            </Button>
                        )} {currentStep < totalSteps && (
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
