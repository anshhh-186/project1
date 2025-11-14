'use client'

import { useState } from 'react'
import Link from 'next/link'
import MoodDetector from '@/components/mood-detector'
import MoodDisplay from '@/components/mood-display'
import NavigationHeader from '@/components/navigation-header'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [currentMood, setCurrentMood] = useState<string | null>(null)
  const [moodScore, setMoodScore] = useState<number>(0)

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <NavigationHeader />
      
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              How are you <span className="text-primary">feeling</span> today?
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Share what's on your mind, and let our AI companion provide compassionate support and insights.
            </p>
          </div>

          {/* Main Content Area */}
          <div className="space-y-6">
            {/* Mood Input */}
            <MoodDetector onMoodDetected={setCurrentMood} onScoreUpdate={setMoodScore} />

            {/* Mood Display */}
            {currentMood && (
              <div className="animate-in fade-in duration-500">
                <MoodDisplay mood={currentMood} score={moodScore} />
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {!currentMood && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setCurrentMood('happy')}
                className="p-6 rounded-lg bg-white dark:bg-card border border-border hover:border-accent transition-colors text-center group"
              >
                <div className="text-3xl mb-2">😊</div>
                <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                  I'm feeling good
                </p>
              </button>
              <button
                onClick={() => setCurrentMood('anxious')}
                className="p-6 rounded-lg bg-white dark:bg-card border border-border hover:border-accent transition-colors text-center group"
              >
                <div className="text-3xl mb-2">😟</div>
                <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                  I'm stressed
                </p>
              </button>
              <button
                onClick={() => setCurrentMood('neutral')}
                className="p-6 rounded-lg bg-white dark:bg-card border border-border hover:border-accent transition-colors text-center group"
              >
                <div className="text-3xl mb-2">😐</div>
                <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                  Just checking in
                </p>
              </button>
            </div>
          )}

          {/* CTA to Chat */}
          {!currentMood && (
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-8 text-center space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Ready to talk?</h3>
              <p className="text-foreground/80 max-w-sm mx-auto">
                Connect with our AI wellness companion for a supportive, confidential conversation about anything on your mind.
              </p>
              <Link href="/chat">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Start Conversation
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
