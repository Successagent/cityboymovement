"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Search, Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  imageUrl: string
  slug: string
  featured: boolean
}

export default function NewsPage() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([])
  const [featuredArticle, setFeaturedArticle] = useState<NewsArticle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 6

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/news")

        if (!response.ok) {
          throw new Error("Failed to fetch news")
        }

        const data = await response.json()

        if (data.success) {
          setNewsArticles(data.news)
          setFeaturedArticle(data.featured)
        } else {
          setError(data.message || "No news found")
        }
      } catch (err) {
        console.error("Error fetching news:", err)
        setError("Could not load news")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [])

  // Filter articles based on search query
  const filteredArticles = newsArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Pagination
  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle)
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#0F5D0B] to-[#0A4A08] text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">CityBoy News</h1>
              <p className="text-xl opacity-90 mb-8">
                Stay updated with the latest news, events, and developments from the CityBoy Movement.
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search news articles..."
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Featured Article</h2>

            {isLoading ? (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <Skeleton className="h-[400px] w-full rounded-lg" />
                <div className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-10 w-3/4" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-10 w-36" />
                </div>
              </div>
            ) : featuredArticle ? (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={featuredArticle.imageUrl || "/placeholder.svg"}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#0F5D0B] hover:bg-[#0F5D0B] text-white">Featured</Badge>
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {new Date(featuredArticle.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mt-2 mb-4">{featuredArticle.title}</h3>
                  <p className="text-gray-700 mb-6">{featuredArticle.excerpt}</p>
                  <Link
                    href={`/news/${featuredArticle.slug}`}
                    className="inline-flex items-center px-6 py-3 bg-[#0F5D0B] text-white rounded-md hover:bg-[#0A4A08] transition-colors"
                  >
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No featured article available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Latest Articles */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Latest Articles</h2>

            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="border rounded-lg overflow-hidden shadow-sm">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : currentArticles.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  {error || (searchQuery ? "No articles match your search." : "No articles available at the moment.")}
                </p>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <Button
                      key={number}
                      variant={currentPage === number ? "default" : "outline"}
                      className={currentPage === number ? "bg-[#0F5D0B] hover:bg-[#0A4A08]" : ""}
                      onClick={() => paginate(number)}
                    >
                      {number}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </nav>
              </div>
            )}
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">News Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <CategoryCard title="Politics" count={12} />
              <CategoryCard title="Economy" count={8} />
              <CategoryCard title="Environment" count={15} />
              <CategoryCard title="Education" count={10} />
              <CategoryCard title="Health" count={7} />
              <CategoryCard title="Technology" count={9} />
              <CategoryCard title="Culture" count={6} />
              <CategoryCard title="Sports" count={11} />
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-[#0F5D0B] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest news and updates from the CityBoy Movement directly to
              your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button className="bg-white text-[#0F5D0B] hover:bg-white/90">Subscribe</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

interface ArticleCardProps {
  article: {
    title: string
    excerpt: string
    date: string
    imageUrl: string
    slug: string
  }
}

function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      <Link href={`/news/${article.slug}`} className="block">
        <div className="relative h-48">
          <Image src={article.imageUrl || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center text-gray-500 mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          <span>
            {new Date(article.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <Link href={`/news/${article.slug}`}>
          <h3 className="text-xl font-bold mt-2 mb-3 hover:text-[#0F5D0B] transition-colors">{article.title}</h3>
        </Link>
        <p className="text-gray-700 mb-4 line-clamp-3">{article.excerpt}</p>
        <Link
          href={`/news/${article.slug}`}
          className="text-[#0F5D0B] font-medium hover:underline inline-flex items-center"
        >
          Read More <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

interface CategoryCardProps {
  title: string
  count: number
}

function CategoryCard({ title, count }: CategoryCardProps) {
  return (
    <Link href={`/news/category/${title.toLowerCase()}`}>
      <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all hover:translate-y-[-2px] border">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-gray-500 text-sm">{count} articles</p>
      </div>
    </Link>
  )
}

