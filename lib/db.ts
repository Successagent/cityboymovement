import { sql } from "@vercel/postgres"

export async function query(text: string, params: any[] = []) {
  try {
    const result = await sql.query(text, params)
    return result
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

export async function initializeDatabase() {
  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        state VARCHAR(100),
        lga VARCHAR(100),
        has_pvc BOOLEAN DEFAULT false,
        role VARCHAR(20) DEFAULT 'member',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create events table
    await sql`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        location VARCHAR(255),
        event_date TIMESTAMP NOT NULL,
        image_url VARCHAR(255),
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create blog posts table
    await sql`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        author VARCHAR(100),
        image_url VARCHAR(255),
        published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create newsletter subscribers table
    await sql`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    console.log("Database initialized successfully")
    return { success: true, message: "Database initialized successfully" }
  } catch (error) {
    console.error("Error initializing database:", error)
    throw error
  }
}

export async function createAdminUser(email: string, hashedPassword: string) {
  try {
    // Check if admin user already exists
    const existingAdmin = await sql`
      SELECT * FROM users WHERE email = ${email}
    `

    if (existingAdmin.rowCount > 0) {
      return { success: true, message: "Admin user already exists" }
    }

    // Create admin user
    await sql`
      INSERT INTO users (
        email, 
        password, 
        first_name, 
        last_name, 
        role, 
        state, 
        lga, 
        has_pvc
      ) VALUES (
        ${email}, 
        ${hashedPassword}, 
        'Admin', 
        'User', 
        'admin', 
        'FCT', 
        'Abuja', 
        true
      )
    `

    return { success: true, message: "Admin user created successfully" }
  } catch (error) {
    console.error("Error creating admin user:", error)
    throw error
  }
}

