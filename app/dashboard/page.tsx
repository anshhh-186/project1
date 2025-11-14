'use client'

import { useState } from 'react'
import NavigationHeader from '@/components/navigation-header'
import MoodChart from '@/components/mood-chart'
import DailyMoodLog from '@/components/daily-mood-log'
import StreakCard from '@/components/streak-card'
import WellnessStats from '@/components/wellness-stats'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardPage() {
  // Mock data - in production this would come from a database
  const [moodHistory] = useState([
    { date: '2025-11-07', mood: 'happy', score: 0.85, note: 'Great day at work' },
    { date: '2025-11-08', mood: 'neutral', score: 0.5, note: 'Regular day' },
    { date: '2025-11-09', mood: 'anxious', score: 0.35, note: 'Worried about presentation' },
    { date: '2025-11-10', mood: 'calm', score: 0.8, note: 'Used breathing exercises' },
    { date: '2025-11-11', mood: 'happy', score: 0.9, note: 'Presentation went well!' },
    { date: '2025-11-12', mood: 'calm', score: 0.75, note: 'Meditation session' },
    { date: '2025-11-13', mood: 'happy', score: 0.88, note: 'Coffee with friend' },
    { date: '2025-11-14', mood: 'neutral', score: 0.55, note: 'Productive work day' },
  ])

  const [selectedTab, setSelectedTab] = useState<'overview' | 'trends' | 'journal'>('overview')

  const moodCounts = moodHistory.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const averageMoodScore = (
    moodHistory.reduce((sum, entry) => sum + entry.score, 0) / moodHistory.length
  ).toFixed(2)

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <NavigationHeader />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Your Wellness Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your mood patterns and celebrate your wellness journey
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <WellnessStats
            label="Current Streak"
            value="7 days"
            icon="🔥"
            description="Keep it going!"
          />
          <WellnessStats
            label="Average Mood"
            value={`${(parseFloat(averageMoodScore) * 100).toFixed(0)}%`}
            icon="📊"
            description="Overall wellness"
          />
          <WellnessStats
            label="This Week"
            value={moodHistory.length}
            icon="📅"
            description="Entries recorded"
          />
          <WellnessStats
            label="Most Common"
            value={Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'neutral'}
            icon="😊"
            description="Mood this week"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          {(['overview', 'trends', 'journal'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                selectedTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'trends' && 'Trends'}
              {tab === 'journal' && 'Journal'}
            </button>
          ))}
        </div>

        {/* Content */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Mood Chart */}
            <div className="lg:col-span-2">
              <MoodChart data={moodHistory} />
            </div>

            {/* Streak Card */}
            <div className="space-y-4">
              <StreakCard currentStreak={7} longestStreak={14} />

              {/* Quick Stats */}
              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">This Week's Moods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.entries(moodCounts)
                    .sort((a, b) => b[1] - a[1])
                    .map(([mood, count]) => (
                      <div key={mood} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground capitalize">
                          {mood === 'happy' && '😊'} 
                          {mood === 'calm' && '😌'} 
                          {mood === 'anxious' && '😟'} 
                          {mood === 'neutral' && '😐'} 
                          {mood === 'sad' && '😢'} 
                          {mood === 'angry' && '😠'} 
                          {' ' + mood}
                        </span>
                        <span className="font-semibold text-foreground">{count}x</span>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === 'trends' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Mood Patterns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {Object.entries(moodCounts)
                    .sort((a, b) => b[1] - a[1])
                    .map(([mood, count]) => {
                      const percentage = (count / moodHistory.length) * 100
                      return (
                        <div key={mood} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize font-medium text-foreground">{mood}</span>
                            <span className="text-muted-foreground">{percentage.toFixed(0)}%</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Wellness Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-foreground">
                      You've had an <span className="font-semibold">8% increase</span> in positive moods this week.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                    <p className="text-foreground">
                      Your most common mood is <span className="font-semibold capitalize">{Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0]}</span>.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <p className="text-foreground">
                      Meditation and breathing exercises correlate with your calm moods!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === 'journal' && (
          <div className="space-y-4 max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">Daily Mood Journal</h3>
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium">
                + New Entry
              </button>
            </div>
            <div className="space-y-3">
              {moodHistory
                .slice()
                .reverse()
                .map((entry) => (
                  <DailyMoodLog key={entry.date} entry={entry} />
                ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
