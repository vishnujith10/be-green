"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, LogOut } from 'lucide-react'
import Image from 'next/image'
import { clearUser, getStoredUser, type AppUser } from '@/lib/user'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<AppUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadUser = () => setUser(getStoredUser())

    loadUser()

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/70 backdrop-blur-md shadow-[0_8px_16px_rgba(0,0,0,0.08)]'
        : 'bg-black/5 backdrop-blur-md'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-18">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="BE GREEN"
            width={300}
            height={100}
            priority
            className="h-16 sm:h-30 lg:h-26 w-auto object-contain mt-[8px]"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link
            href="#products"
            className={`transition-colors text-sm font-medium ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-green-200'
              }`}
          >
            Products
          </Link>
          <Link
            href="#why"
            className={`transition-colors text-sm font-medium ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-green-200'
              }`}
          >
            Why Microgreens
          </Link>
          <Link
            href="#process"
            className={`transition-colors text-sm font-medium ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-green-200'
              }`}
          >
            Our Process
          </Link>
          <Link
            href="#contact"
            className={`transition-colors text-sm font-medium ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-green-200'
              }`}
          >
            Contact
          </Link>
          <Link
            href="#products"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-opacity-90 transition-all"
          >
            Shop Now
          </Link>
        </div>

        {/* User Info / Login */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                {firstLetter}
              </div>
              <span className={`${isScrolled ? 'text-foreground' : 'text-white'} text-sm font-medium transition-colors`}>
                {displayName}
              </span>
              <button
                onClick={handleLogout}
                className={`ml-2 flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all shadow-sm ${isScrolled
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-white text-primary hover:bg-green-50'
                  }`}
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-all ${isScrolled
                ? 'text-primary border-primary hover:bg-primary hover:text-primary-foreground'
                : 'text-white border-white hover:bg-white hover:text-primary'
                }`}
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`${isScrolled ? 'text-foreground' : 'text-white'} md:hidden transition-colors`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden pb-4 space-y-4 px-4 backdrop-blur-md ${isScrolled
            ? 'border-t border-border bg-white/90'
            : 'border-t border-white/20 bg-black/30'
            }`}
        >
          <Link
            href="#products"
            className={`block transition-colors text-sm font-medium py-2 ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-green-200'
              }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            href="#why"
            className={`block transition-colors text-sm font-medium py-2 ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-green-200'
              }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Why Microgreens
          </Link>
          <Link
            href="#process"
            className={`block transition-colors text-sm font-medium py-2 ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-green-200'
              }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Our Process
          </Link>
          <Link
            href="#contact"
            className={`block transition-colors text-sm font-medium py-2 ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-green-200'
              }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="#products"
            className="block px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-opacity-90 transition-all text-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Shop Now
          </Link>

          {user ? (
            <div className={`flex items-center gap-3 pt-2 ${isScrolled ? 'border-t border-border' : 'border-t border-white/20'}`}>
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                {firstLetter}
              </div>
              <span className={`${isScrolled ? 'text-foreground' : 'text-white'} text-sm font-medium transition-colors`}>
                {displayName}
              </span>
              <button
                onClick={handleLogout}
                className={`ml-auto flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all shadow-sm ${isScrolled
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-white text-primary hover:bg-green-50'
                  }`}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className={`block text-center px-4 py-2 text-sm font-medium rounded-full border transition-all ${isScrolled
                ? 'text-primary border-primary hover:bg-primary hover:text-primary-foreground'
                : 'text-white border-white hover:bg-white hover:text-primary'
                }`}
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