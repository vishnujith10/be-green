'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Leaf } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="Fresh microgreens"
          fill
          className="object-cover"
          priority
        />

        {/* Dark Premium Overlay */}
        <div className="absolute inset-0 bg-black/15" />

        {/* Soft Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/15 to-black/20" />
      </div>

      {/* Floating Leaves */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <Leaf
          className="absolute w-8 h-8 text-white/20 animate-pulse"
          style={{ top: '10%', left: '10%', animationDelay: '0s' }}
        />
        <Leaf
          className="absolute w-12 h-12 text-white/15 animate-pulse"
          style={{ top: '20%', right: '15%', animationDelay: '1s' }}
        />
        <Leaf
          className="absolute w-6 h-6 text-white/10 animate-pulse"
          style={{ bottom: '20%', left: '20%', animationDelay: '2s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs sm:text-sm font-bold tracking-wide text-white backdrop-blur-md">
            <Leaf className="w-4 h-4 fill-current" />
            FRESHLY GROWN FOR YOU
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight text-balance drop-shadow-lg">
            Be Fresh. Be Green.
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl font-medium text-white/95 leading-relaxed text-balance drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Premium microgreens delivered straight to your door. Packed with
            nutrients, bursting with flavor, and grown with care in our
            sustainable farm.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="#products"
              className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
            >
              Shop Now
            </Link>

            <Link
              href="#why"
              className="px-8 py-3 bg-white/15 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold hover:bg-white/25 transition-all shadow-lg hover:shadow-xl"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white" />
      </div>
    </section>
  )
}