import NavBar from "@/components/navbar"
import type React from "react"

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <NavBar />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </div>
    )
}
