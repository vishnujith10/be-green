import { Droplet, Zap, Heart, Shield, Leaf, Flame } from 'lucide-react'

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
    { icon: Flame, label: 'Protein', value: nutrition.protein },
    { icon: Leaf, label: 'Vitamins', value: nutrition.vitamins },
    { icon: Droplet, label: 'Fiber', value: nutrition.fiber },
    { icon: Shield, label: 'Antioxidants', value: nutrition.antioxidants },
    { icon: Heart, label: 'Calcium', value: nutrition.calcium },
    { icon: Zap, label: 'Iron', value: nutrition.iron }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <div key={index} className="p-6 rounded-2xl bg-background border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-muted mb-3">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <p className="text-xs sm:text-sm text-foreground/60 font-medium">{item.label}</p>
            <p className="text-sm sm:text-base font-bold text-primary mt-1">{item.value}</p>
          </div>
        )
      })}
    </div>
  )
}
