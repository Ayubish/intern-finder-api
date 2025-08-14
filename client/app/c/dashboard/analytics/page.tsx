"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Users,
    Eye,
    Clock,
    Target,
    Download,
    Calendar,
    MapPin,
    Briefcase,
    Star,
} from "lucide-react"

const analyticsData = {
    overview: {
        totalJobs: 12,
        activeJobs: 8,
        totalApplications: 248,
        totalViews: 5890,
        averageTimeToFill: 21,
        applicationRate: 4.2,
        hireRate: 12.5,
        interviewToHireRate: 35.2,
    },
    topPerformingJobs: [
        {
            title: "Senior Frontend Developer",
            applications: 45,
            views: 1250,
            conversionRate: 3.6,
            status: "Active",
            department: "Engineering",
        },
        {
            title: "Backend Developer",
            applications: 67,
            views: 2100,
            conversionRate: 3.2,
            status: "Closed",
            department: "Engineering",
        },
        {
            title: "UX Designer",
            applications: 32,
            views: 890,
            conversionRate: 3.6,
            status: "Active",
            department: "Design",
        },
        {
            title: "Product Manager",
            applications: 28,
            views: 750,
            conversionRate: 3.7,
            status: "Active",
            department: "Product",
        },
    ],
    departmentStats: [
        { department: "Engineering", jobs: 6, applications: 156, avgTimeToFill: 18, hires: 8 },
        { department: "Design", jobs: 2, applications: 45, avgTimeToFill: 25, hires: 3 },
        { department: "Product", jobs: 2, applications: 28, avgTimeToFill: 30, hires: 2 },
        { department: "Marketing", jobs: 1, applications: 12, avgTimeToFill: 15, hires: 1 },
        { department: "Analytics", jobs: 1, applications: 7, avgTimeToFill: 0, hires: 0 },
    ],
    monthlyTrends: [
        { month: "Sep", applications: 67, views: 1800, hires: 4 },
        { month: "Oct", applications: 89, views: 2100, hires: 6 },
        { month: "Nov", applications: 124, views: 2890, hires: 8 },
        { month: "Dec", applications: 156, views: 3200, hires: 12 },
        { month: "Jan", applications: 134, views: 2950, hires: 9 },
    ],
    sourceAnalytics: [
        { source: "Company Website", applications: 89, percentage: 36 },
        { source: "LinkedIn", applications: 67, percentage: 27 },
        { source: "Indeed", applications: 45, percentage: 18 },
        { source: "Referrals", applications: 32, percentage: 13 },
        { source: "Other", applications: 15, percentage: 6 },
    ],
    locationInsights: [
        { location: "San Francisco, CA", applications: 78, avgSalary: "$145k" },
        { location: "New York, NY", applications: 56, avgSalary: "$135k" },
        { location: "Remote", applications: 89, avgSalary: "$125k" },
        { location: "Austin, TX", applications: 25, avgSalary: "$115k" },
    ],
}

export default function Analytics() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                    <p className="text-muted-foreground">Insights into your hiring performance and trends</p>
                </div>
                <div className="flex gap-2">
                    <Select defaultValue="30days">
                        <SelectTrigger className="w-[150px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7days">Last 7 days</SelectItem>
                            <SelectItem value="30days">Last 30 days</SelectItem>
                            <SelectItem value="90days">Last 90 days</SelectItem>
                            <SelectItem value="1year">Last year</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export Report
                    </Button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analyticsData.overview.totalApplications}</div>
                        <div className="flex items-center text-xs text-green-600">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            +12% from last month
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analyticsData.overview.totalViews.toLocaleString()}</div>
                        <div className="flex items-center text-xs text-green-600">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            +8% from last month
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Application Rate</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analyticsData.overview.applicationRate}%</div>
                        <div className="flex items-center text-xs text-red-600">
                            <TrendingDown className="mr-1 h-3 w-3" />
                            -0.3% from last month
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Time to Fill</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analyticsData.overview.averageTimeToFill} days</div>
                        <div className="flex items-center text-xs text-green-600">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            -2 days from last month
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="performance">Job Performance</TabsTrigger>
                    <TabsTrigger value="departments">Departments</TabsTrigger>
                    <TabsTrigger value="sources">Sources</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Hire Rate</CardTitle>
                                <Target className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{analyticsData.overview.hireRate}%</div>
                                <p className="text-xs text-muted-foreground">Applications to hires</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Interview Success</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{analyticsData.overview.interviewToHireRate}%</div>
                                <p className="text-xs text-muted-foreground">Interviews to hires</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{analyticsData.overview.activeJobs}</div>
                                <p className="text-xs text-muted-foreground">Currently hiring</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{analyticsData.overview.totalJobs}</div>
                                <p className="text-xs text-muted-foreground">All time</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Monthly Trends */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Trends</CardTitle>
                            <CardDescription>Application and hiring trends over the last 5 months</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {analyticsData.monthlyTrends.map((month, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">{month.month} 2024</span>
                                        </div>
                                        <div className="flex items-center gap-6 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Users className="h-3 w-3 text-blue-600" />
                                                <span>{month.applications} applications</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Eye className="h-3 w-3 text-green-600" />
                                                <span>{month.views.toLocaleString()} views</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Target className="h-3 w-3 text-purple-600" />
                                                <span>{month.hires} hires</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="performance" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Performing Jobs</CardTitle>
                            <CardDescription>Jobs with the highest application rates and performance</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {analyticsData.topPerformingJobs.map((job, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">{job.title}</p>
                                                <Badge variant="outline">{job.department}</Badge>
                                                <Badge variant={job.status === "Active" ? "default" : "secondary"} className="text-xs">
                                                    {job.status}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span>{job.applications} applications</span>
                                                <span>{job.views} views</span>
                                                <span>{job.conversionRate}% conversion</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="font-medium">{job.conversionRate}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground">conversion rate</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="departments" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Department Performance</CardTitle>
                            <CardDescription>Hiring metrics and performance by department</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {analyticsData.departmentStats.map((dept, index) => (
                                    <div key={index} className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{dept.department}</span>
                                                <Badge variant="outline">{dept.jobs} jobs</Badge>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {dept.hires} hires • {dept.applications} applications
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Applications</span>
                                                <span>{dept.applications}</span>
                                            </div>
                                            <Progress value={(dept.applications / 156) * 100} className="h-2" />
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <span>Avg. time to fill: {dept.avgTimeToFill > 0 ? `${dept.avgTimeToFill} days` : "N/A"}</span>
                                            <span>
                                                Hire rate: {dept.applications > 0 ? Math.round((dept.hires / dept.applications) * 100) : 0}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="sources" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Application Sources</CardTitle>
                                <CardDescription>Where your applications are coming from</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {analyticsData.sourceAnalytics.map((source, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">{source.source}</span>
                                                <span className="text-sm text-muted-foreground">{source.applications} applications</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Progress value={source.percentage} className="h-2 flex-1" />
                                                <span className="text-sm text-muted-foreground w-10">{source.percentage}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Location Insights</CardTitle>
                                <CardDescription>Application distribution by location</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {analyticsData.locationInsights.map((location, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium">{location.location}</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-medium">{location.applications} applications</div>
                                                <div className="text-xs text-muted-foreground">Avg: {location.avgSalary}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recommendations */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recommendations</CardTitle>
                            <CardDescription>AI-powered insights to improve your hiring process</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                    <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">Optimize job titles</p>
                                        <p className="text-xs text-muted-foreground">
                                            Consider using "Software Engineer" instead of "Developer" to increase visibility by 23%
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                                    <Target className="h-5 w-5 text-green-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">Improve application rate</p>
                                        <p className="text-xs text-muted-foreground">
                                            Add salary ranges to job postings to increase application rates by up to 30%
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                                    <Clock className="h-5 w-5 text-orange-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">Reduce time to hire</p>
                                        <p className="text-xs text-muted-foreground">
                                            Schedule interviews within 3 days of application to reduce candidate drop-off
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                                    <Users className="h-5 w-5 text-purple-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">Expand sourcing channels</p>
                                        <p className="text-xs text-muted-foreground">
                                            Consider posting on GitHub Jobs and AngelList to reach more technical candidates
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
