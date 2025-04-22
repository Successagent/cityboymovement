"use client"

import { useState } from "react"
import Link from "next/link"
import { Users, UserPlus, FileSpreadsheet, Search, Filter, Download, ChevronRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StateLgaSelector } from "@/components/state-lga-selector"

// Mock data for member distribution by state
const membersByState = [
  { state: "Lagos", count: 1250, percentage: 25 },
  { state: "FCT Abuja", count: 850, percentage: 17 },
  { state: "Kano", count: 620, percentage: 12.4 },
  { state: "Rivers", count: 480, percentage: 9.6 },
  { state: "Oyo", count: 320, percentage: 6.4 },
]

export default function MembersPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterState, setFilterState] = useState("")
  const [filterLga, setFilterLga] = useState("")

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Member Management</h1>
          <p className="text-gray-500">Manage and organize your movement members</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/members/add">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Member
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/members/export">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="directory">Directory</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
              {/* Total Members Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-[#0F5D0B] mr-3" />
                    <div>
                      <p className="text-3xl font-bold">5,280</p>
                      <p className="text-sm text-gray-500">+120 this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-between" asChild>
                    <Link href="/admin/members/directory">
                      View Directory
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-between" asChild>
                    <Link href="/admin/members/export">
                      Export Members
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Member Distribution */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Member Distribution by State</CardTitle>
                <CardDescription>Top 5 states by membership</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {membersByState.map((item) => (
                    <div key={item.state}>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-[#0F5D0B] mr-2" />
                          <span>{item.state}</span>
                        </div>
                        <span className="text-sm font-medium">{item.count} members</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#0F5D0B] h-2.5 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/admin/members/export">View Full Distribution</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Recent Activity and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle>Find Members</CardTitle>
                <CardDescription>Search and filter members</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, or phone"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium">Filter by Location</p>
                  <StateLgaSelector
                    selectedState={filterState}
                    selectedLga={filterLga}
                    onStateChange={setFilterState}
                    onLgaChange={setFilterLga}
                    required={false}
                    className="grid-cols-1"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setFilterState("")
                    setFilterLga("")
                  }}
                >
                  Reset
                </Button>
                <Button asChild>
                  <Link
                    href={{
                      pathname: "/admin/members/directory",
                      query: {
                        search: searchQuery,
                        state: filterState,
                        lga: filterLga,
                      },
                    }}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Recent Exports */}
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Exports</CardTitle>
                  <CardDescription>Your recent data exports</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/members/export">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "2023-11-15", format: "CSV", records: 1250, filter: "All Members" },
                    { date: "2023-11-10", format: "Excel", records: 450, filter: "Lagos State" },
                    { date: "2023-10-28", format: "CSV", records: 320, filter: "Abuja FCT" },
                  ].map((export_, i) => (
                    <div key={i} className="flex justify-between items-center border-b pb-3 last:border-0">
                      <div>
                        <p className="font-medium">{export_.filter}</p>
                        <p className="text-sm text-gray-500">{export_.date}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100">
                          {export_.format}
                        </span>
                        <p className="text-sm text-gray-500">{export_.records} records</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="directory">
          <Card>
            <CardHeader>
              <CardTitle>Member Directory</CardTitle>
              <CardDescription>View and manage all members of the CityBoy Movement</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search members..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button asChild>
                      <Link href="/admin/members/directory">View Full Directory</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t">
                <div className="p-12 text-center">
                  <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Access the Full Directory</h3>
                  <p className="text-gray-500 mb-4 max-w-md mx-auto">
                    The full member directory provides advanced search, filtering, and management capabilities.
                  </p>
                  <Button asChild>
                    <Link href="/admin/members/directory">Go to Member Directory</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

