"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { LayoutDashboard, Calendar, FileText, Mail, ImageIcon, Layers, UserSquare, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logoutAdmin } from "@/lib/auth"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Check if the current page is the login page
  const isLoginPage = pathname === "/admin/login"

  // Handle logout
  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await logoutAdmin()
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // If this is the login page, just render the children without the admin layout
  if (isLoginPage) {
    return <>{children}</>
  }

  const sidebarLinks = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      href: "/admin",
      active: pathname === "/admin",
    },
    {
      title: "Events",
      icon: <Calendar size={20} />,
      href: "/admin/events",
      active: pathname === "/admin/events",
    },
    {
      title: "Blog / News",
      icon: <FileText size={20} />,
      href: "/admin/blog",
      active: pathname === "/admin/blog",
    },
    {
      title: "Newsletter",
      icon: <Mail size={20} />,
      href: "/admin/newsletter",
      active: pathname === "/admin/newsletter",
    },
    {
      title: "Media Gallery",
      icon: <ImageIcon size={20} />,
      href: "/admin/media",
      active: pathname === "/admin/media",
    },
    {
      title: "Slides",
      icon: <Layers size={20} />,
      href: "/admin/slides",
      active: pathname === "/admin/slides",
    },
    {
      title: "Members",
      icon: <UserSquare size={20} />,
      href: "/admin/members",
      active: pathname.startsWith("/admin/members"),
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Admin Header */}
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/admin" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/city%20boy%20logo%201-aPjcu5AICOErse2Yek9Nk9GC8Dw3SD.png"
                alt="City Boy Movement Logo"
                width={120}
                height={60}
                className="h-auto w-auto"
              />
              <span className="ml-2 text-lg font-semibold text-[#0F5D0B]">Admin</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/" target="_blank" rel="noopener noreferrer">
                View Site
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{isLoading ? "Logging out..." : "Log out"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Admin Sidebar */}
        <aside
          className={`
          fixed inset-y-0 left-0 z-20 w-64 bg-[#0F5D0B] text-white transform transition-transform duration-200 ease-in-out
          md:translate-x-0 md:static md:h-auto md:flex-shrink-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="flex flex-col h-full pt-16 md:pt-0">
            <div className="p-4 border-b border-[#0A4A08]">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Admin User</p>
                  <p className="text-xs text-green-200">Super Administrator</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#0A4A08] text-white ${
                    link.active ? "bg-[#0A4A08] font-medium" : ""
                  }`}
                >
                  {link.icon}
                  <span>{link.title}</span>
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-[#0A4A08]">
              <Button
                variant="outline"
                className="w-full bg-transparent border-white text-white hover:bg-[#0A4A08]"
                onClick={handleLogout}
                disabled={isLoading}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>{isLoading ? "Logging out..." : "Log out"}</span>
              </Button>
            </div>
          </div>
        </aside>

        {/* Admin Content */}
        <main className="flex-1 bg-gray-50">{children}</main>
      </div>
    </div>
  )
}

