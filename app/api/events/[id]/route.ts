import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { isAdmin } from "@/lib/auth"

// Get a specific event
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const result = await query("SELECT * FROM events WHERE id = $1", [id])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({ event: result.rows[0] })
  } catch (error) {
    console.error("Error fetching event:", error)
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 })
  }
}

// Update an event (admin only)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if user is admin
    const adminCheck = await isAdmin(req)
    if (!adminCheck) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params
    const { title, description, date, time, location, imageUrl } = await req.json()

    // Validate required fields
    if (!title || !date || !time) {
      return NextResponse.json({ error: "Title, date, and time are required" }, { status: 400 })
    }

    // Check if event exists
    const checkResult = await query("SELECT * FROM events WHERE id = $1", [id])
    if (checkResult.rows.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    // Update event
    const result = await query(
      `UPDATE events 
       SET title = $1, description = $2, date = $3, time = $4, location = $5, image_url = $6, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $7 
       RETURNING *`,
      [title, description, date, time, location, imageUrl, id],
    )

    return NextResponse.json({
      message: "Event updated successfully",
      event: result.rows[0],
    })
  } catch (error) {
    console.error("Error updating event:", error)
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 })
  }
}

// Delete an event (admin only)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if user is admin
    const adminCheck = await isAdmin(req)
    if (!adminCheck) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params

    // Check if event exists
    const checkResult = await query("SELECT * FROM events WHERE id = $1", [id])
    if (checkResult.rows.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    // Delete event
    await query("DELETE FROM events WHERE id = $1", [id])

    return NextResponse.json({
      message: "Event deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting event:", error)
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 })
  }
}

