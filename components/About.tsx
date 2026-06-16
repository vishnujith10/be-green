import { Leaf, Droplets, Sun } from 'lucide-react'

export function About() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <div>
              <span className="text-primary text-sm font-semibold">About BE GREEN</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-2 text-balance">
                Growing wellness, one leaf at a time
              </h2>
            </div>

            <p className="text-lg text-foreground/70 leading-relaxed">
              BE GREEN started with a simple mission: bring the freshest, most nutrient-dense microgreens to health-conscious individuals everywhere. We believe that real nutrition starts with real food, and microgreens are some of nature&apos;s most powerful superfoods.
            </p>

            <p className="text-lg text-foreground/70 leading-relaxed">
              Our microgreens are grown in a controlled, sustainable environment without pesticides, herbicides, or artificial additives. We harvest at peak nutritional density to ensure you get the maximum benefits in every bite.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">7</div>
                <p className="text-sm text-foreground/60 mt-1">Days to Harvest</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <p className="text-sm text-foreground/60 mt-1">Organic Grown</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">40x</div>
                <p className="text-sm text-foreground/60 mt-1">More Nutrients</p>
              </div>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-6">
            {[
              {
                icon: Leaf,
                title: 'Completely Organic',
                description: 'Grown without any pesticides, herbicides, or synthetic chemicals. Pure, natural nutrition.'
              },
              {
                icon: Droplets,
                title: 'Fresh & Delivered Fast',
                description: 'Harvested to order and shipped within 24 hours. Arrive at your door crisp and vibrant.'
              },
              {
                icon: Sun,
                title: 'Sustainable Farming',
                description: 'Our controlled environment uses minimal water and energy. Growing food responsibly for our planet.'
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-muted">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-foreground/60 text-sm mt-1">{feature.description}</p>
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
