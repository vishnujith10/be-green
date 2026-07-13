'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getStoredUser } from '@/lib/user'
import { uploadProductImage } from '@/lib/storage'
import {
  ArrowLeft,
  Save,
  Loader2,
  ImageIcon,
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

export default function ProductForm({ initialData, mode }: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState(initialData?.name || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [tagline, setTagline] = useState(initialData?.tagline || '')
  const [description, setDescription] = useState(initialData?.description || '')
  
  // Images can be strings (existing URLs) or File objects (new uploads)
  const [mainImage, setMainImage] = useState<string | File>(initialData?.main_image || '')
  const [galleryImages, setGalleryImages] = useState<(string | File)[]>(
    initialData?.gallery_images?.length ? initialData.gallery_images : ['']
  )
  
  const [price, setPrice] = useState(initialData?.price?.toString() || '')
  const [available, setAvailable] = useState(initialData?.available ?? true)
  const [nutrition, setNutrition] = useState<Record<string, string>>(
    initialData?.nutrition || {}
  )
  const [benefits, setBenefits] = useState<string[]>(
    initialData?.health_benefits?.length ? initialData.health_benefits : ['']
  )

  // Auto-generate slug from name
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

  const handleNutritionChange = (key: string, value: string) => {
    setNutrition((prev) => ({ ...prev, [key]: value }))
  }

  const addBenefit = () => setBenefits([...benefits, ''])
  const removeBenefit = (idx: number) => setBenefits(benefits.filter((_, i) => i !== idx))
  const updateBenefit = (idx: number, value: string) => {
    const updated = [...benefits]
    updated[idx] = value
    setBenefits(updated)
  }

  const addGalleryImage = () => setGalleryImages([...galleryImages, ''])
  const removeGalleryImage = (idx: number) => setGalleryImages(galleryImages.filter((_, i) => i !== idx))
  
  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(e.target.files[0])
    }
  }

  const handleGalleryImageChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const updated = [...galleryImages]
      updated[idx] = e.target.files[0]
      setGalleryImages(updated)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const user = getStoredUser()
    if (!user || user.role !== 'admin') {
      setError('Not authorized')
      setLoading(false)
      return
    }

    try {
      // 1. Upload new images to Supabase Storage if they are File objects
      let mainImageUrl = typeof mainImage === 'string' ? mainImage : ''
      if (mainImage instanceof File) {
        mainImageUrl = await uploadProductImage(mainImage)
      }

      if (!mainImageUrl.trim()) {
        throw new Error('Main image is required')
      }

      const galleryImageUrls: string[] = []
      for (const item of galleryImages) {
        if (item instanceof File) {
          const url = await uploadProductImage(item)
          galleryImageUrls.push(url)
        } else if (typeof item === 'string' && item.trim()) {
          galleryImageUrls.push(item.trim())
        }
      }

      // 2. Save product data to database
      const productData = {
        name: name.trim(),
        slug: slug.trim(),
        tagline: tagline.trim(),
        description: description.trim(),
        main_image: mainImageUrl,
        price: price ? Math.round(Number(price)) : null,
        available,
        nutrition,
        health_benefits: benefits.filter((b) => b.trim()),
        gallery_images: galleryImageUrls,
      }

      const url =
        mode === 'create'
          ? '/api/admin/products'
          : `/api/admin/products/${initialData?.id}`
      const method = mode === 'create' ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
        body: JSON.stringify(productData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }

      router.push('/admin/dashboard')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  // Helper to render image previews
  const renderImagePreview = (item: string | File) => {
    if (item instanceof File) {
      return URL.createObjectURL(item)
    }
    return item
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => router.push('/admin/dashboard')}
        className="flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-border bg-muted/20">
          <h2 className="text-xl font-bold text-foreground">
            {mode === 'create' ? 'Add New Product' : `Edit: ${initialData?.name}`}
          </h2>
          <p className="text-sm text-foreground/50 mt-1">
            {mode === 'create' ? 'Fill in the details to add a new product.' : 'Update the product details below.'}
          </p>
        </div>

        {error && (
          <div className="mx-8 mt-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Basic Info */}
          <fieldset className="space-y-5">
            <legend className="text-sm font-semibold uppercase tracking-wider text-foreground/40 mb-4">
              Basic Information
            </legend>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="e.g. Sunflower Microgreens"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="sunflower-microgreens"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Tagline <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="A short catchy tagline"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                placeholder="Detailed product description..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Price (₹)
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="200"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => setAvailable(!available)}
                    className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${
                      available ? 'bg-emerald-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-200 ${
                        available ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="text-sm font-medium text-foreground">
                    {available ? 'Available' : 'Coming Soon'}
                  </span>
                </label>
              </div>
            </div>
          </fieldset>

          {/* Images */}
          <fieldset className="space-y-5">
            <legend className="text-sm font-semibold uppercase tracking-wider text-foreground/40 mb-4">
              Images (Upload)
            </legend>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Main Image <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-border rounded-xl cursor-pointer bg-white hover:bg-muted/30 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-6 h-6 text-foreground/40 mb-2" />
                      <p className="text-sm text-foreground/60">
                        <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                      </p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleMainImageChange} />
                  </label>
                </div>
                {mainImage && (
                  <div className="relative shrink-0 flex items-center gap-2">
                    <img
                      src={renderImagePreview(mainImage)}
                      alt="Main Preview"
                      className="w-24 h-24 rounded-xl object-cover border border-border shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setMainImage('')}
                      className="p-2 text-foreground/30 hover:text-red-500 bg-red-50/0 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Gallery Images
              </label>
              <div className="space-y-3">
                {galleryImages.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="flex-1">
                       <label className="flex items-center justify-center w-full h-12 border-2 border-dashed border-border rounded-xl cursor-pointer bg-white hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-2">
                           <Upload className="w-4 h-4 text-foreground/40" />
                           <span className="text-sm text-foreground/60">Upload image {idx + 1}</span>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleGalleryImageChange(idx, e)} />
                      </label>
                    </div>
                    {item && (
                      <img
                        src={renderImagePreview(item)}
                        alt={`Gallery ${idx + 1}`}
                        className="w-12 h-12 rounded-lg object-cover border border-border shadow-sm shrink-0"
                      />
                    )}
                    {galleryImages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        className="p-2 text-foreground/30 hover:text-red-500 bg-red-50/0 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addGalleryImage}
                  className="flex items-center gap-1.5 text-xs text-primary font-medium hover:text-primary/80 transition-colors mt-3"
                >
                  <Plus className="w-4 h-4" />
                  Add another gallery image
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
                    onChange={(e) => handleNutritionChange(key, e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    placeholder={`e.g. High, 25%, 3g`}
                  />
                </div>
              ))}
            </div>
          </fieldset>

          {/* Health Benefits */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold uppercase tracking-wider text-foreground/40 mb-4">
              Health Benefits
            </legend>
            <div className="space-y-2">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <span className="text-xs text-foreground/30 w-5 text-right shrink-0">{idx + 1}.</span>
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => updateBenefit(idx, e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    placeholder="e.g. Rich in Vitamin C"
                  />
                  {benefits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBenefit(idx)}
                      className="p-1.5 text-foreground/30 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addBenefit}
                className="flex items-center gap-1.5 text-xs text-primary font-medium hover:text-primary/80 transition-colors mt-2"
              >
                <Plus className="w-3.5 h-3.5" />
                Add benefit
              </button>
            </div>
          </fieldset>

          {/* Submit */}
          <div className="flex items-center gap-3 pt-6 border-t border-border">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {loading ? 'Saving...' : mode === 'create' ? 'Create Product' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard')}
              className="px-6 py-3 text-sm font-medium text-foreground/60 hover:text-foreground rounded-xl hover:bg-muted/50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
