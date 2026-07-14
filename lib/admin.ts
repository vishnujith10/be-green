import { createAdminClient } from '@/utils/supabase/service'

export interface AdminProduct {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  main_image: string | null
  gallery_images: string[]
  price: number | null
  weight: string | null
  nutrition: any // JSON
  health_benefits: string[]
  available: boolean
  in_stock: boolean
  featured: boolean
  created_at: string
}

export type ProductFormData = Omit<AdminProduct, 'id' | 'created_at'>

// Fetch all products (both available and unavailable)
export async function getAllProducts(): Promise<AdminProduct[]> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data || []
}

// Fetch single product by ID
export async function getProductById(id: string): Promise<AdminProduct | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

// Add a new product
export async function addProduct(product: ProductFormData): Promise<AdminProduct> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()

  if (error) throw new Error(error.message)
  return data?.[0] as AdminProduct
}

// Update an existing product
export async function updateProduct(id: string, product: Partial<ProductFormData>): Promise<AdminProduct> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()

  if (error) throw new Error(error.message)
  return data?.[0] as AdminProduct
}

// Delete a product
export async function deleteProduct(id: string): Promise<void> {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
}

// Toggle product availability
export async function toggleProductAvailability(id: string, available: boolean): Promise<AdminProduct> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('products')
    .update({ available })
    .eq('id', id)
    .select()

  if (error) throw new Error(error.message)
  return data?.[0] as AdminProduct
}

// Verify if a user is admin
export async function verifyAdmin(userId: string): Promise<boolean> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single()

  return data?.role === 'admin'
}
