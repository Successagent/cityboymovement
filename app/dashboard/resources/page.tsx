"use client"

import { useState } from "react"
import Link from "next/link"
import { Download, Search, FileText, Film, File, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for resources
const resourcesData = [
  {
    id: "1",
    title: "CityBoy Movement Handbook",
    description: "A comprehensive guide to the CityBoy Movement, its mission, vision, and activities.",
    type: "pdf",
    size: "2.4 MB",
    category: "guides",
    date: "March 15, 2023",
    featured: true,
    downloadUrl: "#",
  },
  {
    id: "2",
    title: "Community Organizing Guide",
    description: "Learn effective strategies for organizing communities and driving collective action.",
    type: "pdf",
    size: "1.8 MB",
    category: "guides",
    date: "February 20, 2023",
    featured: true,
    downloadUrl: "#",
  },
  {
    id: "3",
    title: "Introduction to Urban Policy",
    description: "An educational resource on urban policy and its impact on community development.",
    type: "pdf",
    size: "3.2 MB",
    category: "education",
    date: "January 10, 2023",
    featured: false,
    downloadUrl: "#",
  },
  {
    id: "4",
    title: "CityBoy Launch Event Recording",
    description: "Video recording of the CityBoy Movement launch event held in Lagos.",
    type: "video",
    size: "245 MB",
    category: "media",
    date: "December 5, 2022",
    featured: false,
    downloadUrl: "#",
  },
  {
    id: "5",
    title: "Membership Benefits Overview",
    description: "Overview of benefits available to CityBoy Movement members.",
    type: "pdf",
    size: "1.2 MB",
    category: "guides",
    date: "November 18, 2022",
    featured: true,
    downloadUrl: "#",
  },
  {
    id: "6",
    title: "Event Planning Template",
    description: "Template for planning and organizing community events.",
    type: "docx",
    size: "850 KB",
    category: "templates",
    date: "October 30, 2022",
    featured: false,
    downloadUrl: "#",
  },
  {
    id: "7",
    title: "Community Forum Guidelines",
    description: "Guidelines for participating in CityBoy Movement community forums.",
    type: "pdf",
    size: "1.5 MB",
    category: "guidelines",
    date: "October 15, 2022",
    featured: false,
    downloadUrl: "#",
  },
  {
    id: "8",
    title: "CityBoy Movement Branding Assets",
    description: "Official logos, colors, and branding guidelines for the CityBoy Movement.",
    type: "zip",
    size: "15 MB",
    category: "media",
    date: "September 22, 2022",
    featured: false,
    downloadUrl: "#",
  },
]

export default function DashboardResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  // Filter resources based on search and category
  const filteredResources = resourcesData.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (activeCategory === "all" || resource.category === activeCategory),
  )

  // Get unique categories
  const categories = ["all", ...new Set(resourcesData.map((resource) => resource.category))]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Resources</h1>
        <div className="flex gap-2">
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">
            Dashboard
          </Link>
          <span className="text-sm text-gray-500">/</span>
          <span className="text-sm">Resources</span>
        </div>
      </div>

      {/* Search and Categories */}
      <div className="mb-6">
        <div className="relative max-w-md mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search resources..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={`cursor-pointer ${activeCategory === category ? "bg-[#0F5D0B]" : "hover:bg-gray-100"}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          ))}
        </div>
      </div>

      {/* Resources Tabs */}
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
          {filteredResources.length === 0 && (
            <div className="text-center py-8 text-gray-500">No resources matching your criteria</div>
          )}
        </TabsContent>

        <TabsContent value="featured">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources
              .filter((r) => r.featured)
              .map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
          </div>
          {filteredResources.filter((r) => r.featured).length === 0 && (
            <div className="text-center py-8 text-gray-500">No featured resources matching your criteria</div>
          )}
        </TabsContent>

        <TabsContent value="recent">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.slice(0, 6).map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ResourceCardProps {
  resource: {
    id: string
    title: string
    description: string
    type: string
    size: string
    category: string
    date: string
    featured: boolean
    downloadUrl: string
  }
}

function ResourceCard({ resource }: ResourceCardProps) {
  const getIconByType = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-10 w-10 text-red-500" />
      case "video":
        return <Film className="h-10 w-10 text-blue-500" />
      case "docx":
        return <File className="h-10 w-10 text-blue-700" />
      case "zip":
        return <FolderOpen className="h-10 w-10 text-yellow-500" />
      default:
        return <File className="h-10 w-10 text-gray-500" />
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          {getIconByType(resource.type)}
          {resource.featured && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Featured
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg mt-2">{resource.title}</CardTitle>
        <CardDescription className="text-gray-500 text-xs">{resource.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 mb-2">{resource.description}</p>
        <div className="flex items-center text-xs text-gray-500">
          <Badge variant="outline" className="mr-2 uppercase">
            {resource.type}
          </Badge>
          <span>{resource.size}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-[#0F5D0B] hover:bg-[#0A4A08]">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </CardFooter>
    </Card>
  )
}

