export const dynamic = "force-dynamic"; // ✅ Tell Next.js it's dynamic

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const now = new Date();
    const result = await sql`
      SELECT * FROM events
      WHERE event_date >= ${now}
      ORDER BY event_date ASC
      LIMIT 3
    `;

    return NextResponse.json({
      success: true,
      events: result.rows,
    });
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch upcoming events", error: String(error) },
      { status: 500 }
    );
  }
}
