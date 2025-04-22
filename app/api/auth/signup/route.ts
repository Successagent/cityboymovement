import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, phone, state, lga, hasPvc } = await request.json()

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ success: false, message: "Required fields are missing" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `

    if (existingUser.rows.length > 0) {
      return NextResponse.json({ success: false, message: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const result = await sql`
      INSERT INTO users (
        email, 
        password, 
        first_name, 
        last_name, 
        phone, 
        state, 
        lga, 
        has_pvc
      ) VALUES (
        ${email}, 
        ${hashedPassword}, 
        ${firstName}, 
        ${lastName}, 
        ${phone || ""}, 
        ${state || ""}, 
        ${lga || ""}, 
        ${hasPvc || false}
      )
      RETURNING id, email, first_name, last_name, role
    `

    const newUser = result.rows[0]

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET || "fallback-secret-key",
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
    )

    // Return user data and token
    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        role: newUser.role,
      },
      token,
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ success: false, message: "Signup failed", error: String(error) }, { status: 500 })
  }
}

