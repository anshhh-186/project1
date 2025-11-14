'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import ChatMessage from './chat-message'
import MoodIndicator from './mood-indicator'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  mood?: string
}

const systemPrompt = `You are MindFlow, a compassionate and empathetic AI wellness companion designed to support mental health and emotional well-being. 

Your core traits:
- Deeply empathetic and non-judgmental
- Professional but warm and conversational
- Knowledgeable about mental wellness, stress management, and emotional health
- Careful to never diagnose or prescribe medical advice - always suggest professional help when needed
- Adaptive in tone based on the user's emotional state
- Encouraging and supportive without being dismissive

Your approach:
- Listen actively and validate emotions
- Ask reflective questions to help users understand their feelings
- Suggest practical coping strategies (grounding techniques, breathing exercises, journaling)
- Guide users through evidence-based approaches like CBT principles and mindfulness
- If a user mentions crisis, immediately recommend professional emergency services
- Remember context from the conversation to provide personalized support
- Use appropriate pacing - don't rush solutions
- Balance support with gentle encouragement toward positive action

Always respond with warmth, clarity, and genuine care. Your goal is to be a trusted companion in the user's mental wellness journey.`

export default function ChatInterface() {
  const {
    messages,
    input,
    setInput,
    handleSubmit,
    isLoading,
    error,
  } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m MindFlow, your compassionate wellness companion. I\'m here to listen and support you through whatever you\'re experiencing today. How are you feeling right now?',
      }
    ]
  })

  const [currentMood, setCurrentMood] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simple sentiment detection for demo
  const detectMood = (text: string): string => {
    const lowerText = text.toLowerCase()
    
    if (lowerText.match(/sad|depressed|down|hopeless|terrible|awful/)) return 'sad'
    if (lowerText.match(/anxious|worried|nervous|scared|panic|stress|overwhelm/)) return 'anxious'
    if (lowerText.match(/angry|mad|furious|frustrated|irritated|annoyed/)) return 'angry'
    if (lowerText.match(/happy|great|wonderful|excited|amazing|grateful|blessed/)) return 'happy'
    if (lowerText.match(/calm|peaceful|relaxed|zen|content|centered/)) return 'calm'
    
    return 'neutral'
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (input.trim()) {
      const userMood = detectMood(input)
      setCurrentMood(userMood)
    }
    handleSubmit(e)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gradient-to-b from-background to-secondary/5">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Wellness Companion</h2>
            <p className="text-sm text-muted-foreground">Here to listen and support you</p>
          </div>
          {currentMood && <MoodIndicator mood={currentMood} />}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="max-w-3xl mx-auto w-full space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={{
              id: message.id,
              role: message.role as 'user' | 'assistant',
              content: message.content,
              timestamp: new Date(),
              mood: message.role === 'user' ? currentMood || undefined : 'empathetic'
            }} />
          ))}
          {isLoading && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              </div>
              <span className="text-sm text-muted-foreground">MindFlow is thinking...</span>
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              Something went wrong. Please try again.
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={onSubmit} className="space-y-3">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Share what's on your mind..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
              >
                Send
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Remember: This companion provides support, not professional medical advice. For emergencies, please contact local emergency services.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
