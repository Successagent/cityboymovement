"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroCarousel } from "@/components/hero-carousel"
import { EventBanner } from "@/components/event-banner"
import { TeamSection } from "@/components/team-section"
import { GallerySection } from "@/components/gallery-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { TrendingSection } from "@/components/trending-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroCarousel />
        <EventBanner />
        <GallerySection />
        <TrendingSection />
        <TeamSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}

