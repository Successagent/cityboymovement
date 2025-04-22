"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, MoreHorizontal, Trash, Edit, Eye, Plus, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { BackButton } from "@/components/admin/back-button"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for carousel slides
const slidesData = [
  {
    id: "1",
    title: "Political figure speaking at ADSW Summit",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BATT4.jpg-5f4bSwnKWfZUKHijGsQAUaQKcIume5.jpeg",
    order: 1,
    active: true,
    createdAt: "March 15, 2023",
  },
  {
    id: "2",
    title: "Political figure reading documents in aircraft",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BATT3.jpg-TXRUmFH2NVoqdzYXSKw5VuNtpmCxn4.jpeg",
    order: 2,
    active: true,
    createdAt: "March 10, 2023",
  },
  {
    id: "3",
    title: "Group meeting with officials",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BATT2.jpg-My3gx3yWU1WqmyiMIQ84SnbtOW5wMl.jpeg",
    order: 3,
    active: true,
    createdAt: "March 5, 2023",
  },
  {
    id: "4",
    title: "CityBoy supporters at an event",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cityboy%20blog.jpg-sRfNPNGU1UqwnQp0jPlqoc9kDSblR8.jpeg",
    order: 4,
    active: true,
    createdAt: "March 1, 2023",
  },
  {
    id: "5",
    title: "New slide (inactive)",
    image: "/placeholder.svg?height=500&width=800",
    order: 5,
    active: false,
    createdAt: "February 25, 2023",
  },
]

export default function AdminSlidesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddSlideDialogOpen, setIsAddSlideDialogOpen] = useState(false)
  const [isEditSlideDialogOpen, setIsEditSlideDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSlide, setSelectedSlide] = useState<(typeof slidesData)[0] | null>(null)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)

  // Form fields for new slide
  const [formValues, setFormValues] = useState({
    title: "",
    active: true,
  })

  // Filter slides based on search and status
  const filteredSlides = slidesData
    .filter(
      (slide) =>
        slide.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (statusFilter === "all" ||
          (statusFilter === "active" && slide.active) ||
          (statusFilter === "inactive" && !slide.active)),
    )
    .sort((a, b) => a.order - b.order)

  // Handle form change
  const handleFormChange = (field: string, value: any) => {
    setFormValues({
      ...formValues,
      [field]: value,
    })
  }

  // Handle form submit for new slide
  const handleAddSlide = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Adding new slide:", formValues)
    // Here you would typically send data to your API
    setIsAddSlideDialogOpen(false)
    // Reset form
    setFormValues({
      title: "",
      active: true,
    })
  }

  // Handle form submit for edit slide
  const handleEditSlide = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Editing slide:", selectedSlide?.id, formValues)
    // Here you would typically send data to your API
    setIsEditSlideDialogOpen(false)
  }

  // Handle delete
  const handleDelete = () => {
    console.log("Deleting slide:", selectedSlide)
    // Here you would typically send a delete request to your API
    setIsDeleteDialogOpen(false)
    setSelectedSlide(null)
  }

  // Handle reordering slides
  const handleReorder = (id: string, direction: "up" | "down") => {
    console.log(`Moving slide ${id} ${direction}`)
    // Here you would typically update the order in your database
  }

  // Handle toggling slide active status
  const handleToggleActive = (id: string, currentStatus: boolean) => {
    console.log(`Toggling slide ${id} active status from ${currentStatus} to ${!currentStatus}`)
    // Here you would typically update the status in your database
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <BackButton href="/admin" />
          <h1 className="text-2xl font-bold">Carousel Slides</h1>
        </div>
        <div className="flex gap-2">
          <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700">
            Dashboard
          </Link>
          <span className="text-sm text-gray-500">/</span>
          <span className="text-sm">Slides</span>
        </div>
      </div>

      {/* Preview Section */}
      <div className="mb-8 bg-white p-6 rounded-lg border">
        <h2 className="text-lg font-medium mb-4">Current Carousel Preview</h2>
        <div className="relative h-[300px] rounded-lg overflow-hidden">
          <Image
            src={filteredSlides.find((slide) => slide.active)?.image || "/placeholder.svg?height=500&width=800"}
            alt="Current carousel slide"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Button className="bg-[#0F5D0B] hover:bg-[#0A4A08]" onClick={() => setIsPreviewDialogOpen(true)}>
              <Eye className="mr-2 h-4 w-4" />
              Preview Carousel
            </Button>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search slides..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Tabs defaultValue={statusFilter} onValueChange={setStatusFilter} className="w-[200px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
          </Tabs>
          <Dialog open={isAddSlideDialogOpen} onOpenChange={setIsAddSlideDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#0F5D0B] hover:bg-[#0A4A08]">
                <Plus className="mr-2 h-4 w-4" />
                Add Slide
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Slide</DialogTitle>
                <DialogDescription>Add a new slide to the carousel.</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleAddSlide} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Slide Title</Label>
                  <Input
                    id="title"
                    value={formValues.title}
                    onChange={(e) => handleFormChange("title", e.target.value)}
                    placeholder="Enter slide title"
                    required
                  />
                  <p className="text-xs text-gray-500">This will be used as alt text for accessibility.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Slide Image</Label>
                  <Input id="image" type="file" accept="image/*" required />
                  <p className="text-xs text-gray-500">Recommended size: 1200 x 600 pixels</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="active"
                    checked={formValues.active}
                    onCheckedChange={(checked) => handleFormChange("active", checked)}
                  />
                  <Label htmlFor="active">Active (visible in carousel)</Label>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddSlideDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#0F5D0B] hover:bg-[#0A4A08]">
                    Add Slide
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Slides Table */}
      <div className="bg-white rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Slide
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
                  Created
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Reorder
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
              {filteredSlides.map((slide) => (
                <tr key={slide.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{slide.order}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-24 relative rounded overflow-hidden">
                        <Image
                          src={slide.image || "/placeholder.svg"}
                          alt={slide.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{slide.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      className={slide.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                      onClick={() => handleToggleActive(slide.id, slide.active)}
                    >
                      {slide.active ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{slide.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        disabled={slide.order === 1}
                        onClick={() => handleReorder(slide.id, "up")}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        disabled={slide.order === filteredSlides.length}
                        onClick={() => handleReorder(slide.id, "down")}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
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
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedSlide(slide)
                            setFormValues({
                              title: slide.title,
                              active: slide.active,
                            })
                            setIsEditSlideDialogOpen(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleToggleActive(slide.id, slide.active)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          <span>{slide.active ? "Deactivate" : "Activate"}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer text-red-600"
                          onClick={() => {
                            setSelectedSlide(slide)
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

      {/* Edit Slide Dialog */}
      <Dialog open={isEditSlideDialogOpen} onOpenChange={setIsEditSlideDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Slide</DialogTitle>
            <DialogDescription>Update the slide details.</DialogDescription>
          </DialogHeader>

          {selectedSlide && (
            <form onSubmit={handleEditSlide} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Slide Title</Label>
                <Input
                  id="edit-title"
                  value={formValues.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                  placeholder="Enter slide title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Current Image</Label>
                <div className="relative h-[200px] rounded-lg overflow-hidden">
                  <Image
                    src={selectedSlide.image || "/placeholder.svg"}
                    alt={selectedSlide.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-image">Replace Image (Optional)</Label>
                <Input id="edit-image" type="file" accept="image/*" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-active"
                  checked={formValues.active}
                  onCheckedChange={(checked) => handleFormChange("active", checked)}
                />
                <Label htmlFor="edit-active">Active (visible in carousel)</Label>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditSlideDialogOpen(false)}>
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

      {/* Preview Carousel Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Carousel Preview</DialogTitle>
            <DialogDescription>Preview how the carousel will appear on the website.</DialogDescription>
          </DialogHeader>

          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex">
              {filteredSlides
                .filter((slide) => slide.active)
                .map((slide, index) => (
                  <div
                    key={slide.id}
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{ opacity: index === 0 ? 1 : 0 }}
                  >
                    <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" />
                  </div>
                ))}
            </div>

            {/* Navigation Controls */}
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-black/30 border-0 text-white hover:bg-black/50"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-black/30 border-0 text-white hover:bg-black/50"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {filteredSlides
                .filter((slide) => slide.active)
                .map((slide, index) => (
                  <button
                    key={slide.id}
                    className={`w-3 h-3 rounded-full ${index === 0 ? "bg-white" : "bg-white/50"}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsPreviewDialogOpen(false)}>Close Preview</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this slide? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedSlide && (
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 h-16 w-24 relative rounded overflow-hidden">
                  <Image
                    src={selectedSlide.image || "/placeholder.svg"}
                    alt={selectedSlide.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{selectedSlide.title}</p>
                  <p className="text-sm text-gray-500">Order: {selectedSlide.order}</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Slide
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

