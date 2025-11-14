'use client'

const moodEmojis: Record<string, string> = {
  happy: '😊',
  sad: '😢',
  anxious: '😟',
  angry: '😠',
  calm: '😌',
  neutral: '😐',
  empathetic: '🤝'
}

export default function MoodIndicator({ mood }: { mood: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/50">
      <span className="text-lg">{moodEmojis[mood] || '💭'}</span>
      <span className="text-sm font-medium text-foreground capitalize">{mood}</span>
    </div>
  )
}
