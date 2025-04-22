import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { authenticate, isAdmin, hashPassword } from "@/lib/auth"

// Get a specific user
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await authenticate(req)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params

    // Regular users can only access their own data
    if (user.role !== "admin" && user.id !== Number.parseInt(id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const result = await query(
      "SELECT id, full_name, email, phone, state, lga, ward, has_pvc, role, created_at FROM users WHERE id = $1",
      [id],
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user: result.rows[0] })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

// Update a user
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authenticatedUser = await authenticate(req)
    if (!authenticatedUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params

    // Regular users can only update their own data
    if (authenticatedUser.role !== "admin" && authenticatedUser.id !== Number.parseInt(id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { fullName, email, phone, password, state, lga, ward, hasPVC, role } = await req.json()

    // Check if user exists
    const checkResult = await query("SELECT * FROM users WHERE id = $1", [id])
    if (checkResult.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Only admins can change roles
    if (role && authenticatedUser.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized to change role" }, { status: 401 })
    }

    // Build update query
    const updateFields = []
    const queryParams = []
    let paramIndex = 1

    if (fullName) {
      updateFields.push(`full_name = $${paramIndex}`)
      queryParams.push(fullName)
      paramIndex++
    }

    if (email) {
      updateFields.push(`email = $${paramIndex}`)
      queryParams.push(email)
      paramIndex++
    }

    if (phone) {
      updateFields.push(`phone = $${paramIndex}`)
      queryParams.push(phone)
      paramIndex++
    }

    if (password) {
      const hashedPassword = await hashPassword(password)
      updateFields.push(`password = $${paramIndex}`)
      queryParams.push(hashedPassword)
      paramIndex++
    }

    if (state) {
      updateFields.push(`state = $${paramIndex}`)
      queryParams.push(state)
      paramIndex++
    }

    if (lga !== undefined) {
      updateFields.push(`lga = $${paramIndex}`)
      queryParams.push(lga)
      paramIndex++
    }

    if (ward !== undefined) {
      updateFields.push(`ward = $${paramIndex}`)
      queryParams.push(ward)
      paramIndex++
    }

    if (hasPVC !== undefined) {
      updateFields.push(`has_pvc = $${paramIndex}`)
      queryParams.push(hasPVC === true)
      paramIndex++
    }

    if (role && authenticatedUser.role === "admin") {
      updateFields.push(`role = $${paramIndex}`)
      queryParams.push(role)
      paramIndex++
    }

    updateFields.push(`updated_at = CURRENT_TIMESTAMP`)

    if (updateFields.length === 1) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 })
    }

    // Add id as the last parameter
    queryParams.push(id)

    // Update user
    const result = await query(
      `UPDATE users 
       SET ${updateFields.join(", ")} 
       WHERE id = $${paramIndex} 
       RETURNING id, full_name, email, phone, state, lga, ward, has_pvc, role, created_at, updated_at`,
      queryParams,
    )

    return NextResponse.json({
      message: "User updated successfully",
      user: result.rows[0],
    })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

// Delete a user (admin only)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if user is admin
    const adminCheck = await isAdmin(req)
    if (!adminCheck) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params

    // Check if user exists
    const checkResult = await query("SELECT * FROM users WHERE id = $1", [id])
    if (checkResult.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Delete user
    await query("DELETE FROM users WHERE id = $1", [id])

    return NextResponse.json({
      message: "User deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}

