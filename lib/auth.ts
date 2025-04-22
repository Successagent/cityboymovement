"use server"

import { cookies } from "next/headers"

// In a real application, you would use a database to store user credentials
// and proper password hashing (like bcrypt)
const ADMIN_USERS = [
  {
    email: "admin@cityboy.org",
    // In production, this would be a hashed password
    password: "admin123",
    name: "Admin User",
    role: "Super Administrator",
  },
]

// Session duration in seconds (24 hours)
const SESSION_DURATION = 60 * 60 * 24

export async function authenticateAdmin(email: string, password: string) {
  // Simulate network delay for a more realistic experience
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Find the user with the provided email
  const user = ADMIN_USERS.find((user) => user.email.toLowerCase() === email.toLowerCase())

  // If no user is found or the password doesn't match, return an error
  if (!user || user.password !== password) {
    return {
      success: false,
      message: "Invalid email or password",
    }
  }

  // Create a session for the authenticated user
  const session = {
    userId: Buffer.from(user.email).toString("base64"),
    name: user.name,
    role: user.role,
    expiresAt: Date.now() + SESSION_DURATION * 1000,
  }

  // Store the session in a cookie
  const cookieStore = cookies()
  cookieStore.set({
    name: "admin_session",
    value: JSON.stringify(session),
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_DURATION,
    sameSite: "strict",
  })

  return {
    success: true,
    user: {
      email: user.email,
      name: user.name,
      role: user.role,
    },
  }
}

export async function getAdminSession() {
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get("admin_session")

  if (!sessionCookie) {
    return null
  }

  try {
    const session = JSON.parse(sessionCookie.value)

    // Check if the session has expired
    if (session.expiresAt < Date.now()) {
      // Session has expired, clear the cookie
      cookieStore.delete("admin_session")
      return null
    }

    return session
  } catch (error) {
    // If there's an error parsing the session, clear the cookie
    cookieStore.delete("admin_session")
    return null
  }
}

export async function logoutAdmin() {
  const cookieStore = cookies()
  cookieStore.delete("admin_session")

  return {
    success: true,
  }
}

export async function requireAdminAuth() {
  const session = await getAdminSession()

  if (!session) {
    return {
      authenticated: false,
      redirectTo: "/admin/login",
    }
  }

  return {
    authenticated: true,
    user: session,
  }
}

