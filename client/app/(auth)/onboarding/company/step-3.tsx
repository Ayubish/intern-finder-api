import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

export default function FormStep3({ register, errors, watchedValues, setValue }: { register: any, errors: any, watchedValues: any, setValue: any }) {
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
                    <Label htmlFor="phone">Contact Phone (Optional)</Label>
                    <Input id="phone" type="tel" {...register("phone")} placeholder="+1 (555) 123-4567" />
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
                    <Label htmlFor="headQuarter">headQuarter *</Label>
                    <Input
                        id="headQuarter"
                        {...register("headQuarter")}
                        placeholder="City, State, Country"
                        className={errors.headQuarter ? "border-red-500" : ""}
                    />
                    {errors.headQuarter && <p className="text-sm text-red-500 mt-1">{errors.headQuarter.message}</p>}
                </div>

                <div>
                    <Label htmlFor="additionalLocations">Additional additionalLocations</Label>
                    <Input
                        id="additionalLocations"
                        value={(watchedValues.additionalLocations || []).join(", ")}
                        onChange={(e) => setValue("additionalLocations", e.target.value.split(", ").filter(Boolean))}
                        placeholder="Other office additionalLocations (comma separated)"
                    />
                    <p className="text-sm text-gray-500 mt-1">Separate multiple additionalLocations with commas</p>
                </div>
            </div>
        </div>
    )
}