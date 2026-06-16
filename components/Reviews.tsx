'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

export function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const reviews = [
    {
      name: 'Sarah Johnson',
      role: 'Health Coach',
      content: 'BE GREEN microgreens have revolutionized my nutrition coaching. My clients see real results and love the freshness. The quality is absolutely unmatched!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Chef',
      content: 'As a chef, I require only the best ingredients. These microgreens elevate every dish. The flavor, texture, and nutrition profile are exceptional.',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Fitness Professional',
      content: 'My clients notice visible changes in their energy levels when they incorporate BE GREEN microgreens. Delivering them fresh is genius. Highly recommended!',
      rating: 5
    },
    {
      name: 'David Park',
      role: 'Restaurant Owner',
      content: 'We&apos;ve been sourcing from BE GREEN for 6 months. The consistency and quality are why we feature them on our menu. Worth every penny.',
      rating: 5
    }
  ]

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))
  }

  const currentReview = reviews[currentIndex]

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <span className="text-primary text-sm font-semibold">Testimonials</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-2 text-balance">
            Loved by health enthusiasts
          </h2>
        </div>

        {/* Carousel */}
        <div className="bg-white rounded-2xl border border-border p-8 sm:p-10 lg:p-12">
          <div className="space-y-6">
            {/* Stars */}
            <div className="flex gap-1">
              {Array.from({ length: currentReview.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Review Content */}
            <p className="text-xl text-foreground/80 leading-relaxed italic">
              &quot;{currentReview.content}&quot;
            </p>

            {/* Author */}
            <div className="pt-6 border-t border-border">
              <p className="font-semibold text-foreground text-lg">{currentReview.name}</p>
              <p className="text-sm text-primary font-medium mt-1">{currentReview.role}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={goToPrevious}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-background hover:bg-muted border border-border hover:border-primary transition-all"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-primary w-8' : 'bg-border hover:bg-border'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-background hover:bg-muted border border-border hover:border-primary transition-all"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
