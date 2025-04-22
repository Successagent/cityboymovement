"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const carouselImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BATT4.jpg-5f4bSwnKWfZUKHijGsQAUaQKcIume5.jpeg",
    alt: "Political figure speaking at ADSW Summit",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BATT3.jpg-TXRUmFH2NVoqdzYXSKw5VuNtpmCxn4.jpeg",
    alt: "Political figure reading documents in aircraft",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BATT2.jpg-My3gx3yWU1WqmyiMIQ84SnbtOW5wMl.jpeg",
    alt: "Group meeting with officials",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cityboy%20blog.jpg-sRfNPNGU1UqwnQp0jPlqoc9kDSblR8.jpeg",
    alt: "CityBoy supporters at an event",
  },
]

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
  }

  return (
    <section className="relative w-full h-[500px]">
      {/* Carousel Images */}
      <div className="relative w-full h-full overflow-hidden">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay with Buttons */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-8 px-4 md:px-8 z-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center gap-4">
            <Link
              href="/login"
              className="px-8 py-2 border border-white text-white rounded-full hover:bg-white/10 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="px-8 py-2 bg-[#9DF13C] text-black rounded-full hover:bg-[#8AD035] transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-32 left-0 right-0 z-30 flex justify-center gap-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
