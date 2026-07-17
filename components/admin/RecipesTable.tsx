'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getStoredUser } from '@/lib/user'
import type { AdminRecipe } from '@/lib/admin'
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChefHat,
  Loader2,
} from 'lucide-react'

interface RecipesTableProps {
  recipes: AdminRecipe[]
  onRefresh: () => void
}

export default function RecipesTable({ recipes, onRefresh }: RecipesTableProps) {
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filtered = recipes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return

    const user = getStoredUser()
    if (!user) return

    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/recipes/${id}`, {
        method: 'DELETE',
        headers: { 'x-user-id': user.id },
      })
      if (!res.ok) throw new Error()
      onRefresh()
    } catch {
      alert('Failed to delete recipe')
    } finally {
      setDeletingId(null)
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
            placeholder="Search recipes..."
            className="w-full rounded-xl border border-border bg-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <button
          onClick={() => router.push('/admin/recipes/new')}
          className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-white font-semibold hover:bg-primary/90 transition"
        >
          <Plus className="w-4 h-4" />
          Add Recipe
        </button>
      </div>

      {/* ── DESKTOP TABLE ── */}
      <div className="hidden lg:block bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-foreground/50">Recipe</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-foreground/50">Tagline</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-foreground/50">Ingredients</th>
                <th className="px-6 py-4 text-right text-xs uppercase tracking-wider text-foreground/50">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <ChefHat className="w-6 h-6 text-foreground/30" />
                      </div>
                      <p className="text-foreground/40 text-sm">
                        {search ? 'No recipes match your search' : 'No recipes yet'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((recipe) => (
                  <tr key={recipe.id} className="hover:bg-muted/20 transition-colors">

                    {/* Title + emoji/image */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {recipe.image_url ? (
                          <img
                            src={recipe.image_url}
                            alt={recipe.title}
                            className="w-10 h-10 rounded-lg object-cover border"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl">
                            {recipe.emoji || '🍽️'}
                          </div>
                        )}
                        <p className="font-semibold text-sm">{recipe.title}</p>
                      </div>
                    </td>

                    {/* Tagline */}
                    <td className="px-6 py-4 text-sm text-foreground/60 max-w-[200px]">
                      <p className="line-clamp-2">{recipe.tagline || '—'}</p>
                    </td>

                    {/* Ingredient count */}
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                        {recipe.ingredients?.length ?? 0} items
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => router.push(`/admin/recipes/${recipe.id}/edit`)}
                          className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        <button
                          disabled={deletingId === recipe.id}
                          onClick={() => handleDelete(recipe.id, recipe.title)}
                          className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition"
                        >
                          {deletingId === recipe.id ? (
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
            Showing {filtered.length} of {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* ── MOBILE VIEW ── */}
      <div className="lg:hidden space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border p-10 text-center">
            <ChefHat className="w-10 h-10 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">
              {search ? 'No recipes match your search' : 'No recipes yet'}
            </p>
          </div>
        ) : (
          filtered.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-2xl border shadow-sm p-4">
              <div className="flex gap-3">
                {recipe.image_url ? (
                  <img
                    src={recipe.image_url}
                    alt={recipe.title}
                    className="w-20 h-20 rounded-xl object-cover border"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center text-3xl">
                    {recipe.emoji || '🍽️'}
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{recipe.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{recipe.tagline}</p>
                  <p className="text-xs mt-1 text-gray-400">{recipe.ingredients?.length ?? 0} ingredients</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <button
                  onClick={() => router.push(`/admin/recipes/${recipe.id}/edit`)}
                  className="py-2 rounded-xl bg-green-50 text-green-600 flex justify-center items-center gap-2 text-sm font-medium"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>

                <button
                  disabled={deletingId === recipe.id}
                  onClick={() => handleDelete(recipe.id, recipe.title)}
                  className="py-2 rounded-xl bg-red-50 text-red-600 flex justify-center items-center gap-2 text-sm font-medium"
                >
                  {deletingId === recipe.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        )}

        <p className="text-center text-sm text-gray-500">
          Showing {filtered.length} of {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}
