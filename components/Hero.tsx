'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Leaf } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center pt-24 pb-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-8 max-w-2xl z-10">
            <div className="inline-flex items-center gap-2 bg-[#E8F3EA] text-[#0A5C2F] px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide">
              <Leaf className="w-4 h-4 fill-current" />
              PREMIUM CLINICAL GRADE
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-bold text-foreground leading-[1.1] tracking-tight">
              Fresh <span className="text-[#0A5C2F] italic">Microgreens</span><br />
              for a Healthier Life
            </h1>

            <p className="text-lg sm:text-xl text-foreground/70 max-w-lg leading-relaxed">
              Locally grown, freshly harvested, and chemical-free microgreens packed with up to 40x more nutrients than mature plants.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0A5C2F] text-white rounded-full font-semibold hover:bg-[#074724] transition-colors"
              >
                Explore Products
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#why"
                className="inline-flex items-center justify-center px-8 py-4 border border-border bg-white text-foreground rounded-full font-semibold hover:bg-muted transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-full aspect-square lg:aspect-[4/3] mt-8 lg:mt-0">
            <div className="relative w-full h-full rounded-[40px] overflow-hidden shadow-xl">
              <Image
                src="/images/home.png"
                alt="Fresh Microgreens"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
