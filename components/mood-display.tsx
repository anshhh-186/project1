'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MoodDisplayProps {
  mood: string
  score: number
}

const moodDetails: Record<string, { emoji: string; title: string; description: string; color: string }> = {
  happy: {
    emoji: '😊',
    title: 'Happy',
    description: 'You\'re experiencing positive emotions. This is a wonderful feeling to embrace and celebrate!',
    color: 'var(--mood-happy)'
  },
  sad: {
    emoji: '😢',
    title: 'Sad',
    description: 'It\'s okay to feel sad. These emotions are valid. Consider reaching out to someone you trust.',
    color: 'var(--mood-sad)'
  },
  anxious: {
    emoji: '😟',
    title: 'Anxious',
    description: 'Anxiety is a signal that something matters to you. Let\'s try some grounding techniques to help.',
    color: 'var(--mood-anxious)'
  },
  stressed: {
    emoji: '😤',
    title: 'Stressed',
    description: 'Stress can be overwhelming. Take a moment to breathe. We\'ll work through this together.',
    color: 'var(--mood-stressed)'
  },
  angry: {
    emoji: '😠',
    title: 'Angry',
    description: 'Anger is a powerful emotion. It\'s important to acknowledge it and find healthy outlets.',
    color: 'var(--mood-angry)'
  },
  calm: {
    emoji: '😌',
    title: 'Calm',
    description: 'You\'re in a peaceful state. This is a great time to reflect and center yourself.',
    color: 'var(--mood-calm)'
  },
  neutral: {
    emoji: '😐',
    title: 'Neutral',
    description: 'You\'re in a neutral space. That\'s perfectly fine. Let\'s explore what you\'re thinking about.',
    color: 'var(--mood-neutral)'
  },
}

export default function MoodDisplay({ mood, score }: MoodDisplayProps) {
  const details = moodDetails[mood] || moodDetails.neutral
  const intensityPercent = Math.round(score * 100)

  return (
    <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl flex items-center gap-3">
          <span className="text-4xl">{details.emoji}</span>
          {details.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground/80 leading-relaxed">
          {details.description}
        </p>

        {/* Intensity Meter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">Emotional Intensity</span>
            <span className="text-muted-foreground">{intensityPercent}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${intensityPercent}%`,
                backgroundColor: details.color
              }}
            />
          </div>
        </div>

        {/* Suggestions */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Suggestions for you:</h3>
          <ul className="space-y-2">
            <li className="flex gap-3 items-start">
              <span className="text-primary mt-1">•</span>
              <span className="text-sm text-foreground/80">Take a few deep breaths and ground yourself in the present moment</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-primary mt-1">•</span>
              <span className="text-sm text-foreground/80">Consider journaling about what you're experiencing</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-primary mt-1">•</span>
              <span className="text-sm text-foreground/80">Reach out to our AI companion for a supportive conversation</span>
            </li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="flex gap-3">
          <button className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
            Talk to AI Companion
          </button>
          <button className="flex-1 px-4 py-2 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition-colors font-medium">
            Grounding Exercises
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
