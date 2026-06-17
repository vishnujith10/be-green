export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  image: string
  price?: number
  status: 'available' | 'coming-soon'
  nutrition: {
    protein: string
    vitamins: string
    fiber: string
    antioxidants: string
    calcium: string
    iron: string
  }
  detailedNutrition?: {
    category: string
    items: { label: string; value: string; highlight?: boolean }[]
  }[]
  benefits: string[] | { title: string; description: string }[]
  gallery: string[]
}

export const products: Product[] = [
  {
    id: 'sunflower',
    name: 'Sunflower Microgreens',
    tagline: 'Crispy, nutty, nutrient-dense',
    description: 'Our premium sunflower microgreens are packed with vitamins and minerals. With a delightful nutty flavor and crunchy texture, they\'re perfect for salads, sandwiches, and smoothie bowls.',
    image: '/images/products/sunflower.png',
    price: 4.99,
    status: 'available',
    nutrition: {
      protein: 'A surprising source of high-quality plant-based protein (1 - 1.5g per 20g), essential for muscle repair and metabolic health.',
      vitamins: 'Rich in Vitamins E, A, C, K, B9. Acting as a natural multivitamin boost for your immune system.',
      fiber: 'High dietary fiber content (0.6 - 1g per 20g) supports digestive wellness and maintains steady energy levels.',
      antioxidants: 'Packed with chlorophyll and other antioxidants that help neutralize free radicals and reduce inflammation.',
      calcium: 'Essential for bone density and cardiovascular health, delivered in a highly bioavailable organic form (15 - 25mg per 20g).',
      iron: 'Critical for oxygen transport and cellular energy, making these greens a functional superfood (0.5 - 1mg per 20g).'
    },
    detailedNutrition: [
      {
        category: 'Macronutrients (20g)',
        items: [
          { label: 'Calories', value: '10–14 kcal' },
          { label: 'Protein', value: '1 – 1.5 g', highlight: true },
          { label: 'Carbohydrates', value: '1.2 – 1.8 g' },
          { label: 'Fiber', value: '0.6 – 1 g' },
          { label: 'Fat', value: '0.3 – 0.6 g (healthy fats)' }
        ]
      },
      {
        category: 'Vitamins',
        items: [
          { label: 'Vitamin E', value: 'High', highlight: true },
          { label: 'Vitamin A', value: 'Moderate' },
          { label: 'Vitamin C', value: '6–10 mg' },
          { label: 'Vitamin K', value: '10–20 µg' },
          { label: 'Folate (B9)', value: '10–15 µg' }
        ]
      },
      {
        category: 'Minerals',
        items: [
          { label: 'Calcium', value: '15–25 mg' },
          { label: 'Iron', value: '0.5–1 mg' },
          { label: 'Magnesium', value: '15–25 mg', highlight: true },
          { label: 'Potassium', value: '100–140 mg' },
          { label: 'Zinc', value: 'Small amount' }
        ]
      },
      {
        category: 'Powerful Compounds',
        items: [
          { label: 'Chlorophyll', value: 'Detox + blood health' },
          { label: 'Antioxidants', value: 'Reduce inflammation' },
          { label: 'Healthy fats', value: 'Heart health' }
        ]
      }
    ],
    benefits: [
      { title: 'Muscle Building Support', description: 'Higher protein than most microgreens. Good for gym people.' },
      { title: 'Heart Health', description: 'Healthy fats + magnesium. Supports BP control.' },
      { title: 'Brain Function', description: 'Magnesium improves focus. Helps reduce stress.' },
      { title: 'Skin & Hair Health', description: 'Vitamin E provides glowing skin and anti-aging benefits.' },
      { title: 'Natural Energy Booster', description: 'More calories + nutrients. Good for an active lifestyle.' },
      { title: 'Detox Support', description: 'Chlorophyll cleans blood and supports liver function.' },
      { title: 'Bone Strength', description: 'Contains calcium + magnesium for stronger bones.' }
    ],
    gallery: [
      '/images/products/sunflower-1.png',
      '/images/products/sunflower-2.png',
      '/images/products/sunflower-3.png',
      '/images/products/sunflower-4.png'
    ]
  },
  {
    id: 'radish',
    name: 'Radish Microgreens',
    tagline: 'Peppery punch of flavor',
    description: 'Tiny but mighty! Our radish microgreens pack a peppery punch and are loaded with sulforaphane, a powerful compound that supports overall wellness. Perfect for adding zest to any dish.',
    image: '/images/products/radish.png',
    price: 5.49,
    status: 'available',
    nutrition: {
      protein: '2.1g per oz',
      vitamins: 'C, K, A',
      fiber: '0.7g per oz',
      antioxidants: 'Very High',
      calcium: '15mg per oz',
      iron: '0.4mg per oz'
    },
    benefits: [
      'Promotes detoxification',
      'Supports digestive health',
      'May enhance metabolism',
      'Rich in glucosinolates',
      'Anti-inflammatory properties',
      'Supports liver function'
    ],
    gallery: [
      '/images/products/radish-1.png',
      '/images/products/radish-2.png',
      '/images/products/radish-3.png',
      '/images/products/radish-4.png'
    ]
  },
  {
    id: 'mix',
    name: 'Microgreens Mix',
    tagline: 'The best of everything',
    description: 'Our signature blend combines the finest microgreens varieties in perfect harmony. Enjoy a diverse mix of flavors, textures, and nutrients in every handful. The ultimate superfood salad topper.',
    image: '/images/products/mix.png',
    price: 6.99,
    status: 'available',
    nutrition: {
      protein: '2.8g per oz',
      vitamins: 'Full spectrum',
      fiber: '0.9g per oz',
      antioxidants: 'Very High',
      calcium: '40mg per oz',
      iron: '0.8mg per oz'
    },
    benefits: [
      'Comprehensive nutrition',
      'Diverse flavor profile',
      'Supports overall wellness',
      'Perfect for meal prep',
      'Boosts nutrient intake',
      'Great for smoothies and salads'
    ],
    gallery: [
      '/images/products/mix-1.png',
      '/images/products/mix-2.png',
      '/images/products/mix-3.png',
      '/images/products/mix-4.png'
    ]
  },
  {
    id: 'broccoli',
    name: 'Broccoli Microgreens',
    tagline: 'Coming Soon',
    description: 'Premium broccoli microgreens rich in sulforaphane.',
    image: '/images/products/broccoli.png',
    status: 'coming-soon',
    nutrition: {
      protein: '2.3g per oz',
      vitamins: 'A, C, K',
      fiber: '0.6g per oz',
      antioxidants: 'High',
      calcium: '30mg per oz',
      iron: '0.5mg per oz'
    },
    benefits: [],
    gallery: []
  },
  {
    id: 'mustard',
    name: 'Mustard Microgreens',
    tagline: 'Coming Soon',
    description: 'Sharp and spicy microgreens with incredible health benefits.',
    image: '/images/products/mustard.png',
    status: 'coming-soon',
    nutrition: {
      protein: '2.0g per oz',
      vitamins: 'A, C, K',
      fiber: '0.5g per oz',
      antioxidants: 'High',
      calcium: '20mg per oz',
      iron: '0.3mg per oz'
    },
    benefits: [],
    gallery: []
  },
  {
    id: 'pea',
    name: 'Pea Microgreens',
    tagline: 'Coming Soon',
    description: 'Sweet and tender pea microgreens perfect for all cuisines.',
    image: '/images/products/pea.png',
    status: 'coming-soon',
    nutrition: {
      protein: '3.0g per oz',
      vitamins: 'A, C, K',
      fiber: '1.2g per oz',
      antioxidants: 'Medium',
      calcium: '35mg per oz',
      iron: '0.7mg per oz'
    },
    benefits: [],
    gallery: []
  },
  {
    id: 'alfalfa',
    name: 'Alfalfa Microgreens',
    tagline: 'Coming Soon',
    description: 'Mild and versatile alfalfa microgreens packed with nutrients.',
    image: '/images/products/alfalfa.png',
    status: 'coming-soon',
    nutrition: {
      protein: '1.8g per oz',
      vitamins: 'K, A, C',
      fiber: '0.4g per oz',
      antioxidants: 'Medium',
      calcium: '45mg per oz',
      iron: '0.4mg per oz'
    },
    benefits: [],
    gallery: []
  },
  {
    id: 'beet',
    name: 'Beet Microgreens',
    tagline: 'Coming Soon',
    description: 'Earthy beet microgreens with natural sweetness.',
    image: '/images/products/beet.png',
    status: 'coming-soon',
    nutrition: {
      protein: '1.9g per oz',
      vitamins: 'A, C, K',
      fiber: '0.6g per oz',
      antioxidants: 'Very High',
      calcium: '25mg per oz',
      iron: '0.6mg per oz'
    },
    benefits: [],
    gallery: []
  },
  {
    id: 'cress',
    name: 'Watercress Microgreens',
    tagline: 'Coming Soon',
    description: 'Peppery watercress microgreens with exceptional nutrients.',
    image: '/images/products/cress.png',
    status: 'coming-soon',
    nutrition: {
      protein: '2.2g per oz',
      vitamins: 'A, C, K',
      fiber: '0.5g per oz',
      antioxidants: 'Very High',
      calcium: '50mg per oz',
      iron: '0.8mg per oz'
    },
    benefits: [],
    gallery: []
  }
]

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id)
}

export const getAvailableProducts = (): Product[] => {
  return products.filter(product => product.status === 'available')
}

export const getComingSoonProducts = (): Product[] => {
  return products.filter(product => product.status === 'coming-soon')
}
