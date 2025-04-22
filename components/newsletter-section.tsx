import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function NewsletterSection() {
  return (
    <section className="w-full py-12 md:py-24 bg-[#0F5D0B] text-white">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter mb-4">Don't Let Politics Decide!</h2>
        <p className="md:text-xl/relaxed max-w-2xl mx-auto mb-8">
          Join our newsletter to stay informed about urban policy changes and community initiatives.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <Input type="email" placeholder="Enter your email" className="bg-white text-black" />
          <Button className="bg-[#9DF13C] hover:bg-[#8AD035] text-black">Subscribe</Button>
        </div>
        <p className="text-sm mt-2 text-green-200">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </section>
  )
}

