'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, UserSearch } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Signup() {

    const [rad, setRad] = useState("")
    return (
        <div className="flex flex-col gap-5 justify-center items-center py-10">
            <h1 className="text-4xl max-w-xl font-semibold text-center py-10">Join as a company or an individual looking for an internship</h1>
            <div className="flex gap-20 text-2xl font-semibold">
                <div className={`p-5 px-8 w-sm border rounded-2xl cursor-pointer transition-all duration-200 ${rad == 'company' ? 'bg-gray-100 border-2 border-black' : 'hover:border-black'}`} onClick={() => setRad("company")}>
                    <div className="flex justify-between items-center">
                        <Building2 size={30} />
                        <Input
                            name="optio"
                            type="radio"
                            className="w-7"
                            value="company"
                            checked={rad === "company"}
                            readOnly
                        />
                    </div>
                    <p className="py-5">
                        We are a company, looking for interns
                    </p>
                </div>
                <div className={`p-5 px-8 w-sm border rounded-2xl cursor-pointer ${rad == 'intern' ? 'bg-gray-100 border-2 border-black' : 'hover:border-black'}`} onClick={() => setRad("intern")}>
                    <div className="flex justify-between items-center">
                        <UserSearch size={30} />
                        <Input
                            name="optio"
                            type="radio"
                            className="w-7"
                            value="intern"
                            checked={rad === "intern"}
                            readOnly
                        />
                    </div>
                    <p className="py-5">
                        I'm looking for internships
                    </p>
                </div>
            </div>
            <Link href={`/signup/${rad}`} className="mt-5">
                <Button className="text-lg shadow-xl px-5 cursor-pointer">{rad == "company" ? "Join as a Company" : "Join as an Intern"}</Button>
            </Link>
            <p>Already  have an account? <Link href="/login" className="text-primary underline">Log In</Link></p>
        </div>
    )
}