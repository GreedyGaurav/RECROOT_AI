"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Upload, FileText, Building2, Briefcase } from "lucide-react"

export default function UploadPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    experienceLevel: "",
    workMode: "",
    techStack: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.jobTitle || !formData.companyName || !formData.jobDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/upload-competitor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          jobTitle: formData.jobTitle,
          companyName: formData.companyName,
          jobDescription: formData.jobDescription,
          experienceLevel: formData.experienceLevel || 'Not specified',
          workMode: formData.workMode || 'Not specified',
          techStack: formData.techStack ? formData.techStack.split(',').map(tech => tech.trim()) : []
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Competitor JD uploaded successfully",
        })
        // Reset form
        setFormData({
          jobTitle: "",
          companyName: "",
          jobDescription: "",
          experienceLevel: "",
          workMode: "",
          techStack: ""
        })
      } else {
        toast({
          title: "Upload Failed",
          description: data.error || "Failed to upload competitor JD",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload competitor JD",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 p-4 sm:p-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 w-fit">
            <Upload className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Upload Competitor JD</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Add competitor job descriptions for analysis</p>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
              Competitor Job Description
            </CardTitle>
            <CardDescription className="text-sm">
              Enter the details of a competitor's job description to analyze and compare
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Job Title */}
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-sm font-medium">Job Title *</Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g., Senior React Developer"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  className="text-sm sm:text-base"
                  required
                />
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium">Company Name *</Label>
                <Input
                  id="companyName"
                  placeholder="e.g., Tech Corp Inc."
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="text-sm sm:text-base"
                  required
                />
              </div>

              {/* Experience Level */}
              <div className="space-y-2">
                <Label htmlFor="experienceLevel" className="text-sm font-medium">Experience Level</Label>
                <Select value={formData.experienceLevel} onValueChange={(value) => handleInputChange('experienceLevel', value)}>
                  <SelectTrigger className="text-sm sm:text-base">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="intern">Intern</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="mid">Mid-level</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Work Mode */}
              <div className="space-y-2">
                <Label htmlFor="workMode" className="text-sm font-medium">Work Mode</Label>
                <Select value={formData.workMode} onValueChange={(value) => handleInputChange('workMode', value)}>
                  <SelectTrigger className="text-sm sm:text-base">
                    <SelectValue placeholder="Select work mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2">
                <Label htmlFor="techStack" className="text-sm font-medium">Tech Stack (comma-separated)</Label>
                <Input
                  id="techStack"
                  placeholder="e.g., React, Node.js, MongoDB, TypeScript"
                  value={formData.techStack}
                  onChange={(e) => handleInputChange('techStack', e.target.value)}
                  className="text-sm sm:text-base"
                />
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <Label htmlFor="jobDescription" className="text-sm font-medium">Job Description *</Label>
                <Textarea
                  id="jobDescription"
                  placeholder="Paste the complete job description here..."
                  value={formData.jobDescription}
                  onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                  className="min-h-[150px] sm:min-h-[200px] text-sm sm:text-base"
                  required
                />
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Copy and paste the full job description from the competitor's website or job posting
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button type="submit" disabled={loading} className="w-full sm:w-auto min-w-[150px]">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload JD
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Instructions Card */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />
              How to Use
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="space-y-1 sm:space-y-2">
              <h4 className="font-medium text-sm sm:text-base">Step 1: Find Competitor JDs</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Visit competitor company websites, job boards, or LinkedIn to find job descriptions for similar roles.
              </p>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <h4 className="font-medium text-sm sm:text-base">Step 2: Copy the Content</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Copy the complete job description text, including responsibilities, requirements, and benefits.
              </p>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <h4 className="font-medium text-sm sm:text-base">Step 3: Fill the Form</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Enter the job title, company name, and paste the full job description. Add optional details like experience level and tech stack.
              </p>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <h4 className="font-medium text-sm sm:text-base">Step 4: Analyze</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Once uploaded, you can compare these competitor JDs with your own to identify trends and opportunities.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
