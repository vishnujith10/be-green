'use client'

import { useEffect, useState, use } from 'react'
import { getStoredUser } from '@/lib/user'
import type { AdminProduct } from '@/lib/admin'
import ProductForm from '@/components/admin/ProductForm'
import { Loader2 } from 'lucide-react'

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const [product, setProduct] = useState<AdminProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const user = getStoredUser()
        if (!user) throw new Error('Not authenticated')

        const res = await fetch(`/api/admin/products/${resolvedParams.id}?t=${Date.now()}`, {
          headers: { 'x-user-id': user.id },
          cache: 'no-store',
        })

        if (!res.ok) {
          if (res.status === 404) throw new Error('Product not found')
          throw new Error('Failed to fetch product')
        }

        const data = await res.json()
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [resolvedParams.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
        {error || 'Product not found'}
      </div>
    )
  }

  return (
    <div className="pb-12">
      <ProductForm mode="edit" initialData={product} />
    </div>
  )
}
