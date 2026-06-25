"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, Leaf, LogOut } from 'lucide-react'
import { clearUser, getStoredUser, type AppUser } from '@/lib/user'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<AppUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadUser = () => setUser(getStoredUser())

    loadUser()

    // Listen for login/logout events
    window.addEventListener('user-changed', loadUser)
    window.addEventListener('storage', loadUser)

    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('user-changed', loadUser)
      window.removeEventListener('storage', loadUser)
    }
  }, [])

  const handleLogout = () => {
    clearUser()
    setUser(null)
    router.refresh()
  }

  const displayName = user?.username || ''
  const firstLetter = displayName.charAt(0).toUpperCase()

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-[0_8px_16px_rgba(0,0,0,0.08)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Leaf className="w-6 h-6 text-primary" />
          <span className="text-primary">BE GREEN</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="#products" className="text-foreground hover:text-primary transition-colors text-sm font-medium">Products</Link>
          <Link href="#why" className="text-foreground hover:text-primary transition-colors text-sm font-medium">Why Microgreens</Link>
          <Link href="#process" className="text-foreground hover:text-primary transition-colors text-sm font-medium">Our Process</Link>
          <Link href="#contact" className="text-foreground hover:text-primary transition-colors text-sm font-medium">Contact</Link>
          <Link href="#products" className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-opacity-90 transition-all">Shop Now</Link>
        </div>

        {/* User Info / Login */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                {firstLetter}
              </div>
              <span className="text-foreground text-sm font-medium">
                {displayName}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-foreground/60 hover:text-red-500 transition-colors ml-2"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden pb-4 space-y-4 border-t border-border px-4">
          <Link href="#products" className="block text-foreground hover:text-primary transition-colors text-sm font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
            Products
          </Link>
          <Link href="#why" className="block text-foreground hover:text-primary transition-colors text-sm font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
            Why Microgreens
          </Link>
          <Link href="#process" className="block text-foreground hover:text-primary transition-colors text-sm font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
            Our Process
          </Link>
          <Link href="#contact" className="block text-foreground hover:text-primary transition-colors text-sm font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
            Contact
          </Link>
          <Link href="#products" className="block px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-opacity-90 transition-all text-center" onClick={() => setIsMobileMenuOpen(false)}>
            Shop Now
          </Link>
          {user ? (
            <div className="flex items-center gap-3 pt-2 border-t border-border">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                {firstLetter}
              </div>
              <span className="text-foreground text-sm font-medium">{displayName}</span>
              <button
                onClick={handleLogout}
                className="ml-auto flex items-center gap-1 text-sm text-red-500"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="block text-center px-4 py-2 text-sm font-medium text-primary border border-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
