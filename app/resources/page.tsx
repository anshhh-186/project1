'use client'

import NavigationHeader from '@/components/navigation-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ResourcesPage() {
  const resources = [
    {
      title: '988 Suicide & Crisis Lifeline',
      description: 'Free, confidential support for people in suicidal crisis or emotional distress',
      link: 'https://988lifeline.org',
      icon: '🆘',
      category: 'Crisis',
    },
    {
      title: 'Crisis Text Line',
      description: 'Text HOME to 741741 for crisis support from trained counselors',
      link: 'https://www.crisistextline.org',
      icon: '💬',
      category: 'Crisis',
    },
    {
      title: 'SAMHSA National Helpline',
      description: 'Free treatment referral and information service for mental health and substance use',
      link: 'https://www.samhsa.gov/find-help/national-helpline',
      icon: '☎️',
      category: 'Support',
    },
    {
      title: 'National Alliance on Mental Illness',
      description: 'Resources, support groups, and advocacy for mental health',
      link: 'https://www.nami.org',
      icon: '🤝',
      category: 'Support',
    },
    {
      title: 'Psychology Today Therapist Finder',
      description: 'Directory to find therapists, psychiatrists, and support groups',
      link: 'https://www.psychologytoday.com',
      icon: '👨‍⚕️',
      category: 'Professional',
    },
    {
      title: 'Headspace - Meditation App',
      description: 'Guided meditations, sleep sounds, and wellness content',
      link: 'https://www.headspace.com',
      icon: '🧘',
      category: 'Wellness',
    },
  ]

  const categories = ['All', 'Crisis', 'Support', 'Professional', 'Wellness']
  const [selectedCategory, setSelectedCategory] = React.useState('All')

  const filtered = selectedCategory === 'All'
    ? resources
    : resources.filter((r) => r.category === selectedCategory)

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <NavigationHeader />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Mental Health <span className="text-primary">Resources</span>
          </h1>
          <p className="text-muted-foreground">
            Curated list of helpful resources for mental health and wellness support
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((resource, idx) => (
            <Card key={idx} className="border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{resource.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{resource.title}</h3>
                      <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary inline-block mt-2">
                        {resource.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/80">{resource.description}</p>

                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Visit Resource
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Warning */}
        <Card className="mt-12 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="text-2xl">⚠️</div>
              <div>
                <p className="font-semibold text-red-800 dark:text-red-200 mb-2">If you're in immediate danger:</p>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Call 911 or go to your nearest emergency room. Do not wait. Your safety is the priority.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
