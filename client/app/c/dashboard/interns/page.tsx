"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Search,
    MoreHorizontal,
    Eye,
    Calendar,
    Mail,
    Plus,
    Star,
    Clock,
    CheckCircle,
    BookOpen,
    Award,
} from "lucide-react"

const interns = [
    {
        id: 1,
        name: "Alex Thompson",
        email: "alex.thompson@email.com",
        department: "Engineering",
        supervisor: "Sarah Johnson",
        startDate: "2024-01-08",
        endDate: "2024-04-08",
        status: "Active",
        progress: 65,
        university: "Stanford University",
        avatar: "/placeholder.svg?height=40&width=40&text=AT",
        tasks: 12,
        completedTasks: 8,
        rating: 4.5,
    },
    {
        id: 2,
        name: "Maya Patel",
        email: "maya.patel@email.com",
        department: "Design",
        supervisor: "Michael Chen",
        startDate: "2024-01-15",
        endDate: "2024-04-15",
        status: "Active",
        progress: 45,
        university: "MIT",
        avatar: "/placeholder.svg?height=40&width=40&text=MP",
        tasks: 10,
        completedTasks: 4,
        rating: 4.2,
    },
    {
        id: 3,
        name: "David Kim",
        email: "david.kim@email.com",
        department: "Marketing",
        supervisor: "Emily Davis",
        startDate: "2023-09-01",
        endDate: "2023-12-01",
        status: "Completed",
        progress: 100,
        university: "UC Berkeley",
        avatar: "/placeholder.svg?height=40&width=40&text=DK",
        tasks: 15,
        completedTasks: 15,
        rating: 4.8,
    },
    {
        id: 4,
        name: "Sophie Chen",
        email: "sophie.chen@email.com",
        department: "Data Science",
        supervisor: "James Wilson",
        startDate: "2024-02-01",
        endDate: "2024-05-01",
        status: "Starting Soon",
        progress: 0,
        university: "Harvard University",
        avatar: "/placeholder.svg?height=40&width=40&text=SC",
        tasks: 0,
        completedTasks: 0,
        rating: 0,
    },
]

const getStatusColor = (status: string) => {
    switch (status) {
        case "Active":
            return "bg-green-100 text-green-800"
        case "Starting Soon":
            return "bg-blue-100 text-blue-800"
        case "Completed":
            return "bg-purple-100 text-purple-800"
        case "On Hold":
            return "bg-yellow-100 text-yellow-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

export default function Interns() {
    const [searchTerm, setSearchTerm] = useState("")
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

    const filteredInterns = interns.filter(
        (intern) =>
            intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            intern.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            intern.university.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Interns</h1>
                    <p className="text-muted-foreground">Manage your internship program and track intern progress.</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Intern
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Add New Intern</DialogTitle>
                            <DialogDescription>Add a new intern to your program.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Full Name
                                </Label>
                                <Input id="name" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input id="email" type="email" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="department" className="text-right">
                                    Department
                                </Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="engineering">Engineering</SelectItem>
                                        <SelectItem value="design">Design</SelectItem>
                                        <SelectItem value="marketing">Marketing</SelectItem>
                                        <SelectItem value="data-science">Data Science</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="university" className="text-right">
                                    University
                                </Label>
                                <Input id="university" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="supervisor" className="text-right">
                                    Supervisor
                                </Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select supervisor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                                        <SelectItem value="michael">Michael Chen</SelectItem>
                                        <SelectItem value="emily">Emily Davis</SelectItem>
                                        <SelectItem value="james">James Wilson</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>
                                Add Intern
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Interns</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{interns.filter((i) => i.status === "Active").length}</div>
                        <p className="text-xs text-muted-foreground">Currently working</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed Programs</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{interns.filter((i) => i.status === "Completed").length}</div>
                        <p className="text-xs text-muted-foreground">This year</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.4</div>
                        <p className="text-xs text-muted-foreground">Out of 5.0</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Starting Soon</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{interns.filter((i) => i.status === "Starting Soon").length}</div>
                        <p className="text-xs text-muted-foreground">Next month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search interns..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Interns Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Interns</CardTitle>
                    <CardDescription>{filteredInterns.length} interns found</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Intern</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Supervisor</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Progress</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredInterns.map((intern) => (
                                <TableRow key={intern.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={intern.avatar || "/placeholder.svg"}
                                                alt={intern.name}
                                                className="h-10 w-10 rounded-full"
                                            />
                                            <div>
                                                <div className="font-medium">{intern.name}</div>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <BookOpen className="mr-1 h-3 w-3" />
                                                    {intern.university}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{intern.department}</TableCell>
                                    <TableCell>{intern.supervisor}</TableCell>
                                    <TableCell>
                                        <div className="text-sm">
                                            <div>{intern.startDate}</div>
                                            <div className="text-muted-foreground">to {intern.endDate}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span>{intern.progress}%</span>
                                                <span className="text-muted-foreground">
                                                    {intern.completedTasks}/{intern.tasks} tasks
                                                </span>
                                            </div>
                                            <Progress value={intern.progress} className="h-2" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(intern.status)}>{intern.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        {intern.rating > 0 ? (
                                            <div className="flex items-center">
                                                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                {intern.rating}
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground">N/A</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <BookOpen className="mr-2 h-4 w-4" />
                                                    View Tasks
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Calendar className="mr-2 h-4 w-4" />
                                                    Schedule Meeting
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Mail className="mr-2 h-4 w-4" />
                                                    Send Email
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Star className="mr-2 h-4 w-4" />
                                                    Rate Performance
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
