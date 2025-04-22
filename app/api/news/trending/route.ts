import { NextResponse } from "next/server"

// Mock data for trending news
const trendingNews = [
  {
    id: "1",
    title: "Urban Housing Crisis: Solutions for Affordable Living",
    excerpt: "Exploring innovative approaches to address the housing affordability crisis in major cities.",
    date: "2023-03-15",
    slug: "housing-crisis",
  },
  {
    id: "2",
    title: "Public Transportation: The Backbone of Urban Mobility",
    excerpt: "How efficient public transit systems can transform city life and reduce carbon emissions.",
    date: "2023-03-10",
    slug: "public-transportation",
  },
  {
    id: "3",
    title: "Community Gardens: Growing Food and Connection",
    excerpt: "The social and environmental benefits of urban agriculture and community-led green spaces.",
    date: "2023-03-05",
    slug: "community-gardens",
  },
]

export async function GET() {
  try {
    // In a real application, this would fetch from a database
    // For now, we'll use mock data
    return NextResponse.json({
      success: true,
      news: trendingNews,
    })
  } catch (error) {
    console.error("Error fetching trending news:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch trending news" }, { status: 500 })
  }
}

