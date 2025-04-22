import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 })
    }

    // Find admin user by email
    const result = await sql`
      SELECT * FROM users WHERE email = ${email} AND role = 'admin'
    `

    const admin = result.rows[0]

    if (!admin) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password)

    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: admin.id,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET || "fallback-secret-key",
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
    )

    // Return admin data and token
    return NextResponse.json({
      success: true,
      user: {
        id: admin.id,
        email: admin.email,
        firstName: admin.first_name,
        lastName: admin.last_name,
        role: admin.role,
      },
      token,
    })
  } catch (error) {
    console.error("Admin login error:", error)
    return NextResponse.json({ success: false, message: "Login failed", error: String(error) }, { status: 500 })
  }
}

