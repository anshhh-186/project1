'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface MoodDetectorProps {
  onMoodDetected: (mood: string) => void
  onScoreUpdate: (score: number) => void
}

export default function MoodDetector({ onMoodDetected, onScoreUpdate }: MoodDetectorProps) {
  const [text, setText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')

  // Simple sentiment analysis function
  const analyzeSentiment = (input: string): { mood: string; score: number } => {
    const lowerText = input.toLowerCase()
    let score = 0
    let moodType = 'neutral'

    // Happy indicators
    const happyWords = [
      'happy', 'joy', 'excited', 'amazing', 'wonderful', 'great', 'love', 'awesome',
      'excellent', 'fantastic', 'grateful', 'blessed', 'proud', 'confident'
    ]
    // Sad indicators
    const sadWords = [
      'sad', 'down', 'depressed', 'unhappy', 'miserable', 'lonely', 'hopeless',
      'terrible', 'awful', 'devastated', 'heartbroken'
    ]
    // Anxious/Stressed indicators
    const anxiousWords = [
      'anxious', 'worried', 'nervous', 'scared', 'afraid', 'panic', 'stress',
      'overwhelmed', 'pressure', 'tense', 'uneasy'
    ]
    // Angry indicators
    const angryWords = [
      'angry', 'furious', 'mad', 'rage', 'frustrated', 'irritated', 'annoyed',
      'furious', 'livid'
    ]
    // Calm indicators
    const calmWords = [
      'calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'content', 'balanced',
      'zen', 'centered', 'grounded'
    ]

    const happyCount = happyWords.filter(word => lowerText.includes(word)).length
    const sadCount = sadWords.filter(word => lowerText.includes(word)).length
    const anxiousCount = anxiousWords.filter(word => lowerText.includes(word)).length
    const angryCount = angryWords.filter(word => lowerText.includes(word)).length
    const calmCount = calmWords.filter(word => lowerText.includes(word)).length

    const counts = [
      { type: 'happy', count: happyCount, score: 0.9 },
      { type: 'sad', count: sadCount, score: 0.1 },
      { type: 'anxious', count: anxiousCount, score: 0.3 },
      { type: 'angry', count: angryCount, score: 0.2 },
      { type: 'calm', count: calmCount, score: 0.8 },
    ]

    const dominant = counts.reduce((prev, current) =>
      current.count > prev.count ? current : prev
    )

    if (dominant.count > 0) {
      moodType = dominant.type
      score = dominant.score
    } else {
      score = 0.5
    }

    return { mood: moodType, score }
  }

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please share something about how you\'re feeling')
      return
    }

    setError('')
    setIsAnalyzing(true)

    // Simulate API call delay
    setTimeout(() => {
      const { mood, score } = analyzeSentiment(text)
      onMoodDetected(mood)
      onScoreUpdate(score)
      setIsAnalyzing(false)
      setText('')
    }, 600)
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50">
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="mood-input" className="block text-sm font-medium text-foreground">
            Express yourself
          </label>
          <textarea
            id="mood-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey && text.trim()) {
                handleAnalyze()
              }
            }}
            placeholder="Share what's on your mind. It could be a few words or a longer reflection..."
            className="w-full min-h-24 p-4 rounded-lg border border-input bg-white dark:bg-foreground/5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {text.length > 0 && `${text.length} characters`}
          </p>
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !text.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze My Mood'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
