'use client'

import { useState } from 'react'
import NavigationHeader from '@/components/navigation-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ActivityCard from '@/components/activity-card'
import BreathingExercise from '@/components/breathing-exercise'
import MeditationGuide from '@/components/meditation-guide'

type ActivityType = 'all' | 'breathing' | 'meditation' | 'grounding' | 'gratitude' | 'journaling'

interface Activity {
  id: string
  title: string
  type: ActivityType
  duration: number
  difficulty: 'easy' | 'medium' | 'hard'
  description: string
  icon: string
}

export default function ActivitiesPage() {
  const [selectedFilter, setSelectedFilter] = useState<ActivityType>('all')
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)

  const activities: Activity[] = [
    {
      id: '1',
      title: '4-7-8 Breathing Technique',
      type: 'breathing',
      duration: 5,
      difficulty: 'easy',
      description: 'A powerful breathing pattern to calm your nervous system quickly',
      icon: '💨'
    },
    {
      id: '2',
      title: 'Box Breathing',
      type: 'breathing',
      duration: 3,
      difficulty: 'easy',
      description: 'Simple equal-count breathing to promote focus and calm',
      icon: '📦'
    },
    {
      id: '3',
      title: 'Guided Morning Meditation',
      type: 'meditation',
      duration: 10,
      difficulty: 'easy',
      description: 'Start your day with intention and clarity',
      icon: '🌅'
    },
    {
      id: '4',
      title: 'Body Scan Meditation',
      type: 'meditation',
      duration: 15,
      difficulty: 'medium',
      description: 'Connect with your body and release tension progressively',
      icon: '🧘'
    },
    {
      id: '5',
      title: '5-4-3-2-1 Grounding Technique',
      type: 'grounding',
      duration: 5,
      difficulty: 'easy',
      description: 'Engage your senses to anchor yourself in the present moment',
      icon: '🌍'
    },
    {
      id: '6',
      title: 'Progressive Muscle Relaxation',
      type: 'grounding',
      duration: 12,
      difficulty: 'medium',
      description: 'Systematically relax muscle groups to release stress',
      icon: '💪'
    },
    {
      id: '7',
      title: 'Gratitude Journaling',
      type: 'gratitude',
      duration: 10,
      difficulty: 'easy',
      description: 'Reflect on things you appreciate and cultivate positivity',
      icon: '🙏'
    },
    {
      id: '8',
      title: 'Mindful Journaling',
      type: 'journaling',
      duration: 15,
      difficulty: 'medium',
      description: 'Express your thoughts and emotions without judgment',
      icon: '📝'
    },
  ]

  const filteredActivities = selectedFilter === 'all'
    ? activities
    : activities.filter(a => a.type === selectedFilter)

  const filterOptions: { label: string; value: ActivityType }[] = [
    { label: 'All Activities', value: 'all' },
    { label: 'Breathing', value: 'breathing' },
    { label: 'Meditation', value: 'meditation' },
    { label: 'Grounding', value: 'grounding' },
    { label: 'Gratitude', value: 'gratitude' },
    { label: 'Journaling', value: 'journaling' },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <NavigationHeader />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {selectedActivity && selectedActivity.type === 'breathing' ? (
          <BreathingExercise activity={selectedActivity} onBack={() => setSelectedActivity(null)} />
        ) : selectedActivity && selectedActivity.type === 'meditation' ? (
          <MeditationGuide activity={selectedActivity} onBack={() => setSelectedActivity(null)} />
        ) : (
          <>
            {/* Header */}
            <div className="mb-8 space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Coping <span className="text-primary">Activities</span>
              </h1>
              <p className="text-muted-foreground">
                Guided exercises and tools to help you manage stress and find peace
              </p>
            </div>

            {/* Filters */}
            <div className="mb-8 flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedFilter(option.value)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    selectedFilter === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80 text-foreground'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Quick Start Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10 cursor-pointer hover:border-primary/50 transition-colors" 
                onClick={() => setSelectedActivity(activities[0])}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Quick Calm</h3>
                      <p className="text-sm text-muted-foreground">5-min breathing for instant relief</p>
                    </div>
                    <div className="text-3xl">💨</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-accent/20 bg-gradient-to-br from-accent/10 to-primary/10 cursor-pointer hover:border-accent/50 transition-colors"
                onClick={() => setSelectedActivity(activities[4])}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Ground Yourself</h3>
                      <p className="text-sm text-muted-foreground">5-4-3-2-1 sensory grounding</p>
                    </div>
                    <div className="text-3xl">🌍</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activities Grid */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                {selectedFilter === 'all' ? 'All Activities' : `${selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)} Activities`}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onClick={() => setSelectedActivity(activity)}
                  />
                ))}
              </div>
            </div>

            {/* Tips Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="text-base">Pro Tips</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2 text-foreground/80">
                  <p>Start with shorter activities if you're new to meditation and breathing work.</p>
                  <p>Practice consistently - even 5 minutes daily is more effective than occasional long sessions.</p>
                  <p>Find a quiet, comfortable space where you won't be interrupted.</p>
                </CardContent>
              </Card>

              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="text-base">Best Times</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2 text-foreground/80">
                  <p><strong>Morning:</strong> Meditation to set intentions</p>
                  <p><strong>Midday:</strong> Grounding when stressed</p>
                  <p><strong>Evening:</strong> Gratitude or journaling to reflect</p>
                </CardContent>
              </Card>

              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="text-base">Getting Started</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2 text-foreground/80">
                  <p>Choose an activity that resonates with you right now.</p>
                  <p>Complete at least one activity to build your wellness habit.</p>
                  <p>Track your activities in the dashboard for motivation.</p>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
