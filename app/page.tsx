"use client"

import { useAuth } from "@/components/auth-provider"
import { HeroSection } from "@/components/hero-section"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardHome } from "@/components/dashboard-home"

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <HeroSection />
  }

  return (
    <DashboardLayout>
      <DashboardHome />
    </DashboardLayout>
  )
}
