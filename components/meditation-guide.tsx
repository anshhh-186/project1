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

const meditationGuides: Record<string, string[]> = {
  'Guided Morning Meditation': [
    'Find a comfortable seated position. Let your shoulders relax.',
    'Close your eyes gently. Breathe naturally, without forcing.',
    'With each breath, set an intention for your day. What matters most?',
    'Visualize your day unfolding with calm and purpose.',
    'Feel gratitude for this new day and the opportunities ahead.',
    'Slowly bring your awareness back. Wiggle your fingers and toes.',
    'When ready, gently open your eyes. Carry this calm forward.',
  ],
  'Body Scan Meditation': [
    'Lie down comfortably on your back. Arms at your sides.',
    'Close your eyes. Take three deep breaths to settle in.',
    'Notice your feet. Are they tense or relaxed? Let them soften.',
    'Move your awareness to your legs. Release any tension you find.',
    'Bring attention to your abdomen. Breathe into this space.',
    'Notice your chest and heart. Feel it beating with life force.',
    'Scan your arms and hands. Let them feel heavy and peaceful.',
    'Finally, notice your head and face. Release tension from your jaw.',
    'Rest here, breathing peacefully, for the remaining time.',
    'Gently bring awareness back when ready. Open your eyes slowly.',
  ],
}

export default function MeditationGuide({
  activity,
  onBack,
}: {
  activity: Activity
  onBack: () => void
}) {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [timeLeft, setTimeLeft] = useState(activity.duration * 60)
  const [isComplete, setIsComplete] = useState(false)

  const steps = meditationGuides[activity.title] || meditationGuides['Guided Morning Meditation']
  const timePerStep = Math.floor((activity.duration * 60) / steps.length)

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1
        if (newTime <= 0) {
          setIsActive(false)
          setIsComplete(true)
        } else if (newTime % timePerStep === 0 && currentStep < steps.length - 1) {
          setCurrentStep((c) => c + 1)
        }
        return Math.max(0, newTime)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, currentStep, steps.length, timePerStep])

  const startMeditation = () => {
    setIsActive(true)
    setCurrentStep(0)
    setTimeLeft(activity.duration * 60)
  }

  const resetMeditation = () => {
    setIsActive(false)
    setCurrentStep(0)
    setTimeLeft(activity.duration * 60)
    setIsComplete(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
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

          {/* Timer */}
          <div className="flex justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-primary tabular-nums">
                {formatTime(timeLeft)}
              </div>
              <p className="text-lg text-muted-foreground">
                {isActive ? 'Meditating...' : 'Ready to begin?'}
              </p>
            </div>
          </div>

          {/* Guidance Text */}
          <div className="bg-muted/50 rounded-lg p-6 min-h-24 flex items-center justify-center">
            <p className="text-lg text-foreground/80 text-center leading-relaxed">
              {isActive && steps[currentStep]
                ? steps[currentStep]
                : 'When you begin, follow the guided steps. There is no rush.'}
            </p>
          </div>

          {/* Progress */}
          {isActive && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Step {currentStep + 1} of {steps.length}</span>
                <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-3">
            {!isActive && !isComplete && (
              <Button onClick={startMeditation} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg">
                Start Meditation
              </Button>
            )}
            {isActive && (
              <Button onClick={() => setIsActive(false)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-6 text-lg">
                Pause
              </Button>
            )}
            {isComplete && (
              <>
                <Button onClick={resetMeditation} variant="outline" className="flex-1 py-6 text-lg">
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
                Wonderful! You've completed your meditation. Take this peace with you.
              </p>
            </div>
          )}

          {/* Tips */}
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold text-foreground mb-3">Tips for Better Meditation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Find a quiet, comfortable space where you won't be disturbed</li>
              <li>• Meditate at the same time each day for best results</li>
              <li>• If your mind wanders, gently bring it back without judgment</li>
              <li>• Even 5-10 minutes daily can have profound effects</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
