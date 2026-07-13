'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clearUser } from '@/lib/user'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  LogOut,
  Leaf,
  ChevronRight,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/dashboard', icon: Package },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    clearUser()
    router.push('/admin')
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0F1A12] text-white flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-900/30">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">BE GREEN</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400/80 font-medium">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">
          Management
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                ${isActive
                  ? 'bg-emerald-500/15 text-emerald-400 shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <item.icon className={`w-[18px] h-[18px] ${isActive ? 'text-emerald-400' : 'text-white/40 group-hover:text-white/70'}`} />
              <span>{item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4 ml-auto text-emerald-400/60" />}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut className="w-[18px] h-[18px]" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
