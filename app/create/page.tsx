"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sparkles, Copy, Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const techStackOptions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "Go",
  "Rust",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  "C++",
  "C#",
]

export default function CreatePage() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    techStack: [] as string[],
    experienceLevel: "",
    workMode: "",
    aboutCompany: "",
  })
  const [generatedJD, setGeneratedJD] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const [techStackInput, setTechStackInput] = useState("")

  const handleGenerate = async () => {
    if (!formData.jobTitle || !formData.experienceLevel || !formData.workMode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate-jd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          jobTitle: formData.jobTitle,
          techStack: formData.techStack,
          experienceLevel: formData.experienceLevel,
          workMode: formData.workMode,
          aboutCompany: formData.aboutCompany,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setGeneratedJD(data.jobDescription)
        toast({
          title: "Success!",
          description: "Job description generated successfully",
        })
      } else {
        toast({
          title: "Generation Failed",
          description: data.error || "Failed to generate job description",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Generate error:', error)
      toast({
        title: "Error",
        description: "Failed to generate job description. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveDraft = async () => {
    if (!generatedJD) {
      toast({
        title: "No Content",
        description: "Please generate a job description first",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch('/api/save-draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          jobTitle: formData.jobTitle,
          techStack: formData.techStack,
          experienceLevel: formData.experienceLevel,
          workMode: formData.workMode,
          aboutCompany: formData.aboutCompany,
          generatedContent: generatedJD,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Draft Saved",
          description: "Your job description has been saved to drafts",
        })
      } else {
        toast({
          title: "Save Failed",
          description: data.error || "Failed to save draft",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Save error:', error)
      toast({
        title: "Error",
        description: "Failed to save draft. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCopyJD = async () => {
    if (!generatedJD) return

    const jdText = `
About Us:
${generatedJD.aboutUs}

Responsibilities:
${generatedJD.responsibilities.map((r: string) => `• ${r}`).join("\n")}

Required Skills:
${generatedJD.requiredSkills.map((s: string) => `• ${s}`).join("\n")}

Benefits:
${generatedJD.benefits.map((b: string) => `• ${b}`).join("\n")}
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
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create New Job Description</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Fill in the details and let AI generate a compelling job description
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Form */}
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl">Job Details</CardTitle>
              <CardDescription className="text-sm">Provide information about the role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-sm font-medium">Job Title *</Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g. Senior Frontend Developer"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))}
                  className="text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Tech Stack</Label>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      placeholder="Add tech stack (e.g. React, Node.js, Python...)"
                      value={techStackInput}
                      onChange={(e) => setTechStackInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          if (techStackInput.trim() && !formData.techStack.includes(techStackInput.trim())) {
                            setFormData((prev) => ({
                              ...prev,
                              techStack: [...prev.techStack, techStackInput.trim()],
                            }))
                            setTechStackInput("")
                          }
                        }
                      }}
                      className="text-sm sm:text-base"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        if (techStackInput.trim() && !formData.techStack.includes(techStackInput.trim())) {
                          setFormData((prev) => ({
                            ...prev,
                            techStack: [...prev.techStack, techStackInput.trim()],
                          }))
                          setTechStackInput("")
                        }
                      }}
                      className="w-full sm:w-auto"
                    >
                      Add
                    </Button>
                  </div>

                  {/* Display added tech stack */}
                  {formData.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {formData.techStack.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="default"
                          className="cursor-pointer text-xs"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              techStack: prev.techStack.filter((_, i) => i !== index),
                            }))
                          }}
                        >
                          {tech}
                          <X className="ml-1 h-3 w-3" />
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Suggested tech stack */}
                  <div className="space-y-2">
                    <Label className="text-xs sm:text-sm text-muted-foreground">Popular suggestions:</Label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {techStackOptions
                        .filter((tech) => !formData.techStack.includes(tech))
                        .map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="cursor-pointer hover:bg-muted text-xs"
                            onClick={() => {
                              if (!formData.techStack.includes(tech)) {
                                setFormData((prev) => ({
                                  ...prev,
                                  techStack: [...prev.techStack, tech],
                                }))
                              }
                            }}
                          >
                            {tech}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Experience Level *</Label>
                <Select
                  value={formData.experienceLevel}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, experienceLevel: value }))}
                >
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

              <div className="space-y-2">
                <Label className="text-sm font-medium">Work Mode *</Label>
                <RadioGroup
                  value={formData.workMode}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, workMode: value }))}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="remote" id="remote" />
                    <Label htmlFor="remote" className="text-sm">Remote</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="onsite" id="onsite" />
                    <Label htmlFor="onsite" className="text-sm">On-site</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hybrid" id="hybrid" />
                    <Label htmlFor="hybrid" className="text-sm">Hybrid</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aboutCompany" className="text-sm font-medium">About Company (Optional)</Label>
                <Textarea
                  id="aboutCompany"
                  placeholder="Brief description of your company..."
                  value={formData.aboutCompany}
                  onChange={(e) => setFormData((prev) => ({ ...prev, aboutCompany: e.target.value }))}
                  className="text-sm sm:text-base min-h-[80px]"
                />
              </div>

              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate JD
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated JD */}
          {generatedJD && (
            <Card className="lg:sticky lg:top-6 lg:h-fit">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">Generated Job Description</CardTitle>
                <CardDescription className="text-sm">AI-generated content based on your inputs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-base sm:text-lg text-foreground">About Us</h3>
                  <p className="text-sm sm:text-base text-foreground leading-relaxed">{generatedJD.aboutUs}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-base sm:text-lg text-foreground">Responsibilities</h3>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {generatedJD.responsibilities.map((resp: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                        <span className="text-sm sm:text-base text-foreground leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-base sm:text-lg text-foreground">Required Skills</h3>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {generatedJD.requiredSkills.map((skill: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1 flex-shrink-0">•</span>
                        <span className="text-sm sm:text-base text-foreground leading-relaxed">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-base sm:text-lg text-foreground">Benefits</h3>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {generatedJD.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1 flex-shrink-0">•</span>
                        <span className="text-sm sm:text-base text-foreground leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                  <Button onClick={handleSaveDraft} disabled={isSaving} variant="outline" className="w-full sm:w-auto">
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Draft
                      </>
                    )}
                  </Button>
                  <Button onClick={handleCopyJD} className="w-full sm:w-auto">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy JD
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
