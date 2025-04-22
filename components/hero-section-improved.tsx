"use client"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative w-full h-[500px]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WhQuhuw97Bs450pFXPhuUf2gxaVeYQ.png"
          alt="Nigerian Presidential Seal and Official"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white text-sm md:text-base mb-6">
            The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer
            sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen
            all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on
            for the authoritative history of Lorem Ipsum.
          </p>

          <div className="flex justify-center gap-4">
            <button className="px-8 py-2 border border-white text-white rounded-full hover:bg-white/10 transition-colors">
              Log In
            </button>
            <button className="px-8 py-2 bg-[#9DF13C] text-black rounded-full hover:bg-[#8AD035] transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

