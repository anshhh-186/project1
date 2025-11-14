'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface StreakCardProps {
  currentStreak: number
  longestStreak: number
}

export default function StreakCard({ currentStreak, longestStreak }: StreakCardProps) {
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10">
      <CardHeader>
        <CardTitle className="text-base">Your Wellness Streak</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-5xl font-bold text-primary">{currentStreak}</div>
          <p className="text-sm text-foreground/80">days in a row</p>
          <p className="text-xs text-muted-foreground">logging your mood</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-background/50 border border-border text-center">
            <p className="text-2xl font-bold text-foreground">{longestStreak}</p>
            <p className="text-xs text-muted-foreground">longest streak</p>
          </div>
          <div className="p-3 rounded-lg bg-background/50 border border-border text-center">
            <p className="text-2xl font-bold text-accent">{currentStreak + longestStreak}</p>
            <p className="text-xs text-muted-foreground">total entries</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
            Keep Going!
          </p>
          <p className="text-xs text-foreground/70 leading-relaxed">
            Every mood entry helps us understand your patterns and support your wellness journey.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
