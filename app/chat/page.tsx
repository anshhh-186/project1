'use client'

import { useState } from 'react'
import ChatInterface from '@/components/chat-interface'
import NavigationHeader from '@/components/navigation-header'

export default function ChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <main className="min-h-screen bg-background">
      <NavigationHeader />
      
      <div className="flex">
        {/* Sidebar */}
        {isSidebarOpen && (
          <aside className="w-64 border-r border-border bg-card hidden md:block">
            <div className="p-4 space-y-4">
              <button className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm">
                + New Conversation
              </button>
              
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-2">
                  Recent Conversations
                </h3>
                <nav className="space-y-1">
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-foreground">
                    How to manage anxiety
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-foreground">
                    Sleep improvements
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-foreground">
                    Work stress
                  </button>
                </nav>
              </div>
            </div>
          </aside>
        )}

        {/* Main Chat Area */}
        <div className="flex-1">
          <ChatInterface />
        </div>
      </div>
    </main>
  )
}
