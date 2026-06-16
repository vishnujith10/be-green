import Link from 'next/link'
import Image from 'next/image'
import { getAvailableProducts } from '@/lib/products'
import { ArrowRight } from 'lucide-react'

export function Products() {
  const products = getAvailableProducts()

  return (
    <section id="products" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <span className="text-primary text-sm font-semibold">Available Products</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-2 text-balance">
            Fresh microgreens, ready for you
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="group h-full rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer flex flex-col">
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mt-1">{product.tagline}</p>
                  <p className="text-foreground/60 text-sm mt-3 line-clamp-2 flex-1">
                    {product.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">${product.price}</div>
                    <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
