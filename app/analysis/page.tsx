'use client'

import { useState } from 'react'
import NavigationHeader from '@/components/navigation-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PhotoAnalyzer from '@/components/photo-analyzer'
import VoiceAnalyzer from '@/components/voice-analyzer'
import AnalysisResults from '@/components/analysis-results'

type AnalysisTab = 'photo' | 'voice'

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState<AnalysisTab>('photo')
  const [photoResults, setPhotoResults] = useState<any>(null)
  const [voiceResults, setVoiceResults] = useState<any>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <NavigationHeader />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Advanced <span className="text-primary">Analysis</span>
          </h1>
          <p className="text-muted-foreground">
            Get deeper insights into your emotional state through photos and voice analysis
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          {(['photo', 'voice'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'photo' && '📸 Photo Analysis'}
              {tab === 'voice' && '🎤 Voice Analysis'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2">
            {activeTab === 'photo' && (
              <PhotoAnalyzer onAnalysis={setPhotoResults} />
            )}
            {activeTab === 'voice' && (
              <VoiceAnalyzer onAnalysis={setVoiceResults} />
            )}
          </div>

          {/* Results Section */}
          <div>
            {photoResults && activeTab === 'photo' && (
              <AnalysisResults results={photoResults} type="photo" />
            )}
            {voiceResults && activeTab === 'voice' && (
              <AnalysisResults results={voiceResults} type="voice" />
            )}

            {!photoResults && !voiceResults && (
              <Card className="border-primary/10 h-full flex flex-col justify-center">
                <CardContent className="text-center py-12 space-y-4">
                  <div className="text-5xl">✨</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {activeTab === 'photo' ? 'Photo Results' : 'Voice Results'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {activeTab === 'photo'
                        ? 'Upload a selfie to analyze your facial expressions and emotional state'
                        : 'Record a message to analyze your voice tone and stress level'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle className="text-base">About Photo Analysis</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3 text-foreground/80">
              <p>
                Our photo analysis uses advanced facial expression recognition to detect micro-expressions and emotional indicators.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Detects key facial muscles associated with emotions</li>
                <li>Analyzes stress indicators like tension and fatigue</li>
                <li>Provides non-medical emotional insights</li>
                <li>Suggests personalized grounding activities</li>
              </ul>
              <p className="text-xs text-muted-foreground italic">
                Note: This is for self-reflection only and not a medical diagnosis.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle className="text-base">About Voice Analysis</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3 text-foreground/80">
              <p>
                Our voice analysis examines tone, pace, and pitch variations to assess your emotional and stress levels.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Analyzes speech pace and rhythm</li>
                <li>Detects stress indicators in voice patterns</li>
                <li>Measures tone and emotional resonance</li>
                <li>Offers instant calming suggestions</li>
              </ul>
              <p className="text-xs text-muted-foreground italic">
                Note: Works best with 10-30 seconds of natural speech.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
