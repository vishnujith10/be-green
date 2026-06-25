import { CheckCircle } from 'lucide-react'

interface HealthBenefitsProps {
  benefits: string[]
}

export function HealthBenefits({
  benefits,
}: HealthBenefitsProps) {
  const sections: { title: string; items: string[] }[] = []

  let currentSection: { title: string; items: string[] } | null = null

  benefits.forEach((item) => {
    if (!item.startsWith('•')) {
      if (currentSection) sections.push(currentSection)

      currentSection = {
        title: item,
        items: [],
      }
    } else {
      currentSection?.items.push(item.replace('• ', ''))
    }
  })

  if (currentSection) sections.push(currentSection)

  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <div
          key={index}
          className="bg-muted/30 border border-border/50 rounded-xl p-5"
        >
          <h3 className="font-bold text-lg mb-3 text-foreground">
            {section.title}
          </h3>

          <ul className="space-y-2">
            {section.items.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-foreground/80"
              >
                <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}