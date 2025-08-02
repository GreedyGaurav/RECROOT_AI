"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { Copy, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function DraftsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [drafts, setDrafts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    setLoading(true)
    fetch('/api/drafts', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setDrafts(data.drafts || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [user])

  const handleViewDraft = (draftId: string) => {
    router.push(`/drafts/${draftId}`)
  }

  const handleCopyDraft = async (draft: any) => {
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

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 p-4 sm:p-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Your Saved Drafts</h1>
        {loading ? (
          <div className="space-y-3 sm:space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-20 sm:h-24 w-full rounded-lg" />
            ))}
          </div>
        ) : drafts.length === 0 ? (
          <div className="text-muted-foreground text-center py-8 sm:py-12">
            <p className="text-sm sm:text-base">No drafts found. Create your first job description!</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {drafts.map((draft) => (
              <Card key={draft._id} className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-3 sm:pb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div className="flex-1 cursor-pointer space-y-1" onClick={() => handleViewDraft(draft._id)}>
                      <CardTitle className="text-lg sm:text-xl hover:text-blue-600 transition-colors leading-tight">
                        {draft.jobTitle}
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        Created: {new Date(draft.createdAt).toLocaleString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDraft(draft._id)}
                        className="flex-1 sm:flex-none"
                      >
                        <Eye className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyDraft(draft)}
                        className="flex-1 sm:flex-none"
                      >
                        <Copy className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Copy</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {draft.generatedContent?.aboutUs?.slice(0, 100)}{draft.generatedContent?.aboutUs?.length > 100 ? '...' : ''}
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {draft.experienceLevel}
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {draft.workMode}
                    </span>
                    {draft.techStack.slice(0, 2).map((tech: string, index: number) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {draft.techStack.length > 2 && (
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        +{draft.techStack.length - 2} more
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
