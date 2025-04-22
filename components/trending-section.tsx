"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface TrendingNews {
  id: string
  title: string
  excerpt: string
  date: string
  slug: string
}

export function TrendingSection() {
  const [trendingNews, setTrendingNews] = useState<TrendingNews[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTrendingNews = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/news/trending")

        if (!response.ok) {
          throw new Error("Failed to fetch trending news")
        }

        const data = await response.json()

        if (data.success && data.news) {
          setTrendingNews(data.news)
        } else {
          setError(data.message || "No trending news found")
        }
      } catch (err) {
        console.error("Error fetching trending news:", err)
        setError("Could not load trending news")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrendingNews()
  }, [])

  if (isLoading) {
    return (
      <section className="w-full py-12 md:py-24 bg-[#0A4A08] text-white">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter">Trending News</h2>
          </div>
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
            <span className="ml-2">Loading trending news...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error && trendingNews.length === 0) {
    return (
      <section className="w-full py-12 md:py-24 bg-[#0A4A08] text-white">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter">Trending News</h2>
          </div>
          <div className="text-center py-12">
            <p>No trending news available at the moment. Please check back later.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-12 md:py-24 bg-[#0A4A08] text-white">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter">Trending News</h2>
          <Button asChild className="bg-[#9DF13C] hover:bg-[#8AD035] text-black">
            <Link href="/news">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingNews.map((news) => (
            <div key={news.id} className="bg-[#0F5D0B] rounded-lg p-6">
              <div className="text-sm text-green-300 mb-2">
                {new Date(news.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <h3 className="text-xl font-bold mb-2">{news.title}</h3>
              <p className="text-green-100 mb-4">{news.excerpt}</p>
              <Link href={`/news/${news.slug}`} className="text-green-300 hover:text-green-100">
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

