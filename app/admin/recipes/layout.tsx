'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getStoredUser } from '@/lib/user'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Loader2 } from 'lucide-react'

export default function AdminRecipesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const user = getStoredUser()

    if (!user || user.role !== 'admin') {
      router.replace('/admin')
      return
    }

    setAuthorized(true)
    setChecking(false)
  }, [router])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!authorized) return null

  return (
    <div className="min-h-screen bg-[#F8FAF8]">
      <AdminSidebar />
      <main className="pt-32 md:pt-8 md:ml-64 px-4 sm:px-6 md:px-8 pb-8">
        {children}
      </main>
    </div>
  )
}
