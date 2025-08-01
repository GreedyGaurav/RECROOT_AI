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
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-64" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!draft) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Draft not found</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/drafts')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Drafts
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{draft.jobTitle}</h1>
              <p className="text-muted-foreground">Created on {new Date(draft.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <Button onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Copy JD
          </Button>
        </div>

        {/* Job Details */}
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Experience:</span>
                <Badge variant="outline">{draft.experienceLevel}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Work Mode:</span>
                <Badge variant="outline">{draft.workMode}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Created:</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(draft.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            {draft.techStack.length > 0 && (
              <div>
                <span className="text-sm font-medium">Tech Stack:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {draft.techStack.map((tech: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {draft.aboutCompany && (
              <div>
                <span className="text-sm font-medium">About Company:</span>
                <p className="text-sm text-muted-foreground mt-1">{draft.aboutCompany}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Generated Content */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{draft.generatedContent.aboutUs}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {draft.generatedContent.responsibilities.map((resp: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-foreground">{resp}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Required Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {draft.generatedContent.requiredSkills.map((skill: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span className="text-foreground">{skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {draft.generatedContent.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-foreground">{benefit}</span>
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