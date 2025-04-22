import { type NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db"; // ✅ Ensure "@/lib/db" exists
import { isAdmin } from "@/lib/auth"; // ✅ Ensure "@/lib/auth" exists
import { hashPassword } from "@/lib/passwordUtils"; // ✅ Verify correct import

// ✅ Get all users (Admin only)
export async function GET(req: NextRequest) {
  try {
    // ✅ Check if user is an admin
    const adminCheck = await isAdmin(req);
    if (!adminCheck) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Extract query parameters safely
    const searchParams = req.nextUrl.searchParams;
    const page = Number.parseInt(searchParams.get("page") || "1", 10);
    const limit = Number.parseInt(searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;
    const state = searchParams.get("state");
    const lga = searchParams.get("lga");
    const hasPVC = searchParams.get("hasPVC");

    // ✅ Build query dynamically
    let queryText = "SELECT id, full_name, email, phone, state, lga, ward, has_pvc, role, created_at FROM users";
    const queryParams: any[] = [];
    const conditions: string[] = [];
    let paramIndex = 1;

    if (state) {
      conditions.push(`state = $${paramIndex++}`);
      queryParams.push(state);
    }
    if (lga) {
      conditions.push(`lga = $${paramIndex++}`);
      queryParams.push(lga);
    }
    if (hasPVC !== null && hasPVC !== undefined) {
      conditions.push(`has_pvc = $${paramIndex++}`);
      queryParams.push(hasPVC === "true");
    }

    if (conditions.length > 0) {
      queryText += " WHERE " + conditions.join(" AND ");
    }

    queryText += ` ORDER BY created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
    queryParams.push(limit, offset);

    // ✅ Fetch users
    const result = await query(queryText, queryParams);

    // ✅ Get total count for pagination
    let countQueryText = "SELECT COUNT(*) FROM users";
    if (conditions.length > 0) {
      countQueryText += " WHERE " + conditions.join(" AND ");
    }

    const countResult = await query(countQueryText, queryParams.slice(0, paramIndex - 2));
    const totalCount = Number(countResult.rows[0].count);

    return NextResponse.json({
      users: result.rows,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// ✅ Create a new user (Admin only)
export async function POST(req: NextRequest) {
  try {
    // ✅ Check if user is an admin
    const adminCheck = await isAdmin(req);
    if (!adminCheck) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Parse request body safely
    const body = await req.json();
    const { fullName, email, phone, password, state, lga, ward, hasPVC, role } = body;

    // ✅ Validate required fields
    if (!fullName || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    // ✅ Check if user already exists
    const existingUser = await query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
    }

    // ✅ Hash password securely
    const hashedPassword = await hashPassword(password);

    // ✅ Insert new user securely
    const result = await query(
      `INSERT INTO users (full_name, email, phone, password, state, lga, ward, has_pvc, role) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING id, full_name, email, phone, state, lga, ward, has_pvc, role, created_at`,
      [fullName, email, phone, hashedPassword, state, lga, ward, hasPVC === true, role || "member"]
    );

    return NextResponse.json({
      message: "User created successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
