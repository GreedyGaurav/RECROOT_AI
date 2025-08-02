"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  const { user } = useAuth()
  const [emailAlerts, setEmailAlerts] = useState(true)
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  const handleEmailAlertsChange = (checked: boolean) => {
    setEmailAlerts(checked)
    toast({
      title: "Settings Updated",
      description: `Email alerts ${checked ? "enabled" : "disabled"}`,
    })
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 p-4 sm:p-0">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your account preferences</p>
        </div>

        {/* Profile Information */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">Profile Information</CardTitle>
            <CardDescription className="text-sm">Your account details (read-only)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback className="text-sm sm:text-lg">{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">{user?.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{user?.email}</p>
                <Badge variant="secondary" className="text-xs">
                  Free Plan
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t">
              <div>
                <Label className="text-xs sm:text-sm font-medium text-muted-foreground">Member Since</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">January 2024</p>
              </div>
              <div>
                <Label className="text-xs sm:text-sm font-medium text-muted-foreground">Last Login</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">Notifications</CardTitle>
            <CardDescription className="text-sm">Configure your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 flex-1 pr-4">
                <Label className="text-sm sm:text-base text-foreground">Email Alerts</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">Get notified when AI predicts poor JD performance</p>
              </div>
              <Switch checked={emailAlerts} onCheckedChange={handleEmailAlertsChange} />
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">Appearance</CardTitle>
            <CardDescription className="text-sm">Customize how the application looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="space-y-3">
              <Label className="text-sm sm:text-base text-foreground">Theme Preference</Label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                  className="flex items-center gap-2 justify-center"
                >
                  <Sun className="h-4 w-4" />
                  Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className="flex items-center gap-2 justify-center"
                >
                  <Moon className="h-4 w-4" />
                  Dark
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("system")}
                  className="flex items-center gap-2 justify-center"
                >
                  <Monitor className="h-4 w-4" />
                  System
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Choose your preferred theme or use system setting to automatically switch based on your device
                preferences.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Usage Statistics */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">Usage Statistics</CardTitle>
            <CardDescription className="text-sm">Your activity summary this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">24</div>
                <div className="text-xs sm:text-sm text-muted-foreground">JDs Created</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-green-600">18</div>
                <div className="text-xs sm:text-sm text-muted-foreground">JDs Optimized</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">7</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Competitors Analyzed</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-orange-600">12</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Drafts Saved</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Information */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">Plan & Billing</CardTitle>
            <CardDescription className="text-sm">Manage your subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground text-sm sm:text-base">Free Plan</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">10 JDs per month</p>
              </div>
              <Badge variant="outline" className="text-xs w-fit">Current Plan</Badge>
            </div>
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Upgrade to Pro for unlimited JD generation, advanced analytics, and priority support.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
