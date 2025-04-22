"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Search } from "lucide-react"

// Mock data for state rankings
const stateRankings = [
  { state: "Lagos", members: 15420, rank: 1 },
  { state: "Kano", members: 12350, rank: 2 },
  { state: "Oyo", members: 9870, rank: 3 },
  { state: "Rivers", members: 8540, rank: 4 },
  { state: "FCT Abuja", members: 7890, rank: 5 },
  { state: "Kaduna", members: 7650, rank: 6 },
  { state: "Delta", members: 6980, rank: 7 },
  { state: "Anambra", members: 6540, rank: 8 },
  { state: "Ogun", members: 6320, rank: 9 },
  { state: "Enugu", members: 5980, rank: 10 },
  { state: "Imo", members: 5760, rank: 11 },
  { state: "Akwa Ibom", members: 5430, rank: 12 },
  { state: "Osun", members: 5210, rank: 13 },
  { state: "Edo", members: 4980, rank: 14 },
  { state: "Borno", members: 4750, rank: 15 },
  { state: "Katsina", members: 4520, rank: 16 },
  { state: "Abia", members: 4320, rank: 17 },
  { state: "Bauchi", members: 4150, rank: 18 },
  { state: "Niger", members: 3980, rank: 19 },
  { state: "Plateau", members: 3760, rank: 20 },
  { state: "Sokoto", members: 3540, rank: 21 },
  { state: "Adamawa", members: 3320, rank: 22 },
  { state: "Cross River", members: 3150, rank: 23 },
  { state: "Kebbi", members: 2980, rank: 24 },
  { state: "Kwara", members: 2870, rank: 25 },
  { state: "Ekiti", members: 2650, rank: 26 },
  { state: "Gombe", members: 2430, rank: 27 },
  { state: "Yobe", members: 2210, rank: 28 },
  { state: "Taraba", members: 2050, rank: 29 },
  { state: "Ebonyi", members: 1980, rank: 30 },
  { state: "Bayelsa", members: 1870, rank: 31 },
  { state: "Zamfara", members: 1750, rank: 32 },
  { state: "Jigawa", members: 1650, rank: 33 },
  { state: "Kogi", members: 1540, rank: 34 },
  { state: "Nasarawa", members: 1430, rank: 35 },
  { state: "Benue", members: 1320, rank: 36 },
  { state: "Ondo", members: 1210, rank: 37 },
]

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStates = stateRankings.filter((state) => state.state.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0F5D0B] text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Members by State</h1>
            <p className="text-xl max-w-3xl">
              See how states across Nigeria are ranking in the CityBoy Movement based on membership.
            </p>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-500 mb-2">Total Members</h3>
                <p className="text-4xl font-bold text-[#0F5D0B]">152,430</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-500 mb-2">States Represented</h3>
                <p className="text-4xl font-bold text-[#0F5D0B]">37</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-500 mb-2">New Members (Last 30 Days)</h3>
                <p className="text-4xl font-bold text-[#0F5D0B]">12,845</p>
              </div>
            </div>
          </div>
        </section>

        {/* State Rankings */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">State Rankings</h2>

            {/* Search Bar */}
            <div className="relative max-w-md mb-8">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5D0B] focus:border-[#0F5D0B]"
                placeholder="Search by state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Rankings Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      State
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Members
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStates.map((state) => (
                    <tr key={state.state} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span
                            className={`
                            flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-medium
                            ${state.rank <= 3 ? "bg-[#0F5D0B]" : "bg-gray-400"}
                          `}
                          >
                            {state.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{state.state}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{state.members.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-[#0F5D0B] h-2.5 rounded-full"
                            style={{ width: `${(state.members / 15420) * 100}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

