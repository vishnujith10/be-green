import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProductById } from '@/lib/products'
import { ProductGallery } from '@/components/ProductGallery'
import { NutritionCards } from '@/components/NutritionCards'
import { HealthBenefits } from '@/components/HealthBenefits'
import { OrderSection } from '@/components/OrderSection'
import { Reviews } from '@/components/Reviews'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ChevronLeft } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
console.log("URL PARAM:", id)

const product = await getProductById(id)
console.log("PRODUCT FOUND:", product)

  if (!product) {
    return {
      title: 'Product Not Found | BE GREEN'
    }
  }

  return {
    title: `${product.name} | BE GREEN - Fresh Microgreens`,
    description: product.description
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  // Fetch reviews for this product
  const supabase = await createClient()
  const { data: reviewsData } = await supabase
    .from('reviews')
    .select('id, rating, review, users(username)')
    .eq('product_id', product.id)
    .order('created_at', { ascending: false })

  const reviews = (reviewsData ?? []).map((r: { id: string; rating: number; review: string; users: { username: string } | null }) => ({
    id: r.id,
    name: r.users?.username ?? 'Anonymous',
    content: r.review ?? '',
    rating: r.rating
  }))

  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <div className="pt-24">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Products
          </Link>
        </div>

        {/* Product Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
            {/* Gallery */}
            <div>
              {product.gallery.length > 0 ? (
                <ProductGallery images={product.gallery} productName={product.name} />
              ) : (
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-3">
                  {product.name}
                </h1>
                <p className="text-xl text-primary font-semibold">{product.tagline}</p>
              </div>

              <p className="text-lg text-foreground/70 leading-relaxed">
                {product.description}
              </p>

              {/* Order Section */}
              {product.status === 'available' && (
                <OrderSection productName={product.name} price={product.price} />
              )}

              {product.status === 'coming-soon' && (
                <div className="rounded-2xl bg-muted border border-border p-8 text-center">
                  <p className="text-lg font-semibold text-foreground">Coming Soon</p>
                  <p className="text-foreground/60 mt-2">
                    This product will be available soon. Check back soon!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Nutrition & Benefits Section */}
          {product.status === 'available' && (
            <div className="space-y-8 mb-16">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
                  Nutrition &amp; Benefits
                </h2>
              </div>

              {/* Nutrition Cards */}
              <div>
                <NutritionCards nutrition={product.nutrition} />
              </div>

              {/* Health Benefits */}
              {product.benefits.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">
                    Top Health Benefits
                  </h3>
                  <HealthBenefits benefits={product.benefits} />
                </div>
              )}
            </div>
          )}

          {/* Reviews Section */}
          <Reviews productId={product.id} reviews={reviews} />

          {/* CTA Section */}
          {product.status === 'available' && (
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-8 md:p-12 text-center mt-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Experience the BE GREEN Difference
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto mb-6">
                Join thousands of health enthusiasts who have made {product.name} part of their daily nutrition routine.
              </p>
              <Link
                href="/#products"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-opacity-90 transition-all"
              >
                Explore More Products
              </Link>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  )
}
