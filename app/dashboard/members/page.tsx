"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, Mail, UserPlus, UserMinus, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for members
const membersData = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Community Organizer",
    location: "Lagos, Nigeria",
    avatar: "/placeholder.svg?height=80&width=80",
    state: "Lagos",
    isConnected: true,
    isFeatured: true,
    bio: "Passionate community organizer with 5+ years of experience in urban development projects.",
  },
  {
    id: "2",
    name: "Michael Obi",
    role: "Policy Advocate",
    location: "Abuja, Nigeria",
    avatar: "/placeholder.svg?height=80&width=80",
    state: "FCT Abuja",
    isConnected: true,
    isFeatured: false,
    bio: "Policy expert focusing on sustainable urban development and civic engagement.",
  },
  {
    id: "3",
    name: "Amina Ibrahim",
    role: "Youth Coordinator",
    location: "Kano, Nigeria",
    avatar: "/placeholder.svg?height=80&width=80",
    state: "Kano",
    isConnected: false,
    isFeatured: true,
    bio: "Dedicated to empowering young Nigerians through education and civic participation.",
  },
  {
    id: "4",
    name: "David Adeleke",
    role: "Event Organizer",
    location: "Lagos, Nigeria",
    avatar: "/placeholder.svg?height=80&width=80",
    state: "Lagos",
    isConnected: false,
    isFeatured: false,
    bio: "Experienced event planner specializing in community engagement activities.",
  },
  {
    id: "5",
    name: "Ngozi Okonkwo",
    role: "Regional Coordinator",
    location: "Enugu, Nigeria",
    avatar: "/placeholder.svg?height=80&width=80",
    state: "Enugu",
    isConnected: true,
    isFeatured: false,
    bio: "Regional leader coordinating CityBoy Movement activities in southeastern Nigeria.",
  },
  {
    id: "6",
    name: "Emeka Nwosu",
    role: "Media Specialist",
    location: "Imo, Nigeria",
    avatar: "/placeholder.svg?height=80&width=80",
    state: "Imo",
    isConnected: false,
    isFeatured: false,
    bio: "Media professional with expertise in digital communication and social media management.",
  },
  {
    id: "7",
    name: "Fatima Ahmed",
    role: "Community Leader",
    location: "Kaduna, Nigeria",
    avatar: "/placeholder.svg?height=80&width=80",
    state: "Kaduna",
    isConnected: false,
    isFeatured: true,
    bio: "Active community leader working to promote civic education and voter registration.",
  },
  {
    id: "8",
    name: "John Okafor",
    role: "Education Advocate",
    location: "Rivers, Nigeria",
    avatar: "/placeholder.svg?height=80&width=80",
    state: "Rivers",
    isConnected: true,
    isFeatured: false,
    bio: "Educator focused on developing civic curriculum for Nigerian schools.",
  },
]

export default function DashboardMembersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [stateFilter, setStateFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")

  // Get unique states and roles for filtering
  const states = ["all", ...new Set(membersData.map((member) => member.state))]
  const roles = ["all", ...new Set(membersData.map((member) => member.role))]

  // Filter members based on search, state, and role
  const filteredMembers = membersData.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (stateFilter === "all" || member.state === stateFilter) &&
      (roleFilter === "all" || member.role === roleFilter),
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Members</h1>
        <div className="flex gap-2">
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">
            Dashboard
          </Link>
          <span className="text-sm text-gray-500">/</span>
          <span className="text-sm">Members</span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search members..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by state" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state === "all" ? "All States" : state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role === "all" ? "All Roles" : role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Members Tabs */}
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Members</TabsTrigger>
          <TabsTrigger value="connections">My Connections</TabsTrigger>
          <TabsTrigger value="featured">Featured Members</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
          {filteredMembers.length === 0 && (
            <div className="text-center py-8 text-gray-500">No members matching your criteria</div>
          )}
        </TabsContent>

        <TabsContent value="connections">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers
              .filter((m) => m.isConnected)
              .map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
          </div>
          {filteredMembers.filter((m) => m.isConnected).length === 0 && (
            <div className="text-center py-8 text-gray-500">You haven't connected with any members yet</div>
          )}
        </TabsContent>

        <TabsContent value="featured">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers
              .filter((m) => m.isFeatured)
              .map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
          </div>
          {filteredMembers.filter((m) => m.isFeatured).length === 0 && (
            <div className="text-center py-8 text-gray-500">No featured members matching your criteria</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface MemberCardProps {
  member: {
    id: string
    name: string
    role: string
    location: string
    avatar: string
    state: string
    isConnected: boolean
    isFeatured: boolean
    bio: string
  }
}

function MemberCard({ member }: MemberCardProps) {
  const [isConnected, setIsConnected] = useState(member.isConnected)

  const toggleConnection = () => {
    setIsConnected(!isConnected)
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-center mt-2">{member.name}</CardTitle>
        <CardDescription className="text-center">
          <Badge className="mt-1">{member.role}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{member.location}</span>
        </div>
        <p className="text-sm text-gray-700 text-center">{member.bio}</p>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm">
          <Mail className="h-4 w-4 mr-2" />
          Message
        </Button>
        <Button
          size="sm"
          onClick={toggleConnection}
          className={
            isConnected ? "bg-red-100 text-red-800 hover:bg-red-200" : "bg-[#0F5D0B] hover:bg-[#0A4A08] text-white"
          }
        >
          {isConnected ? (
            <>
              <UserMinus className="h-4 w-4 mr-2" />
              Disconnect
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4 mr-2" />
              Connect
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

