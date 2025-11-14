'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function NavigationHeader() {
  const [isDark, setIsDark] = useState(false)

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    if (isDark) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-primary">
            MindFlow
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/chat" className="text-foreground hover:text-primary transition-colors">
            Chat
          </Link>
          <Link href="/activities" className="text-foreground hover:text-primary transition-colors">
            Activities
          </Link>
          <Link href="/analysis" className="text-foreground hover:text-primary transition-colors">
            Analysis
          </Link>
          <Link href="/community" className="text-foreground hover:text-primary transition-colors">
            Community
          </Link>
          <Link href="/resources" className="text-foreground hover:text-primary transition-colors">
            Resources
          </Link>
        </nav>

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}
