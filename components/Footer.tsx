import Link from 'next/link'
import { Leaf, Mail, Heart, Share2 } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-muted" />
              <span className="font-bold text-lg">BE GREEN</span>
            </div>
            <p className="text-white/70 text-sm">
              Premium microgreens delivered fresh to your door. Be Fresh. Be Green.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#products" className="text-white/70 hover:text-white transition-colors text-sm">
                  Available
                </Link>
              </li>
              <li>
                <Link href="#products" className="text-white/70 hover:text-white transition-colors text-sm">
                  Coming Soon
                </Link>
              </li>
              <li>
                <Link href="#products" className="text-white/70 hover:text-white transition-colors text-sm">
                  Bulk Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#why" className="text-white/70 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#process" className="text-white/70 hover:text-white transition-colors text-sm">
                  Growing Process
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-white/70 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <Heart className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <Share2 className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              &copy; 2024 BE GREEN. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
