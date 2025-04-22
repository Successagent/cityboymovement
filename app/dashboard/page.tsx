"use client"

import { Input } from "@/components/ui/input"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { User, Settings, Bell, MessageSquare, Calendar, FileText, Users, LogOut, Menu, X } from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dashboard Header */}
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/city%20boy%20logo%201-aPjcu5AICOErse2Yek9Nk9GC8Dw3SD.png"
                alt="City Boy Movement Logo"
                width={120}
                height={60}
                className="h-auto w-auto"
              />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>CB</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
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
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback>CB</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs text-green-200">Lagos, Nigeria</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#0A4A08] text-white">
                <User size={18} />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/dashboard/messages"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#0A4A08] text-white"
              >
                <MessageSquare size={18} />
                <span>Messages</span>
              </Link>
              <Link
                href="/dashboard/events"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#0A4A08] text-white"
              >
                <Calendar size={18} />
                <span>Events</span>
              </Link>
              <Link
                href="/dashboard/resources"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#0A4A08] text-white"
              >
                <FileText size={18} />
                <span>Resources</span>
              </Link>
              <Link
                href="/dashboard/members"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#0A4A08] text-white"
              >
                <Users size={18} />
                <span>Members</span>
              </Link>
            </nav>

            <div className="p-4 border-t border-[#0A4A08]">
              <Button variant="outline" className="w-full bg-transparent border-white text-white hover:bg-[#0A4A08]">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-4 md:p-6">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-6">Member Dashboard</h1>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-gray-500">Next event in 2 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Unread Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-gray-500">2 new since yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Your State Rank</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">#5</div>
                  <p className="text-xs text-gray-500">Lagos - 15,420 members</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Content */}
            <Tabs defaultValue="activity">
              <TabsList className="mb-4">
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
              </TabsList>

              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your recent interactions with the CityBoy Movement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <ActivityItem
                        title="You registered for an upcoming event"
                        description="Community Outreach in Lagos"
                        time="2 hours ago"
                      />
                      <ActivityItem
                        title="New resource available"
                        description="Guide to Community Organizing"
                        time="Yesterday"
                      />
                      <ActivityItem
                        title="You joined a group chat"
                        description="Lagos Members Discussion"
                        time="3 days ago"
                      />
                      <ActivityItem
                        title="Your profile was viewed"
                        description="A coordinator viewed your profile"
                        time="1 week ago"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources">
                <Card>
                  <CardHeader>
                    <CardTitle>Resources</CardTitle>
                    <CardDescription>Access exclusive materials and documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <ResourceItem title="CityBoy Movement Handbook" type="PDF" size="2.4 MB" />
                      <ResourceItem title="Community Organizing Guide" type="PDF" size="1.8 MB" />
                      <ResourceItem title="Membership Benefits Overview" type="PDF" size="1.2 MB" />
                      <ResourceItem title="Event Planning Template" type="DOCX" size="850 KB" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chat">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle>Member Chat</CardTitle>
                    <CardDescription>Connect with other CityBoy Movement members</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden flex flex-col">
                    <ChatInterface />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}

function ActivityItem({ title, description, time }: { title: string; description: string; time: string }) {
  return (
    <div className="flex items-start pb-4 border-b border-gray-100">
      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
        <Calendar className="h-4 w-4 text-[#0F5D0B]" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  )
}

function ResourceItem({ title, type, size }: { title: string; type: string; size: string }) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
      <div className="flex items-center">
        <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center mr-3">
          <FileText className="h-4 w-4 text-blue-600" />
        </div>
        <div>
          <h4 className="text-sm font-medium">{title}</h4>
          <p className="text-xs text-gray-500">{size}</p>
        </div>
      </div>
      <Button size="sm" variant="outline">
        Download
      </Button>
    </div>
  )
}

function ChatInterface() {
  const [message, setMessage] = useState("")

  // Sample chat messages
  const messages = [
    {
      id: 1,
      sender: "John Doe",
      content: "Hello everyone! Excited to be part of this movement.",
      time: "10:30 AM",
      isMine: true,
    },
    {
      id: 2,
      sender: "Sarah Johnson",
      content: "Welcome John! Glad to have you here.",
      time: "10:32 AM",
      isMine: false,
    },
    {
      id: 3,
      sender: "Michael Obi",
      content: "Has anyone attended the Lagos meetup last week?",
      time: "10:35 AM",
      isMine: false,
    },
    {
      id: 4,
      sender: "John Doe",
      content: "Yes, I was there. It was really informative!",
      time: "10:36 AM",
      isMine: true,
    },
    {
      id: 5,
      sender: "Amina Ibrahim",
      content: "I missed it unfortunately. Will there be another one soon?",
      time: "10:40 AM",
      isMine: false,
    },
    {
      id: 6,
      sender: "Sarah Johnson",
      content: "The next one is scheduled for next month. I'll share the details soon.",
      time: "10:42 AM",
      isMine: false,
    },
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // In a real app, this would send the message to your backend
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}>
            <div
              className={`
              max-w-[80%] rounded-lg p-3 
              ${msg.isMine ? "bg-[#0F5D0B] text-white rounded-tr-none" : "bg-gray-100 text-gray-800 rounded-tl-none"}
            `}
            >
              {!msg.isMine && <p className="text-xs font-medium mb-1">{msg.sender}</p>}
              <p className="text-sm">{msg.content}</p>
              <p className={`text-xs mt-1 ${msg.isMine ? "text-green-200" : "text-gray-500"}`}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" className="bg-[#0F5D0B] hover:bg-[#0A4A08]">
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}

