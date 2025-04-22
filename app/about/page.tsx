import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0F5D0B] text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl max-w-3xl">
              Learn about the CityBoy Movement, our mission, vision, and the team behind our initiatives.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-[#0F5D0B]">Our Mission</h2>
                <p className="text-lg text-gray-700 mb-6">
                  The CityBoy Movement is dedicated to empowering urban communities across Nigeria through civic
                  engagement, policy advocacy, and grassroots mobilization. We believe in the power of informed
                  citizenship and collective action to drive positive change in our cities and towns.
                </p>
                <p className="text-lg text-gray-700">
                  Our mission is to create a platform where citizens can actively participate in governance, hold
                  leaders accountable, and contribute to the development of their communities.
                </p>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cityboy%20blog.jpg-sRfNPNGU1UqwnQp0jPlqoc9kDSblR8.jpeg"
                  alt="CityBoy Movement Members"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-[#0F5D0B]">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#0F5D0B]"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Inclusivity</h3>
                <p className="text-gray-700">
                  We believe in creating a movement that represents all Nigerians, regardless of ethnicity, religion,
                  gender, or socioeconomic status.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#0F5D0B]"
                  >
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                    <line x1="6" y1="1" x2="6" y2="4"></line>
                    <line x1="10" y1="1" x2="10" y2="4"></line>
                    <line x1="14" y1="1" x2="14" y2="4"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Transparency</h3>
                <p className="text-gray-700">
                  We are committed to operating with complete transparency in all our activities, finances, and
                  decision-making processes.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#0F5D0B]"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Excellence</h3>
                <p className="text-gray-700">
                  We strive for excellence in all our initiatives, setting high standards for ourselves and the outcomes
                  we seek to achieve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-[#0F5D0B]">Our History</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 mb-6">
                The CityBoy Movement was founded in 2022 by a group of young, passionate Nigerians who believed in the
                potential of citizen-led initiatives to transform urban governance and development.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                What began as a small community of like-minded individuals has grown into a nationwide movement with
                members across all 36 states and the Federal Capital Territory.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Over the years, we have organized numerous town halls, community outreach programs, and policy
                dialogues, bringing citizens and government officials together to address pressing urban challenges.
              </p>
              <p className="text-lg text-gray-700">
                Today, the CityBoy Movement continues to expand its reach and impact, leveraging technology and
                grassroots mobilization to create more inclusive, sustainable, and livable cities for all Nigerians.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

