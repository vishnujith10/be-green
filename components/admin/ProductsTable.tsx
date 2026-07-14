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

export default function ProductsTable({
  products,
  onRefresh,
}: ProductsTableProps) {
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const filtered = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.slug.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id: string, name: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${name}"? This cannot be undone.`
      )
    )
      return

    const user = getStoredUser()
    if (!user) return

    setDeletingId(id)

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          'x-user-id': user.id,
        },
      })

      if (!res.ok) throw new Error()

      onRefresh()
    } catch {
      alert('Failed to delete product')
    } finally {
      setDeletingId(null)
    }
  }

  const handleToggle = async (
    id: string,
    currentAvailable: boolean
  ) => {
    const user = getStoredUser()
    if (!user) return

    setTogglingId(id)

    try {
      const res = await fetch(
        `/api/admin/products/${id}/toggle`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': user.id,
          },
          body: JSON.stringify({
            available: !currentAvailable,
          }),
        }
      )

      if (!res.ok) throw new Error()

      onRefresh()
    } catch {
      alert('Failed to update product')
    } finally {
      setTogglingId(null)
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="relative w-full md:max-w-sm">

          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-border bg-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />

        </div>

        <button
          onClick={() =>
            router.push('/admin/dashboard/products/new')
          }
          className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-white font-semibold hover:bg-primary/90 transition"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>

      </div>

      {/* ==========================
            DESKTOP TABLE
      =========================== */}

      <div className="hidden lg:block bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-border bg-muted/30">

                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-foreground/50">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-foreground/50">
                  Slug
                </th>

                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-foreground/50">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-foreground/50">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs uppercase tracking-wider text-foreground/50">
                  Actions
                </th>

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
                        {search
                          ? 'No products match your search'
                          : 'No products available'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.main_image ? (
                          <img
                            src={product.main_image}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover border"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                            <Package className="w-5 h-5 text-foreground/30" />
                          </div>
                        )}

                        <div>
                          <p className="font-semibold text-sm">
                            {product.name}
                          </p>

                          <p className="text-xs text-foreground/50 line-clamp-1 max-w-[220px]">
                            {product.tagline}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                        {product.slug}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      {product.price ? `₹${product.price}` : '—'}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${product.available
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                            }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${product.available
                                ? 'bg-green-500'
                                : 'bg-yellow-500'
                              }`}
                          />

                          {product.available
                            ? 'Available'
                            : 'Coming Soon'}
                        </span>
                        
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${product.in_stock !== false
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-red-100 text-red-700'
                            }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${product.in_stock !== false
                                ? 'bg-blue-500'
                                : 'bg-red-500'
                              }`}
                          />
                          {product.in_stock !== false ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() =>
                            router.push(`/products/${product.slug}`)
                          }
                          className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() =>
                            router.push(
                              `/admin/dashboard/products/${product.id}/edit`
                            )
                          }
                          className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        <button
                          disabled={togglingId === product.id}
                          onClick={() =>
                            handleToggle(
                              product.id,
                              product.available
                            )
                          }
                          className="p-2 rounded-lg hover:bg-yellow-50 transition"
                        >
                          {togglingId === product.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : product.available ? (
                            <ToggleRight className="w-4 h-4 text-green-500" />
                          ) : (
                            <ToggleLeft className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          disabled={deletingId === product.id}
                          onClick={() =>
                            handleDelete(
                              product.id,
                              product.name
                            )
                          }
                          className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition"
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
      {/* =========================
    MOBILE VIEW
========================= */}

      <div className="lg:hidden space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border p-10 text-center">
            <Package className="w-10 h-10 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">
              {search
                ? 'No products match your search'
                : 'No products available'}
            </p>
          </div>
        ) : (
          filtered.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border shadow-sm p-4"
            >
              <div className="flex gap-3">

                {product.main_image ? (
                  <img
                    src={product.main_image}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover border"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                )}

                <div className="flex-1">

                  <h3 className="font-semibold text-lg">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {product.tagline}
                  </p>

                  <p className="mt-2 text-sm font-mono bg-gray-100 inline-block px-2 py-1 rounded">
                    {product.slug}
                  </p>

                  <p className="mt-3 font-semibold text-primary">
                    {product.price
                      ? `₹${product.price}`
                      : '—'}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${product.available
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                        }`}
                    >
                      {product.available
                        ? 'Available'
                        : 'Coming Soon'}
                    </span>
                    
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${product.in_stock !== false
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {product.in_stock !== false ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                </div>

              </div>

              <div className="grid grid-cols-4 gap-2 mt-5">

                <button
                  onClick={() =>
                    router.push(`/products/${product.slug}`)
                  }
                  className="py-2 rounded-xl bg-blue-50 text-blue-600 flex justify-center"
                >
                  <Eye className="w-5 h-5" />
                </button>

                <button
                  onClick={() =>
                    router.push(`/admin/dashboard/products/${product.id}/edit`)
                  }
                  className="py-2 rounded-xl bg-green-50 text-green-600 flex justify-center"
                >
                  <Pencil className="w-5 h-5" />
                </button>

                <button
                  disabled={togglingId === product.id}
                  onClick={() =>
                    handleToggle(product.id, product.available)
                  }
                  className="py-2 rounded-xl bg-yellow-50 text-yellow-600 flex justify-center"
                >
                  {togglingId === product.id ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : product.available ? (
                    <ToggleRight className="w-5 h-5" />
                  ) : (
                    <ToggleLeft className="w-5 h-5" />
                  )}
                </button>

                <button
                  disabled={deletingId === product.id}
                  onClick={() =>
                    handleDelete(product.id, product.name)
                  }
                  className="py-2 rounded-xl bg-red-50 text-red-600 flex justify-center"
                >
                  {deletingId === product.id ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Trash2 className="w-5 h-5" />
                  )}
                </button>

              </div>

            </div>
          ))
        )}

        <p className="text-center text-sm text-gray-500">
          Showing {filtered.length} of {products.length} product
          {products.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}
