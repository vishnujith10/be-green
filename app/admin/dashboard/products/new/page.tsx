'use client'

import ProductForm from '@/components/admin/ProductForm'

export default function NewProductPage() {
  return (
    <div className="pb-12">
      <ProductForm mode="create" />
    </div>
  )
}
