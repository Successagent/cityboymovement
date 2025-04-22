import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { isAdmin } from "@/lib/auth"
import { Parser } from "json2csv"

export async function GET(req: NextRequest) {
  try {
    // Check if user is admin
    const adminCheck = await isAdmin(req)
    if (!adminCheck) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const state = searchParams.get("state")
    const lga = searchParams.get("lga")
    const hasPVC = searchParams.get("hasPVC")
    const format = searchParams.get("format") || "json"

    // Build query with filters
    let queryText = `
      SELECT 
        id, full_name, email, phone, state, lga, ward, 
        has_pvc, created_at 
      FROM users
      WHERE role = 'member'
    `
    const queryParams: any[] = []
    const conditions = []
    let paramIndex = 1

    if (state) {
      conditions.push(`state = $${paramIndex}`)
      queryParams.push(state)
      paramIndex++
    }

    if (lga) {
      conditions.push(`lga = $${paramIndex}`)
      queryParams.push(lga)
      paramIndex++
    }

    if (hasPVC !== null && hasPVC !== undefined) {
      conditions.push(`has_pvc = $${paramIndex}`)
      queryParams.push(hasPVC === "true")
      paramIndex++
    }

    if (conditions.length > 0) {
      queryText += " AND " + conditions.join(" AND ")
    }

    queryText += " ORDER BY created_at DESC"

    const result = await query(queryText, queryParams)

    if (format === "csv") {
      // Convert to CSV
      const fields = ["id", "full_name", "email", "phone", "state", "lga", "ward", "has_pvc", "created_at"]

      const json2csvParser = new Parser({ fields })
      const csv = json2csvParser.parse(result.rows)

      // Generate filename with date
      const date = new Date().toISOString().split("T")[0]
      const filename = `cityboy_members_${state || "all"}_${date}.csv`

      // Set headers for CSV download
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      })
    }

    // Return JSON by default
    return NextResponse.json({
      members: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    console.error("Error exporting members:", error)
    return NextResponse.json({ error: "Failed to export members" }, { status: 500 })
  }
}

