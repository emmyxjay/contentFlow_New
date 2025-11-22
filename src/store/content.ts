'use client'

import { create } from 'zustand'
import { Content, ContentIdea, MediaAsset, Platform, Analytics } from '@/types'
import { generateId } from '@/lib/utils'

interface ContentState {
  ideas: ContentIdea[]
  content: Content[]
  media: MediaAsset[]
  analytics: Analytics[]
  isLoading: boolean

  // Ideas
  setIdeas: (ideas: ContentIdea[]) => void
  addIdea: (idea: Omit<ContentIdea, 'id' | 'createdAt'>) => ContentIdea
  removeIdea: (id: string) => void

  // Content
  setContent: (content: Content[]) => void
  addContent: (content: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>) => Content
  updateContent: (id: string, updates: Partial<Content>) => void
  removeContent: (id: string) => void

  // Media
  setMedia: (media: MediaAsset[]) => void
  addMedia: (media: Omit<MediaAsset, 'id' | 'createdAt'>) => MediaAsset

  // Analytics
  setAnalytics: (analytics: Analytics[]) => void

  // Filters
  filterByStatus: (status: Content['status']) => Content[]
  filterByPlatform: (platform: Platform) => Content[]
  filterByType: (type: Content['type']) => Content[]
}

// Seed data
const seedIdeas: ContentIdea[] = [
  {
    id: 'idea-1',
    title: '10 AI Tools That Will Transform Your Workflow in 2024',
    description: 'A comprehensive guide to the latest AI productivity tools',
    keywords: ['AI tools', 'productivity', 'automation', 'workflow'],
    searchVolume: 12500,
    competition: 'medium',
    searchIntent: 'informational',
    score: 85,
    source: 'trending',
    createdAt: new Date().toISOString(),
    workspaceId: 'workspace-1'
  },
  {
    id: 'idea-2',
    title: 'How to Build a SaaS MVP in 30 Days',
    description: 'Step-by-step guide for aspiring founders',
    keywords: ['SaaS', 'MVP', 'startup', 'development'],
    searchVolume: 8200,
    competition: 'high',
    searchIntent: 'informational',
    score: 78,
    source: 'keyword',
    createdAt: new Date().toISOString(),
    workspaceId: 'workspace-1'
  },
  {
    id: 'idea-3',
    title: 'Content Marketing ROI: What Metrics Actually Matter?',
    description: 'Deep dive into measuring content performance',
    keywords: ['content marketing', 'ROI', 'metrics', 'analytics'],
    searchVolume: 5400,
    competition: 'low',
    searchIntent: 'commercial',
    score: 92,
    source: 'question',
    createdAt: new Date().toISOString(),
    workspaceId: 'workspace-1'
  },
  {
    id: 'idea-4',
    title: 'Why Remote Teams Outperform Traditional Offices',
    description: 'Data-driven analysis of remote work productivity',
    keywords: ['remote work', 'productivity', 'team management'],
    searchVolume: 15200,
    competition: 'medium',
    searchIntent: 'informational',
    score: 88,
    source: 'trending',
    createdAt: new Date().toISOString(),
    workspaceId: 'workspace-1'
  }
]

const seedContent: Content[] = [
  {
    id: 'content-1',
    title: 'The Ultimate Guide to Content Automation',
    body: `<h2>Introduction</h2>
<p>Content automation is revolutionizing how businesses create and distribute content. In this comprehensive guide, we'll explore the tools, strategies, and best practices that can help you scale your content production without sacrificing quality.</p>

<h2>What is Content Automation?</h2>
<p>Content automation refers to the use of software and AI tools to streamline the content creation, optimization, and distribution process. This includes:</p>
<ul>
<li>AI-powered writing assistants</li>
<li>Automated scheduling and publishing</li>
<li>Content optimization tools</li>
<li>Analytics and performance tracking</li>
</ul>

<h2>Benefits of Content Automation</h2>
<p>Implementing content automation can provide numerous advantages for your marketing strategy:</p>
<ol>
<li><strong>Increased Efficiency:</strong> Reduce time spent on repetitive tasks</li>
<li><strong>Consistent Output:</strong> Maintain a regular publishing schedule</li>
<li><strong>Better SEO:</strong> Optimize content at scale</li>
<li><strong>Data-Driven Decisions:</strong> Use analytics to improve performance</li>
</ol>

<h2>Getting Started</h2>
<p>Ready to automate your content workflow? Start by identifying your biggest bottlenecks and choosing tools that address those specific needs.</p>`,
    type: 'blog',
    status: 'published',
    tone: 'professional',
    seoScore: 87,
    readabilityScore: 72,
    keywords: ['content automation', 'AI writing', 'productivity'],
    platforms: ['wordpress', 'linkedin'],
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    workspaceId: 'workspace-1',
    authorId: 'user-1',
    mediaAssets: []
  },
  {
    id: 'content-2',
    title: 'Excited to share our latest feature launch!',
    body: `We just shipped something amazing! 🚀

After months of hard work, our team has released a game-changing update that will transform how you create content.

Here's what's new:
→ AI-powered content suggestions
→ One-click publishing to 6 platforms
→ Real-time analytics dashboard

Try it today and let us know what you think!

#ProductLaunch #SaaS #ContentMarketing`,
    type: 'social',
    status: 'scheduled',
    tone: 'casual',
    keywords: ['product launch', 'startup'],
    platforms: ['twitter', 'linkedin'],
    scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    workspaceId: 'workspace-1',
    authorId: 'user-1',
    mediaAssets: []
  },
  {
    id: 'content-3',
    title: '5 SEO Mistakes Killing Your Rankings',
    body: `<h2>Are You Making These Common SEO Errors?</h2>
<p>Even experienced marketers fall into these traps. Let's fix them today.</p>

<h3>Mistake #1: Ignoring Search Intent</h3>
<p>Creating content that doesn't match what users are actually looking for is the fastest way to tank your rankings.</p>

<h3>Mistake #2: Keyword Stuffing</h3>
<p>The days of cramming keywords into every sentence are long gone. Focus on natural, valuable content instead.</p>

<h3>Mistake #3: Poor Mobile Experience</h3>
<p>With mobile-first indexing, your site must perform flawlessly on smartphones.</p>

<h3>Mistake #4: Slow Page Speed</h3>
<p>Every second of load time costs you visitors and conversions.</p>

<h3>Mistake #5: No Internal Linking Strategy</h3>
<p>Help search engines understand your site structure with strategic internal links.</p>`,
    type: 'blog',
    status: 'draft',
    tone: 'authoritative',
    seoScore: 78,
    readabilityScore: 85,
    keywords: ['SEO', 'search engine optimization', 'rankings'],
    platforms: ['wordpress', 'medium'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    workspaceId: 'workspace-1',
    authorId: 'user-1',
    mediaAssets: []
  }
]

const seedAnalytics: Analytics[] = [
  {
    id: 'analytics-1',
    contentId: 'content-1',
    platform: 'wordpress',
    impressions: 2450,
    clicks: 312,
    engagement: 45,
    shares: 28,
    comments: 12,
    likes: 89,
    date: new Date().toISOString()
  },
  {
    id: 'analytics-2',
    contentId: 'content-1',
    platform: 'linkedin',
    impressions: 8900,
    clicks: 567,
    engagement: 234,
    shares: 45,
    comments: 67,
    likes: 312,
    date: new Date().toISOString()
  }
]

export const useContentStore = create<ContentState>()((set, get) => ({
  ideas: seedIdeas,
  content: seedContent,
  media: [],
  analytics: seedAnalytics,
  isLoading: false,

  // Ideas
  setIdeas: (ideas) => set({ ideas }),
  addIdea: (ideaData) => {
    const newIdea: ContentIdea = {
      ...ideaData,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    set((state) => ({ ideas: [newIdea, ...state.ideas] }))
    return newIdea
  },
  removeIdea: (id) => set((state) => ({
    ideas: state.ideas.filter(i => i.id !== id)
  })),

  // Content
  setContent: (content) => set({ content }),
  addContent: (contentData) => {
    const newContent: Content = {
      ...contentData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    set((state) => ({ content: [newContent, ...state.content] }))
    return newContent
  },
  updateContent: (id, updates) => set((state) => ({
    content: state.content.map(c =>
      c.id === id
        ? { ...c, ...updates, updatedAt: new Date().toISOString() }
        : c
    )
  })),
  removeContent: (id) => set((state) => ({
    content: state.content.filter(c => c.id !== id)
  })),

  // Media
  setMedia: (media) => set({ media }),
  addMedia: (mediaData) => {
    const newMedia: MediaAsset = {
      ...mediaData,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    set((state) => ({ media: [newMedia, ...state.media] }))
    return newMedia
  },

  // Analytics
  setAnalytics: (analytics) => set({ analytics }),

  // Filters
  filterByStatus: (status) => get().content.filter(c => c.status === status),
  filterByPlatform: (platform) => get().content.filter(c => c.platforms.includes(platform)),
  filterByType: (type) => get().content.filter(c => c.type === type)
}))
