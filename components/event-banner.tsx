"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CountdownTimer } from "@/components/countdown-timer"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  imageUrl: string
}

export function EventBanner() {
  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/events/upcoming")

        if (!response.ok) {
          throw new Error("Failed to fetch upcoming event")
        }

        const data = await response.json()

        if (data.success && data.event) {
          setEvent(data.event)
        } else {
          setError(data.message || "No upcoming events found")
        }
      } catch (err) {
        console.error("Error fetching upcoming event:", err)
        setError("Could not load upcoming event")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUpcomingEvent()
  }, [])

  if (isLoading) {
    return (
      <section className="w-full bg-gradient-to-r from-[#0F5D0B]/10 to-[#0F5D0B]/5 py-12">
        <div className="container mx-auto px-4">
          <div className="h-64 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0F5D0B] border-t-transparent"></div>
            <span className="ml-2 text-[#0F5D0B]">Loading upcoming event...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error || !event) {
    return null // Don't show the section if there's no event
  }

  // Parse the event date for the countdown
  const eventDate = new Date(`${event.date}T${event.time.split(" - ")[0]}`)

  return (
    <section className="w-full bg-gradient-to-r from-[#0F5D0B]/10 to-[#0F5D0B]/5 py-12">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden border-none shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event Image */}
            <div className="relative h-64 md:h-full">
              <Image
                src={event.imageUrl || "/placeholder.svg?height=400&width=600"}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Event Details */}
            <CardContent className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F5D0B] mb-3">{event.title}</h2>
                <p className="text-gray-700 mb-6">{event.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2 text-[#0F5D0B]" />
                    <span>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2 text-[#0F5D0B]" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2 text-[#0F5D0B]" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Event starts in:</p>
                  <CountdownTimer targetDate={eventDate} />
                </div>

                <Link href={`/events/${event.id}`}>
                  <Button className="w-full bg-[#0F5D0B] hover:bg-[#0A4A08]">View Event Details</Button>
                </Link>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  )
}

