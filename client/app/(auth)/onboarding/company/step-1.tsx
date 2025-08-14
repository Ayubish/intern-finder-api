import { FileUpload } from "@/components/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2 } from "lucide-react";

export default function FormStep1({ register, errors, watchedValues, setImage, image, setValue }: { register: any, errors: any, watchedValues: any, setImage: any, image: any, setValue: any }) {
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

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <Building2 className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold">Company Information</h2>
            </div>

            <div className="space-y-6">

                <div className="space-y-2">
                    <Label htmlFor="name">Company Name *</Label>
                    <Input
                        id="name"
                        {...register("name")}
                        placeholder="Enter your company name"
                        className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="name">Company Logo *</Label>
                    <FileUpload onFileChange={setImage} currentFile={image} accept="image/*" maxSize={5} />
                </div>

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
}