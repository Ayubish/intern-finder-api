import { Star } from "lucide-react"

export const renderStars = (rating: number) => {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`h-5 w-5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
            ))}
            <span className="text-lg font-medium ml-2">{rating.toFixed(1)}</span>
        </div>
    )
}

export const getStatusColor = (status: string) => {
    switch (status) {
        case "new":
            return "bg-blue-100 text-blue-800"
        case "under_review":
            return "bg-yellow-100 text-yellow-800"
        case "interview_scheduled":
            return "bg-purple-100 text-purple-800"
        case "accepted":
            return "bg-green-100 text-green-800"
        case "rejected":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

export const formatStatus = (status: string) => {
    return status
    // .split("_")
    // .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    // .join(" ")
}