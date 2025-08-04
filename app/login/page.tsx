"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, XCircle } from "lucide-react" // Added XCircle for error messages

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if user just registered
    if (searchParams.get("registered") === "true") {
      setSuccessMessage("Registration successful! Please login with your new account.")
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("") // Clear success message on new attempt
    setLoading(true)
    const result = await login(email, password)

    if (result.success) {
      router.push("/")
    } else {
      setError(result.error || "Login failed")
    }

    setLoading(false)
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[var(--page-bg-gradient-start)] via-[var(--page-bg-gradient-via)] to-[var(--page-bg-gradient-end)] overflow-hidden p-4 sm:p-6">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <Card className="relative z-10 w-full max-w-md group overflow-hidden border-0 bg-black/5 backdrop-blur-xl hover:scale-[1.01] transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-purple-500/25 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="space-y-2 p-6 sm:p-8 relative z-10 border-b border-white/10">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-[var(--text-gradient-primary-start)] to-[var(--text-gradient-primary-via)] bg-clip-text text-transparent">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-center text-sm sm:text-base text-white/70">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 relative z-10">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {successMessage && (
              <Alert className="relative overflow-hidden border-green-400/30 bg-green-900/30 text-green-200 backdrop-blur-sm animate-in fade-in-50 slide-in-from-top-2 duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent" />
                <CheckCircle className="h-4 w-4 text-green-400 relative z-10" />
                <AlertDescription className="relative z-10">{successMessage}</AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert
                variant="destructive"
                className="relative overflow-hidden border-red-400/30 bg-red-900/30 text-red-200 backdrop-blur-sm animate-in fade-in-50 slide-in-from-top-2 duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent" />
                <XCircle className="h-4 w-4 text-red-400 relative z-10" />
                <AlertDescription className="relative z-10">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-white/80">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-sm sm:text-base bg-black/20 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-white/80">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-sm sm:text-base bg-black/20 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
              />
            </div>

            <Button
              type="submit"
              className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 group"
              disabled={loading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  <span className="relative">Logging in...</span>
                </>
              ) : (
                <span className="relative">Login</span>
              )}
            </Button>

            <div className="text-center text-sm text-white/70">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="relative text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 group"
              >
                Register here
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
          <Card className="w-full max-w-md bg-black/5 backdrop-blur-xl border border-white/10">
            <CardHeader className="space-y-1 p-6 sm:p-8">
              <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-[var(--text-gradient-primary-start)] to-[var(--text-gradient-primary-via)] bg-clip-text text-transparent">
                Login
              </CardTitle>
              <CardDescription className="text-center text-white/70">Loading...</CardDescription>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <div className="flex justify-center items-center h-24">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
