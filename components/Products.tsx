import Link from 'next/link'
import Image from 'next/image'
import { getAvailableProducts } from '@/lib/products'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export async function Products() {
  const products = await getAvailableProducts()

  return (
    <section id="products" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-3 block">Premium Selection</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 font-serif">
            Our Microgreens
          </h2>
          <p className="text-lg text-foreground/60 leading-relaxed text-balance">
            Organically grown, hand-harvested, and delivered fresh to your door. Explore our range of nutrient-dense microgreens.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {products.map((product, index) => (
            <Link key={product.id} href={`/products/₹{product.slug}`} className="group block">
              <div className="relative bg-background rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/3] relative bg-muted/30 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority={index === 0}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      Best Seller
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2 font-serif group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm font-medium text-primary">
                        {product.tagline}
                      </p>
                    </div>
                    <div className="bg-primary/10 text-primary font-bold px-3 py-1.5 rounded-lg text-sm whitespace-nowrap">
                      ₹{product.price}
                    </div>
                  </div>

                  <p className="text-foreground/60 text-sm line-clamp-2 mb-6">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <Button variant="ghost" className="group-hover:text-primary p-0 h-auto hover:bg-transparent">
                      <span className="font-semibold">View Details</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button size="icon" className="rounded-full h-10 w-10 shadow-md hover:shadow-lg transition-all group-hover:scale-110">
                      <ShoppingBag className="h-4 w-4" />
                    </Button>
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
