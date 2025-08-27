"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useAuth } from "@/contexts/auth-context"
import { ProfileDropDown } from "./profile-dropdown"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, Search } from "lucide-react"

export default function NavBar() {
    const { user } = useAuth()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const pathname = usePathname()

    const navigation = [
        { title: "Internships", url: "/internships" },
        { title: "Companies", url: "/companies" },
        { title: "About Interno", url: "/about" },
    ]

    return (
        <nav className="sticky top-0 bg-white backdrop-blur-sm border-b border-gray-200 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <Image src="/Interno.png" alt="Interno" width={120} height={40} className="object-contain" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navigation.map((item) => {
                            const isActive = pathname.startsWith(item.url)
                            return (
                                <Link
                                    key={item.title}
                                    href={item.url}
                                    className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary border-b-2 border-primary pb-1" : "text-gray-700 hover:text-gray-900"
                                        }`}
                                >
                                    {item.title}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Desktop Search & Auth */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                name="search"
                                placeholder="Search internships..."
                                className="pl-10 w-64 bg-gray-50 border-gray-200 focus:bg-white"
                            />
                        </div>

                        {user ? (
                            <ProfileDropDown user={user} />
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link href="/signin">
                                    <Button variant="ghost" size="sm" className="font-medium">
                                        Log In
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button size="sm" className="font-medium">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button and search */}
                    <div className="lg:hidden flex items-center space-x-2">
                        {user && (
                            <div className="px-5">
                                <ProfileDropDown user={user} />
                            </div>
                        )}
                        {/* <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2">
                            <Search className="h-5 w-5" />
                        </Button> */}

                        <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Search */}
                {isSearchOpen && (
                    <div className="md:hidden py-3 border-t border-gray-200">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                name="search"
                                placeholder="Search internships..."
                                className="pl-10 w-full bg-gray-50 border-gray-200 focus:bg-white"
                            />
                        </div>
                    </div>
                )}

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => {
                                const isActive = pathname.startsWith(item.url)
                                return (
                                    <Link
                                        key={item.title}
                                        href={item.url}
                                        className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${isActive ? "text-primary bg-primary/10" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                            }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.title}
                                    </Link>
                                )
                            })}
                        </div>

                        {/* Mobile Auth */}
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            {user ? (
                                <div className="px-5">
                                    <ProfileDropDown user={user} />
                                </div>
                            ) : (
                                <div className="px-5 space-y-3">
                                    <Link href="/signin" className="block">
                                        <Button variant="outline" className="w-full justify-center bg-transparent">
                                            Log In
                                        </Button>
                                    </Link>
                                    <Link href="/signup" className="block">
                                        <Button className="w-full justify-center">Sign Up</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
