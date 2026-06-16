import { CheckCircle } from 'lucide-react'

interface HealthBenefitsProps {
  benefits: string[]
}

export function HealthBenefits({ benefits }: HealthBenefitsProps) {
  return (
    <div className="space-y-3">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-foreground/70">{benefit}</p>
        </div>
      ))}
    </div>
  )
}
