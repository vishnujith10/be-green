'use client'

import { useEffect, useState } from 'react'
import { getStoredUser } from '@/lib/user'
import type { AdminProduct } from '@/lib/admin'
import ProductsTable from '@/components/admin/ProductsTable'
import { Loader2 } from 'lucide-react'

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const user = getStoredUser()
      if (!user) throw new Error('Not authenticated')

      const res = await fetch(`/api/admin/products?t=${Date.now()}`, {
        headers: { 'x-user-id': user.id },
        cache: 'no-store',
      })
      
      if (!res.ok) throw new Error('Failed to fetch products')
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
        Error loading products: {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">Products Management</h1>
        <p className="text-foreground/60">Manage your microgreens inventory, pricing, and availability.</p>
      </div>

      <ProductsTable products={products} onRefresh={fetchProducts} />
    </div>
  )
}
