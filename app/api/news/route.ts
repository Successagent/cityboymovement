import { NextResponse } from "next/server"

// Mock data for news articles
const newsArticles = [
  {
    id: "1",
    title: "CityBoy App Launched to Enhance Citizen Engagement",
    excerpt:
      "The CityBoy Movement has launched a new mobile application aimed at enhancing citizen engagement and participation in governance.",
    content:
      "The CityBoy Movement has launched a new mobile application aimed at enhancing citizen engagement and participation in governance. The app provides a platform for citizens to report issues, access government services, and stay informed about government activities.",
    date: "2023-03-15",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cityboy%20blog.jpg-sRfNPNGU1UqwnQp0jPlqoc9kDSblR8.jpeg",
    slug: "cityboy-app-launch",
    featured: true,
  },
  {
    id: "2",
    title: "Urban Development Initiatives Gain Momentum",
    excerpt:
      "The CityBoy Movement's urban development initiatives are gaining momentum across the country, with several projects already underway in major cities.",
    content:
      "The CityBoy Movement's urban development initiatives are gaining momentum across the country, with several projects already underway in major cities.",
    date: "2023-03-10",
    imageUrl: "/placeholder.svg?height=200&width=400",
    slug: "urban-development",
    featured: false,
  },
  {
    id: "3",
    title: "Youth Empowerment Workshop Held in Lagos",
    excerpt:
      "The CityBoy Movement recently held a youth empowerment workshop in Lagos, aimed at equipping young people with skills for civic engagement.",
    content:
      "The CityBoy Movement recently held a youth empowerment workshop in Lagos, aimed at equipping young people with skills for civic engagement.",
    date: "2023-03-05",
    imageUrl: "/placeholder.svg?height=200&width=400",
    slug: "youth-empowerment",
    featured: false,
  },
  {
    id: "4",
    title: "CityBoy Movement Launches Clean City Initiative",
    excerpt: "The CityBoy Movement has launched a new initiative aimed at keeping our cities clean and green.",
    content: "The CityBoy Movement has launched a new initiative aimed at keeping our cities clean and green.",
    date: "2023-03-01",
    imageUrl: "/placeholder.svg?height=200&width=400",
    slug: "clean-city-initiative",
    featured: false,
  },
  {
    id: "5",
    title: "Policy Dialogue on Urban Development",
    excerpt:
      "The CityBoy Movement recently held a policy dialogue on urban development, bringing together experts and policymakers.",
    content:
      "The CityBoy Movement recently held a policy dialogue on urban development, bringing together experts and policymakers.",
    date: "2023-02-25",
    imageUrl: "/placeholder.svg?height=200&width=400",
    slug: "policy-dialogue",
    featured: false,
  },
  {
    id: "6",
    title: "CityBoy Movement Expands to New States",
    excerpt: "The CityBoy Movement is expanding its presence to new states across the country.",
    content: "The CityBoy Movement is expanding its presence to new states across the country.",
    date: "2023-02-20",
    imageUrl: "/placeholder.svg?height=200&width=400",
    slug: "expansion",
    featured: false,
  },
]

export async function GET() {
  try {
    // In a real application, this would fetch from a database
    // For now, we'll use mock data
    return NextResponse.json({
      success: true,
      news: newsArticles,
      featured: newsArticles.find((article) => article.featured),
    })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch news" }, { status: 500 })
  }
}

