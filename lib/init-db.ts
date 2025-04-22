import { query } from './db'
import { hashPassword } from './auth'

export async function initializeDatabase() {
  try {
    // Create users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        password VARCHAR(255) NOT NULL,
        state VARCHAR(100),
        lga VARCHAR(100),
        ward VARCHAR(100),
        has_pvc BOOLEAN,
        role VARCHAR(20) DEFAULT 'member',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create events table
    await query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date DATE NOT NULL,
        time TIME NOT NULL,
        location VARCHAR(255),
        image_url VARCHAR(255),
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create blog posts table
    await query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        image_url VARCHAR(255),
        published BOOLEAN DEFAULT false,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create newsletter subscribers table
    await query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create default admin user if it doesn't exist
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@cityboymovement.org'
    const adminPassword = process.env.ADMIN_PASSWORD || 'CityBoy@2023'
    
    // Check if admin user already exists
    const adminCheck = await query('SELECT * FROM users WHERE email = $1', [adminEmail])
    
    if (adminCheck.rows.length === 0) {
      // Hash the admin password
      const hashedPassword = await hashPassword(adminPassword)
      
      // Insert admin user
      await query(`
        INSERT INTO users (full_name, email, password, role)
        VALUES ($1, $2, $3, $4)
      `, ['Admin User', adminEmail, hashedPassword, 'admin'])
      
      console.log('Default admin user created')
    }

    console.log('Database tables initialized')
    return { success: true, message: 'Database initialized successfully' }
  } catch (error) {
    console.error('Error initializing database tables', error)
    return { success: false, error: error.message }
  }
}

