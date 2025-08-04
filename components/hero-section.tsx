"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, Zap, Target } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--page-bg-gradient-start)] via-[var(--page-bg-gradient-via)] to-[var(--page-bg-gradient-end)] relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--hero-bg-purple)] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--hero-bg-blue)] rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-[var(--hero-bg-pink)] rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute top-10 right-10 w-32 h-32 bg-[var(--hero-bg-cyan)] rounded-full blur-2xl animate-pulse delay-700" />
      </div>

      {/* Enhanced Navbar */}
      <nav className="sticky top-0 z-50 bg-[var(--card-bg-alpha)]/30 backdrop-blur-xl border-b border-[var(--card-border-alpha)]/10">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--nav-gradient-start)] to-[var(--nav-gradient-end)] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2 group animate-in slide-in-from-left duration-700">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="relative p-1.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white animate-pulse" />
                </div>
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[var(--text-gradient-primary-start)] to-[var(--text-gradient-primary-via)] bg-clip-text text-transparent group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
                Recroot AI
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 animate-in slide-in-from-right duration-700">
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:inline-flex bg-[var(--card-bg-alpha)]/10 border-[var(--card-border-alpha)]/20 text-white hover:bg-[var(--card-bg-alpha)]/20 hover:border-[var(--card-border-alpha)]/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white font-semibold transition-all duration-300 hover:scale-105 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative text-xs sm:text-sm">Get Started</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 relative">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight animate-in slide-in-from-bottom duration-700 text-white">
            <span>
              Write Smarter Job Descriptions
            </span>
            <br />
            <span className="animate-pulse">
              with AI
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[var(--hero-text)] mb-6 sm:mb-8 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed animate-in slide-in-from-bottom duration-700 delay-200">
            Generate compelling, optimized job postings in seconds. Our AI analyzes top-performing job descriptions to
            help you attract the best candidates.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-in slide-in-from-bottom duration-700 delay-400">
            <Link href="/register">
              <Button
                size="lg"
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 border-0 text-white font-semibold text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative">Get Started Free</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="bg-[var(--card-bg-alpha)]/10 border-[var(--card-border-alpha)]/20 text-white hover:bg-[var(--card-bg-alpha)]/20 hover:border-[var(--card-border-alpha)]/30 backdrop-blur-sm text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 w-full sm:w-auto transition-all duration-300 hover:scale-105"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Enhanced Features */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Feature Card 1 */}
          <div className="group relative overflow-hidden text-center p-4 sm:p-6 rounded-2xl bg-[var(--card-bg-alpha)]/10 backdrop-blur-xl border border-[var(--card-border-alpha)]/10 hover:border-[var(--card-border-alpha)]/20 hover:bg-[var(--card-bg-alpha)]/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 animate-in slide-in-from-bottom duration-700 delay-600">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all duration-500" />

            <div className="relative z-10">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-blue-500/25">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white group-hover:text-blue-200 transition-colors duration-300">
                AI-Powered Generation
              </h3>
              <p className="text-sm sm:text-base text-white/70 group-hover:text-white/90 leading-relaxed transition-colors duration-300">
                Create job descriptions in seconds with our advanced AI technology
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>

          {/* Feature Card 2 */}
          <div className="group relative overflow-hidden text-center p-4 sm:p-6 rounded-2xl bg-[var(--card-bg-alpha)]/10 backdrop-blur-xl border border-[var(--card-border-alpha)]/10 hover:border-[var(--card-border-alpha)]/20 hover:bg-[var(--card-bg-alpha)]/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 animate-in slide-in-from-bottom duration-700 delay-700">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all duration-500" />

            <div className="relative z-10">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-purple-500/25">
                <Target className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white group-hover:text-purple-200 transition-colors duration-300">
                Competitor Analysis
              </h3>
              <p className="text-sm sm:text-base text-white/70 group-hover:text-white/90 leading-relaxed transition-colors duration-300">
                Upload competitor JDs and get optimized versions instantly
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>

          {/* Feature Card 3 */}
          <div className="group relative overflow-hidden text-center p-4 sm:p-6 rounded-2xl bg-[var(--card-bg-alpha)]/10 backdrop-blur-xl border border-[var(--card-border-alpha)]/10 hover:border-[var(--card-border-alpha)]/20 hover:bg-[var(--card-bg-alpha)]/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 sm:col-span-2 lg:col-span-1 animate-in slide-in-from-bottom duration-700 delay-800">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-500/10 rounded-full blur-xl group-hover:bg-green-500/20 transition-all duration-500" />

            <div className="relative z-10">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-green-500/25">
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white animate-pulse" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white group-hover:text-green-200 transition-colors duration-300">
                Smart Optimization
              </h3>
              <p className="text-sm sm:text-base text-white/70 group-hover:text-white/90 leading-relaxed transition-colors duration-300">
                Improve existing job posts with AI-driven recommendations
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-500/30 rounded-full animate-bounce delay-1000" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-500/30 rounded-full animate-bounce delay-1500" />
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-pink-500/30 rounded-full animate-bounce delay-2000" />
      </div>
    </div>
  )
}