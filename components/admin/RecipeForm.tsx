'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getStoredUser } from '@/lib/user'
import { uploadProductImage } from '@/lib/storage'
import {
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  X,
  Upload,
} from 'lucide-react'

interface RecipeFormProps {
  initialData?: {
    id?: string
    title: string
    emoji: string
    tagline: string
    image_url: string
    ingredients: string[]
    preparing: string
    available: boolean
  }
  mode: 'create' | 'edit'
}

export default function RecipeForm({ initialData, mode }: RecipeFormProps) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState(initialData?.title || '')
  const [emoji, setEmoji] = useState(initialData?.emoji || '')
  const [tagline, setTagline] = useState(initialData?.tagline || '')
  const [preparing, setPreparing] = useState(initialData?.preparing || '')

  // Image: can be an existing URL (string) or a newly picked File
  const [image, setImage] = useState<string | File>(initialData?.image_url || '')

  const [ingredients, setIngredients] = useState<string[]>(
    initialData?.ingredients?.length ? initialData.ingredients : ['']
  )

  const addIngredient = () => setIngredients([...ingredients, ''])

  const removeIngredient = (idx: number) =>
    setIngredients(ingredients.filter((_, i) => i !== idx))

  const updateIngredient = (idx: number, value: string) => {
    const updated = [...ingredients]
    updated[idx] = value
    setIngredients(updated)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0])
    }
  }

  const imagePreviewUrl =
    image instanceof File ? URL.createObjectURL(image) : image

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const user = getStoredUser()
    if (!user || user.role !== 'admin') {
      setError('Not authorized')
      setLoading(false)
      return
    }

    try {
      // Upload new file if user picked one
      let imageUrl = typeof image === 'string' ? image : ''
      if (image instanceof File) {
        imageUrl = await uploadProductImage(image)
      }

      const payload = {
        title: title.trim(),
        emoji: emoji.trim(),
        tagline: tagline.trim(),
        image_url: imageUrl,
        ingredients: ingredients.filter((i) => i.trim()),
        preparing: preparing.trim(),
      }

      const url =
        mode === 'create'
          ? '/api/admin/recipes'
          : `/api/admin/recipes/${initialData?.id}`

      const method = mode === 'create' ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save recipe')
      }

      router.push('/admin/recipes')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <button
        onClick={() => router.push('/admin/recipes')}
        className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors mb-4 sm:mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Recipes
      </button>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 sm:px-8 py-5 sm:py-6 border-b border-border bg-muted/20">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            {mode === 'create' ? 'Add New Recipe' : `Edit: ${initialData?.title}`}
          </h2>
          <p className="text-sm text-foreground/60 mt-1">
            {mode === 'create'
              ? 'Fill in the details below to create a recipe.'
              : 'Update the recipe details below.'}
          </p>
        </div>

        {error && (
          <div className="mx-5 sm:mx-8 mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 p-5 sm:p-8">

          {/* ── Basic Info ── */}
          <fieldset className="space-y-5">
            <legend className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/40">
              Basic Information
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Recipe Title *</label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Fresh Microgreen Salad"
                  className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Emoji</label>
                <input
                  value={emoji}
                  onChange={(e) => setEmoji(e.target.value)}
                  placeholder="🥗"
                  className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tagline</label>
              <input
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="A short, appetizing description"
                className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>


          </fieldset>

          {/* ── Image Upload ── */}
          <fieldset className="space-y-4">
            <legend className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/40">
              Recipe Image
            </legend>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* Dropzone */}
              <label className="flex-1 flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border hover:bg-muted/20 transition">
                <Upload className="mb-2 h-6 w-6 text-foreground/40" />
                <span className="text-sm text-foreground/60">Click to Upload Image</span>
                <span className="text-xs text-foreground/30 mt-1">PNG, JPG, WEBP</span>
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>

              {/* Preview */}
              {imagePreviewUrl && (
                <div className="relative self-start">
                  <img
                    src={imagePreviewUrl}
                    alt="Preview"
                    className="h-32 w-32 rounded-xl object-cover border"
                  />
                  <button
                    type="button"
                    onClick={() => setImage('')}
                    className="absolute -right-2 -top-2 rounded-full bg-white p-1 shadow"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </fieldset>

          {/* ── Ingredients ── */}
          <fieldset className="space-y-4">
            <legend className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/40">
              Ingredients
            </legend>

            <div className="space-y-3">
              {ingredients.map((ingredient, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <span className="text-sm text-foreground/40 w-6">{idx + 1}.</span>
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => updateIngredient(idx, e.target.value)}
                    placeholder="e.g. A handful of microgreens"
                    className="flex-1 rounded-lg border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(idx)}
                      className="rounded-lg p-2 hover:bg-red-50 transition"
                    >
                      <X className="w-5 h-5 text-red-500" />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addIngredient}
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition"
              >
                <Plus className="w-4 h-4" />
                Add Ingredient
              </button>
            </div>
          </fieldset>

          {/* ── Preparation ── */}
          <fieldset className="space-y-4">
            <legend className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/40">
              Preparation Instructions
            </legend>

            <textarea
              rows={5}
              value={preparing}
              onChange={(e) => setPreparing(e.target.value)}
              placeholder="Describe how to prepare this recipe..."
              className="w-full rounded-xl border border-border px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </fieldset>

          {/* ── Submit ── */}
          <div className="border-t border-border pt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-white font-semibold hover:bg-primary/90 transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {mode === 'create' ? 'Create Recipe' : 'Save Changes'}
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push('/admin/recipes')}
                className="w-full sm:w-auto rounded-xl border border-border px-6 py-3 text-sm font-medium hover:bg-muted transition"
              >
                Cancel
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}
