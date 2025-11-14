'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AnalysisResultsProps {
  results: any
  type: 'photo' | 'voice'
}

const emotionColors: Record<string, string> = {
  happy: 'var(--mood-happy)',
  calm: 'var(--mood-calm)',
  anxious: 'var(--mood-anxious)',
  sad: 'var(--mood-sad)',
  angry: 'var(--mood-angry)',
  neutral: 'var(--mood-neutral)',
  focused: 'var(--primary)',
}

export default function AnalysisResults({ results, type }: AnalysisResultsProps) {
  if (type === 'photo') {
    const primaryEmotion = results.primaryEmotion
    const stressLevel = results.overallStressLevel

    return (
      <div className="space-y-4">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <CardHeader>
            <CardTitle className="text-base">Primary Emotion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-3">
                {primaryEmotion === 'calm' && '😌'}
                {primaryEmotion === 'happy' && '😊'}
                {primaryEmotion === 'neutral' && '😐'}
                {primaryEmotion === 'anxious' && '😟'}
                {primaryEmotion === 'focused' && '🤨'}
              </div>
              <p className="text-2xl font-bold text-foreground capitalize">
                {primaryEmotion}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {results.emotions[primaryEmotion]
                  ? `${Math.round(results.emotions[primaryEmotion] * 100)}% confidence`
                  : 'Detected'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-base">Emotion Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(results.emotions).map(([emotion, confidence]: [string, any]) => (
              <div key={emotion} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize text-foreground/80">{emotion}</span>
                  <span className="font-semibold text-foreground">
                    {Math.round(confidence * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${confidence * 100}%`,
                      backgroundColor: emotionColors[emotion] || 'var(--primary)',
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-base">Stress Level</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">{stressLevel}%</div>
              <p className="text-sm text-muted-foreground mt-1">
                {stressLevel < 33 ? 'Low' : stressLevel < 66 ? 'Moderate' : 'High'} stress
              </p>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${stressLevel}%`,
                  backgroundColor:
                    stressLevel < 33
                      ? 'var(--mood-calm)'
                      : stressLevel < 66
                        ? 'var(--mood-anxious)'
                        : 'var(--mood-angry)',
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-base">Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.recommendations.map((rec: string, idx: number) => (
                <li key={idx} className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span className="text-foreground/80">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Voice analysis results
  return (
    <div className="space-y-4">
      <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <CardHeader>
          <CardTitle className="text-base">Overall Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-3">
            <div className="text-4xl">
              {results.primaryMood === 'calm' && '😌'}
              {results.primaryMood === 'happy' && '😊'}
              {results.primaryMood === 'anxious' && '😟'}
              {results.primaryMood === 'focused' && '🤨'}
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground capitalize">
                {results.primaryMood}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Stress Level: {results.stressLevel}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-base">Voice Indicators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(results.indicators).map(([indicator, data]: [string, any]) => (
            <div key={indicator} className="space-y-1 p-2 rounded-lg bg-muted/50">
              <div className="flex justify-between">
                <span className="text-xs font-semibold text-foreground capitalize">
                  {indicator}
                </span>
                <span className="text-xs font-bold text-primary">{data.value}</span>
              </div>
              <p className="text-xs text-foreground/70">{data.interpretation}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-base">Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {results.recommendations.map((rec: string, idx: number) => (
              <li key={idx} className="flex gap-2 text-sm">
                <span className="text-primary">•</span>
                <span className="text-foreground/80">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
