"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  location: string
  imageUrl: string
  author: {
    name: string
    avatar: string
  }
  tags: string[]
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([])

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true)
        // In a real app, you would fetch from an API endpoint like:
        // const response = await fetch(`/api/news/${params.slug}`)

        // For demo purposes, we'll simulate a delay and return mock data
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data for demonstration
        const mockArticle: NewsArticle = {
          id: "1",
          title: "CityBoy Movement Launches Free Healthcare Initiative",
          excerpt:
            "The CityBoy Movement has launched a new initiative to provide free healthcare services to underserved communities.",
          content: `
            <p>The CityBoy Movement has launched a groundbreaking initiative aimed at providing free healthcare services to underserved communities across the nation. This initiative, which was announced at a press conference held at the movement's headquarters, is part of the organization's broader commitment to improving the quality of life for all citizens.</p>
            
            <p>According to the movement's spokesperson, the initiative will initially focus on providing basic healthcare services such as general consultations, preventive care, and health education. The program will be implemented in phases, with the first phase targeting urban slums and rural areas with limited access to healthcare facilities.</p>
            
            <p>"We believe that access to quality healthcare is a fundamental right, not a privilege," said the spokesperson. "Through this initiative, we aim to bridge the healthcare gap and ensure that every citizen, regardless of their socioeconomic status, has access to basic healthcare services."</p>
            
            <p>The initiative will be implemented through mobile clinics that will visit different communities on a rotational basis. These clinics will be staffed by volunteer healthcare professionals, including doctors, nurses, and community health workers.</p>
            
            <p>In addition to providing direct healthcare services, the initiative also includes a component of health education and awareness. This will involve community workshops and information sessions on various health topics, including disease prevention, nutrition, and personal hygiene.</p>
            
            <p>The CityBoy Movement has also announced plans to partner with pharmaceutical companies and other stakeholders to ensure a steady supply of essential medicines and medical supplies for the initiative.</p>
            
            <p>The initiative has been welcomed by community leaders and health advocates, who have described it as a step in the right direction towards achieving universal health coverage.</p>
            
            <p>"This initiative by the CityBoy Movement is commendable," said a community leader. "It will go a long way in addressing the healthcare needs of our community, especially for those who cannot afford to pay for healthcare services."</p>
            
            <p>The CityBoy Movement has called on other organizations and individuals to support the initiative through donations, volunteering, and advocacy. The movement has set up a dedicated website and hotline for those interested in supporting the initiative.</p>
            
            <p>The free healthcare initiative is one of several social impact projects being implemented by the CityBoy Movement as part of its commitment to promoting social justice and equality.</p>
          `,
          date: "2023-03-15",
          readTime: "5 min read",
          location: "Lagos, Nigeria",
          imageUrl:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cityboy%20blog.jpg-sRfNPNGU1UqwnQp0jPlqoc9kDSblR8.jpeg",
          author: {
            name: "John Doe",
            avatar: "/placeholder.svg?height=50&width=50",
          },
          tags: ["Healthcare", "Community", "Social Impact"],
        }

        setArticle(mockArticle)

        // Mock related articles
        setRelatedArticles([
          {
            id: "2",
            title: "CityBoy Movement Hosts Town Hall Meeting on Education Reform",
            excerpt: "Leaders of the CityBoy Movement met with education stakeholders to discuss reforms.",
            content: "",
            date: "2023-03-10",
            readTime: "4 min read",
            location: "Abuja, Nigeria",
            imageUrl: "/placeholder.svg?height=200&width=300",
            author: {
              name: "Jane Smith",
              avatar: "/placeholder.svg?height=50&width=50",
            },
            tags: ["Education", "Policy", "Reform"],
          },
          {
            id: "3",
            title: "CityBoy Movement Launches Youth Empowerment Program",
            excerpt: "New program aims to equip young people with skills for the future.",
            content: "",
            date: "2023-03-05",
            readTime: "3 min read",
            location: "Port Harcourt, Nigeria",
            imageUrl: "/placeholder.svg?height=200&width=300",
            author: {
              name: "Michael Johnson",
              avatar: "/placeholder.svg?height=50&width=50",
            },
            tags: ["Youth", "Empowerment", "Skills"],
          },
          {
            id: "4",
            title: "CityBoy Movement Partners with Tech Companies for Digital Literacy",
            excerpt: "Partnership aims to increase digital literacy in underserved communities.",
            content: "",
            date: "2023-02-28",
            readTime: "6 min read",
            location: "Kano, Nigeria",
            imageUrl: "/placeholder.svg?height=200&width=300",
            author: {
              name: "Sarah Williams",
              avatar: "/placeholder.svg?height=50&width=50",
            },
            tags: ["Technology", "Digital Literacy", "Partnership"],
          },
        ])
      } catch (err) {
        console.error("Error fetching article:", err)
        setError("Could not load the article")
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticle()
  }, [params.slug])

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <Skeleton className="h-8 w-32 mb-4" />
              <Skeleton className="h-12 w-3/4 mb-6" />
              <div className="flex items-center gap-4 mb-6">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
            <Skeleton className="h-[400px] w-full rounded-lg mb-8" />
            <div className="space-y-4 mb-8">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p className="text-gray-600 mb-8">{error || "Article not found"}</p>
            <Link href="/news">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to News
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0F5D0B] text-white py-12">
          <div className="container mx-auto px-4">
            <Link href="/news" className="inline-flex items-center text-white/80 hover:text-white mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{article.title}</h1>

            <div className="flex flex-wrap items-center gap-6 mt-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 opacity-80" />
                <span>
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 opacity-80" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 opacity-80" />
                <span>{article.location}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
                  <Image
                    src={article.imageUrl || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <Image
                    src={article.author.avatar || "/placeholder.svg"}
                    alt={article.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{article.author.name}</p>
                    <p className="text-sm text-gray-500">Author</p>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />

                <div className="mt-8 pt-8 border-t">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/news/tag/${tag.toLowerCase()}`}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-xl font-bold mb-4">Share this article</h3>
                  <div className="flex gap-3">
                    <Button variant="outline" size="icon">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4">Related Articles</h3>
                  <div className="space-y-6">
                    {relatedArticles.map((relatedArticle) => (
                      <div key={relatedArticle.id} className="flex gap-4">
                        <div className="relative h-20 w-20 flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={relatedArticle.imageUrl || "/placeholder.svg"}
                            alt={relatedArticle.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium line-clamp-2 mb-1">
                            <Link href={`/news/${relatedArticle.id}`} className="hover:text-[#0F5D0B]">
                              {relatedArticle.title}
                            </Link>
                          </h4>
                          <p className="text-sm text-gray-500">
                            {new Date(relatedArticle.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0F5D0B] text-white rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
                  <p className="mb-4">Stay updated with the latest news and events from the CityBoy Movement.</p>
                  <form className="space-y-4">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-2 rounded border border-white/20 bg-white/10 text-white placeholder:text-white/60"
                      required
                    />
                    <Button className="w-full bg-white text-[#0F5D0B] hover:bg-white/90">Subscribe</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

