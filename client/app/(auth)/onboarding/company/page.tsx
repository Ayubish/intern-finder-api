"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { companyOnboardingSchema, type CompanyOnboardingData } from "@/lib/validations"
import Link from "next/link"
import Image from "next/image"
import FormStep1 from "./step-1"
import FormStep2 from "./step-2"
import FormStep3 from "./step-3"
import FormStep4 from "./step-4"
import FormStep5 from "./step-5"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"


export default function CompanyOnboarding() {
    const [currentStep, setCurrentStep] = useState(1)
    const [image, setImage] = useState<File | null>(null)
    const router = useRouter();

    const totalSteps = 5
    const progress = (currentStep / totalSteps) * 100

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        setValue,
        trigger,
    } = useForm<CompanyOnboardingData>({
        resolver: zodResolver(companyOnboardingSchema),

    })

    const watchedValues = watch()

    const validateCurrentStep = async (): Promise<boolean> => {
        let fieldsToValidate: (keyof CompanyOnboardingData)[] = []

        switch (currentStep) {
            case 1:
                fieldsToValidate = ["name", "industry"]
                break
            case 2:
                fieldsToValidate = ["description", "size"]
                break
            case 3:
                fieldsToValidate = ["contactEmail", "headQuarter", "website"]
                break
            case 4:
                return true
            case 5:
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

    const onSubmit = async (data: CompanyOnboardingData) => {
        const formData = new FormData()

        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                formData.append(key, JSON.stringify(value))
            } else if (value !== undefined && value !== "") {
                formData.append(key, value.toString())
            }
        })

        if (image) {
            formData.append("image", image)
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/company`, {
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

    }



    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <FormStep1 register={register} setValue={setValue} watchedValues={watchedValues} errors={errors} image={image} setImage={setImage} />
                )

            case 2:
                return (
                    <FormStep2 register={register} setValue={setValue} watchedValues={watchedValues} errors={errors} />
                )

            case 3:
                return (
                    <FormStep3 register={register} setValue={setValue} watchedValues={watchedValues} errors={errors} />
                )

            case 4:
                return <FormStep4 register={register} setValue={setValue} watchedValues={watchedValues} errors={errors} />

            case 5:
                return <FormStep5 watchedValues={watchedValues} image={image} />

            default:
                return null
        }
    }

    return (
        <div className="min-h-screen pb-10">
            <div className="w-2/10 p-5 px-10">
                <Link href="/">
                    <Image src="/Interno.png" alt="Interno" width={140} height={140} className="object-contain" />
                </Link>
            </div>
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
                        <CardContent className="px-4">{renderStep()}</CardContent>
                    </Card>

                    <div className="flex justify-between mt-8">
                        <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                            Previous
                        </Button>

                        {currentStep === totalSteps && (
                            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
                                {isSubmitting ? "Submitting" : "Complete Profile"}
                            </Button>
                        )} {currentStep < totalSteps && (
                            <Button type="button" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                                Next

                                <ArrowRight />
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}
