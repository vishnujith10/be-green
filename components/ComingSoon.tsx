import Image from 'next/image'
import { getComingSoonProducts } from '@/lib/products'
import { Clock } from 'lucide-react'

export function ComingSoon() {
  const products = getComingSoonProducts()

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <span className="text-primary text-sm font-semibold">Coming Soon</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-2 text-balance">
            Exciting varieties on the way
          </h2>
          <p className="text-foreground/60 mt-4 text-lg">
            We&apos;re expanding our selection. Stay tuned for these premium microgreens varieties.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-2xl overflow-hidden h-80 bg-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              {/* Product Image */}
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-60"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

              {/* Coming Soon Badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Clock className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold text-sm">Coming Soon</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                  <p className="text-white/80 text-sm">{product.tagline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
