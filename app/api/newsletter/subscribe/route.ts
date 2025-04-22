import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check if email is already subscribed
    const existingSubscriber = await query("SELECT * FROM newsletter_subscribers WHERE email = $1", [email])

    if (existingSubscriber.rows.length > 0) {
      return NextResponse.json({
        message: "Email is already subscribed to the newsletter",
      })
    }

    // Add new subscriber
    await query("INSERT INTO newsletter_subscribers (email) VALUES ($1)", [email])

    return NextResponse.json({
      message: "Successfully subscribed to the newsletter",
    })
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json({ error: "Failed to subscribe to the newsletter" }, { status: 500 })
  }
}

