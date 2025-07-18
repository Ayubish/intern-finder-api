import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function NavBar() {
    return (
        <div className="px-10 py-5 border-b-[1px] border-gray-300 flex items-center gap-20">
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

                <div className="flex">
                    <Input name="search" placeholder="Search" />
                    <div className="flex gap-3">
                        <Button variant="link">
                            Log In
                        </Button>
                        <Link href="/signup">
                            <Button>
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}