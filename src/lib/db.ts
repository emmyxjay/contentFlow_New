// In-memory database for the prototype
// In production, replace with PostgreSQL/MySQL

import {
  User,
  Workspace,
  ContentIdea,
  Content,
  MediaAsset,
  ScheduledPost,
  Integration,
  Analytics,
  BrandTemplate
} from '@/types'
import { generateId } from './utils'

interface Database {
  users: User[]
  workspaces: Workspace[]
  ideas: ContentIdea[]
  content: Content[]
  media: MediaAsset[]
  scheduledPosts: ScheduledPost[]
  integrations: Integration[]
  analytics: Analytics[]
  brandTemplates: BrandTemplate[]
}

// Initial seed data
const db: Database = {
  users: [
    {
      id: 'user-1',
      email: 'demo@contentflow.io',
      name: 'Demo User',
      role: 'admin',
      createdAt: new Date().toISOString(),
      workspaceId: 'workspace-1'
    }
  ],
  workspaces: [
    {
      id: 'workspace-1',
      name: 'My Workspace',
      niche: 'Technology & SaaS',
      description: 'Content for tech startups',
      createdAt: new Date().toISOString(),
      ownerId: 'user-1'
    }
  ],
  ideas: [
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
    }
  ],
  content: [
    {
      id: 'content-1',
      title: 'The Ultimate Guide to Content Automation',
      body: '<h2>Introduction</h2><p>Content automation is revolutionizing how businesses create and distribute content...</p>',
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
      body: 'We just shipped something amazing... 🚀',
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
    }
  ],
  media: [],
  scheduledPosts: [],
  integrations: [],
  analytics: [
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
  ],
  brandTemplates: []
}

// Database operations
export const database = {
  // Users
  getUsers: () => db.users,
  getUserById: (id: string) => db.users.find(u => u.id === id),
  getUserByEmail: (email: string) => db.users.find(u => u.email === email),
  createUser: (user: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...user,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    db.users.push(newUser)
    return newUser
  },

  // Workspaces
  getWorkspaces: () => db.workspaces,
  getWorkspaceById: (id: string) => db.workspaces.find(w => w.id === id),
  getWorkspacesByUser: (userId: string) => db.workspaces.filter(w => w.ownerId === userId),
  createWorkspace: (workspace: Omit<Workspace, 'id' | 'createdAt'>) => {
    const newWorkspace: Workspace = {
      ...workspace,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    db.workspaces.push(newWorkspace)
    return newWorkspace
  },

  // Ideas
  getIdeas: (workspaceId: string) => db.ideas.filter(i => i.workspaceId === workspaceId),
  getIdeaById: (id: string) => db.ideas.find(i => i.id === id),
  createIdea: (idea: Omit<ContentIdea, 'id' | 'createdAt'>) => {
    const newIdea: ContentIdea = {
      ...idea,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    db.ideas.push(newIdea)
    return newIdea
  },
  deleteIdea: (id: string) => {
    const index = db.ideas.findIndex(i => i.id === id)
    if (index > -1) db.ideas.splice(index, 1)
  },

  // Content
  getContent: (workspaceId: string) => db.content.filter(c => c.workspaceId === workspaceId),
  getContentById: (id: string) => db.content.find(c => c.id === id),
  getContentByStatus: (workspaceId: string, status: Content['status']) =>
    db.content.filter(c => c.workspaceId === workspaceId && c.status === status),
  createContent: (content: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newContent: Content = {
      ...content,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    db.content.push(newContent)
    return newContent
  },
  updateContent: (id: string, updates: Partial<Content>) => {
    const index = db.content.findIndex(c => c.id === id)
    if (index > -1) {
      db.content[index] = {
        ...db.content[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      return db.content[index]
    }
    return null
  },
  deleteContent: (id: string) => {
    const index = db.content.findIndex(c => c.id === id)
    if (index > -1) db.content.splice(index, 1)
  },

  // Media
  getMedia: (workspaceId: string) => db.media.filter(m => m.workspaceId === workspaceId),
  createMedia: (media: Omit<MediaAsset, 'id' | 'createdAt'>) => {
    const newMedia: MediaAsset = {
      ...media,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    db.media.push(newMedia)
    return newMedia
  },

  // Scheduled Posts
  getScheduledPosts: (contentId: string) => db.scheduledPosts.filter(s => s.contentId === contentId),
  createScheduledPost: (post: Omit<ScheduledPost, 'id' | 'createdAt'>) => {
    const newPost: ScheduledPost = {
      ...post,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    db.scheduledPosts.push(newPost)
    return newPost
  },
  updateScheduledPost: (id: string, updates: Partial<ScheduledPost>) => {
    const index = db.scheduledPosts.findIndex(s => s.id === id)
    if (index > -1) {
      db.scheduledPosts[index] = { ...db.scheduledPosts[index], ...updates }
      return db.scheduledPosts[index]
    }
    return null
  },

  // Integrations
  getIntegrations: (workspaceId: string) => db.integrations.filter(i => i.workspaceId === workspaceId),
  createIntegration: (integration: Omit<Integration, 'id' | 'createdAt'>) => {
    const newIntegration: Integration = {
      ...integration,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    db.integrations.push(newIntegration)
    return newIntegration
  },
  deleteIntegration: (id: string) => {
    const index = db.integrations.findIndex(i => i.id === id)
    if (index > -1) db.integrations.splice(index, 1)
  },

  // Analytics
  getAnalytics: (contentId: string) => db.analytics.filter(a => a.contentId === contentId),
  getAnalyticsByWorkspace: (workspaceId: string) => {
    const contentIds = db.content.filter(c => c.workspaceId === workspaceId).map(c => c.id)
    return db.analytics.filter(a => contentIds.includes(a.contentId))
  },
  createAnalytics: (analytics: Omit<Analytics, 'id'>) => {
    const newAnalytics: Analytics = {
      ...analytics,
      id: generateId()
    }
    db.analytics.push(newAnalytics)
    return newAnalytics
  },

  // Brand Templates
  getBrandTemplates: (workspaceId: string) => db.brandTemplates.filter(b => b.workspaceId === workspaceId),
  createBrandTemplate: (template: Omit<BrandTemplate, 'id' | 'createdAt'>) => {
    const newTemplate: BrandTemplate = {
      ...template,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    db.brandTemplates.push(newTemplate)
    return newTemplate
  }
}

export default database
