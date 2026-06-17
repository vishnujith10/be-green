import { CheckCircle } from 'lucide-react'

export interface Benefit {
  title?: string
  description: string
}

interface HealthBenefitsProps {
  benefits: string[] | Benefit[]
}

export function HealthBenefits({ benefits }: HealthBenefitsProps) {
  return (
    <div className="space-y-4">
      {benefits.map((benefit, index) => {
        const isString = typeof benefit === 'string'
        const title = isString ? undefined : benefit.title
        const description = isString ? benefit : benefit.description

        return (
          <div key={index} className="flex items-start gap-3 bg-muted/30 p-4 rounded-xl border border-border/50">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              {title && <h4 className="font-semibold text-foreground text-base mb-1">{title}</h4>}
              <p className="text-foreground/70 leading-relaxed text-sm md:text-base">{description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
