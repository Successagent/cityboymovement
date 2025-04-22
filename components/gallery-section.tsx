"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const galleryImages = [
  [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250303-WA0211.jpg-XY3l2366tQIomX1wjh2cwwBDCFKHXE.jpeg",
      alt: "CityBoy member in black t-shirt with HOPE 2023 design",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250303-WA0243.jpg-zHFNAVhodUC1cFnspzwOK2YZSOnUaY.jpeg",
      alt: "CityBoy members with branded caps",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250303-WA0223.jpg-ef0nLg93iLVm21EH61I1sci60B3YqR.jpeg",
      alt: "CityBoy members on campaign truck",
    },
  ],
  [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250303-WA0250.jpg-IVSjtTb4ZSmDJS5oMWrreDGlu000WM.jpeg",
      alt: "CityBoy members with boxing gloves",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250303-WA0226.jpg-St5nUSXDP4WdzyNKERgiq3lFvlGq1u.jpeg",
      alt: "CityBoy members walking in branded t-shirts",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250303-WA0252.jpg-ROtMmFEfgfQ8fkxlAgC3I9ejAx6Wml.jpeg",
      alt: "Group of CityBoy supporters at an event",
    },
  ],
  [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250303-WA0222.jpg-vLtYXK8PGkab9Jo3YlaN267bDlmiwb.jpeg",
      alt: "CityBoy Movement branded truck and vehicle",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250303-WA0210.jpg-CfJZqUhDttGLRlCeWdydO5RVXAVOsJ.jpeg",
      alt: "Group of four CityBoy members in branded attire",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cityboy%20blog.jpg-sRfNPNGU1UqwnQp0jPlqoc9kDSblR8.jpeg",
      alt: "Large group of CityBoy supporters",
    },
  ],
]

// Flatten the gallery images for the lightbox
const allImages = galleryImages.flat()

export function GallerySection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  const openLightbox = (groupIndex: number, imageIndex: number) => {
    // Calculate the flat index
    const flatIndex = groupIndex * 3 + imageIndex
    setLightboxIndex(flatIndex)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const goToPreviousLightbox = () => {
    setLightboxIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const goToNextLightbox = () => {
    setLightboxIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  // Handle keyboard navigation for lightbox
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      goToPreviousLightbox()
    } else if (e.key === "ArrowRight") {
      goToNextLightbox()
    } else if (e.key === "Escape") {
      closeLightbox()
    }
  }

  return (
    <section className="w-full py-16 md:py-24 bg-white overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#0F5D0B] mb-8">Our Gallery</h2>

        {/* Indicator Dots */}
        <div className="flex justify-center gap-2 mb-10">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-[#0F5D0B]" : "bg-gray-300"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Gallery Carousel */}
        <div className="relative w-full h-[400px] md:h-[500px] perspective">
          <div className="relative w-full h-full">
            {galleryImages.map((imageGroup, groupIndex) => (
              <div
                key={groupIndex}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                  groupIndex === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <div className="flex justify-center items-center h-full">
                  {/* Left Image - Tilted */}
                  <div
                    className="relative w-[30%] h-[80%] transform -rotate-6 -translate-x-4 shadow-xl cursor-pointer"
                    onClick={() => openLightbox(groupIndex, 0)}
                  >
                    <Image
                      src={imageGroup[0].src || "/placeholder.svg"}
                      alt={imageGroup[0].alt}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  {/* Center Image */}
                  <div
                    className="relative w-[35%] h-[90%] z-20 shadow-xl mx-2 cursor-pointer"
                    onClick={() => openLightbox(groupIndex, 1)}
                  >
                    <Image
                      src={imageGroup[1].src || "/placeholder.svg"}
                      alt={imageGroup[1].alt}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  {/* Right Image - Tilted */}
                  <div
                    className="relative w-[30%] h-[80%] transform rotate-6 translate-x-4 shadow-xl cursor-pointer"
                    onClick={() => openLightbox(groupIndex, 2)}
                  >
                    <Image
                      src={imageGroup[2].src || "/placeholder.svg"}
                      alt={imageGroup[2].alt}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 mt-6">
            <button
              onClick={goToPrevious}
              className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToNext}
              className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
            onClick={(e) => {
              e.stopPropagation()
              goToPreviousLightbox()
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="relative w-[90%] h-[80%] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={allImages[lightboxIndex].src || "/placeholder.svg"}
              alt={allImages[lightboxIndex].alt}
              fill
              className="object-contain"
            />
            <p className="absolute bottom-4 left-0 right-0 text-center text-white bg-black bg-opacity-50 py-2">
              {allImages[lightboxIndex].alt}
            </p>
          </div>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
            onClick={(e) => {
              e.stopPropagation()
              goToNextLightbox()
            }}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </section>
  )
}

