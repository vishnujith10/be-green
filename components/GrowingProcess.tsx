import { Droplet, Lightbulb, Leaf, Package } from 'lucide-react'

export function GrowingProcess() {
  const steps = [
    {
      icon: Droplet,
      title: 'Soak & Seed',
      description: 'Premium seeds are carefully selected and soaked to activate germination.',
      duration: 'Day 1'
    },
    {
      icon: Lightbulb,
      title: 'Sprouting',
      description: 'Seeds begin to germinate under controlled temperature and humidity.',
      duration: 'Days 2-3'
    },
    {
      icon: Leaf,
      title: 'Growing',
      description: 'Microgreens develop their characteristic leaves under optimal light conditions.',
      duration: 'Days 4-6'
    },
    {
      icon: Package,
      title: 'Harvest & Pack',
      description: 'At peak nutrition, microgreens are harvested fresh and packed for delivery.',
      duration: 'Day 7'
    }
  ]

  return (
    <section id="process" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <span className="text-primary text-sm font-semibold">Our Growing Process</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-2 text-balance">
            From seed to table in 7 days
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-transparent" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative">
                  {/* Number Circle */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl relative z-10 shadow-lg shadow-primary/20">
                      {index + 1}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="p-6 rounded-2xl bg-background border border-border text-center">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-muted mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-foreground/60 mb-4">{step.description}</p>
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      {step.duration}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
