'use client'
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "@/contexts/auth-context";
import { ProfileDropDown } from "./profile-dropdown";

export default function NavBar() {
    const { user } = useAuth();
    return (
        <div className="px-10 py-2 border-b-[1px] border-gray-300 flex items-center gap-20">
            <div className="w-2/10">
                <Link href="/">
                    <Image src="/Interno.png" alt="Interno" width={140} height={140} className="object-contain" />
                </Link>
            </div>
            <div className="flex w-8/10 gap-10 items-center justify-between">
                <div className="flex gap-10 items-center">

                    <Link href="/listing">
                        Internships
                    </Link>
                    <Link href="/listing">
                        Companies
                    </Link>
                    <Link href="/listing">
                        About Interno
                    </Link>
                </div>

                <div className="flex gap-10">
                    <Input name="search" placeholder="Search" />
                    {user ? (
                        <ProfileDropDown user={user} />
                    ) : (

                        <div className="flex gap-3">
                            <Link href="/signin">
                                <Button variant="link">
                                    Log In
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button>
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}