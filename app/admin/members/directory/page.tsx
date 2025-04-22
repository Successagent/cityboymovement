"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Mail,
  UserPlus,
  MapPin,
  MoreHorizontal,
  Trash,
  Edit,
  Eye,
  ArrowLeft,
  Download,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { nigerianStates } from "@/lib/nigerian-states"
import { Textarea } from "@/components/ui/textarea"
import { Grid, List } from "lucide-react"

// Mock data for members
const membersData = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+234 812 345 6789",
    role: "Community Organizer",
    location: "Lagos, Nigeria",
    avatar: "/placeholder.svg?height=80&width=80",
    state: "Lagos",
    status: "active",
    joinDate: "March 15, 2023",
    bio: "Passionate community organizer with 5+ years of experience in urban development projects.",
    hasPVC: true,
    ward: "Ikeja",
    lga: "Ikeja",
  },
  {
    id: "2",
    name: "Michael Obi",
    email: "michael.obi@example.com",
    phone: "+234 803 456 7890",
    role: "Policy Advocate",
    location: "Abuja, Nigeria",
    avatar: "/placeholder.svg?height=80&width=80",
    state: "FCT Abuja",
    status: "active",
    joinDate: "March 10, 2023",
    bio: "Policy expert focusing on sustainable urban development and civic engagement.",
    hasPVC: true,
    ward: "Garki",
    lga: "Municipal Area Council",
  },
  {
    id: "3",
    name: "Amina Ibrahim",
    email: "amina.ibrahim@example.com",
    phone: "+234 705 567 8901",
    role: "Youth Coordinator",
    location: "Kano, Nigeria",
    avatar: "/placeholder.svg?height=80&width=80",
    state: "Kano",
    status: "active",
    joinDate: "March 5, 2023",
    bio: "Dedicated to empowering young Nigerians through education and civic participation.",
    hasPVC: true,
    ward: "Nassarawa",
    lga: "Kano Municipal",
  },
  {
    id: "4",
    name: "David Adeleke",
    email: "david.adeleke@example.com",
    phone: "+234 908 678 9012",
    role: "Event Organizer",
    location: "Lagos, Nigeria",
    avatar: "/placeholder.svg?height=80&width=80",
    state: "Lagos",
    status: "inactive",
    joinDate: "February 28, 2023",
    bio: "Experienced event planner specializing in community engagement activities.",
    hasPVC: false,
    ward: "Surulere",
    lga: "Surulere",
  },
  {
    id: "5",
    name: "Ngozi Okonkwo",
    email: "ngozi.okonkwo@example.com",
    phone: "+234 814 789 0123",
    role: "Regional Coordinator",
    location: "Enugu, Nigeria",
    avatar: "/placeholder.svg?height=80&width=80",
    state: "Enugu",
    status: "active",
    joinDate: "February 25, 2023",
    bio: "Regional leader coordinating CityBoy Movement activities in southeastern Nigeria.",
    hasPVC: true,
    ward: "Enugu North",
    lga: "Enugu North",
  },
  {
    id: "6",
    name: "Emeka Nwosu",
    email: "emeka.nwosu@example.com",
    phone: "+234 706 890 1234",
    role: "Media Specialist",
    location: "Imo, Nigeria",
    avatar: "/placeholder.svg?height=80&width=80",
    state: "Imo",
    status: "active",
    joinDate: "February 20, 2023",
    bio: "Media professional with expertise in digital communication and social media management.",
    hasPVC: true,
    ward: "Owerri Municipal",
    lga: "Owerri Municipal",
  },
  {
    id: "7",
    name: "Fatima Ahmed",
    email: "fatima.ahmed@example.com",
    phone: "+234 809 901 2345",
    role: "Community Leader",
    location: "Kaduna, Nigeria",
    avatar: "/placeholder.svg?height=80&width=80",
    state: "Kaduna",
    status: "active",
    joinDate: "February 15, 2023",
    bio: "Active community leader working to promote civic education and voter registration.",
    hasPVC: true,
    ward: "Kaduna North",
    lga: "Kaduna North",
  },
  {
    id: "8",
    name: "John Okafor",
    email: "john.okafor@example.com",
    phone: "+234 815 012 3456",
    role: "Education Advocate",
    location: "Rivers, Nigeria",
    avatar: "/placeholder.svg?height=80&width=80",
    state: "Rivers",
    status: "inactive",
    joinDate: "February 10, 2023",
    bio: "Educator focused on developing civic curriculum for Nigerian schools.",
    hasPVC: false,
    ward: "Port Harcourt",
    lga: "Port Harcourt",
  },
]

export default function MemberDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [stateFilter, setStateFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)
  const [isEditMemberDialogOpen, setIsEditMemberDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<(typeof membersData)[0] | null>(null)
  const [isMemberDetailsOpen, setIsMemberDetailsOpen] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [isBulkActionDialogOpen, setIsBulkActionDialogOpen] = useState(false)
  const [bulkAction, setBulkAction] = useState<"delete" | "activate" | "deactivate" | null>(null)

  // Form state for add/edit member
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    state: "",
    lga: "",
    ward: "",
    bio: "",
    hasPVC: false,
    status: "active",
  })

  // Get unique states and roles for filtering
  const states = ["all", ...new Set(membersData.map((member) => member.state))]
  const roles = ["all", ...new Set(membersData.map((member) => member.role))]

  // Filter members based on search, state, role, and status
  const filteredMembers = membersData.filter(
    (member) =>
      (member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (stateFilter === "all" || member.state === stateFilter) &&
      (roleFilter === "all" || member.role === roleFilter) &&
      (statusFilter === "all" || member.status === statusFilter),
  )

  // Handle delete
  const handleDelete = () => {
    console.log("Deleting member:", selectedMember)
    // Here you would typically send a delete request to your API
    setIsDeleteDialogOpen(false)
    setSelectedMember(null)
  }

  // Handle bulk action
  const handleBulkAction = () => {
    console.log(`Performing ${bulkAction} on members:`, selectedMembers)
    // Here you would typically send a request to your API to perform the bulk action
    setIsBulkActionDialogOpen(false)
    setSelectedMembers([])
    setBulkAction(null)
  }

  // View member details
  const viewMemberDetails = (member: (typeof membersData)[0]) => {
    setSelectedMember(member)
    setIsMemberDetailsOpen(true)
  }

  // Handle form change for add/edit member
  const handleFormChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  // Handle add member
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Adding new member:", formData)
    // Here you would typically send a request to your API
    setIsAddMemberDialogOpen(false)
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      state: "",
      lga: "",
      ward: "",
      bio: "",
      hasPVC: false,
      status: "active",
    })
  }

  // Handle edit member
  const handleEditMember = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updating member:", selectedMember?.id, formData)
    // Here you would typically send a request to your API
    setIsEditMemberDialogOpen(false)
  }

  // Toggle member selection for bulk actions
  const toggleMemberSelection = (id: string) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter((memberId) => memberId !== id))
    } else {
      setSelectedMembers([...selectedMembers, id])
    }
  }

  // Select all members
  const selectAllMembers = () => {
    setSelectedMembers(filteredMembers.map((member) => member.id))
  }

  // Clear member selection
  const clearMemberSelection = () => {
    setSelectedMembers([])
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Link href="/admin/members">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Member Directory</h1>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/members/export" className="text-[#0F5D0B] hover:underline flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Export Members
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{membersData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{membersData.filter((m) => m.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">With PVC</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{membersData.filter((m) => m.hasPVC).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">States Represented</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(membersData.map((m) => m.state)).size}</div>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
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
        <div className="flex gap-2 flex-wrap">
          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger className="w-[160px]">
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
          <Tabs defaultValue={statusFilter} onValueChange={setStatusFilter} className="w-[200px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-[#0F5D0B] hover:bg-[#0A4A08]" : ""}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-[#0F5D0B] hover:bg-[#0A4A08]" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button className="bg-[#0F5D0B] hover:bg-[#0A4A08]" onClick={() => setIsAddMemberDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedMembers.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-md mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
              onCheckedChange={(checked) => {
                if (checked) {
                  selectAllMembers()
                } else {
                  clearMemberSelection()
                }
              }}
            />
            <span>{selectedMembers.length} members selected</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setBulkAction("activate")
                setIsBulkActionDialogOpen(true)
              }}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Activate
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setBulkAction("deactivate")
                setIsBulkActionDialogOpen(true)
              }}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Deactivate
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setBulkAction("delete")
                setIsBulkActionDialogOpen(true)
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Members List/Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6 flex flex-col items-center text-center">
                {selectedMembers.length > 0 && (
                  <div className="self-start mb-2">
                    <Checkbox
                      checked={selectedMembers.includes(member.id)}
                      onCheckedChange={() => toggleMemberSelection(member.id)}
                    />
                  </div>
                )}
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
                <div className="flex items-center justify-center mt-1">
                  <Badge
                    className={member.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                  >
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{member.location}</span>
                </div>
              </div>
              <div className="border-t p-4 flex justify-between">
                <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => viewMemberDetails(member)}>
                  View
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedMember(member)
                        setFormData({
                          name: member.name,
                          email: member.email,
                          phone: member.phone,
                          role: member.role,
                          state: member.state,
                          lga: member.lga,
                          ward: member.ward,
                          bio: member.bio,
                          hasPVC: member.hasPVC,
                          status: member.status,
                        })
                        setIsEditMemberDialogOpen(true)
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600"
                      onClick={() => {
                        setSelectedMember(member)
                        setIsDeleteDialogOpen(true)
                      }}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
          {filteredMembers.length === 0 && (
            <div className="col-span-full p-8 text-center text-gray-500">No members match your search criteria</div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {selectedMembers.length > 0 && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <Checkbox
                        checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            selectAllMembers()
                          } else {
                            clearMemberSelection()
                          }
                        }}
                      />
                    </th>
                  )}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Member
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Joined
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    {selectedMembers.length > 0 && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Checkbox
                          checked={selectedMembers.includes(member.id)}
                          onCheckedChange={() => toggleMemberSelection(member.id)}
                        />
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Avatar>
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.email}</div>
                      <div className="text-sm text-gray-500">{member.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        className={
                          member.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.joinDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => viewMemberDetails(member)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => {
                                setSelectedMember(member)
                                setFormData({
                                  name: member.name,
                                  email: member.email,
                                  phone: member.phone,
                                  role: member.role,
                                  state: member.state,
                                  lga: member.lga,
                                  ward: member.ward,
                                  bio: member.bio,
                                  hasPVC: member.hasPVC,
                                  status: member.status,
                                })
                                setIsEditMemberDialogOpen(true)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Mail className="mr-2 h-4 w-4" />
                              <span>Email</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="cursor-pointer text-red-600"
                              onClick={() => {
                                setSelectedMember(member)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredMembers.length === 0 && (
                  <tr>
                    <td colSpan={selectedMembers.length > 0 ? 8 : 7} className="px-6 py-8 text-center text-gray-500">
                      No members match your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Member Details Dialog */}
      <Dialog open={isMemberDetailsOpen} onOpenChange={setIsMemberDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Member Details</DialogTitle>
            <DialogDescription>View detailed information about this member</DialogDescription>
          </DialogHeader>

          {selectedMember && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={selectedMember.avatar} alt={selectedMember.name} />
                  <AvatarFallback>{selectedMember.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-medium">{selectedMember.name}</h3>
                <p className="text-gray-500">{selectedMember.role}</p>
                <Badge
                  className={`mt-2 ${selectedMember.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                >
                  {selectedMember.status.charAt(0).toUpperCase() + selectedMember.status.slice(1)}
                </Badge>
                <div className="flex items-center justify-center mt-4">
                  <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-gray-500">{selectedMember.location}</span>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Bio</h4>
                  <p className="mt-1">{selectedMember.bio}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
                    <div className="mt-1 space-y-2">
                      <div>
                        <span className="text-sm text-gray-500">Email:</span>
                        <p>{selectedMember.email}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Phone:</span>
                        <p>{selectedMember.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Membership Details</h4>
                    <div className="mt-1 space-y-2">
                      <div>
                        <span className="text-sm text-gray-500">State:</span>
                        <p>{selectedMember.state}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">LGA:</span>
                        <p>{selectedMember.lga}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Ward:</span>
                        <p>{selectedMember.ward}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Has PVC:</span>
                        <p>{selectedMember.hasPVC ? "Yes" : "No"}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Joined:</span>
                        <p>{selectedMember.joinDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <Button variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsMemberDetailsOpen(false)
                      setFormData({
                        name: selectedMember.name,
                        email: selectedMember.email,
                        phone: selectedMember.phone,
                        role: selectedMember.role,
                        state: selectedMember.state,
                        lga: selectedMember.lga,
                        ward: selectedMember.ward,
                        bio: selectedMember.bio,
                        hasPVC: selectedMember.hasPVC,
                        status: selectedMember.status,
                      })
                      setIsEditMemberDialogOpen(true)
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setIsMemberDetailsOpen(false)
                      setIsDeleteDialogOpen(true)
                    }}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Member Dialog */}
      <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
            <DialogDescription>Fill in the details to add a new member</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddMember} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleFormChange("phone", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleFormChange("role", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select value={formData.state} onValueChange={(value) => handleFormChange("state", value)}>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {nigerianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lga">LGA</Label>
                <Input id="lga" value={formData.lga} onChange={(e) => handleFormChange("lga", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ward">Ward</Label>
                <Input id="ward" value={formData.ward} onChange={(e) => handleFormChange("ward", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleFormChange("status", value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleFormChange("bio", e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasPVC"
                checked={formData.hasPVC}
                onCheckedChange={(checked) => handleFormChange("hasPVC", !!checked)}
              />
              <Label htmlFor="hasPVC">Has PVC</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddMemberDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#0F5D0B] hover:bg-[#0A4A08]">
                Add Member
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog open={isEditMemberDialogOpen} onOpenChange={setIsEditMemberDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogDescription>Update member information</DialogDescription>
          </DialogHeader>

          {selectedMember && (
            <form onSubmit={handleEditMember} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email Address</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input
                    id="edit-phone"
                    value={formData.phone}
                    onChange={(e) => handleFormChange("phone", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Input
                    id="edit-role"
                    value={formData.role}
                    onChange={(e) => handleFormChange("role", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-state">State</Label>
                  <Select value={formData.state} onValueChange={(value) => handleFormChange("state", value)}>
                    <SelectTrigger id="edit-state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {nigerianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-lga">LGA</Label>
                  <Input id="edit-lga" value={formData.lga} onChange={(e) => handleFormChange("lga", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-ward">Ward</Label>
                  <Input
                    id="edit-ward"
                    value={formData.ward}
                    onChange={(e) => handleFormChange("ward", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleFormChange("status", value)}>
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-bio">Bio</Label>
                <Textarea
                  id="edit-bio"
                  value={formData.bio}
                  onChange={(e) => handleFormChange("bio", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-hasPVC"
                  checked={formData.hasPVC}
                  onCheckedChange={(checked) => handleFormChange("hasPVC", !!checked)}
                />
                <Label htmlFor="edit-hasPVC">Has PVC</Label>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditMemberDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#0F5D0B] hover:bg-[#0A4A08]">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this member? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedMember && (
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={selectedMember.avatar} alt={selectedMember.name} />
                  <AvatarFallback>{selectedMember.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedMember.name}</p>
                  <p className="text-sm text-gray-500">{selectedMember.email}</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Action Confirmation Dialog */}
      <Dialog open={isBulkActionDialogOpen} onOpenChange={setIsBulkActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Bulk Action</DialogTitle>
            <DialogDescription>
              {bulkAction === "delete" &&
                "Are you sure you want to delete the selected members? This action cannot be undone."}
              {bulkAction === "activate" && "Are you sure you want to activate the selected members?"}
              {bulkAction === "deactivate" && "Are you sure you want to deactivate the selected members?"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              You are about to {bulkAction} {selectedMembers.length} members.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBulkActionDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={bulkAction === "delete" ? "destructive" : "default"}
              className={bulkAction !== "delete" ? "bg-[#0F5D0B] hover:bg-[#0A4A08]" : ""}
              onClick={handleBulkAction}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

