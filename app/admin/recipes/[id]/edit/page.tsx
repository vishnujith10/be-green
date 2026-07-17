'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getStoredUser } from '@/lib/user'
import type { AdminRecipe } from '@/lib/admin'
import RecipeForm from '@/components/admin/RecipeForm'
import { Loader2 } from 'lucide-react'

export default function EditRecipePage() {
  const { id } = useParams<{ id: string }>()
  const [recipe, setRecipe] = useState<AdminRecipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const user = getStoredUser()
    if (!user) return

    fetch(`/api/admin/recipes/${id}`, {
      headers: { 'x-user-id': user.id },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Recipe not found')
        return res.json()
      })
      .then(setRecipe)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center max-w-lg mx-auto mt-10">
        <p className="text-red-600 font-medium">{error || 'Recipe not found'}</p>
      </div>
    )
  }

  return (
    <RecipeForm
      mode="edit"
      initialData={{
        id: recipe.id,
        title: recipe.title,
        emoji: recipe.emoji || '',
        tagline: recipe.tagline || '',
        image_url: recipe.image_url || '',
        ingredients: recipe.ingredients || [],
        preparing: recipe.preparing || '',
        available: recipe.available,
      }}
    />
  )
}
