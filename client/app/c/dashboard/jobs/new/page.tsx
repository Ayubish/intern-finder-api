import NewJobPage from "./job-multiform";

export default function CreateJobPost() {
    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold">Create New Job Listing</h1>
                <p className="text-muted-foreground">Fill in the details to create a new job posting.</p>
            </div>
            <NewJobPage />
        </div>
    )
}