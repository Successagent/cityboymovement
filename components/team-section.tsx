import Image from "next/image"

export function TeamSection() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#0F5D0B] mb-16">Our Team</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {/* Team Member 1 - Seyi Tinubu */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* Green decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#0F5D0B] rounded-tl-full z-0"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#0F5D0B] rounded-br-full z-0"></div>

              {/* Circular image */}
              <div className="relative z-10 w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Seyi%20Tinubu-PzPve9ZqziYOiElueoIpPtZmuX8G6J.png"
                  alt="Seyi Tinubu"
                  width={300}
                  height={300}
                  className="object-cover"
                />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-[#0F5D0B] mt-6">Seyi Tinubu</h3>
            <p className="text-lg text-[#0F5D0B]">Grand Patron</p>
          </div>

          {/* Team Member 2 - Shoga O. Francis */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* Green decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#0F5D0B] rounded-tl-full z-0"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#0F5D0B] rounded-br-full z-0"></div>

              {/* Circular image */}
              <div className="relative z-10 w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shoga%20Francis-l4sA0jTZcm8sAKwgdOSpysogOYpH8k.png"
                  alt="Shoga O. Francis"
                  width={300}
                  height={300}
                  className="object-cover"
                />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-[#0F5D0B] mt-6">Shoga O. Francis</h3>
            <p className="text-lg text-[#0F5D0B]">Director General</p>
          </div>

          {/* Team Member 3 - Favour Abayomi */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* Green decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#0F5D0B] rounded-tl-full z-0"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#0F5D0B] rounded-br-full z-0"></div>

              {/* Circular image */}
              <div className="relative z-10 w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mr%20Favour%20Aboyemi-ZBSEzXZmE51LWi2MJKyO0bOc8BDMps.png"
                  alt="Favour Abayomi"
                  width={300}
                  height={300}
                  className="object-cover"
                />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-[#0F5D0B] mt-6">Favour Abayomi</h3>
            <p className="text-lg text-[#0F5D0B]">National Coordinator</p>
          </div>

          {/* Team Member 4 - Osigbode Ajose */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* Green decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#0F5D0B] rounded-tl-full z-0"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#0F5D0B] rounded-br-full z-0"></div>

              {/* Circular image */}
              <div className="relative z-10 w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Osigbode%20Ajose.png-0cR1JW3lKSYNOLESOK1Nub5GGYPChu.jpeg"
                  alt="Osigbode Ajose"
                  width={300}
                  height={300}
                  className="object-cover"
                />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-[#0F5D0B] mt-6">Osigbode Ajose</h3>
            <p className="text-lg text-[#0F5D0B]">Director of Programs</p>
          </div>
        </div>
      </div>
    </section>
  )
}

