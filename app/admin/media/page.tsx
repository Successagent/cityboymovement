"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, MoreHorizontal, Trash, Edit, Upload, Plus, Grid, List, Download, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
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
import { BackButton } from "@/components/admin/back-button"

// Mock data for media files
const mediaData = [
  {
    id: "1",
    name: "Cityboy Blog Image",
    filename: "cityboy-blog.jpg",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cityboy%20blog.jpg-sRfNPNGU1UqwnQp0jPlqoc9kDSblR8.jpeg",
    type: "image",
    size: "2.4 MB",
    dimensions: "1200 x 800",
    uploadedBy: "Admin",
    uploadedOn: "March 15, 2023",
    inUse: true,
  },
  {
    id: "2",
    name: "Community Meeting",
    filename: "community-meeting.jpg",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BATT2.jpg-My3gx3yWU1WqmyiMIQ84SnbtOW5wMl.jpeg",
    type: "image",
    size: "1.8 MB",
    dimensions: "1600 x 1000",
    uploadedBy: "Admin",
    uploadedOn: "March 10, 2023",
    inUse: true,
  },
  {
    id: "3",
    name: "Event Poster",
    filename: "event-poster.jpg",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BATT3.jpg-TXRUmFH2NVoqdzYXSKw5VuNtpmCxn4.jpeg",
    type: "image",
    size: "1.2 MB",
    dimensions: "800 x 1200",
    uploadedBy: "Admin",
    uploadedOn: "March 5, 2023",
    inUse: false,
  },
  {
    id: "4",
    name: "Summit Speech",
    filename: "summit-speech.jpg",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BATT4.jpg-5f4bSwnKWfZUKHijGsQAUaQKcIume5.jpeg",
    type: "image",
    size: "2.1 MB",
    dimensions: "1800 x 1200",
    uploadedBy: "Admin",
    uploadedOn: "February 28, 2023",
    inUse: true,
  },
  {
    id: "5",
    name: "Member in Black T-shirt",
    filename: "member-black-tshirt.jpg",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250303-WA0211.jpg-XY3l2366tQIomX1wjh2cwwBDCFKHXE.jpeg",
    type: "image",
    size: "1.5 MB",
    dimensions: "1200 x 1600",
    uploadedBy: "Admin",
    uploadedOn: "February 25, 2023",
    inUse: true,
  },
  {
    id: "6",
    name: "Members with Branded Caps",
    filename: "members-branded-caps.jpg",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250303-WA0243.jpg-zHFNAVhodUC1cFnspzwOK2YZSOnUaY.jpeg",
    type: "image",
    size: "1.7 MB",
    dimensions: "1400 x 1000",
    uploadedBy: "Admin",
    uploadedOn: "February 20, 2023",
    inUse: true,
  },
  {
    id: "7",
    name: "Members on Campaign Truck",
    filename: "members-campaign-truck.jpg",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250303-WA0223.jpg-ef0nLg93iLVm21EH61I1sci60B3YqR.jpeg",
    type: "image",
    size: "1.9 MB",
    dimensions: "1500 x 1000",
    uploadedBy: "Admin",
    uploadedOn: "February 15, 2023",
    inUse: true,
  },
  {
    id: "8",
    name: "Members with Boxing Gloves",
    filename: "members-boxing-gloves.jpg",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250303-WA0250.jpg-IVSjtTb4ZSmDJS5oMWrreDGlu000WM.jpeg",
    type: "image",
    size: "1.6 MB",
    dimensions: "1200 x 800",
    uploadedBy: "Admin",
    uploadedOn: "February 10, 2023",
    inUse: true,
  },
]

export default function AdminMediaPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [usageFilter, setUsageFilter] = useState("all")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<string[]>([])
  const [individualSelectedMedia, setIndividualSelectedMedia] = useState<(typeof mediaData)[0] | null>(null)
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [isImageDetailsOpen, setIsImageDetailsOpen] = useState(false)

  // Filter media based on search and usage
  const filteredMedia = mediaData.filter(
    (media) =>
      media.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (usageFilter === "all" ||
        (usageFilter === "in-use" && media.inUse) ||
        (usageFilter === "unused" && !media.inUse)),
  )

  // Handle file upload
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Uploading files...")
    // Here you would typically handle file upload to your storage
    setIsUploadDialogOpen(false)
  }

  // Handle file selection
  const handleSelectMedia = (id: string) => {
    if (selectedMedia.includes(id)) {
      setSelectedMedia(selectedMedia.filter((item) => item !== id))
    } else {
      setSelectedMedia([...selectedMedia, id])
    }
  }

  // Handle bulk delete
  const handleBulkDelete = () => {
    console.log("Deleting selected media:", selectedMedia)
    // Here you would typically send a delete request to your API
    setSelectedMedia([])
    setIsSelectMode(false)
  }

  // Handle individual delete
  const handleDelete = () => {
    console.log("Deleting media:", individualSelectedMedia)
    // Here you would typically send a delete request to your API
    setIsDeleteDialogOpen(false)
    setIndividualSelectedMedia(null)
  }

  // Copy URL to clipboard
  const copyToClipboard = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        // Show success message (could use a toast here)
        console.log("URL copied to clipboard")
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
      })
  }

  // View image details
  const viewImageDetails = (media: (typeof mediaData)[0]) => {
    setIndividualSelectedMedia(media)
    setIsImageDetailsOpen(true)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <BackButton href="/admin" />
          <h1 className="text-2xl font-bold">Media Gallery</h1>
        </div>
        <div className="flex gap-2">
          <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700">
            Dashboard
          </Link>
          <span className="text-sm text-gray-500">/</span>
          <span className="text-sm">Media</span>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search media..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={usageFilter} onValueChange={setUsageFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by usage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Media</SelectItem>
              <SelectItem value="in-use">In Use</SelectItem>
              <SelectItem value="unused">Unused</SelectItem>
            </SelectContent>
          </Select>
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
          {isSelectMode ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsSelectMode(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleBulkDelete} disabled={selectedMedia.length === 0}>
                Delete Selected ({selectedMedia.length})
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsSelectMode(true)}>
                Select
              </Button>
              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#0F5D0B] hover:bg-[#0A4A08]">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Media</DialogTitle>
                    <DialogDescription>Upload images to your media gallery.</DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleUpload} className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-10 text-center">
                      <div className="flex flex-col items-center">
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                      </div>
                      <Input type="file" className="hidden" id="fileUpload" accept="image/*" multiple />
                      <label
                        htmlFor="fileUpload"
                        className="mt-4 inline-flex items-center px-4 py-2 bg-[#0F5D0B] text-white rounded-md cursor-pointer hover:bg-[#0A4A08]"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Select Files
                      </label>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="altText">Description (Optional)</Label>
                      <Textarea id="altText" placeholder="Enter a description for the uploaded images" rows={2} />
                      <p className="text-xs text-gray-500">This will be used as alt text for accessibility.</p>
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-[#0F5D0B] hover:bg-[#0A4A08]">
                        Upload
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>

      {/* Media Gallery */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMedia.map((media) => (
            <div
              key={media.id}
              className={`relative rounded-lg overflow-hidden border ${isSelectMode || selectedMedia.includes(media.id) ? "ring-2 ring-[#0F5D0B]" : "hover:shadow-md"}`}
            >
              {isSelectMode && (
                <div className="absolute top-2 left-2 z-10">
                  <Checkbox
                    checked={selectedMedia.includes(media.id)}
                    onCheckedChange={() => handleSelectMedia(media.id)}
                  />
                </div>
              )}
              <div
                className="relative h-48 bg-gray-100 cursor-pointer"
                onClick={() => !isSelectMode && viewImageDetails(media)}
              >
                <Image src={media.url || "/placeholder.svg"} alt={media.name} fill className="object-cover" />
              </div>
              <div className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-sm truncate">{media.name}</h3>
                    <p className="text-xs text-gray-500">
                      {media.dimensions} • {media.size}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => copyToClipboard(media.url)}>
                        <Copy className="mr-2 h-4 w-4" />
                        <span>Copy URL</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Download className="mr-2 h-4 w-4" />
                        <span>Download</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer text-red-600"
                        onClick={() => {
                          setIndividualSelectedMedia(media)
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
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {isSelectMode && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <Checkbox
                        checked={selectedMedia.length === filteredMedia.length && filteredMedia.length > 0}
                        onCheckedChange={() => {
                          if (selectedMedia.length === filteredMedia.length) {
                            setSelectedMedia([])
                          } else {
                            setSelectedMedia(filteredMedia.map((m) => m.id))
                          }
                        }}
                      />
                    </th>
                  )}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Media
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Dimensions
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Size
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Uploaded
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
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
                {filteredMedia.map((media) => (
                  <tr key={media.id} className="hover:bg-gray-50">
                    {isSelectMode && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Checkbox
                          checked={selectedMedia.includes(media.id)}
                          onCheckedChange={() => handleSelectMedia(media.id)}
                        />
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative rounded overflow-hidden">
                          <Image src={media.url || "/placeholder.svg"} alt={media.name} fill className="object-cover" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{media.name}</div>
                          <div className="text-sm text-gray-500">{media.filename}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{media.dimensions}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{media.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{media.uploadedOn}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={media.inUse ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {media.inUse ? "In Use" : "Unused"}
                      </Badge>
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
                          <DropdownMenuItem className="cursor-pointer" onClick={() => copyToClipboard(media.url)}>
                            <Copy className="mr-2 h-4 w-4" />
                            <span>Copy URL</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Download className="mr-2 h-4 w-4" />
                            <span>Download</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="cursor-pointer text-red-600"
                            onClick={() => {
                              setIndividualSelectedMedia(media)
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
      )}

      {/* Image Details Dialog */}
      <Dialog open={isImageDetailsOpen} onOpenChange={setIsImageDetailsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Image Details</DialogTitle>
            <DialogDescription>View and manage image details</DialogDescription>
          </DialogHeader>
          {individualSelectedMedia && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative h-[300px] bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src={individualSelectedMedia.url || "/placeholder.svg"}
                  alt={individualSelectedMedia.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">{individualSelectedMedia.name}</h3>
                  <p className="text-sm text-gray-500">{individualSelectedMedia.filename}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500">Dimensions:</div>
                  <div>{individualSelectedMedia.dimensions}</div>
                  <div className="text-gray-500">Size:</div>
                  <div>{individualSelectedMedia.size}</div>
                  <div className="text-gray-500">Uploaded by:</div>
                  <div>{individualSelectedMedia.uploadedBy}</div>
                  <div className="text-gray-500">Uploaded on:</div>
                  <div>{individualSelectedMedia.uploadedOn}</div>
                  <div className="text-gray-500">Status:</div>
                  <div>
                    <Badge
                      className={
                        individualSelectedMedia.inUse ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }
                    >
                      {individualSelectedMedia.inUse ? "In Use" : "Unused"}
                    </Badge>
                  </div>
                </div>
                <div className="pt-4 space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <div className="flex">
                    <Input id="imageUrl" value={individualSelectedMedia.url} readOnly className="rounded-r-none" />
                    <Button className="rounded-l-none" onClick={() => copyToClipboard(individualSelectedMedia.url)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsImageDetailsOpen(false)}>
              Close
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setIsImageDetailsOpen(false)
                setIsDeleteDialogOpen(true)
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this media? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {individualSelectedMedia && (
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 h-16 w-16 relative rounded overflow-hidden">
                  <Image
                    src={individualSelectedMedia.url || "/placeholder.svg"}
                    alt={individualSelectedMedia.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{individualSelectedMedia.name}</p>
                  <p className="text-sm text-gray-500">{individualSelectedMedia.filename}</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

