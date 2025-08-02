"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, Zap, Target } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-lg sm:text-xl font-bold text-foreground">Recroot AI</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <ThemeToggle />
              <Link href="/login">
                <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-xs sm:text-sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            Write Smarter Job Descriptions
            <span className="text-blue-600 dark:text-blue-400"> with AI</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed">
            Generate compelling, optimized job postings in seconds. Our AI analyzes top-performing job descriptions to
            help you attract the best candidates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 w-full sm:w-auto"
              >
                Get Started Free
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 w-full sm:w-auto"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="text-center p-4 sm:p-6 rounded-lg bg-card border hover:shadow-md transition-shadow">
            <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">AI-Powered Generation</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">Create job descriptions in seconds with our advanced AI technology</p>
          </div>
          <div className="text-center p-4 sm:p-6 rounded-lg bg-card border hover:shadow-md transition-shadow">
            <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Target className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">Competitor Analysis</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">Upload competitor JDs and get optimized versions instantly</p>
          </div>
          <div className="text-center p-4 sm:p-6 rounded-lg bg-card border hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
            <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">Smart Optimization</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">Improve existing job posts with AI-driven recommendations</p>
          </div>
        </div>
      </div>
    </div>
  )
}
