"use client"

import type React from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Home, PlusCircle, FileText, Upload, Settings, Sparkles, LogOut, User } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

const menuItems = [
  { title: "Dashboard", icon: Home, href: "/" },
  { title: "Create New JD", icon: PlusCircle, href: "/create" },
  { title: "Saved Drafts", icon: FileText, href: "/drafts" },
  { title: "Upload Competitor JD", icon: Upload, href: "/upload" },
  { title: "Settings", icon: Settings, href: "/settings" },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <div className="p-4 border-b border-sidebar-border bg-sidebar">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-sidebar-foreground">Recroot AI</span>
                  <span className="text-xs text-sidebar-foreground/60">Job Description Assistant</span>
                </div>
              </div>
            </div>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        onClick={() => handleNavigation(item.href)} 
                        isActive={pathname === item.href}
                        className="group relative"
                      >
                        <item.icon className="h-4 w-4 transition-colors group-hover:text-sidebar-accent-foreground" />
                        <span className="font-medium">{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Navbar */}
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-sm">
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center space-x-2">
                <SidebarTrigger className="h-8 w-8" />
                <div className="hidden sm:block">
                  <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <ThemeToggle />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-full">
                      <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                        <AvatarFallback className="text-xs font-medium">
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {user?.name && (
                          <p className="font-medium text-sm">{user.name}</p>
                        )}
                        {user?.email && (
                          <p className="w-[200px] truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <DropdownMenuItem onClick={() => handleNavigation("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 sm:p-6 bg-muted/30 min-h-0 overflow-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
