import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Globe } from "lucide-react";

export default function FormStep2({ register, errors, watchedValues, setValue }: { register: any, errors: any, watchedValues: any, setValue: any }) {
    const sizes = [
        "1-10 employees",
        "11-50 employees",
        "51-200 employees",
        "201-500 employees",
        "501-1000 employees",
        "1000+ employees",
    ]
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <Globe className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold">Company Details</h2>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
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
                    <Label htmlFor="size">Company Size *</Label>
                    <Select value={watchedValues.size} onValueChange={(value) => setValue("size", value)}>
                        <SelectTrigger className={errors.size ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                            {sizes.map((size) => (
                                <SelectItem key={size} value={size}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.size && <p className="text-sm text-red-500 mt-1">{errors.size.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="year">Founded Year</Label>
                    <Input
                        id="year"
                        type="number"
                        {...register("year")}
                        placeholder="2020"
                        min="1800"
                        max={new Date().getFullYear()}
                    />
                </div>

            </div>
        </div>
    )
}