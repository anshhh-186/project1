'use client'

import { Card, CardContent } from '@/components/ui/card'

interface WellnessStatsProps {
  label: string
  value: string
  icon: string
  description: string
}

export default function WellnessStats({
  label,
  value,
  icon,
  description,
}: WellnessStatsProps) {
  return (
    <Card className="border-primary/10 hover:border-primary/30 transition-colors">
      <CardContent className="pt-6 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-2xl">{icon}</span>
          <p className="text-xs font-semibold text-muted-foreground uppercase">{label}</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
