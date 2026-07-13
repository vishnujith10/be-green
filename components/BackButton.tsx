'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getStoredUser } from '@/lib/user'

export function BackButton() {
  const [href, setHref] = useState('/#products')

  useEffect(() => {
    const user = getStoredUser()
    if (user && user.role === 'admin') {
      setHref('/admin/dashboard')
    }
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
      >
        <ChevronLeft className="w-5 h-5" />
        {href === '/admin/dashboard' ? 'Back to Dashboard' : 'Back to Products'}
      </Link>
    </div>
  )
}
