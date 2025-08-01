"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, FileText, Upload, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function DashboardHome() {
  const { user } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalDrafts: 0,
    optimizedJDs: 0,
    competitorJDs: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    setLoading(true)
    
    // Fetch drafts and competitors in parallel
    Promise.all([
      fetch('/api/drafts', { credentials: 'include' }),
      fetch('/api/competitors', { credentials: 'include' })
    ])
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(([draftsData, competitorsData]) => {
        const drafts = draftsData.drafts || []
        const competitors = competitorsData.competitors || []
        
        setStats({
          totalDrafts: drafts.length,
          optimizedJDs: drafts.filter((d: any) => !d.isDraft).length,
          competitorJDs: competitors.length,
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [user])

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground mt-2">Here's what's happening with your job descriptions</p>
        </div>
        <Button onClick={() => router.push('/create')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New JD
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Drafts Created</CardTitle>
            <div className="p-2 rounded-full bg-blue-100 dark:bg-opacity-20">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats.totalDrafts}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Optimized JDs</CardTitle>
            <div className="p-2 rounded-full bg-green-100 dark:bg-opacity-20">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats.optimizedJDs}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Competitor JDs Uploaded</CardTitle>
            <div className="p-2 rounded-full bg-purple-100 dark:bg-opacity-20">
              <Upload className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats.competitorJDs}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={() => router.push('/create')}>
          <CardHeader className="pb-3">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20 w-fit">
              <PlusCircle className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle className="text-lg">Create New JD</CardTitle>
            <CardDescription>Generate a new job description using AI</CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={() => router.push('/drafts')}>
          <CardHeader className="pb-3">
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20 w-fit">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
            <CardTitle className="text-lg">View Drafts</CardTitle>
            <CardDescription>Manage your saved job descriptions</CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={() => router.push('/upload')}>
          <CardHeader className="pb-3">
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/20 w-fit">
              <Upload className="h-5 w-5 text-purple-600" />
            </div>
            <CardTitle className="text-lg">Upload Competitor</CardTitle>
            <CardDescription>Add competitor JDs for analysis</CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={() => router.push('/settings')}>
          <CardHeader className="pb-3">
            <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-900/20 w-fit">
              <TrendingUp className="h-5 w-5 text-gray-600" />
            </div>
            <CardTitle className="text-lg">Analytics</CardTitle>
            <CardDescription>View insights and trends</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
