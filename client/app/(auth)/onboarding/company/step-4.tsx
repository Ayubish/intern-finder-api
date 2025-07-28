import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";

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

export default function FormStep4({ register, errors, watchedValues, setValue }: { register: any, errors: any, watchedValues: any, setValue: any }) {
    const toggleValue = (value: string) => {
        const currentValues = watchedValues.values || []
        const newValues = currentValues.includes(value)
            ? currentValues.filter((v: any) => v !== value)
            : [...currentValues, value]
        setValue("values", newValues)
    }
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
                                    checked={(watchedValues.values || []).includes(value)}
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
}