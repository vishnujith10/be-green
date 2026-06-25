"use client"

import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/utils/supabase/client'
import { getStoredUser, type AppUser } from '@/lib/user'
import { useEffect, useState } from 'react'
import { Plus, ChevronLeft, ChevronRight, Star } from 'lucide-react'

export interface Review {
  id: string
  name: string
  role?: string
  content: string
  rating: number
}

interface ReviewsProps {
  productId: string
  reviews: Review[]
}

export function Reviews({ productId, reviews }: ReviewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [user, setUser] = useState<AppUser | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [rating, setRating] = useState(5)
  const [content, setContent] = useState('')
  const router = useRouter()

  useEffect(() => {
    const loadUser = () => setUser(getStoredUser())

    loadUser()
    window.addEventListener('user-changed', loadUser)
    window.addEventListener('storage', loadUser)

    return () => {
      window.removeEventListener('user-changed', loadUser)
      window.removeEventListener('storage', loadUser)
    }
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))
  }

  const handleAddReview = () => {
    if (!user) {
      router.push('/auth')
    } else {
      setShowModal(true)
    }
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!user) {
      alert('Please login first')
      return
    }
  
    try {
      console.log('productId:', productId)
      console.log('user.id:', user.id)
      console.log('rating:', rating)
      console.log('review:', content)
  
      const { data, error } = await supabaseBrowser
        .from('reviews')
        .insert([
          {
            product_id: productId,
            user_id: user.id,
            rating,
            review: content,
          },
        ])
        .select()
  
      console.log('DATA:', data)
      console.log('ERROR:', error)
  
      if (error) {
        alert(error.message)
        return
      }
  
      alert('Review submitted successfully!')
  
      setShowModal(false)
      setRating(5)
      setContent('')
  
      router.refresh()
    } catch (err) {
      console.error(err)
      alert('Unexpected error occurred')
    }
  }

  const currentReview = reviews[currentIndex]

  return (
    <>
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 sm:mb-16 lg:mb-20 gap-6">
            <div className="text-center sm:text-left">
              <span className="text-primary text-sm font-semibold">Testimonials</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-2 text-balance">
                Customer Reviews
              </h2>
            </div>
            <button
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-medium transition-colors"
              onClick={handleAddReview}
            >
              <Plus className="w-5 h-5" />
              Add Review
            </button>
          </div>

          {reviews.length === 0 ? (
            <div className="text-center bg-white rounded-2xl border border-border p-12">
              <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No reviews yet</h3>
              <p className="text-muted-foreground">Be the first to share your experience with this microgreen!</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-border p-8 sm:p-10 lg:p-12">
              <div className="space-y-5">
  {/* User avatar + username */}
  <div className="flex items-center gap-4">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
      {currentReview.name.charAt(0).toUpperCase()}
    </div>

    <div>
      <p className="font-semibold text-foreground text-lg">
        {currentReview.name}
      </p>

      {currentReview.role && (
        <p className="text-sm text-primary font-medium mt-0.5">
          {currentReview.role}
        </p>
      )}
    </div>
  </div>

  {/* Rating */}
  <div className="flex gap-1">
    {Array.from({ length: currentReview.rating }).map((_, i) => (
      <Star
        key={i}
        className="w-5 h-5 fill-yellow-400 text-yellow-400"
      />
    ))}
  </div>

  {/* Review text */}
  <p className="text-xl text-foreground/80 leading-relaxed italic">
    &ldquo;{currentReview.content}&rdquo;
  </p>
</div>

              {reviews.length > 1 && (
                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={goToPrevious}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-background hover:bg-muted border border-border hover:border-primary transition-all"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                  </button>

                  <div className="flex gap-2">
                    {reviews.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-primary w-8' : 'bg-border hover:bg-border'}`}
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
              )}
            </div>
          )}
        </div>
      </section>

      {showModal && user && (
  <div className="fixed inset-0 flex items-center justify-center bg-white/20 backdrop-blur-lg z-50 px-4">
    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg border border-white/50">
      <h2 className="text-3xl font-bold text-[#14532D] mb-6">
        Write a Review
      </h2>

      <form className="space-y-5" onSubmit={handleSubmitReview}>
        <div>
          <label className="block text-sm font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            value={user.username}
            readOnly
            className="w-full px-4 py-3 border rounded-xl bg-muted"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Rating
          </label>

          <select
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="w-full px-4 py-3 border rounded-xl"
          >
            <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
            <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
            <option value={3}>⭐⭐⭐ 3 Stars</option>
            <option value={2}>⭐⭐ 2 Stars</option>
            <option value={1}>⭐ 1 Star</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Your Review
          </label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your experience with this microgreen..."
            rows={5}
            required
            className="w-full px-4 py-3 border rounded-xl resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-primary text-white hover:bg-primary/90"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </>
  )
}
