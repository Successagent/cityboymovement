"use client"

import React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-auto md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/city-boy-logo.png"
              alt="City Boy Movement Logo"
              width={60}
              height={30}
              className=""
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/">HOME</NavLink>
            <NavLink href="/news">CITYBOY NEWS</NavLink>
            <NavLink href="/events">EVENTS</NavLink>
            <NavLink href="/members">MEMBERS</NavLink>
            <NavLink href="/about">ABOUT</NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <MobileNavLink href="/" onClick={toggleMenu}>
                HOME
              </MobileNavLink>
              <MobileNavLink href="/news" onClick={toggleMenu}>
                CITYBOY NEWS
              </MobileNavLink>
              <MobileNavLink href="/events" onClick={toggleMenu}>
                EVENTS
              </MobileNavLink>
              <MobileNavLink href="/members" onClick={toggleMenu}>
                MEMBERS
              </MobileNavLink>
              <MobileNavLink href="/about" onClick={toggleMenu}>
                ABOUT
              </MobileNavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link href={href} className="text-sm font-medium text-gray-800 hover:text-green-700 transition-colors">
      {children}
    </Link>
  )
}

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void
}

function MobileNavLink({ href, onClick, children }: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-gray-800 hover:text-green-700 py-2 transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
