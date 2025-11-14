'use client'

import { useState } from 'react'
import NavigationHeader from '@/components/navigation-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CommunityForum from '@/components/community-forum'
import ProfessionalDirectory from '@/components/professional-directory'

type CommunityTab = 'forum' | 'professionals'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<CommunityTab>('forum')

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <NavigationHeader />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Community & <span className="text-primary">Support</span>
          </h1>
          <p className="text-muted-foreground">
            Connect with others and find professional support when you need it
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          {(['forum', 'professionals'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'forum' && '💬 Safe Forum'}
              {tab === 'professionals' && '👨‍⚕️ Find Professionals'}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'forum' && <CommunityForum />}
        {activeTab === 'professionals' && <ProfessionalDirectory />}
      </div>
    </main>
  )
}
