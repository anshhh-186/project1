'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface VoiceAnalyzerProps {
  onAnalysis: (results: any) => void
}

export default function VoiceAnalyzer({ onAnalysis }: VoiceAnalyzerProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        const audioUrl = URL.createObjectURL(audioBlob)
        if (audioRef.current) {
          audioRef.current.src = audioUrl
        }
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      setRecordingTime(0)

      const interval = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 30) {
            stopRecording()
            clearInterval(interval)
            return prev
          }
          return prev + 1
        })
      }, 1000)
    } catch (error) {
      console.error('Failed to start recording:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
      setIsRecording(false)
    }
  }

  const analyzeVoice = () => {
    if (!audioRef.current?.src) return

    setIsAnalyzing(true)

    // Simulate voice analysis
    setTimeout(() => {
      const results = {
        primaryMood: 'calm',
        stressLevel: 35,
        pace: 'moderate',
        tone: 'warm',
        indicators: {
          pace: {
            value: 'Moderate',
            interpretation: 'You speak at a steady, controlled pace',
          },
          pitch: {
            value: 'Stable',
            interpretation: 'Your pitch is consistent and even',
          },
          volume: {
            value: 'Balanced',
            interpretation: 'Your volume is well-regulated',
          },
          energy: {
            value: 'Medium',
            interpretation: 'You have a moderate level of vocal energy',
          },
        },
        recommendations: [
          'Your voice indicates a calm emotional state - great job!',
          'Try incorporating more variation in tone for natural expression',
          'Your pacing suggests you are comfortable and not rushed',
        ],
      }
      onAnalysis(results)
      setIsAnalyzing(false)
    }, 1500)
  }

  const resetRecording = () => {
    if (audioRef.current) {
      audioRef.current.src = ''
    }
    setRecordingTime(0)
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <CardTitle>Voice Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Recording Status */}
        <div className="space-y-4">
          {isRecording && (
            <div className="p-4 rounded-lg bg-accent/20 border-2 border-accent animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                  <span className="font-medium text-foreground">Recording...</span>
                </div>
                <span className="text-lg font-bold text-accent">{recordingTime}s</span>
              </div>
            </div>
          )}

          {!isRecording && audioRef.current?.src && (
            <div className="p-4 rounded-lg bg-primary/10 border-2 border-primary/50">
              <p className="text-sm font-medium text-foreground mb-3">
                Recording captured ({recordingTime}s)
              </p>
              <audio
                ref={audioRef}
                controls
                className="w-full rounded-lg"
              />
            </div>
          )}

          {!isRecording && !audioRef.current?.src && (
            <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center space-y-4">
              <div className="text-5xl">🎤</div>
              <p className="text-foreground font-medium">Ready to record</p>
              <p className="text-sm text-muted-foreground">
                Share your thoughts in 10-30 seconds
              </p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-2">
          {!isRecording && !audioRef.current?.src && (
            <Button
              onClick={startRecording}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Start Recording
            </Button>
          )}

          {isRecording && (
            <Button
              onClick={stopRecording}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              Stop Recording
            </Button>
          )}

          {!isRecording && audioRef.current?.src && (
            <>
              <Button
                onClick={analyzeVoice}
                disabled={isAnalyzing}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Voice'}
              </Button>
              <Button
                onClick={resetRecording}
                variant="outline"
                className="w-full"
              >
                Record Again
              </Button>
            </>
          )}
        </div>

        {/* Duration Indicator */}
        {isRecording && (
          <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all"
              style={{ width: `${(recordingTime / 30) * 100}%` }}
            />
          </div>
        )}

        {/* Privacy Notice */}
        <p className="text-xs text-muted-foreground text-center border-t border-border pt-4">
          Audio is processed locally and never stored. Your privacy is protected.
        </p>
      </CardContent>
    </Card>
  )
}
