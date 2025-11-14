'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface PhotoAnalyzerProps {
  onAnalysis: (results: any) => void
}

export default function PhotoAnalyzer({ onAnalysis }: PhotoAnalyzerProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCameraOpen(true)
      }
    } catch (error) {
      console.error('Failed to open camera:', error)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 320, 240)
        const imageData = canvasRef.current.toDataURL('image/jpeg')
        setPreview(imageData)
        closeCamera()
      }
    }
  }

  const closeCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      setIsCameraOpen(false)
    }
  }

  const analyzePhoto = async () => {
    if (!preview) return

    setIsAnalyzing(true)

    // Simulate analysis
    setTimeout(() => {
      const results = {
        primaryEmotion: 'calm',
        emotions: {
          calm: 0.45,
          neutral: 0.3,
          happy: 0.15,
          focused: 0.1,
        },
        stressIndicators: {
          facialTension: 0.2,
          eyeFatigue: 0.15,
          jawClenching: 0.1,
        },
        overallStressLevel: 25,
        recommendations: [
          'You appear relaxed. Keep up the positive mindset!',
          'Consider a brief meditation session to maintain your calm state',
          'Your facial tension is minimal. This is great!',
        ],
      }
      onAnalysis(results)
      setIsAnalyzing(false)
    }, 1500)
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <CardTitle>Photo Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Preview */}
        <div className="space-y-3">
          {preview ? (
            <div className="relative rounded-lg overflow-hidden bg-muted border-2 border-primary/30">
              <img
                src={preview || "/placeholder.svg"}
                alt="Selected"
                className="w-full h-auto max-h-96 object-cover"
              />
              <button
                onClick={() => {
                  setPreview(null)
                  if (fileInputRef.current) fileInputRef.current.value = ''
                }}
                className="absolute top-2 right-2 px-3 py-1 rounded-lg bg-red-500/80 hover:bg-red-600 text-white text-sm font-medium transition-colors"
              >
                Remove
              </button>
            </div>
          ) : isCameraOpen ? (
            <div className="space-y-3">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg bg-black"
              />
              <canvas
                ref={canvasRef}
                width={320}
                height={240}
                className="hidden"
              />
              <div className="flex gap-2">
                <Button
                  onClick={capturePhoto}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Capture
                </Button>
                <Button
                  onClick={closeCamera}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center space-y-4">
              <div className="text-5xl">📸</div>
              <p className="text-foreground font-medium">Select or capture a photo</p>
              <p className="text-sm text-muted-foreground">
                Upload a selfie for facial expression analysis
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-2">
          {!isCameraOpen && !preview && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-4 py-2 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition-colors font-medium"
              >
                Upload Photo
              </button>
              <button
                onClick={openCamera}
                className="w-full px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors font-medium"
              >
                Open Camera
              </button>
            </>
          )}
        </div>

        {/* Analyze Button */}
        {preview && (
          <Button
            onClick={analyzePhoto}
            disabled={isAnalyzing}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Photo'}
          </Button>
        )}

        {/* Privacy Notice */}
        <p className="text-xs text-muted-foreground text-center border-t border-border pt-4">
          Your photos are analyzed locally and never stored. Your privacy is our priority.
        </p>
      </CardContent>
    </Card>
  )
}
