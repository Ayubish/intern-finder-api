"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Clock, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"
import { useInternships } from "@/contexts/internships-context"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

export default function InternshipsPage() {
    const { internships, loading, searchInternships } = useInternships()
    const [searchQuery, setSearchQuery] = useState("")
    const [typeFilter, setTypeFilter] = useState("all")
    const [locationFilter, setLocationFilter] = useState("all")

    const filteredInternships = useMemo(() => {
        let results = searchInternships(searchQuery)

        if (typeFilter !== "all") {
            results = results.filter((internship) => internship.type.toLowerCase() === typeFilter.toLowerCase())
        }

        if (locationFilter !== "all") {
            results = results.filter((internship) => internship.location.toLowerCase().includes(locationFilter.toLowerCase()))
        }

        return results
    }, [searchInternships, searchQuery, typeFilter, locationFilter])




    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-8">Loading Internships...</h1>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[...Array(6)].map((_, i) => (
                                <Card key={i} className="animate-pulse">
                                    <CardHeader>
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="h-3 bg-gray-200 rounded"></div>
                                            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Internship</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover amazing internship opportunities from top companies and kickstart your career journey.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="mb-8 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search internships, companies, or locations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Work Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="remote">Remote</SelectItem>
                                <SelectItem value="on-site">On-site</SelectItem>
                                <SelectItem value="hybrid">Hybrid</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={locationFilter} onValueChange={setLocationFilter}>
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Locations</SelectItem>
                                <SelectItem value="addis ababa">Addis Ababa</SelectItem>
                                <SelectItem value="adama">Adama</SelectItem>
                                <SelectItem value="remote">Remote</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                {/* Internships Grid */}
                {filteredInternships.length === 0 ? (
                    <div className="text-center py-12">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No internships found</h3>
                        <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters.</p>
                        <Button
                            onClick={() => {
                                setSearchQuery("")
                                setTypeFilter("all")
                                setLocationFilter("all")
                            }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredInternships.map((internship) => (
                            <Card key={internship.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                                <Link href={`/internships/${internship.id}`}>
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    src={internship.company.image || "/placeholder.svg"}
                                                    width={100}
                                                    height={100}
                                                    alt={internship.company.name}
                                                    className="w-12 h-12 rounded-lg object-cover"

                                                />
                                                <div>
                                                    <CardTitle className="text-lg line-clamp-1">{internship.title}</CardTitle>
                                                    <CardDescription className="line-clamp-1">{internship.company.name}</CardDescription>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-gray-600 text-sm line-clamp-2">{internship.description}</p>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <MapPin className="h-4 w-4" />
                                                <span>{internship.location}</span>
                                                <Badge variant="outline" className="ml-auto">
                                                    {internship.type}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <DollarSign className="h-4 w-4" />
                                                <span>{internship.salary}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Clock className="h-4 w-4" />
                                                <span>{internship.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Calendar className="h-4 w-4" />
                                                <span>Deadline: {formatDate(internship.deadline)}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-2">
                                            <Badge variant="secondary">{internship.company.industry}</Badge>
                                            <Button size="sm">Apply Now</Button>
                                        </div>
                                    </CardContent>
                                </Link>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
