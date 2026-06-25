import { createClient } from '@/utils/supabase/server'

export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  image: string
  price?: number
  status: 'available' | 'coming-soon'
  nutrition: {
    protein: string
    vitamins: string
    fiber: string
    antioxidants: string
    calcium: string
    iron: string
  }
  detailedNutrition?: {
    category: string
    items: { label: string; value: string; highlight?: boolean }[]
  }[]
  benefits: string[] | { title: string; description: string }[]
  gallery: string[]
}

// Maps Supabase rows to our app's Product type
function mapProduct(row: any): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    image: row.main_image,
    price: row.price ? Number(row.price) : undefined,
    status: row.available ? 'available' : 'coming-soon',
    nutrition: row.nutrition || {},
    benefits: row.health_benefits || [],
    gallery: row.gallery_images || []
  }
}

export const getProductById = async (id: string): Promise<Product | undefined> => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('slug', id)
    .single()

  return data ? mapProduct(data) : undefined
}

export const getAvailableProducts = async (): Promise<Product[]> => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('available', true)

  return data ? data.map(mapProduct) : []
}

export const getComingSoonProducts = async (): Promise<Product[]> => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('available', false)

  return data ? data.map(mapProduct) : []
}
