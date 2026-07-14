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

interface ProductFormProps {
  initialData?: {
    id?: string
    slug: string
    name: string
    tagline: string
    description: string
    main_image: string
    price: number | null
    available: boolean
    in_stock: boolean
    nutrition: Record<string, string>
    health_benefits: string[]
    gallery_images: string[]
  }
  mode: 'create' | 'edit'
}

const nutritionFields = [
  { key: 'protein', label: 'Protein' },
  { key: 'vitamins', label: 'Vitamins' },
  { key: 'fiber', label: 'Fiber' },
  { key: 'antioxidants', label: 'Antioxidants' },
  { key: 'calcium', label: 'Calcium' },
  { key: 'iron', label: 'Iron' },
]

export default function ProductForm({
  initialData,
  mode,
}: ProductFormProps) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState(initialData?.name || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [tagline, setTagline] = useState(initialData?.tagline || '')
  const [description, setDescription] = useState(
    initialData?.description || ''
  )

  const [mainImage, setMainImage] = useState<string | File>(
    initialData?.main_image || ''
  )

  const [galleryImages, setGalleryImages] = useState<(string | File)[]>(
    initialData?.gallery_images?.length
      ? initialData.gallery_images
      : ['']
  )

  const [price, setPrice] = useState(
    initialData?.price?.toString() || ''
  )

  const [available, setAvailable] = useState(
    initialData?.available ?? true
  )

  const [inStock, setInStock] = useState(
    initialData?.in_stock ?? true
  )

  const [nutrition, setNutrition] = useState<Record<string, string>>(
    initialData?.nutrition || {}
  )

  const [benefits, setBenefits] = useState<string[]>(
    initialData?.health_benefits?.length
      ? initialData.health_benefits
      : ['']
  )

  const handleNameChange = (value: string) => {
    setName(value)

    if (mode === 'create') {
      setSlug(
        value
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()
      )
    }
  }

  const handleNutritionChange = (
    key: string,
    value: string
  ) => {
    setNutrition((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const addBenefit = () => setBenefits([...benefits, ''])

  const removeBenefit = (idx: number) =>
    setBenefits(benefits.filter((_, i) => i !== idx))

  const updateBenefit = (idx: number, value: string) => {
    const updated = [...benefits]
    updated[idx] = value
    setBenefits(updated)
  }

  const addGalleryImage = () =>
    setGalleryImages([...galleryImages, ''])

  const removeGalleryImage = (idx: number) =>
    setGalleryImages(
      galleryImages.filter((_, i) => i !== idx)
    )

  const handleMainImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.[0]) {
      setMainImage(e.target.files[0])
    }
  }

  const handleGalleryImageChange = (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.[0]) {
      const updated = [...galleryImages]
      updated[idx] = e.target.files[0]
      setGalleryImages(updated)
    }
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
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
      let mainImageUrl =
        typeof mainImage === 'string'
          ? mainImage
          : ''

      if (mainImage instanceof File) {
        mainImageUrl = await uploadProductImage(mainImage)
      }

      if (!mainImageUrl.trim()) {
        throw new Error('Main image is required')
      }

      const galleryImageUrls: string[] = []

      for (const image of galleryImages) {
        if (image instanceof File) {
          const url = await uploadProductImage(image)
          galleryImageUrls.push(url)
        } else if (
          typeof image === 'string' &&
          image.trim()
        ) {
          galleryImageUrls.push(image.trim())
        }
      }

      const payload = {
        name: name.trim(),
        slug: slug.trim(),
        tagline: tagline.trim(),
        description: description.trim(),
        main_image: mainImageUrl,
        price: price ? Number(price) : null,
        available,
        in_stock: inStock,
        nutrition,
        health_benefits: benefits.filter((b) =>
          b.trim()
        ),
        gallery_images: galleryImageUrls,
      }

      const url =
        mode === 'create'
          ? '/api/admin/products'
          : `/api/admin/products/${initialData?.id}`

      const method =
        mode === 'create'
          ? 'POST'
          : 'PUT'

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
        throw new Error(
          data.error || 'Failed to save product'
        )
      }

      router.push('/admin/dashboard')
      router.refresh()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unexpected error'
      )
    } finally {
      setLoading(false)
    }
  }

  const renderImagePreview = (
    image: string | File
  ) => {
    if (image instanceof File) {
      return URL.createObjectURL(image)
    }

    return image
  }

  return (
    //part1

    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <button
        onClick={() => router.push('/admin/dashboard')}
        className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors mb-4 sm:mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 sm:px-8 py-5 sm:py-6 border-b border-border bg-muted/20">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            {mode === 'create'
              ? 'Add New Product'
              : `Edit: ${initialData?.name}`}
          </h2>

          <p className="text-sm text-foreground/60 mt-1">
            {mode === 'create'
              ? 'Fill in the details below to create a product.'
              : 'Update the product details below.'}
          </p>
        </div>

        {error && (
          <div className="mx-5 sm:mx-8 mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-8 p-5 sm:p-8"
        >
          {/* Basic Information */}

          <fieldset className="space-y-5">
            <legend className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/40">
              Basic Information
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Name
                </label>

                <input
                  required
                  value={name}
                  onChange={(e) =>
                    handleNameChange(e.target.value)
                  }
                  className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Slug
                </label>

                <input
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Tagline
              </label>

              <input
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>

              <textarea
                rows={5}
                required
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="w-full rounded-xl border border-border px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-medium mb-2">
                  Price
                </label>

                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-end">
                  <label className="flex items-center gap-3">

                    <button
                      type="button"
                      onClick={() => setAvailable(!available)}
                      className={`relative h-7 w-12 rounded-full transition ${available
                        ? 'bg-emerald-500'
                        : 'bg-gray-300'
                        }`}
                    >
                      <span
                        className={`absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white transition ${available
                          ? 'translate-x-5'
                          : ''
                          }`}
                      />
                    </button>

                    <span className="text-sm font-medium">
                      {available
                        ? 'Available'
                        : 'Coming Soon'}
                    </span>

                  </label>
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-3">

                    <button
                      type="button"
                      onClick={() => setInStock(!inStock)}
                      className={`relative h-7 w-12 rounded-full transition ${inStock
                        ? 'bg-emerald-500'
                        : 'bg-gray-300'
                        }`}
                    >
                      <span
                        className={`absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white transition ${inStock
                          ? 'translate-x-5'
                          : ''
                          }`}
                      />
                    </button>

                    <span className="text-sm font-medium">
                      {inStock
                        ? 'In Stock'
                        : 'Out of Stock'}
                    </span>

                  </label>
                </div>
              </div>

            </div>

          </fieldset>

          {/* Images */}

          <fieldset className="space-y-5">

            <legend className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/40">
              Images
            </legend>

            <div>

              <label className="block text-sm font-medium mb-2">
                Main Image
              </label>

              <div className="flex flex-col lg:flex-row gap-4">

                <label className="flex-1 flex h-28 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border hover:bg-muted/20 transition">

                  <Upload className="mb-2 h-6 w-6 text-foreground/40" />

                  <span className="text-sm text-foreground/60">
                    Click to Upload
                  </span>

                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageChange}
                  />

                </label>

                {mainImage && (
                  <div className="relative self-start">

                    <img
                      src={renderImagePreview(mainImage)}
                      className="h-28 w-28 rounded-xl object-cover border"
                    />

                    <button
                      type="button"
                      onClick={() => setMainImage('')}
                      className="absolute -right-2 -top-2 rounded-full bg-white p-1 shadow"
                    >
                      <X className="h-4 w-4" />
                    </button>

                  </div>
                )}

              </div>

            </div>

            <div>

              <label className="block text-sm font-medium mb-3">
                Gallery Images
              </label>

              <div className="space-y-3">

                {galleryImages.map((item, idx) => (

                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row gap-3"
                  >

                    <label className="flex-1 flex h-14 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border hover:bg-muted/20 transition">

                      <Upload className="mr-2 h-4 w-4" />

                      Upload Image {idx + 1}

                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleGalleryImageChange(idx, e)
                        }
                      />

                    </label>

                    {item && (
                      <img
                        src={renderImagePreview(item)}
                        className="h-14 w-14 rounded-lg border object-cover"
                      />
                    )}

                    {galleryImages.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeGalleryImage(idx)
                        }
                        className="self-center rounded-lg p-2 hover:bg-red-50"
                      >
                        <X className="h-5 w-5 text-red-500" />
                      </button>
                    )}

                  </div>

                ))}

                <button
                  type="button"
                  onClick={addGalleryImage}
                  className="flex items-center gap-2 text-sm text-primary font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Gallery Image
                </button>

              </div>

            </div>

          </fieldset>

          {/* Nutrition */}
          <fieldset className="space-y-5">
            <legend className="text-sm font-semibold uppercase tracking-wider text-foreground/40 mb-4">
              Nutrition Information
            </legend>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nutritionFields.map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-foreground/60 mb-1">
                    {label}
                  </label>

                  <input
                    type="text"
                    value={nutrition[key] || ''}
                    onChange={(e) =>
                      handleNutritionChange(key, e.target.value)
                    }
                    className="w-full rounded-lg border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder={`Enter ${label}`}
                  />
                </div>
              ))}
            </div>
          </fieldset>

          {/* Health Benefits */}
          <fieldset className="space-y-5">
            <legend className="text-sm font-semibold uppercase tracking-wider text-foreground/40 mb-4">
              Health Benefits
            </legend>

            <div className="space-y-3">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row gap-2 sm:items-center"
                >
                  <span className="text-sm text-foreground/40 sm:w-6">
                    {idx + 1}.
                  </span>

                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) =>
                      updateBenefit(idx, e.target.value)
                    }
                    className="flex-1 rounded-lg border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Enter health benefit"
                  />

                  {benefits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBenefit(idx)}
                      className="self-start sm:self-center rounded-lg p-2 hover:bg-red-50 transition"
                    >
                      <X className="w-5 h-5 text-red-500" />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addBenefit}
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition"
              >
                <Plus className="w-4 h-4" />
                Add Benefit
              </button>
            </div>
          </fieldset>

          {/* Submit Buttons */}
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
                    {mode === 'create'
                      ? 'Create Product'
                      : 'Save Changes'}
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push('/admin/dashboard')}
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