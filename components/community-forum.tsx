'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ForumPost {
  id: string
  author: string
  avatar: string
  title: string
  content: string
  replies: number
  views: number
  timestamp: string
  category: string
  isAnonymous: boolean
}

export default function CommunityForum() {
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: '1',
      author: 'MindfulMaria',
      avatar: '👩',
      title: 'Managing anxiety at work - any tips?',
      content: 'I struggle with anxiety during presentations. Would love to hear how others cope...',
      replies: 12,
      views: 145,
      timestamp: '2 hours ago',
      category: 'Anxiety',
      isAnonymous: false,
    },
    {
      id: '2',
      author: 'Anonymous',
      avatar: '🕵️',
      title: 'Dealing with sleep issues',
      content: 'Haven\'t been sleeping well lately. Tried everything but nothing seems to work...',
      replies: 8,
      views: 98,
      timestamp: '5 hours ago',
      category: 'Sleep',
      isAnonymous: true,
    },
    {
      id: '3',
      author: 'SereneMind',
      avatar: '🧘',
      title: 'Meditation helped me through tough times',
      content: 'I wanted to share my journey with meditation and how it\'s transformed my mental health...',
      replies: 24,
      views: 287,
      timestamp: '1 day ago',
      category: 'Success Stories',
      isAnonymous: false,
    },
  ])

  const [showNewPost, setShowNewPost] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('General')
  const [isAnonymous, setIsAnonymous] = useState(false)

  const categories = ['General', 'Anxiety', 'Depression', 'Sleep', 'Stress', 'Success Stories']

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPostTitle.trim() || !newPostContent.trim()) return

    const newPost: ForumPost = {
      id: (posts.length + 1).toString(),
      author: isAnonymous ? 'Anonymous' : 'You',
      avatar: isAnonymous ? '🕵️' : '👤',
      title: newPostTitle,
      content: newPostContent,
      replies: 0,
      views: 0,
      timestamp: 'now',
      category: selectedCategory,
      isAnonymous,
    }

    setPosts([newPost, ...posts])
    setNewPostTitle('')
    setNewPostContent('')
    setShowNewPost(false)
  }

  return (
    <div className="space-y-6">
      {/* Safety Notice */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="text-2xl">🛡️</div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Safe & Supportive Space</h3>
              <p className="text-sm text-muted-foreground">
                This community is moderated to ensure a supportive, harassment-free environment. Share anonymously if you prefer, and know that all posts are reviewed for safety.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Post Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-foreground">Recent Discussions</h2>
        <Button
          onClick={() => setShowNewPost(!showNewPost)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          + New Post
        </Button>
      </div>

      {/* New Post Form */}
      {showNewPost && (
        <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle>Start a Discussion</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Title</label>
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Your Message</label>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Share your thoughts, questions, or experiences..."
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none min-h-24"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-input"
                />
                <label htmlFor="anonymous" className="text-sm text-foreground">
                  Post anonymously
                </label>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Post
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewPost(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="border-primary/10 hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex gap-3 flex-1">
                    <div className="text-2xl">{post.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground">{post.author}</p>
                        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                          {post.category}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground text-lg">{post.title}</h3>
                  <p className="text-muted-foreground line-clamp-2">{post.content}</p>
                </div>

                {/* Footer */}
                <div className="flex gap-4 text-sm text-muted-foreground border-t border-border pt-3">
                  <span>💬 {post.replies} replies</span>
                  <span>👁️ {post.views} views</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Community Guidelines */}
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle className="text-base">Community Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2 text-foreground/80">
          <p className="font-medium text-foreground">Please keep our community safe and supportive:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Be respectful and empathetic with other members</li>
            <li>Don't share medical diagnoses or prescribe advice</li>
            <li>No harassment, hate speech, or discriminatory content</li>
            <li>Share resources but don't promote products or services</li>
            <li>If someone is in crisis, encourage them to seek professional help</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
