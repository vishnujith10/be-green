import { Maximize2, Pill, Leaf, Shield, Activity, Droplets } from 'lucide-react'

interface Nutrition {
  protein: string
  vitamins: string
  fiber: string
  antioxidants: string
  calcium: string
  iron: string
}

interface NutritionCardsProps {
  nutrition: Nutrition
}

export function NutritionCards({ nutrition }: NutritionCardsProps) {
  const items = [
    { icon: Maximize2, label: 'Protein', value: nutrition.protein },
    { icon: Pill, label: 'Vitamins', value: nutrition.vitamins },
    { icon: Leaf, label: 'Fiber', value: nutrition.fiber },
    { icon: Shield, label: 'Antioxidants', value: nutrition.antioxidants },
    { icon: Activity, label: 'Calcium', value: nutrition.calcium },
    { icon: Droplets, label: 'Iron', value: nutrition.iron }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <div
            key={index}
            className="bg-white rounded-[28px] p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-black/[0.01] hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-300"
          >
            <div className="inline-flex items-center justify-center w-[52px] h-[52px] rounded-2xl bg-primary/10 mb-6">
              <Icon className="w-6 h-6 text-primary" strokeWidth={2} />
            </div>
            <h3 className="text-[1.75rem] font-medium text-[#14532D] mb-4 font-serif tracking-tight">
              {item.label}
            </h3>
            <p className="text-[#4B5563] leading-[1.7] text-[15px]">
              {item.value}
            </p>
          </div>
        )
      })}
    </div>
  )
}


