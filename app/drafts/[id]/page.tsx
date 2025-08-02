"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Copy, Calendar, User, Briefcase, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function DraftDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [draft, setDraft] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params.id) return
    setLoading(true)
    fetch(`/api/drafts/${params.id}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.draft) {
          setDraft(data.draft)
        } else {
          toast({
            title: "Error",
            description: "Draft not found",
            variant: "destructive",
          })
          router.push('/drafts')
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        toast({
          title: "Error",
          description: "Failed to load draft",
          variant: "destructive",
        })
        router.push('/drafts')
      })
  }, [params.id, router, toast])

  const handleCopy = async () => {
    if (!draft) return

    const jdText = `
Job Title: ${draft.jobTitle}
Experience Level: ${draft.experienceLevel}
Work Mode: ${draft.workMode}
Tech Stack: ${draft.techStack.join(', ')}

About Us:
${draft.generatedContent.aboutUs}

Responsibilities:
${draft.generatedContent.responsibilities.map((r: string) => `• ${r}`).join('\n')}

Required Skills:
${draft.generatedContent.requiredSkills.map((s: string) => `• ${s}`).join('\n')}

Benefits:
${draft.generatedContent.benefits.map((b: string) => `• ${b}`).join('\n')}
    `.trim()

    try {
      await navigator.clipboard.writeText(jdText)
      toast({
        title: "Copied to Clipboard",
        description: "Job description has been copied to your clipboard",
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 p-4 sm:p-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <Skeleton className="h-8 w-8 sm:h-10 sm:w-10" />
            <Skeleton className="h-6 w-48 sm:h-8 sm:w-64" />
          </div>
          <div className="space-y-3 sm:space-y-4">
            <Skeleton className="h-24 sm:h-32 w-full" />
            <Skeleton className="h-24 sm:h-32 w-full" />
            <Skeleton className="h-24 sm:h-32 w-full" />
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!draft) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 p-4 sm:p-0">
          <div className="text-center py-8 sm:py-12">
            <p className="text-muted-foreground">Draft not found</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 p-4 sm:p-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/drafts')}
              className="w-fit"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Back to Drafts</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                {draft.jobTitle}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Created on {new Date(draft.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <Button onClick={handleCopy} className="w-full sm:w-auto">
            <Copy className="mr-2 h-4 w-4" />
            Copy JD
          </Button>
        </div>

        {/* Job Details */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">Job Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Experience:</span>
                <Badge variant="outline" className="text-xs">{draft.experienceLevel}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Work Mode:</span>
                <Badge variant="outline" className="text-xs">{draft.workMode}</Badge>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-1">
                <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Created:</span>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {new Date(draft.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            {draft.techStack.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs sm:text-sm font-medium">Tech Stack:</span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {draft.techStack.map((tech: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {draft.aboutCompany && (
              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-medium">About Company:</span>
                <p className="text-xs sm:text-sm text-muted-foreground">{draft.aboutCompany}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Generated Content */}
        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl">About Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-foreground leading-relaxed">
                {draft.generatedContent.aboutUs}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl">Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 sm:space-y-3">
                {draft.generatedContent.responsibilities.map((resp: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3">
                    <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                    <span className="text-sm sm:text-base text-foreground leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl">Required Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 sm:space-y-3">
                {draft.generatedContent.requiredSkills.map((skill: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3">
                    <span className="text-green-600 mt-1 flex-shrink-0">•</span>
                    <span className="text-sm sm:text-base text-foreground leading-relaxed">{skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl">Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 sm:space-y-3">
                {draft.generatedContent.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3">
                    <span className="text-purple-600 mt-1 flex-shrink-0">•</span>
                    <span className="text-sm sm:text-base text-foreground leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
} 