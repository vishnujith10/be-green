'use client'

import { MessageCircle } from 'lucide-react'

interface OrderSectionProps {
  productName: string
  price?: number
}

export function OrderSection({ productName, price }: OrderSectionProps) {
  const handleWhatsAppOrder = () => {
    const message = `Hi, I'm interested in ordering ${productName}${price ? ` ($${price})` : ''}. Can you provide more details?`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank')
  }

  return (
    <div className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-10">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold">Ready to Order?</h3>
          <p className="text-primary-foreground/80 mt-2">
            Get fresh {productName} delivered to your door. Order now via WhatsApp for quick response.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {price && (
            <div className="text-5xl font-bold">${price}</div>
          )}
          <button
            onClick={handleWhatsAppOrder}
            className="flex items-center gap-2 px-8 py-3 bg-white text-primary rounded-full font-bold hover:bg-white/90 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
          >
            <MessageCircle className="w-5 h-5" />
            Order via WhatsApp
          </button>
        </div>

        <p className="text-sm text-primary-foreground/70">
          ✓ Fresh delivery within 24 hours<br/>
          ✓ Free shipping on orders over $30<br/>
          ✓ Satisfaction guaranteed
        </p>
      </div>
    </div>
  )
}
