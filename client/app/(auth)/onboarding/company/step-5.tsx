import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";


export default function FormStep5({ watchedValues, image }: { watchedValues: any, image: any }) {

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

                        {image && (
                            <div className="flex items-center gap-3">
                                <strong>Logo:</strong>
                                <img
                                    src={URL.createObjectURL(image) || "/placeholder.svg"}
                                    alt="Company logo"
                                    className="w-12 h-12 object-cover rounded"
                                />
                                <span className="text-sm text-gray-600">{image.name}</span>
                            </div>
                        )}

                        <div>
                            <strong>Company:</strong> {watchedValues.name}
                        </div>
                        <div>
                            <strong>Industry:</strong> {watchedValues.industry}
                        </div>
                        <div>
                            <strong>Size:</strong> {watchedValues.size}
                        </div>
                        {watchedValues.year && (
                            <div>
                                <strong>Founded:</strong> {watchedValues.year}
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
                            <strong>headQuarter:</strong> {watchedValues.headQuarter}
                        </div>
                        {watchedValues.additionalLocations && watchedValues.additionalLocations.length > 0 && (
                            <div>
                                <strong>Other additional locations:</strong> {watchedValues.additionalLocations.join(", ")}
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
                        {watchedValues.phone && (
                            <div>
                                <strong>Phone:</strong> {watchedValues.phone}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {watchedValues.values && watchedValues.values.length > 0 && (
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <h3 className="font-semibold text-lg">Company Values</h3>
                            <div className="flex flex-wrap gap-2">
                                {watchedValues.values.map((value: any) => (
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
}