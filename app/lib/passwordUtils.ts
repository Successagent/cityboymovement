import bcrypt from "bcryptjs" // Make sure bcryptjs is installed

// Function to hash passwords before storing them
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

// Function to verify passwords during login
export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword)
}

