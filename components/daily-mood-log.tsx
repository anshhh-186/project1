'use client'

import { Card } from '@/components/ui/card'

interface DailyMoodLogProps {
  entry: {
    date: string
    mood: string
    score: number
    note: string
  }
}

const moodEmojis: Record<string, string> = {
  happy: '😊',
  sad: '😢',
  anxious: '😟',
  angry: '😠',
  calm: '😌',
  neutral: '😐',
}

export default function DailyMoodLog({ entry }: DailyMoodLogProps) {
  const date = new Date(entry.date)
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Card className="border-primary/10 hover:border-primary/30 transition-colors cursor-pointer">
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{moodEmojis[entry.mood] || '💭'}</span>
            <div>
              <p className="font-semibold text-foreground capitalize">{entry.mood}</p>
              <p className="text-sm text-muted-foreground">{formattedDate}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {Math.round(entry.score * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Intensity</p>
          </div>
        </div>

        {entry.note && (
          <p className="text-sm text-foreground/80 border-l-2 border-primary/50 pl-3">
            {entry.note}
          </p>
        )}

        <div className="flex gap-2">
          <button className="flex-1 text-xs px-3 py-1 rounded border border-primary/50 text-primary hover:bg-primary/10 transition-colors">
            View
          </button>
          <button className="flex-1 text-xs px-3 py-1 rounded border border-border text-muted-foreground hover:bg-muted transition-colors">
            Edit
          </button>
        </div>
      </div>
    </Card>
  )
}
