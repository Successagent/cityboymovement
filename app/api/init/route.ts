import { type NextRequest, NextResponse } from "next/server"
import { initializeDatabase, createAdminUser } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    // Get initialization key from request
    const { initKey } = await request.json()

    // Check if initialization key is valid
    const validInitKey = process.env.INIT_KEY
    if (!validInitKey || initKey !== validInitKey) {
      return NextResponse.json({ success: false, message: "Invalid initialization key" }, { status: 401 })
    }

    // Initialize database
    await initializeDatabase()

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || "admin@cityboymovement.org"
    const adminPassword = process.env.ADMIN_PASSWORD || "CityBoy@2023"
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    await createAdminUser(adminEmail, hashedPassword)

    return NextResponse.json({
      success: true,
      message: "Database initialized and admin user created successfully",
    })
  } catch (error) {
    console.error("Error in initialization:", error)
    return NextResponse.json(
      { success: false, message: "Initialization failed", error: String(error) },
      { status: 500 },
    )
  }
}

