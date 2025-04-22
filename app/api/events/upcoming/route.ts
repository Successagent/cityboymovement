import { NextResponse } from "next/server"

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: "1",
    title: "CityBoy Town Hall Meeting",
    description:
      "Join us for an interactive town hall meeting to discuss urban development initiatives and community engagement opportunities.",
    date: "2023-12-15",
    time: "10:00 AM - 2:00 PM",
    location: "Lagos State University, Lagos",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cityboy%20blog.jpg-sRfNPNGU1UqwnQp0jPlqoc9kDSblR8.jpeg",
  },
]

export async function GET() {
  try {
    // In a real application, this would fetch from a database
    // For now, we'll use mock data
    return NextResponse.json({
      success: true,
      event: upcomingEvents[0],
    })
  } catch (error) {
    console.error("Error fetching upcoming event:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch upcoming event" }, { status: 500 })
  }
}

