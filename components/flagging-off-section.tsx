"use client"
import Image from "next/image"
import { CountdownTimer } from "@/components/countdown-timer"

export function FlaggingOffSection() {
  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Left side - Image */}
          <div className="w-full md:w-1/3">
            <div className="relative aspect-square max-w-[350px] mx-auto">
              <Image
                src="/placeholder.svg?height=350&width=350"
                alt="Flagging Off Free Dialysis Centers"
                width={350}
                height={350}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Flagging Off Free Dialysis Centers</h2>

            <p className="text-gray-700 mb-8">
              479 inspirational designs, illustrations, and graphic elements from the world's best designers. Want more
              inspiration?
            </p>

            <CountdownTimer initialDays={4} initialHours={6} initialMinutes={20} initialSeconds={53} />
          </div>
        </div>
      </div>
    </section>
  )
}

