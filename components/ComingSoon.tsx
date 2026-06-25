import Image from 'next/image'
import { getComingSoonProducts } from '@/lib/products'
import { Clock } from 'lucide-react'

export async function ComingSoon() {
  const products = await getComingSoonProducts()

  if (products.length === 0) return null

  return (
    <section id="coming-soon" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-3 block">Coming Soon</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 font-serif">
            Growing in the Lab
          </h2>
          <p className="text-lg text-foreground/60 leading-relaxed text-balance">
            We're constantly experimenting with new varieties. Here's what's sprouting next.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-3xl overflow-hidden border border-black/[0.04] shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="aspect-[4/3] relative bg-muted/20">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover opacity-80 mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-bold text-foreground">In Development</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 font-serif">{product.name}</h3>
                <p className="text-sm text-foreground/60 line-clamp-2">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
