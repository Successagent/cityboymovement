"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock data for events
const eventData = [
  {
    id: "1",
    title: "CityBoy Town Hall Meeting",
    date: "April 15, 2023",
    time: "10:00 AM - 2:00 PM",
    location: "Lagos State University, Lagos",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cityboy%20blog.jpg-sRfNPNGU1UqwnQp0jPlqoc9kDSblR8.jpeg",
    description:
      "Join us for an interactive town hall meeting to discuss urban development initiatives and community engagement opportunities.",
    registered: true,
  },
  {
    id: "2",
    title: "Youth Empowerment Workshop",
    date: "April 22, 2023",
    time: "9:00 AM - 4:00 PM",
    location: "Abuja Conference Center, FCT",
    image: "/placeholder.svg?height=300&width=600",
    description:
      "A comprehensive workshop focused on empowering youth with skills for civic engagement and community leadership.",
    registered: false,
  },
  {
    id: "3",
    title: "CityBoy Community Outreach",
    date: "May 5, 2023",
    time: "11:00 AM - 3:00 PM",
    location: "Kano State University, Kano",
    image: "/placeholder.svg?height=300&width=600",
    description:
      "A community outreach program aimed at connecting with local communities and addressing their concerns.",
    registered: false,
  },
  {
    id: "4",
    title: "Policy Dialogue on Urban Development",
    date: "May 18, 2023",
    time: "10:00 AM - 1:00 PM",
    location: "Sheraton Hotel, Lagos",
    image: "/placeholder.svg?height=300&width=600",
    description:
      "A policy dialogue session bringing together experts, policymakers, and citizens to discuss sustainable urban development.",
    registered: true,
  },
]

export default function DashboardEventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [selectedEvent, setSelectedEvent] = useState<(typeof eventData)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Filter events based on search and location
  const filteredEvents = eventData.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (locationFilter === "all" || event.location.includes(locationFilter)),
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Events</h1>
        <div className="flex gap-2">
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">
            Dashboard
          </Link>
          <span className="text-sm text-gray-500">/</span>
          <span className="text-sm">Events</span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search events..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Lagos">Lagos</SelectItem>
              <SelectItem value="Abuja">Abuja</SelectItem>
              <SelectItem value="Kano">Kano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Events Tabs */}
      <Tabs defaultValue="upcoming">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="registered">Registered</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={() => {
                setSelectedEvent(event)
                setIsDialogOpen(true)
              }}
              onViewDetails={() => {
                setSelectedEvent(event)
                setIsDialogOpen(true)
              }}
            />
          ))}
        </TabsContent>

        <TabsContent value="registered" className="space-y-6">
          {filteredEvents
            .filter((event) => event.registered)
            .map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={() => {}}
                onViewDetails={() => {
                  setSelectedEvent(event)
                  setIsDialogOpen(true)
                }}
              />
            ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          <div className="text-center py-8 text-gray-500">No past events to display</div>
        </TabsContent>
      </Tabs>

      {/* Event Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedEvent.title}</DialogTitle>
                <DialogDescription>Event details and registration</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={selectedEvent.image || "/placeholder.svg"}
                    alt={selectedEvent.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={18} className="mr-2" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={18} className="mr-2" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={18} className="mr-2" />
                    <span>{selectedEvent.location}</span>
                  </div>

                  <p className="text-gray-700">{selectedEvent.description}</p>
                </div>
              </div>

              <DialogFooter>
                {selectedEvent.registered ? (
                  <div className="flex gap-4 w-full">
                    <Button className="flex-1" variant="outline">
                      Cancel Registration
                    </Button>
                    <Button className="flex-1 bg-[#0F5D0B] hover:bg-[#0A4A08]">Add to Calendar</Button>
                  </div>
                ) : (
                  <Button className="w-full bg-[#0F5D0B] hover:bg-[#0A4A08]">Register Now</Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface EventCardProps {
  event: {
    id: string
    title: string
    date: string
    time: string
    location: string
    image: string
    description: string
    registered: boolean
  }
  onRegister: () => void
  onViewDetails: () => void
}

function EventCard({ event, onRegister, onViewDetails }: EventCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row">
      <div className="md:w-1/3 relative h-48 md:h-auto">
        <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
      </div>
      <div className="p-6 md:w-2/3">
        <h3 className="text-xl font-bold mb-4">{event.title}</h3>
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-gray-600">
            <Calendar size={18} className="mr-2" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock size={18} className="mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin size={18} className="mr-2" />
            <span>{event.location}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            className="flex-1 bg-[#0F5D0B] hover:bg-[#0A4A08]"
            onClick={event.registered ? onViewDetails : onRegister}
          >
            {event.registered ? "View Details" : "Register Now"}
          </Button>
          {event.registered && (
            <Button variant="outline" className="flex-1" onClick={onViewDetails}>
              Cancel Registration
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

