"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, MoreHorizontal, Trash, Edit, Eye, Send, Users, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BackButton } from "@/components/admin/back-button"

// Mock data for newsletters
const newsletterData = [
  {
    id: "1",
    title: "March 2023 Newsletter",
    subject: "CityBoy Movement: March 2023 Updates",
    sentDate: "March 15, 2023",
    sentBy: "Admin",
    status: "sent",
    recipients: 48350,
    openRate: 32.5,
    clickRate: 12.8,
  },
  {
    id: "2",
    title: "February 2023 Newsletter",
    subject: "CityBoy Movement: February 2023 Updates",
    sentDate: "February 15, 2023",
    sentBy: "Admin",
    status: "sent",
    recipients: 46982,
    openRate: 31.2,
    clickRate: 11.5,
  },
  {
    id: "3",
    title: "April 2023 Newsletter",
    subject: "CityBoy Movement: April 2023 Updates",
    sentDate: "",
    sentBy: "",
    status: "draft",
    recipients: 0,
    openRate: 0,
    clickRate: 0,
  },
  {
    id: "4",
    title: "January 2023 Newsletter",
    subject: "CityBoy Movement: January 2023 Updates",
    sentDate: "January 15, 2023",
    sentBy: "Admin",
    status: "sent",
    recipients: 45321,
    openRate: 30.8,
    clickRate: 10.2,
  },
]

// Mock data for subscriber segments
const segments = [
  { id: "all", name: "All Subscribers", count: 48350 },
  { id: "active", name: "Active Subscribers", count: 42187 },
  { id: "lagos", name: "Lagos Subscribers", count: 15420 },
  { id: "abuja", name: "FCT Abuja Subscribers", count: 7890 },
  { id: "kano", name: "Kano Subscribers", count: 12350 },
]

export default function AdminNewsletterPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedNewsletter, setSelectedNewsletter] = useState<(typeof newsletterData)[0] | null>(null)

  // Form fields for new newsletter
  const [formValues, setFormValues] = useState({
    title: "",
    subject: "",
    content: "",
    segment: "all",
  })

  // Filter newsletters based on search and status
  const filteredNewsletters = newsletterData.filter(
    (newsletter) =>
      newsletter.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter === "all" || newsletter.status === statusFilter),
  )

  // Handle form change
  const handleFormChange = (field: string, value: string) => {
    setFormValues({
      ...formValues,
      [field]: value,
    })
  }

  // Handle form submit
  const handleFormSubmit = (e: React.FormEvent, action: "save" | "send") => {
    e.preventDefault()
    console.log(`${action === "save" ? "Saving" : "Sending"} newsletter:`, formValues)
    // Here you would typically send data to your API
    setIsComposeDialogOpen(false)

    if (action === "send") {
      setIsSendDialogOpen(true)
    }

    // Reset form
    setFormValues({
      title: "",
      subject: "",
      content: "",
      segment: "all",
    })
  }

  // Handle delete
  const handleDelete = () => {
    console.log("Deleting newsletter:", selectedNewsletter)
    // Here you would typically send a delete request to your API
    setIsDeleteDialogOpen(false)
    setSelectedNewsletter(null)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <BackButton href="/admin" />
          <h1 className="text-2xl font-bold">Newsletter Management</h1>
        </div>
        <div className="flex gap-2">
          <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700">
            Dashboard
          </Link>
          <span className="text-sm text-gray-500">/</span>
          <span className="text-sm">Newsletter</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48,350</div>
            <p className="text-xs text-green-500">+412 new since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Open Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">31.5%</div>
            <p className="text-xs text-green-500">+2.3% since last newsletter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Click Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11.2%</div>
            <p className="text-xs text-green-500">+0.8% since last newsletter</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search newsletters..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isComposeDialogOpen} onOpenChange={setIsComposeDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#0F5D0B] hover:bg-[#0A4A08]">
                <Mail className="mr-2 h-4 w-4" />
                Compose Newsletter
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Compose Newsletter</DialogTitle>
                <DialogDescription>Create a new newsletter to send to your subscribers.</DialogDescription>
              </DialogHeader>

              <form onSubmit={(e) => handleFormSubmit(e, "save")} className="bg-white p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Newsletter Title</Label>
                    <Input
                      id="title"
                      value={formValues.title}
                      onChange={(e) => handleFormChange("title", e.target.value)}
                      placeholder="Internal title for your reference"
                      required
                    />
                    <p className="text-xs text-gray-500">
                      This is for your reference only, subscribers won't see this.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="segment">Subscriber Segment</Label>
                    <Select value={formValues.segment} onValueChange={(value) => handleFormChange("segment", value)}>
                      <SelectTrigger id="segment">
                        <SelectValue placeholder="Select a segment" />
                      </SelectTrigger>
                      <SelectContent>
                        {segments.map((segment) => (
                          <SelectItem key={segment.id} value={segment.id}>
                            {segment.name} ({segment.count.toLocaleString()})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Email Subject</Label>
                  <Input
                    id="subject"
                    value={formValues.subject}
                    onChange={(e) => handleFormChange("subject", e.target.value)}
                    placeholder="Subject line subscribers will see"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Email Content</Label>
                  <Textarea
                    id="content"
                    value={formValues.content}
                    onChange={(e) => handleFormChange("content", e.target.value)}
                    placeholder="Enter newsletter content"
                    rows={12}
                    required
                  />
                  <p className="text-xs text-gray-500">You can use HTML formatting for rich text.</p>
                </div>

                <DialogFooter className="gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsComposeDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="outline"
                    className="border-[#0F5D0B] text-[#0F5D0B] hover:bg-[#0F5D0B] hover:text-white"
                  >
                    Save as Draft
                  </Button>
                  <Button
                    type="button"
                    className="bg-[#0F5D0B] hover:bg-[#0A4A08]"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsPreviewDialogOpen(true)
                    }}
                  >
                    Preview
                  </Button>
                  <Button
                    type="button"
                    className="bg-[#0F5D0B] hover:bg-[#0A4A08]"
                    onClick={(e) => handleFormSubmit(e, "send")}
                  >
                    Send Newsletter
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Newsletter Table */}
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Newsletters</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="bg-white rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Newsletter
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date Sent
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
                      Recipients
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Performance
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
                  {filteredNewsletters.map((newsletter) => (
                    <tr key={newsletter.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">{newsletter.title}</div>
                          <div className="text-sm text-gray-500">{newsletter.subject}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {newsletter.status === "sent" ? newsletter.sentDate : "Not sent yet"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          className={
                            newsletter.status === "sent" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {newsletter.status.charAt(0).toUpperCase() + newsletter.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {newsletter.recipients.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {newsletter.status === "sent" ? (
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-xs">
                              <span>Open rate</span>
                              <span className="font-medium">{newsletter.openRate}%</span>
                            </div>
                            <Progress value={newsletter.openRate} className="h-1.5" />
                            <div className="flex justify-between text-xs">
                              <span>Click rate</span>
                              <span className="font-medium">{newsletter.clickRate}%</span>
                            </div>
                            <Progress value={newsletter.clickRate} className="h-1.5" />
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View</span>
                            </DropdownMenuItem>
                            {newsletter.status === "draft" && (
                              <>
                                <DropdownMenuItem className="cursor-pointer">
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer text-green-600">
                                  <Send className="mr-2 h-4 w-4" />
                                  <span>Send</span>
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="cursor-pointer text-red-600"
                              onClick={() => {
                                setSelectedNewsletter(newsletter)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sent">
          <div className="bg-white rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Newsletter
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date Sent
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Recipients
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Performance
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
                  {filteredNewsletters
                    .filter((newsletter) => newsletter.status === "sent")
                    .map((newsletter) => (
                      <tr key={newsletter.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <div className="text-sm font-medium text-gray-900">{newsletter.title}</div>
                            <div className="text-sm text-gray-500">{newsletter.subject}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{newsletter.sentDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {newsletter.recipients.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-xs">
                              <span>Open rate</span>
                              <span className="font-medium">{newsletter.openRate}%</span>
                            </div>
                            <Progress value={newsletter.openRate} className="h-1.5" />
                            <div className="flex justify-between text-xs">
                              <span>Click rate</span>
                              <span className="font-medium">{newsletter.clickRate}%</span>
                            </div>
                            <Progress value={newsletter.clickRate} className="h-1.5" />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem className="cursor-pointer">
                                <Eye className="mr-2 h-4 w-4" />
                                <span>View</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Users className="mr-2 h-4 w-4" />
                                <span>View Analytics</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="cursor-pointer text-red-600"
                                onClick={() => {
                                  setSelectedNewsletter(newsletter)
                                  setIsDeleteDialogOpen(true)
                                }}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="draft">
          <div className="bg-white rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Newsletter
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
                  {filteredNewsletters
                    .filter((newsletter) => newsletter.status === "draft")
                    .map((newsletter) => (
                      <tr key={newsletter.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <div className="text-sm font-medium text-gray-900">{newsletter.title}</div>
                            <div className="text-sm text-gray-500">{newsletter.subject}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem className="cursor-pointer">
                                <Eye className="mr-2 h-4 w-4" />
                                <span>Preview</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer text-green-600">
                                <Send className="mr-2 h-4 w-4" />
                                <span>Send</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="cursor-pointer text-red-600"
                                onClick={() => {
                                  setSelectedNewsletter(newsletter)
                                  setIsDeleteDialogOpen(true)
                                }}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Newsletter Preview</DialogTitle>
            <DialogDescription>Preview your newsletter before sending</DialogDescription>
          </DialogHeader>
          <div className="border rounded-md p-6 max-h-[500px] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{formValues.subject || "Newsletter Subject"}</h2>
            <div className="prose max-w-none">
              {formValues.content || (
                <p className="text-gray-500 italic">
                  Your newsletter content will appear here. Start typing in the content field to see a preview.
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsPreviewDialogOpen(false)}>
              Close Preview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Confirmation Dialog */}
      <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Newsletter</DialogTitle>
            <DialogDescription>
              You are about to send this newsletter to{" "}
              {segments.find((s) => s.id === formValues.segment)?.count.toLocaleString() || "0"} subscribers.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex flex-col gap-2 mb-4">
              <p className="font-medium">Newsletter Details:</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">Title:</div>
                <div className="font-medium">{formValues.title || "Untitled"}</div>
                <div className="text-gray-500">Subject:</div>
                <div className="font-medium">{formValues.subject || "No subject"}</div>
                <div className="text-gray-500">Segment:</div>
                <div className="font-medium">
                  {segments.find((s) => s.id === formValues.segment)?.name || "All Subscribers"}
                </div>
                <div className="text-gray-500">Recipients:</div>
                <div className="font-medium">
                  {segments.find((s) => s.id === formValues.segment)?.count.toLocaleString() || "0"}
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-md text-yellow-800 text-sm">
              <p className="font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                This action cannot be undone.
              </p>
              <p className="mt-1">
                Once sent, the newsletter will be delivered to all recipients in the selected segment.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSendDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#0F5D0B] hover:bg-[#0A4A08]">Send Newsletter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this newsletter? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedNewsletter && (
              <div>
                <p className="font-medium">{selectedNewsletter.title}</p>
                <p className="text-sm text-gray-500">{selectedNewsletter.subject}</p>
                {selectedNewsletter.status === "sent" && (
                  <p className="text-sm text-gray-500 mt-2">Sent on {selectedNewsletter.sentDate}</p>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Newsletter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

