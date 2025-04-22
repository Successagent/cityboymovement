"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Calendar, MapPin, Clock } from "lucide-react"

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0F5D0B] text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Events</h1>
            <p className="text-xl max-w-3xl">
              Join us at our upcoming events or browse through our past events to see what we've been up to.
            </p>
          </div>
        </section>

        {/* Events Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex border-b mb-8">
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === "upcoming"
                    ? "border-b-2 border-[#0F5D0B] text-[#0F5D0B]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming Events
              </button>
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === "past"
                    ? "border-b-2 border-[#0F5D0B] text-[#0F5D0B]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("past")}
              >
                Past Events
              </button>
            </div>

            {activeTab === "upcoming" ? (
              <div className="space-y-8">
                <EventCard
                  title="CityBoy Town Hall Meeting"
                  date="April 15, 2023"
                  time="10:00 AM - 2:00 PM"
                  location="Lagos State University, Lagos"
                  image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cityboy%20blog.jpg-sRfNPNGU1UqwnQp0jPlqoc9kDSblR8.jpeg"
                  upcoming={true}
                />
                <EventCard
                  title="Youth Empowerment Workshop"
                  date="April 22, 2023"
                  time="9:00 AM - 4:00 PM"
                  location="Abuja Conference Center, FCT"
                  image="/placeholder.svg?height=300&width=600"
                  upcoming={true}
                />
                <EventCard
                  title="CityBoy Community Outreach"
                  date="May 5, 2023"
                  time="11:00 AM - 3:00 PM"
                  location="Kano State University, Kano"
                  image="/placeholder.svg?height=300&width=600"
                  upcoming={true}
                />
              </div>
            ) : (
              <div className="space-y-8">
                <EventCard
                  title="CityBoy App Launch"
                  date="March 1, 2023"
                  time="10:00 AM - 2:00 PM"
                  location="Tech Hub, Lagos"
                  image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cityboy%20blog.jpg-sRfNPNGU1UqwnQp0jPlqoc9kDSblR8.jpeg"
                  upcoming={false}
                />
                <EventCard
                  title="Policy Dialogue on Urban Development"
                  date="February 15, 2023"
                  time="9:00 AM - 4:00 PM"
                  location="Sheraton Hotel, Abuja"
                  image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BATT2.jpg-My3gx3yWU1WqmyiMIQ84SnbtOW5wMl.jpeg"
                  upcoming={false}
                />
                <EventCard
                  title="CityBoy Movement Inauguration"
                  date="January 10, 2023"
                  time="11:00 AM - 3:00 PM"
                  location="Eagle Square, Abuja"
                  image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BATT4.jpg-5f4bSwnKWfZUKHijGsQAUaQKcIume5.jpeg"
                  upcoming={false}
                />
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

interface EventCardProps {
  title: string
  date: string
  time: string
  location: string
  image: string
  upcoming: boolean
}

function EventCard({ title, date, time, location, image, upcoming }: EventCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row">
      <div className="md:w-1/3 relative h-64 md:h-auto">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6 md:w-2/3">
        {upcoming && (
          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            Upcoming
          </span>
        )}
        {!upcoming && (
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium mb-4">
            Past Event
          </span>
        )}
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-gray-600">
            <Calendar size={18} className="mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock size={18} className="mr-2" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin size={18} className="mr-2" />
            <span>{location}</span>
          </div>
        </div>
        {upcoming ? (
          <button className="px-6 py-2 bg-[#0F5D0B] text-white rounded-md hover:bg-[#0A4A08] transition-colors">
            Register Now
          </button>
        ) : (
          <button className="px-6 py-2 border border-[#0F5D0B] text-[#0F5D0B] rounded-md hover:bg-[#0F5D0B] hover:text-white transition-colors">
            View Details
          </button>
        )}
      </div>
    </div>
  )
}

