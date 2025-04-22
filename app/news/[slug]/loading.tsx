import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"

export default function NewsDetailLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section Skeleton */}
        <section className="bg-[#0F5D0B] text-white py-12">
          <div className="container mx-auto px-4">
            <Skeleton className="h-6 w-32 bg-white/20 mb-6" />
            <Skeleton className="h-12 w-3/4 bg-white/20 mb-4" />
            <div className="flex flex-wrap items-center gap-6 mt-6">
              <Skeleton className="h-6 w-32 bg-white/20" />
              <Skeleton className="h-6 w-24 bg-white/20" />
              <Skeleton className="h-6 w-40 bg-white/20" />
            </div>
          </div>
        </section>

        {/* Article Content Skeleton */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Skeleton className="h-[400px] w-full rounded-lg mb-8" />

                <div className="flex items-center gap-4 mb-8">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>

                <div className="mt-8 pt-8 border-t">
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20 rounded-full" />
                    <Skeleton className="h-8 w-24 rounded-full" />
                    <Skeleton className="h-8 w-16 rounded-full" />
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t">
                  <Skeleton className="h-6 w-40 mb-4" />
                  <div className="flex gap-3">
                    <Skeleton className="h-10 w-10 rounded" />
                    <Skeleton className="h-10 w-10 rounded" />
                    <Skeleton className="h-10 w-10 rounded" />
                    <Skeleton className="h-10 w-10 rounded" />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <Skeleton className="h-6 w-40 mb-4" />
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-4">
                        <Skeleton className="h-20 w-20 rounded" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-3/4 mb-2" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0F5D0B] rounded-lg p-6">
                  <Skeleton className="h-6 w-48 bg-white/20 mb-4" />
                  <Skeleton className="h-4 w-full bg-white/20 mb-2" />
                  <Skeleton className="h-4 w-3/4 bg-white/20 mb-4" />
                  <Skeleton className="h-10 w-full bg-white/20 mb-4" />
                  <Skeleton className="h-10 w-full bg-white/20" />
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

