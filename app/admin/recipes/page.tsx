'use client'

import { useCallback, useEffect, useState } from 'react'
import { getStoredUser } from '@/lib/user'
import type { AdminRecipe } from '@/lib/admin'
import RecipesTable from '@/components/admin/RecipesTable'
import { ChefHat, Loader2 } from 'lucide-react'

export default function AdminRecipesPage() {
  const [recipes, setRecipes] = useState<AdminRecipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRecipes = useCallback(async () => {
    const user = getStoredUser()
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/recipes', {
        headers: { 'x-user-id': user.id },
      })

      if (!res.ok) throw new Error('Failed to load recipes')
      const data = await res.json()
      setRecipes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading recipes')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRecipes()
  }, [fetchRecipes])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
          <ChefHat className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Recipes</h1>
          <p className="text-sm text-foreground/50">
            Manage recipes shown on the website
          </p>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={fetchRecipes}
            className="mt-4 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      ) : (
        <RecipesTable recipes={recipes} onRefresh={fetchRecipes} />
      )}
    </div>
  )
}
