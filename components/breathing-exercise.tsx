'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface Activity {
  id: string
  title: string
  type: string
  duration: number
  difficulty: string
  description: string
  icon: string
}

const breathingPatterns: Record<string, { inhale: number; hold: number; exhale: number; cycles: number }> = {
  '4-7-8': { inhale: 4, hold: 7, exhale: 8, cycles: 4 },
  'Box': { inhale: 4, hold: 4, exhale: 4, cycles: 5 },
}

export default function BreathingExercise({
  activity,
  onBack,
}: {
  activity: Activity
  onBack: () => void
}) {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle')
  const [timeLeft, setTimeLeft] = useState(0)
  const [cycleCount, setCycleCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const pattern = breathingPatterns['Box'] // Default to Box breathing

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (phase === 'idle') {
            setPhase('inhale')
            return pattern.inhale
          } else if (phase === 'inhale') {
            setPhase('hold')
            return pattern.hold
          } else if (phase === 'hold') {
            setPhase('exhale')
            return pattern.exhale
          } else if (phase === 'exhale') {
            setCycleCount((c) => {
              const newCount = c + 1
              if (newCount >= pattern.cycles) {
                setIsComplete(true)
                setIsActive(false)
              } else {
                setPhase('inhale')
              }
              return newCount
            })
            return pattern.inhale
          }
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, phase, pattern])

  const startExercise = () => {
    setIsActive(true)
    setPhase('inhale')
    setTimeLeft(pattern.inhale)
  }

  const resetExercise = () => {
    setIsActive(false)
    setPhase('idle')
    setTimeLeft(0)
    setCycleCount(0)
    setIsComplete(false)
  }

  const phaseMessages: Record<string, string> = {
    idle: 'Ready to begin?',
    inhale: 'Breathe in...',
    hold: 'Hold your breath...',
    exhale: 'Breathe out...',
  }

  const phaseColors: Record<string, string> = {
    idle: 'from-muted to-muted/50',
    inhale: 'from-secondary to-secondary/50',
    hold: 'from-primary to-primary/50',
    exhale: 'from-accent to-accent/50',
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button
        onClick={onBack}
        variant="outline"
        className="mb-4"
      >
        Back to Activities
      </Button>

      <Card className="border-primary/20">
        <div className="p-8 space-y-8">
          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">{activity.title}</h1>
            <p className="text-muted-foreground">{activity.description}</p>
          </div>

          {/* Breathing Circle */}
          <div className="flex justify-center">
            <div
              className={`w-48 h-48 rounded-full bg-gradient-to-br ${phaseColors[phase]} flex items-center justify-center transition-all duration-1000 ${
                isActive ? 'scale-100' : 'scale-75'
              }`}
            >
              <div className="text-center">
                <div className="text-6xl font-bold text-foreground mb-2">{timeLeft}</div>
                <p className="text-lg font-semibold text-foreground/80">
                  {phaseMessages[phase]}
                </p>
              </div>
            </div>
          </div>

          {/* Progress */}
          {isActive && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Cycle {cycleCount + 1} of {pattern.cycles}</span>
                <span>{Math.round(((cycleCount + 1) / pattern.cycles) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${((cycleCount + 1) / pattern.cycles) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Info */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/50 text-center">
              <p className="text-sm text-muted-foreground">Inhale</p>
              <p className="text-2xl font-bold text-foreground">{pattern.inhale}s</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 text-center">
              <p className="text-sm text-muted-foreground">Hold</p>
              <p className="text-2xl font-bold text-foreground">{pattern.hold}s</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 text-center">
              <p className="text-sm text-muted-foreground">Exhale</p>
              <p className="text-2xl font-bold text-foreground">{pattern.exhale}s</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            {!isActive && !isComplete && (
              <Button onClick={startExercise} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg">
                Start Exercise
              </Button>
            )}
            {isActive && (
              <Button onClick={() => setIsActive(false)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-6 text-lg">
                Pause
              </Button>
            )}
            {isComplete && (
              <>
                <Button onClick={resetExercise} variant="outline" className="flex-1 py-6 text-lg">
                  Again
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg">
                  Complete
                </Button>
              </>
            )}
          </div>

          {isComplete && (
            <div className="p-4 rounded-lg bg-green-100/50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center">
              <p className="text-green-800 dark:text-green-200 font-semibold">
                Great job! You've completed the exercise. Feel more calm?
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
