import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { isAdmin } from "@/lib/auth"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  try {
    // Check if user is admin
    const adminCheck = await isAdmin(req)
    if (!adminCheck) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { subject, content } = await req.json()

    if (!subject || !content) {
      return NextResponse.json({ error: "Subject and content are required" }, { status: 400 })
    }

    // Get all subscribers
    const subscribers = await query("SELECT email FROM newsletter_subscribers")

    if (subscribers.rows.length === 0) {
      return NextResponse.json({
        message: "No subscribers found",
      })
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      host: process.env.EMAIL_HOST,
      port: Number.parseInt(process.env.EMAIL_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Send emails to all subscribers
    const emails = subscribers.rows.map((subscriber) => subscriber.email)

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      bcc: emails, // Use BCC to hide recipient emails from each other
      subject: subject,
      html: content,
    })

    return NextResponse.json({
      message: `Newsletter sent to ${emails.length} subscribers`,
    })
  } catch (error) {
    console.error("Newsletter sending error:", error)
    return NextResponse.json({ error: "Failed to send newsletter" }, { status: 500 })
  }
}

