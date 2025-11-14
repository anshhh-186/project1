'use client'

import { Card, CardContent } from '@/components/ui/card'

interface Activity {
  id: string
  title: string
  type: string
  duration: number
  difficulty: string
  description: string
  icon: string
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
}

export default function ActivityCard({
  activity,
  onClick,
}: {
  activity: Activity
  onClick: () => void
}) {
  return (
    <Card
      onClick={onClick}
      className="border-primary/10 hover:border-primary/50 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
    >
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="text-3xl">{activity.icon}</div>
          <span className={`text-xs font-semibold px-2 py-1 rounded ${difficultyColors[activity.difficulty]}`}>
            {activity.difficulty}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-foreground line-clamp-2">{activity.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {activity.description}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
          <span>{activity.duration} min</span>
          <span className="capitalize">{activity.type}</span>
        </div>
      </CardContent>
    </Card>
  )
}
