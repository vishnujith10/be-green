import { Zap, Heart, Brain, Shield } from 'lucide-react'

export function WhyMicrogreens() {
  const reasons = [
    {
      icon: Zap,
      title: 'Nutrient Powerhouse',
      description: 'Microgreens contain 40x more nutrients than mature plants. Packed with vitamins, minerals, and antioxidants.'
    },
    {
      icon: Heart,
      title: 'Heart Health',
      description: 'Rich in compounds that support cardiovascular health. Help maintain healthy cholesterol and blood pressure.'
    },
    {
      icon: Brain,
      title: 'Brain Boost',
      description: 'Contain nutrients that support cognitive function and mental clarity. Natural brain food for focus and energy.'
    },
    {
      icon: Shield,
      title: 'Immune Support',
      description: 'Packed with antioxidants and phytonutrients that strengthen your immune system. Nature&apos;s defense mechanism.'
    }
  ]

  return (
    <section id="why" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <span className="text-primary text-sm font-semibold">Why Microgreens</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-2 text-balance">
            Why microgreens are the ultimate superfood
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-white border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
              >
                <div className="flex-shrink-0 mb-4">
                  <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-muted group-hover:bg-primary/10 transition-colors">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{reason.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{reason.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
