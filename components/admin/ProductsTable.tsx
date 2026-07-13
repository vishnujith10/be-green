'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getStoredUser } from '@/lib/user'
import type { AdminProduct } from '@/lib/admin'
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  ToggleLeft,
  ToggleRight,
  Package,
  Loader2,
} from 'lucide-react'

interface ProductsTableProps {
  products: AdminProduct[]
  onRefresh: () => void
}

export default function ProductsTable({ products, onRefresh }: ProductsTableProps) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) return

    const user = getStoredUser()
    if (!user) return

    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { 'x-user-id': user.id },
      })
      if (!res.ok) throw new Error('Delete failed')
      onRefresh()
    } catch (err) {
      alert('Failed to delete product')
    } finally {
      setDeletingId(null)
    }
  }

  const handleToggle = async (id: string, currentAvailable: boolean) => {
    const user = getStoredUser()
    if (!user) return

    setTogglingId(id)
    try {
      const res = await fetch(`/api/admin/products/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
        body: JSON.stringify({ available: !currentAvailable }),
      })
      if (!res.ok) throw new Error('Toggle failed')
      onRefresh()
    } catch (err) {
      alert('Failed to toggle availability')
    } finally {
      setTogglingId(null)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
        <button
          onClick={() => router.push('/admin/dashboard/products/new')}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-foreground/50">Product</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-foreground/50">Slug</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-foreground/50">Price</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-foreground/50">Status</th>
                <th className="text-right px-6 py-4 text-xs font-semibold uppercase tracking-wider text-foreground/50">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <Package className="w-6 h-6 text-foreground/30" />
                      </div>
                      <p className="text-foreground/40 text-sm">
                        {search ? 'No products match your search' : 'No products yet'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-muted/20 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.main_image ? (
                          <img
                            src={product.main_image}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover border border-border"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                            <Package className="w-5 h-5 text-foreground/30" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-sm text-foreground">{product.name}</p>
                          <p className="text-xs text-foreground/50 line-clamp-1 max-w-[200px]">{product.tagline}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-foreground/60 font-mono bg-muted/50 px-2 py-1 rounded-md">
                        {product.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-foreground">
                        {product.price ? `₹${product.price}` : '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          product.available
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${product.available ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        {product.available ? 'Available' : 'Coming Soon'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => router.push(`/products/${product.slug}`)}
                          className="p-2 rounded-lg text-foreground/40 hover:text-blue-600 hover:bg-blue-50 transition-all"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => router.push(`/admin/dashboard/products/${product.id}/edit`)}
                          className="p-2 rounded-lg text-foreground/40 hover:text-primary hover:bg-primary/10 transition-all"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggle(product.id, product.available)}
                          disabled={togglingId === product.id}
                          className="p-2 rounded-lg text-foreground/40 hover:text-amber-600 hover:bg-amber-50 transition-all disabled:opacity-50"
                          title={product.available ? 'Set as Coming Soon' : 'Set as Available'}
                        >
                          {togglingId === product.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : product.available ? (
                            <ToggleRight className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <ToggleLeft className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          disabled={deletingId === product.id}
                          className="p-2 rounded-lg text-foreground/40 hover:text-red-600 hover:bg-red-50 transition-all disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === product.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-muted/20 border-t border-border">
          <p className="text-xs text-foreground/40">
            Showing {filtered.length} of {products.length} product{products.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  )
}
