import { CheckCircle2, ChefHat } from 'lucide-react'

const recipes = [
  {
    title: "🥗 Fresh Microgreen Salad",
    ingredients: [
      "A Handful of Microgreens",
      "Tomato",
      "Cucumber",
      "Olive oil",
      "Lemon juice",
      "Salt & pepper"
    ],
    preparation: "Wash and slice the vegetables. Add the microgreens, drizzle with olive oil and lemon juice, season with salt and pepper, then toss gently and serve fresh."
  },
  {
    title: "🥪 Microgreen Sandwich",
    ingredients: [
      "A Handful of Microgreens",
      "Bread",
      "Tomato",
      "Cucumber",
      "Butter or hummus"
    ],
    preparation: "Spread butter or hummus on the bread. Add tomato, cucumber and fresh microgreens. Close the sandwich and enjoy."
  },
  {
    title: "🍳 Microgreen Omelette",
    ingredients: [
      "A Handful of Microgreens",
      "2 eggs",
      "Salt & pepper"
    ],
    preparation: "Cook the omelette until done. Top with fresh microgreens just before serving."
  },
  {
    title: "🌯 Healthy Wrap",
    ingredients: [
      "A Handful of Microgreens",
      "Whole wheat wrap",
      "Chicken or paneer",
      "Tomato"
    ],
    preparation: "Fill the wrap with your favourite ingredients. Add fresh microgreens, roll tightly and serve."
  },
  {
    title: "🥑 Avocado Toast",
    ingredients: [
      "A Handful of Microgreens",
      "Toasted bread",
      "Mashed avocado",
      "Salt & pepper"
    ],
    preparation: "Spread mashed avocado over the toast. Top with fresh microgreens and season to taste."
  },
  {
    title: "🍔 Healthy Burger",
    ingredients: [
      "A Handful of Microgreens",
      "Burger bun",
      "Patty",
      "Tomato",
      "Onion"
    ],
    preparation: "Assemble the burger with the patty and vegetables. Replace lettuce with fresh microgreens for extra freshness."
  },
  {
    title: "🍕 Pizza Topping",
    ingredients: [
      "A Handful of Microgreens",
      "Freshly baked pizza"
    ],
    preparation: "Bake the pizza as usual. Sprinkle fresh microgreens on top just before serving."
  },
  {
    title: "🥣 Soup Garnish",
    ingredients: [
      "A Handful of Microgreens",
      "Hot soup"
    ],
    preparation: "Pour the soup into a bowl and add fresh microgreens immediately before serving."
  },
  {
    title: "🍝 Pasta Bowl",
    ingredients: [
      "A Handful of Microgreens",
      "Cooked pasta",
      "Olive oil",
      "Parmesan cheese (optional)"
    ],
    preparation: "Prepare the pasta, drizzle with olive oil, then top with fresh microgreens before serving."
  },
  {
    title: "🥤 Green Smoothie",
    ingredients: [
      "A Handful of Microgreens",
      "Banana",
      "Apple",
      "Milk or water"
    ],
    preparation: "Blend all ingredients until smooth. Serve immediately for a refreshing, nutritious drink."
  }
]

export function Recipes() {
  return (
    <section id="recipes" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Main Big Box */}
        <div className="bg-white rounded-[2.5rem] border border-border p-6 sm:p-10 lg:p-16 shadow-sm">

          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-3 block">
              Culinary Inspiration
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 font-serif flex items-center justify-center gap-4">
              <ChefHat className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              Recipes Suggested by Us
            </h2>
            <p className="text-lg text-foreground/60 leading-relaxed text-balance">
              Discover simple, delicious, and healthy ways to incorporate fresh BE GREEN microgreens into your everyday meals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {recipes.map((recipe, index) => (
              <div
                key={index}
                className="bg-muted/10 border border-border rounded-3xl p-6 sm:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 group"
              >
                <h3 className="text-xl font-bold text-foreground mb-6 group-hover:text-primary transition-colors">
                  {recipe.title}
                </h3>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/40 mb-3">
                    Ingredients
                  </h4>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/40 mb-3">
                    Preparing
                  </h4>
                  <p className="text-sm text-foreground/70 leading-relaxed bg-white rounded-xl p-4 border border-border">
                    {recipe.preparation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Note Box */}
          <div className="bg-primary/5 border-2 border-primary/20 rounded-3xl p-8 sm:p-10 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            <p className="font-bold text-xl sm:text-2xl text-primary mb-3">
              🌱 Be Green Tip:
            </p>
            <p className="text-lg text-foreground/80 mb-6 max-w-2xl mx-auto leading-relaxed">
              Add microgreens after cooking whenever possible to enjoy their fresh taste, crisp texture, and natural goodness.
            </p>
            <p className="font-black text-xl text-primary uppercase tracking-widest">
              Eat Fresh. Live Better. 🌿
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
