"use client"

import type React from "react"

import Link from "next/link"
import { Users, Calendar, FileText, Mail, ImageIcon, ArrowUp, ArrowDown, Activity, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome back, Admin User</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline">Generate Report</Button>
          <Button className="bg-[#0F5D0B] hover:bg-[#0A4A08]">Help</Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Members"
          value="152,430"
          change="+12,845"
          changeType="increase"
          description="vs. previous 30 days"
          icon={<Users size={24} />}
        />
        <StatCard
          title="Upcoming Events"
          value="24"
          change="+3"
          changeType="increase"
          description="vs. previous month"
          icon={<Calendar size={24} />}
        />
        <StatCard
          title="Blog Posts"
          value="136"
          change="+8"
          changeType="increase"
          description="vs. previous month"
          icon={<FileText size={24} />}
        />
        <StatCard
          title="Newsletter Subscribers"
          value="48,350"
          change="-412"
          changeType="decrease"
          description="vs. previous month"
          icon={<Mail size={24} />}
        />
      </div>

      {/* Quick Access */}
      <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link href="/admin/events">
          <div className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
            <Calendar size={32} className="text-[#0F5D0B] mb-2" />
            <h3 className="font-medium">Manage Events</h3>
            <p className="text-sm text-gray-500">Create and edit events</p>
          </div>
        </Link>
        <Link href="/admin/blog">
          <div className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
            <FileText size={32} className="text-[#0F5D0B] mb-2" />
            <h3 className="font-medium">Manage Blog</h3>
            <p className="text-sm text-gray-500">Create and edit news posts</p>
          </div>
        </Link>
        <Link href="/admin/newsletter">
          <div className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
            <Mail size={32} className="text-[#0F5D0B] mb-2" />
            <h3 className="font-medium">Send Newsletter</h3>
            <p className="text-sm text-gray-500">Communicate with subscribers</p>
          </div>
        </Link>
        <Link href="/admin/members">
          <div className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
            <Users size={32} className="text-[#0F5D0B] mb-2" />
            <h3 className="font-medium">Export Members</h3>
            <p className="text-sm text-gray-500">Download member data</p>
          </div>
        </Link>
      </div>

      {/* Activity and Analytics */}
      <Tabs defaultValue="activity" className="mb-8">
        <TabsList>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions in the admin panel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActivityItem
                  title="New blog post published"
                  description="Urban Development Initiatives Gain Momentum"
                  time="2 hours ago"
                  icon={<FileText className="text-blue-500" />}
                />
                <ActivityItem
                  title="New event created"
                  description="CityBoy Town Hall Meeting"
                  time="Yesterday"
                  icon={<Calendar className="text-green-500" />}
                />
                <ActivityItem
                  title="Newsletter sent"
                  description="March 2023 Newsletter - 48,350 recipients"
                  time="2 days ago"
                  icon={<Mail className="text-purple-500" />}
                />
                <ActivityItem
                  title="Media uploaded"
                  description="8 new images added to gallery"
                  time="1 week ago"
                  icon={<ImageIcon className="text-orange-500" />}
                />
                <ActivityItem
                  title="Member data exported"
                  description="Lagos state data exported to CSV"
                  time="1 week ago"
                  icon={<Users className="text-red-500" />}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>Key metrics for the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AnalyticsItem
                  title="Website Visitors"
                  value="256,781"
                  change="+32.5%"
                  changeType="increase"
                  icon={<Activity className="text-blue-500" />}
                />
                <AnalyticsItem
                  title="New Registrations"
                  value="12,845"
                  change="+18.3%"
                  changeType="increase"
                  icon={<Users className="text-green-500" />}
                />
                <AnalyticsItem
                  title="Event Registrations"
                  value="4,832"
                  change="+24.8%"
                  changeType="increase"
                  icon={<Calendar className="text-purple-500" />}
                />
                <AnalyticsItem
                  title="Blog Post Views"
                  value="45,372"
                  change="+11.2%"
                  changeType="increase"
                  icon={<TrendingUp className="text-orange-500" />}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: "increase" | "decrease" | "neutral"
  description: string
  icon: React.ReactNode
}

function StatCard({ title, value, change, changeType, description, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs">
          {changeType === "increase" && <ArrowUp className="mr-1 h-4 w-4 text-green-500" />}
          {changeType === "decrease" && <ArrowDown className="mr-1 h-4 w-4 text-red-500" />}
          <span
            className={`${changeType === "increase" ? "text-green-500" : changeType === "decrease" ? "text-red-500" : "text-gray-500"}`}
          >
            {change}
          </span>
          <span className="text-gray-500 ml-1">{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}

interface ActivityItemProps {
  title: string
  description: string
  time: string
  icon: React.ReactNode
}

function ActivityItem({ title, description, time, icon }: ActivityItemProps) {
  return (
    <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">{icon}</div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  )
}

interface AnalyticsItemProps {
  title: string
  value: string
  change: string
  changeType: "increase" | "decrease" | "neutral"
  icon: React.ReactNode
}

function AnalyticsItem({ title, value, change, changeType, icon }: AnalyticsItemProps) {
  return (
    <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">{icon}</div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="text-sm font-medium">{title}</h4>
          <div className="flex items-center">
            {changeType === "increase" && <ArrowUp className="mr-1 h-4 w-4 text-green-500" />}
            {changeType === "decrease" && <ArrowDown className="mr-1 h-4 w-4 text-red-500" />}
            <span
              className={`text-xs ${changeType === "increase" ? "text-green-500" : changeType === "decrease" ? "text-red-500" : "text-gray-500"}`}
            >
              {change}
            </span>
          </div>
        </div>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  )
}

