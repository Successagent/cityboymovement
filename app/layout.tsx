import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ['latin'], display: 'swap', adjustFontFallback: false})

export const metadata: Metadata = {
  title: "City Boy Movement",
  description: "Empowering urban communities for sustainable and equitable city living",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'