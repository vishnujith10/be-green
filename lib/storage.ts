import { supabaseBrowser } from '@/utils/supabase/client'

/**
 * Uploads a file to the Supabase storage bucket 'product-images'.
 * Generates a unique file name and returns the public URL.
 */
export async function uploadProductImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${crypto.randomUUID()}.${fileExt}`
  const filePath = `${fileName}`

  const { error: uploadError } = await supabaseBrowser.storage
    .from('product-images')
    .upload(filePath, file)

  if (uploadError) {
    throw new Error(`Failed to upload image: ${uploadError.message}`)
  }

  const { data } = supabaseBrowser.storage
    .from('product-images')
    .getPublicUrl(filePath)

  return data.publicUrl
}
